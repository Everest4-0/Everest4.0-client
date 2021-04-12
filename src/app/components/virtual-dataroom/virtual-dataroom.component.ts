import { AuthService } from './../../services/auth.service';
import { DataRoomService } from './../../services/virtual_data_room/data-room.service';
import { DataRoom } from './../../models/virtual_data_room/data_room';
import { ModalService } from './../modal/modal.service';
import { DataRoomForm } from './../../forms/virtual_data_room/data_room.form';
import { Component, OnInit, Input } from '@angular/core';
import * as $ from 'jquery'
@Component({
  selector: 'app-virtual-dataroom',
  templateUrl: './virtual-dataroom.component.html',
  styleUrls: ['./virtual-dataroom.component.scss']
})
export class VirtualDataroomComponent implements OnInit {
  @Input() cssClass = 'default'
  @Input() small = false;
  form = new DataRoomForm();
  public dataRoom: DataRoom = new DataRoom()
  public dataRooms: Array<DataRoom> = []
  constructor(
    public auth: AuthService,
    private modalService: ModalService,
    private dataRoomService: DataRoomService
  ) { }

  ngOnInit(): void {
    this.dataRoomService.all().subscribe(datas => {
      this.dataRooms = datas
    })
  }

  styling() {
    $(document).ready(function () {
      $('div.container-fluid > div.row > div.col-md-12').attr('style', 'box-shadow: none !important;background:transparent !important ;')
    })
  }

  openModal() {
    this.modalService.open('data-room-modal')
  }

  saveDataRoom() {
    this.dataRoomService.create(this.dataRoom).subscribe(data => {
      this.dataRooms.push(data)
      this.dataRoom = new DataRoom()
      this.modalService.close('data-room-modal')
    })
  }

  addDataRoomFiles($event) {
    for (let i = 0; i < $event.length; i++)
      this.onChange($event[i])
  }

  onChange(file) {

    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onload = event => {
        let f = { data: null, name: '' };
        f.data = reader.result;
        f.name = f.data.split(';')[0].split('/')[1]
        this.dataRoom.files.push(f)
      };
    }
  }

  removeUploded(file, i) {
    this.dataRoom.files = this.dataRoom.files.filter(x => x.data !== file.data)
  }

  cells(files) {

    if (files.length === 1)
      return 12;
    else if (files.length === 2)
      return 6;
    else if (files.length === 3)
      return 4
    else if (files.length === 4)
      return 3
  }

  dataRoomType(dataRoom, icon = false) {
    let types = icon ? ['news-paper', 'photo', 'film'] : ['text', 'photo', 'video']


    if (dataRoom.files === undefined || dataRoom.files.length === 0)
      return types[0]
    else if (['jpg', 'jpeg', 'png', 'bmp'].includes(dataRoom.files[0].type))
      return types[1]
    else if (['mp4', 'npg'].includes(dataRoom.files[0].type))
      return types[2]
    else
      return types[0]
  }
}
