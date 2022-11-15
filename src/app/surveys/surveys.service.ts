import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { Survey } from './survey.model';

@Injectable({providedIn: 'root'})
export class SurveysService {
  private surveys: Survey[] = [];
  private surveysUpdated = new Subject<Survey[]>();

  getSurveys(){
    return [...this.surveys];
  }

  getSurveyUpdateListener() {
    return this.surveysUpdated.asObservable();
  }

  // numberOfQuestions: this must be changed to an array of the questions later
  addSurvey(surveyName: string, organization: string, description: string, numberOfQuestions: string){
    const survey: Survey = {surveyName: surveyName, organization: organization, description: description, questions: numberOfQuestions};
    this.surveys.push(survey);
    this.surveysUpdated.next([...this.surveys]);
  }

}

// task: implement service for surveys and drop 2way binding
