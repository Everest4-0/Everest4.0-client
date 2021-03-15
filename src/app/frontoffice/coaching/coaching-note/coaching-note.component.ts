import { NoteForm } from './../../../forms/note.form';
import { ModalService } from './../../../components/modal/modal.service';
import { Note } from './../../../models/coaching/note';
import { NoteService } from './../../../services/coaching/note.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-coaching-note',
  templateUrl: './coaching-note.component.html',
  styleUrls: ['./coaching-note.component.scss']
})
export class CoachingNoteComponent implements OnInit {

  public notes: Array<Note> = []
  public note: Note = new Note();
  public form = new NoteForm()
  public editting = this.note.id !== undefined;
  constructor(
    private noteService: NoteService,
    private modalService: ModalService) { }

  ngOnInit(): void {
    this.noteService.all().subscribe(notes => {
      this.notes = notes
    })
  }

  onSubmit() {
    (this.note.id
      ? this.update()
      : this.create()
    )
  }

  create() {
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

    this.note = note!==null ? note : new Note();
    this.editting = this.note.id !== undefined;
    this.modalService.open('note-modal');
  }
  closeModal() {

    this.modalService.close('note-modal');
  }
}
