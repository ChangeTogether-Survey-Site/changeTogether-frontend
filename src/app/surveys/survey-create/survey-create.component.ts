import { Component } from '@angular/core';
import { SurveysService } from '../surveys.service';
import { NgForm } from '@angular/forms';



@Component({
  selector: 'app-survey-create',
  templateUrl: './survey-create.component.html',
  styleUrls: ['./survey-create.component.css'],
})
export class SurveyCreateComponent {
  // post data
  enteredSurveyName = '';
  enteredOrganization = '';
  enteredDescription = '';
  enteredQuestions = '';

  constructor(public surveysService: SurveysService) {}

  onAddSurvey(form: NgForm) {
    if (form.invalid) {
      return;
    }
    console.log(form.value);
    this.surveysService.addSurvey(form.value.surveyName, form.value.organization, form.value.description, form.value.numberOfQuestions);
    form.resetForm();
  }
}
