import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { Survey } from './survey.model';

@Injectable({providedIn: 'root'})
export class SurveysService {
  private surveys: Survey[] = [];
  private surveysUpdated = new Subject<Survey[]>();

  // inject the http module
constructor(private http: HttpClient) {}

  getSurveys(){
    // request to the api (the type is the same as the output from server)
    this.http.get<{message: string, surveys: Survey[]}>('http://localhost:5000/api/surveys')
    .subscribe( (surveysData)=>{
      // get the response
      this.surveys = surveysData.surveys;
      // send the response to the listener
      this.surveysUpdated.next([...this.surveys]);
    } );

    // for mockup request to an object
    // return [...this.surveys];
  }

  getSurveyUpdateListener() {
    return this.surveysUpdated.asObservable();
  }

  // numberOfQuestions: this must be changed to an array of the questions later
  addSurvey(surveyName: string, organization: string, description: string, numberOfQuestions: string){
    const survey: Survey = {id: null, surveyName: surveyName, organization: organization, description: description, questions: numberOfQuestions};
    this.surveys.push(survey);
    this.surveysUpdated.next([...this.surveys]);
  }

}

// task: implement service for surveys and drop 2way binding
