import { Injectable } from '@angular/core';
import { Survey } from './survey.model';

@Injectable({providedIn: 'root'})
export class SurveysService {
  private surveys: Survey[] = [];

  getSurveys(){
    //return [...this.surveys];
    return this.surveys;
  }
  // numberOfQuestions: this must be changed to an array of the questions later
  addSurvey(surveyName: string, organization: string, description: string, numberOfQuestions: string){
    const survey: Survey = {surveyName: surveyName, organization: organization, description: description, questions: numberOfQuestions};
    this.surveys.push(survey);
  }

}

// task: implement service for surveys and drop 2way binding
