import { ModalService } from 'app/components/modal';
import { Goal } from './../models/goal/goal';
import { Task } from './../models/goal/task';
import { ToastService } from 'ng-uikit-pro-standard';
import { TaskService } from './../services/task.service';
import { state } from '@angular/animations';
import { AuthService } from './../services/auth.service';
import { GoalService } from './../services/goal.service';
import { Component, OnInit } from '@angular/core';
import { LocationStrategy, PlatformLocation, Location } from '@angular/common';
import { LegendItem, ChartType } from '../lbd/lbd-chart/lbd-chart.component';
import * as Chartist from 'chartist';
import { Enums, State } from 'app/models/enums';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public emailChartType: ChartType;
  public emailChartData: any;
  public chartOptions: any;
  public emailChartLegendItems: LegendItem[];

  public hoursChartType: ChartType;
  public hoursChartData: any;
  public hoursChartOptions: any;
  public hoursChartResponsive: any[];
  public hoursChartLegendItems: LegendItem[];

  public activityChartType: ChartType;
  public activityChartData: any;
  public activityChartOptions: any;
  public activityChartResponsive: any[];
  public activityChartLegendItems: LegendItem[];
  public activityChartDataSeries: Array<any>;
  public emailChartDataSeries: Array<number> = []
  public tasks: any = { overDue: [], thisWeek: [], all: [] }
  public taskDetails: Task = new Task()
  isCalendar=false;
  news = [
    {
      title: 'COVID-19. Angola com mais 247 casos e cinco mortes no último dia do mês com mais casos',
      body: 'Dos novos casos, 156 de sexo masculino e 92 do sexo feminino, foram reportados em Luanda, 11 em Cabinda,15 no Uíje, 26 no Cunene e um no Bengo.As idades variam entre 2 e 80 anos.Entre as cinco mortes registadas, quatro homens e uma mulher, as idades situam-se respetivamente nos 36, 51, 55, 62 e 65 anos.Foram consideradas recuperadas da doença 416 pessoas. No total, Angola contabiliza 10.805 casos de covid-19, com 284 óbitos, 4.523 considerados recuperados e 5.998 ativos, dos quais 16 em estado crítico e 29 graves. Foram processadas nas últimas 24 horas, 2.402 amostras em mais de 157 mil, sendo a taxa diária de positividade de 10,3%.',
      image: 'https://thumbs.web.sapo.io/?W=775&H=0&delay_optim=1&webp=1&epic=OWZk9J47Lf/rFEC1pnsGkDNA6IlS8mv2xwy+DmRwh3ezN8Oi2r0rmuTmA7mYN70XlbMFKsKbulu81aLsBpTXnsXRksSQh94h8LM/jQ+guW9WnHI=',
      footer: 'Noticia'
    },
    {
      title: 'FC Barcelona desperdiça oportunidades e vantagem numérica em Alavés',
      body: 'Os catalães estão no 12.º lugar e somam apenas oito pontos nos seis jogos que disputaram, ficando a oito do eterno rival, que comanda com uma partida a mais e que, esta época, já ganhou por 3-1 na Catalunha. O Alavés adiantou-se aos 31 minutos, na sequência de um desentendimento defensivo, bem aproveitado por Luis Rioja para ficar com a bola e marcar: Piqué atrasou para Neto, mas o guarda-redes brasileiro atrapalhou-se e perdeu o controlo do esférico, erro que lhe custou um golo. Ao intervalo, Trincão substituiu Dembélé no Barcelona e, aos 58, Tomás Tavares estreou-se no Alavés, que, aos 62, ficou reduzido a 10 elementos por expulsão, por acumulação de cartões amarelos, de Jota Peleteiro.',
      image: 'https://thumbs.web.sapo.io/?W=775&H=0&delay_optim=1&webp=1&epic=YzcziCiRLD6+k8bR1/sKLPMK2E5hWdh2mybdWzKBTyNkDS7QSTgX2UY7r3Gzb4LYL2qNSibuMXvj3K/9vlurf/PkIPDH3fgPFBzphp2IXvxPQx0=',
      footer: 'Desporto'
    },
    {
      title: 'Profissionais do Santo António dedicam sábados a "recuperar" cirurgias de ambulatório',
      body: 'Paula Fontes “nem esperou muito” pela cirurgia às varizes porque depois de ter sido encaminhada pelo médico “só se passaram dois ou três meses”, conta à agência Lusa. Mas “achava que ia esperar mais porque a pandemia está a fazer estragos nos hospitais este ano”, enquanto as pernas “já lhe pesam há três”, acrescenta. Esta paciente de 54 anos, residente no Porto, chegou hoje “bem cedo” ao Centro Integrado de Cirurgia de Ambulatório (CICA) do Centro Hospitalar Universitário do Porto (CHUP) que inclui o Hospital de Santo António e a meio da manhã já estava em recobro, prevendo-se que teria alta “no máximo em uma hora”. Paula é uma das 37 pacientes que hoje foi operada numa das seis salas disponibilizadas no CICA. Ao todo 52 profissionais de saúde, desde médicos, enfermeiros a assistentes operacionais, decidiram dedicar o dia a “recuperar a lista de espera” de cirurgias de ambulatório. O modelo irá repetir-se até ao final do ano, num total de cirurgias a rondar as 160. “Isto não é inédito, mas neste momento em que a nossa atividade hospitalar clássica está muito condicionada pelo combate à covid-19, temos de ser criativos. A cirurgia de ambulatório não necessita de internamento e cuidados intensivos, pelo que nos dá uma oportunidade de alguma forma manter atividade e recuperar algumas listas de espera”, descreveu o diretor clínico do CHUP, José Barros. Em causa estão cirurgias de cinco especialidades diferentes. Cataratas, síndromes do túnel do canal do carpo, varizes ou hérnias cervicais são algumas das situações. “Isto não é uma determinação da administração. São os profissionais que se auto-organizam e voluntariamente se disponibilizam para trabalhar ao sábado (…). Habitualmente são 42 doentes por sábado. Hoje porque há doentes mais complexos de cirurgia vascular, são 37 (…). São cirurgias aparentemente simples, mas que fazem muito pela qualidade de vida das pessoas”, acrescentou José Barros.',
      image: 'https://thumbs.web.sapo.io/?W=775&H=0&delay_optim=1&webp=1&epic=ODFisC+wDOt9Jp5tRHnpPAQJEib+SLDh0baFWD5gDYLx/fGxq3eTXn/4+3HpWLJ7VQOmAlMWXrwGXT5V3cPwooEuuHb4UKW6CNzHsAQFZt4Rl8s=',
      footer: 'Noticia'
    },
    {
      title: 'Trio vimaranense recuperado da covid-19 é opção para embate com Gil Vicente',
      body: 'Os defesas Sacko, Abdul Mumin e Gideon Mensah regressaram à convocatória do Vitória de Guimarães para o jogo com o Gil Vicente, da sexta jornada da I Liga de futebol, após terem recuperado da infeção pelo novo coronavírus. O trio integra a lista de 23 convocados para o encontro de domingo, publicada no sítio oficial vitoriano, depois dos testes com resultados positivos, realizados a meio de outubro, da ausência nas duas jornadas anteriores do campeonato - Boavista (triunfo por 1-0) e Sporting de Braga (derrota por 1-0) - e do regresso aos treinos, na terça-feira. Os futebolistas reentram nas opções do treinador João Henriques, substituindo o defesa-central Jorge Fernandes, que cumpre, neste fim de semana, o primeiro de dois jogos de suspensão após a expulsão no clássico minhoto com o Sporting de Braga, o lateral-esquerdo Jonas Carls e o extremo Abou Ouattara.',
      image: 'https://thumbs.web.sapo.io/?W=775&H=0&delay_optim=1&webp=1&epic=ODExPTeon1BlrBzvInpH8bIF3QM2BEdHriyzOe/jUkQOnAVpFyZi4kn0JvwQ+XD8ddVc3nZyw2IOhVRKXOQpb8t5K0SGcdEfJ/6B4Ki71Wr3Jis=',
      footer: 'Noticia'
    }
  ];

  constructor(
    private goalService: GoalService,
    public auth: AuthService,
    private taskService: TaskService,
    private toast: ToastService,
    private modalService: ModalService
  ) { }

  ngOnInit() {
    let lSunday, nSunday, oSunday, now;
    lSunday = oSunday = now = new Date((new Date()).setHours(0, 0, 0, 0));
    nSunday = new Date((new Date()).setHours(0, 0, 0, 0));
    lSunday.setDate(lSunday.getDate() - (lSunday.getDay() || 7) + 7);
    nSunday.setDate(nSunday.getDate() - (nSunday.getDay() || 7) + 14);
    let sAnt, sAct, eAtr, dashBoard;
    this.goalService.all({ userId: this.auth.user.id }).subscribe(goals => {

      this.tasks.all = goals.map(goal => goal.tasks)
      this.tasks.all = this.tasks.all.reduce((x, y) => x.concat(y), [])
      this.tasks.overDue = this.tasks.all.filter(task => new Date(task.dueDate) < now && parseInt(task.state) < 3)
      this.tasks.thisWeek = this.tasks.all.filter(task => new Date(task.dueDate) > lSunday && new Date(task.dueDate) < nSunday && parseInt(task.state) < 3)
      eAtr = this.tasks.all.filter(task => new Date(task.dueDate) > now)
      sAct = this.tasks.all.filter(task => new Date(task.createdAt) > lSunday)
      sAnt = this.tasks.all.filter(task => new Date(task.createdAt) < lSunday)

    })

    this.emailChartType = ChartType.Pie;
    this.emailChartData = {
      series: this.emailChartDataSeries
    };
    this.chartOptions = {
      donut: true,
      donutWidth: 60,
      startAngle: 270,
      total: 200
    };
    this.emailChartLegendItems = [
      { title: 'Realizado', imageClass: 'fa fa-circle text-info' },
      { title: 'Por realizar', imageClass: 'fa fa-circle text-danger' }
    ];

    this.hoursChartType = ChartType.Line;
    this.hoursChartData = {
      //labels: ['9:00AM', '12:00AM', '3:00PM', '6:00PM', '9:00PM', '12:00PM', '3:00AM', '6:00AM'],
      series: [
        [287, 385, 490, 492, 554, 586, 698, 695, 752, 788, 846, 944],
        [67, 152, 143, 240, 287, 335, 435, 437, 539, 542, 544, 647],
        [23, 113, 67, 108, 190, 239, 307, 308, 439, 410, 410, 509]
      ]
    };
    this.hoursChartOptions = {
      low: 0,
      high: 800,
      showArea: true,
      height: '245px',
      axisX: {
        showGrid: false,
      },
      lineSmooth: Chartist.Interpolation.simple({
        divisor: 3
      }),
      showLine: false,
      showPoint: false,
    };
    this.hoursChartResponsive = [
      ['screen and (max-width: 640px)', {
        axisX: {
          labelInterpolationFnc: function (value) {
            return value[0];
          }
        }
      }]
    ];
    this.hoursChartLegendItems = [
      { title: 'Open', imageClass: 'fa fa-circle text-info' },
      { title: 'Click', imageClass: 'fa fa-circle text-danger' },
      { title: 'Click Second Time', imageClass: 'fa fa-circle text-warning' }
    ];

    this.activityChartType = ChartType.Bar;
    this.activityChartData = {
      labels: ['Por iniciar', 'Em curso', 'Concluido'],
      series: [
        [5, 3, 4],
        [3, 5, 2],
        [2, 3, 1]
      ]
    };
    this.activityChartOptions = {
      seriesBarDistance: 20,
      axisX: {
        showGrid: false
      },
      height: '245px'
    };
    this.activityChartResponsive = [
      ['screen and (max-width: 640px)', {
        seriesBarDistance: 20,
        axisX: {
          labelInterpolationFnc: function (value) {
            return value[0];
          }
        }
      }]
    ];
    this.activityChartLegendItems = [
      { title: 'Semana anterior', imageClass: 'fa fa-circle text-info' },
      { title: 'Semana Actual', imageClass: 'fa fa-circle text-danger' },
      { title: 'Em atraso', imageClass: 'fa fa-circle text-warning' }
    ];


  }

  getEmailChartDataSeries() {

    let now = new Date((new Date()).setHours(0, 0, 0, 0))
    let done = this.tasks.all.filter(task => new Date(task.dueDate) > now).filter(task => task.state == '3').length,
      toDo = this.tasks.all.filter(task => new Date(task.dueDate) > now).filter(task => task.state == '1').length

    let f = {
      series: [
        done / (done + toDo) * 100,
        toDo / (done + toDo) * 100

      ]
    }

    return f;
  }

  updateState(task, state, list) {

    
    task.state = state
    this.taskService.update(task).subscribe(task => {
      this.tasks[list].forEach((t, i) => {
        if (t.id === task.id) {
          this.tasks[list].splice(i, 1);
          this.toast.success('Auto avaliação sobre ', 'Sucesso', {
            timeOut: 300000,
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
  //['Pendente','Por inicial','Em curso','Concluido']
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

  inTime(t){
    return new Date(t) > new Date()
  }

  anualGoal(goal: Goal) {
    return //goal.partials.reduce((x: number, y) => { return x + parseFloat(y.value || 0) }, 0)
  };
  openModal(id) {
    this.modalService.open(id);
  }
  closeModal(id) {
    this.modalService.close(id);
  }
}
