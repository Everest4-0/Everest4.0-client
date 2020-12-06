import { TodoService } from './../../../services/todo.service';
import { CalendarOptions } from '@fullcalendar/angular';
import { Goal } from './../../../models/goal/goal';
import { Task } from './../../../models/goal/task';
import { ModalService } from 'app/components/modal';
import { ToastService } from 'ng-uikit-pro-standard';
import { TaskService } from './../../../services/task.service';
import { AuthService } from 'app/services/auth.service';
import { GoalService } from './../../../services/goal.service';
import { Component, OnInit, AfterViewInit } from '@angular/core';

import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import bootstrapPlugin from '@fullcalendar/bootstrap';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {
  // taskDetails:any;
  public tasks: Array<any> = []
  public taskDetails: Task = new Task()
  calendarOptions: CalendarOptions = {
    themeSystem: 'bootstrap',
    // emphasizes business hours
    businessHours: false,
    // event dragging & resizing
    editable: true,
    // header
    dateClick: this.handleDateClick.bind(this), // bind is important!
    eventClick: this.handleEventClick.bind(this), // bind is important!
    locale: 'pt',
    dayMaxEventRows: 1,
    droppable: true,
    /* eventRender: function (info) {
       alert(1)
     },
 */
    customButtons: {
      expand: {
        click: function (e) {

          $('<i></i>').addClass('pe-7s-expand2').attr('style', 'font-size:24px;')
            .appendTo(
              $('.fc-expand-button').removeClass('btn-primary')
                .html('')
            )

          $('<i></i>').addClass('pe-7s-close').attr('style', 'font-size:24px;')
            .appendTo(
              $('.fc-closeModal-button').removeClass('btn-primary')
                .html(''))
          $('#calendar-modal').attr('style', 'display:block')
        }
      }
    },
    headerToolbar: {
      left: 'title',
      right: 'expand'
    },
    buttonIcons: {
      close: 'fa-times',
      prevYear: 'fa-angle-double-left',
      nextYear: 'fa-angle-double-right'
    },
  };
  calendarBigOptions: CalendarOptions = {
    themeSystem: 'bootstrap',
    // emphasizes business hours
    businessHours: false,
    // event dragging & resizing
    editable: true,
    //  dateClick: this.handleDateClick.bind(this), // bind is important!
    eventClick: this.handleEventClick.bind(this), // bind is important!
    locale: 'pt',
    droppable: true,
    dayMaxEventRows: 5,
    customButtons: {
      closeModal: {
        click: function () {
          $('#calendar-modal').attr('style', 'display:none')
        }
      }
    },
    headerToolbar: {
      left: 'prev,today,next',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek,closeModal'
    },

    // editable: true,


    // complete: function() {alert('complete');},
  };

  constructor(
    private goalService: GoalService,
    public auth: AuthService,
    private taskService: TaskService,
    private toast: ToastService,
    private modalService: ModalService,
    private toDoService: TodoService
  ) { }

  ngOnInit() {
    this.goalService.all({ userId: this.auth.user.id }).subscribe(goals => {

      this.tasks = goals.map(goal => goal.tasks)
      this.tasks = this.tasks
        .reduce((x, y) => x.concat(y), [])
        .map(t => { return { task: t, color: '#ffab38', title: t.descriptions, date: t.dueDate, allDay: true } })
      this.toDoService.all({ userId: this.auth.user.id }).subscribe(todos => {
        debugger
        const t = todos.map(t => {
          return {
            task: t,
            title: 'Meeting',
            description: t.descriptions,
            start: t.startDate,
            end: t.endDate,
            className: 'fc-bg-lightgreen',
            icon: 'suitcase'
          }
        })
        this.tasks = this.tasks.concat(t)
        this.calendarOptions.events = this.calendarBigOptions.events = this.tasks
      })

      // this.calendarOptions.events = this.calendarBigOptions.events = this.tasks


    })


  }



  updateState(task, state, list) {


    task.state = state
    this.taskService.update(task).subscribe(task => {
      this.tasks[list].forEach((t, i) => {
        if (t.id === task.id) {
          this.tasks[list].splice(i, 1);
          this.toast.success('Auto avaliação sobre ', 'Sucesso', {
            timeOut: 50000,
            progressBar: true,
          })
        }
      });
    })
  }

  showTaskDetails(task) {
    this.taskDetails = task
    this.openModal('task-detail-modal')
  }
  // ['Pendente','Por inicial','Em curso','Concluido']
  states(s) {

    switch (parseInt(s)) {
      case 0:
        return [2, 3, 4]
      case 1:
        return [2, 3, 4]
      case 2:
        return [0, 3, 4]

    }
    return []
  }

  inTime(t) {
    return new Date(t) > new Date()
  }

  openModal(id) {
    this.modalService.open(id);
  }
  closeModal(id) {
    this.modalService.close(id);
  }

  handleDateClick(arg) {
    alert('date click! ' + arg.dateStr)
  }
  handleEventClick(arg) {
    debugger
    this.taskDetails = arg.event.task
    this.modalService.open('task-detail-modal')
    alert('event click! ' + JSON.stringify(arg.event))
  }

  anualGoal(goal: Goal) {
    return goal.partials.reduce((x: number, y) => { return x + parseFloat((y.value || 0) + '') }, 0)
  };

}
