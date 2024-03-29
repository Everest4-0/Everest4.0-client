import { AcademicLevelService } from './../../../services/data/academic-level.service';
import { WorkSituationService } from './../../../services/data/work-situation.service';
import { ProfessionalExperienceService } from './../../../services/data/professional-experience.service';
import { ToastService } from 'ng-uikit-pro-standard';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from './../../../models/main/user';
import { UserService } from './../../../services/user.service';
import { Component, OnInit } from '@angular/core';
import { UserForm } from 'app/backoffice/forms/user.form';
import * as moment from 'moment-timezone'
import { games } from 'googleapis/build/src/apis/games';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.scss']
})
export class UpdateUserComponent implements OnInit {

  public form = new UserForm(this.fb);

  public user: User = new User();
  sexs: Array<any> = [{ id: 2, name: 'Masculino' }, { id: 1, name: 'Feminino' }, { id: 0, name: 'Outro' }]
  i18n: Array<any> = [{ id: 'pt', name: 'Português' }, { id: 'en', name: 'Inglês' }, { id: 'fr', name: 'Francês' }]

  public newsCategories = ['Negócio',
    'Finança',
    'Economia',
    'Computadores',
    'Ciência',
    'Tecnologia',
    'Entretenimento',
    'Arte',
    'Cultura',
    'Noticias gerais',
    'Atualidades',
    'Saúde',
    'Remédio',
    'Estilo de vida',
    'Desporto',
    'Videogames',
    'Lazer',
    'Comércio',
    'Profissional'].sort((x, y) => x > y ? 1 : -1);

  public timeZonesList = moment.tz.names()
  public workSituations: Array<any> = []
  public academicLevels: Array<any> = []
  public professionalExperiences: Array<any> = []
  constructor(
    private userService: UserService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private toast: ToastService,


    private academicLevelService: AcademicLevelService,
    private workSituationService: WorkSituationService,
    private professionalExperienceService: ProfessionalExperienceService
  ) { }

  ngOnInit(): void {


    this.academicLevelService.all().subscribe(academicLevels => this.academicLevels = academicLevels)
    this.workSituationService.all().subscribe(workSituations => this.workSituations = workSituations)
    this.professionalExperienceService.all().subscribe(professionalExperiences => this.professionalExperiences = professionalExperiences)
    const id = this.route.snapshot.params['id'];
    this.userService.one(id).subscribe(user => {
      user.datas.workSituation = user.datas.workSituation.id
      user.datas.professionalExperience = user.datas.professionalExperience.id
      user.datas.academicLevel = user.datas.academicLevel.id
      this.user = user
    });

  }


  saveForm(t = {}) {
    this.userService.update(this.user).subscribe(user => {

      this.toast.success('Usuário actualizado com successo', 'Sucesso', {
        timeOut: 5000,
        progressBar: true,
      })

      this.router.navigate(['/backoffice/users']);

      console.log(user);
    })

  }
}
