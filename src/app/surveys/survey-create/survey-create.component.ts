import { Component, OnInit } from '@angular/core';
import { SurveysService } from '../surveys.service';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';

import { Survey } from '../survey.model';



@Component({
  selector: 'app-survey-create',
  templateUrl: './survey-create.component.html',
  styleUrls: ['./survey-create.component.css'],
})
export class SurveyCreateComponent implements OnInit {
  // post data
  enteredSurveyName = '';
  enteredOrganization = '';
  enteredDescription = '';
  enteredQuestions = '';
  survey: Survey; // stores the survey passed from service getPost
  private mode: string = 'create'; // default
  private surveyId: string;


  constructor(
    public surveysService: SurveysService,
    public route: ActivatedRoute) {}

  ngOnInit() {
    this.route.paramMap.subscribe( (paramMap: ParamMap) => {
      if ( paramMap.has('surveyId') ){
        console.log(`edit mode : ${paramMap.get('surveyId')}`);
        this.mode = 'edit';
        this.surveyId = paramMap.get('surveyId');
        this.survey = this.surveysService.getSurvey(this.surveyId);
      } else {
        this.mode = 'create';
        this.surveyId = null;
      }
    });
  }

  onSaveSurvey(form: NgForm) {
    if (form.invalid) {
      return;
    }
    if (this.mode === 'create'){
      this.surveysService.addSurvey(
        form.value.surveyName,
        form.value.organization,
        form.value.description,
        form.value.numberOfQuestions
        );
    } else {
      this.surveysService.updateSurvey(
        this.surveyId,
        form.value.surveyName,
        form.value.organization,
        form.value.description,
        form.value.numberOfQuestions
        );
    }
    console.log(form.value);
    form.resetForm();
  }
}
