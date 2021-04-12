import { ModalService } from './../modal/modal.service';
import { NoteService } from './../../services/coaching/note.service';
import { NoteForm } from './../../forms/note.form';
import { Note } from './../../models/coaching/note';

import { Component, OnInit, Input } from '@angular/core';
import { CoachingSubscription } from 'app/models/coaching/coaching_subscription';

@Component({
  selector: 'app-coaching-note',
  templateUrl: './coaching-note.component.html',
  styleUrls: ['./coaching-note.component.scss']
})
export class CoachingNoteComponent implements OnInit {

  @Input() cssClass = 'default'
  i = 0;
  public notes: Array<Note> = []
  @Input() public subscription: CoachingSubscription = new CoachingSubscription();
  public note: Note = new Note();
  public form = new NoteForm()
  public editting = this.note.id !== undefined;

  public paginate = { firstInPage: 0, page: 1 };

  constructor(
    private noteService: NoteService,
    private modalService: ModalService) { }

  ngOnInit(): void {

    this.noteService.all({ subscriptionId: this.subscription.id }).subscribe(notes => {
      this.notes = notes
    })
  }

  onSubmit() {
    return this.note.id
      ? this.update()
      : this.create()
  }

  create() {
    this.note.subscription = this.subscription;
    this.noteService.create(this.note).subscribe(note => {
      this.notes.push(note);
      this.modalService.close('note-modal');
    })
  }

  update() {
    this.noteService.update(this.note).subscribe(note => {
      this.notes.filter(n => n.id === note.id)[0] = note;
      this.modalService.close('note-modal');
    })
  }
  openModal(note = null) {

    this.note = note !== null ? note : new Note();
    this.editting = this.note.id !== undefined;
    this.modalService.open('note-modal');
  }
  closeModal() {

    this.modalService.close('note-modal');
  }
  updatePage($event) {
    this.paginate = $event
  }
}
