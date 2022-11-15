import { Injectable } from '@angular/core';
import { Survey } from './survey.model';

@Injectable({providedIn: 'root'})
export class SurveysService {
  private surveys: Survey[] = [];

  getSurveys(){
    return [...this.surveys];
  }

  addSurvey(surveyName: string, organization: string, description: string, questions: string){
    const survey: Survey = {surveyName: surveyName, organization: organization, description: description, questions: questions};
    this.surveys.push(survey);
  }

}

// task: implement service for surveys and drop 2way binding
