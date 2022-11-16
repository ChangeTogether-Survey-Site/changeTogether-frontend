import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';

import { Survey } from './survey.model';

@Injectable({providedIn: 'root'})
export class SurveysService {
  private surveys: Survey[] = [];
  private surveysUpdated = new Subject<Survey[]>();

  // inject the http module
constructor(private http: HttpClient) {}

  getSurveys(){
    // request to the api (the type is the same as the output from server)
    this.http.get<{message: string, surveys: any}>('http://localhost:3500/api/surveys')
    .pipe(map( (surveyData) => {
      return surveyData.surveys.map( survey => {
        return {
          surveyName: survey.surveyName,
          organization: survey.organization,
          description: survey.description,
          questions: survey.questions,
          id: survey._id
        }; // using js map inside map function to change _id to id
      });
    } ))
    .subscribe( transformedSurveys=>{
      // get the response
      this.surveys = transformedSurveys;
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
    this.http.post<{message: string}>('http://localhost:3500/api/surveys', survey)
      .subscribe( (responseData)=>{
        console.log(responseData.message)
        this.surveys.push(survey);
        this.surveysUpdated.next([...this.surveys]);
      });
  }

  deleteSurvey(surveyId: string){
    this.http.delete("http://localhost:3500/api/surveys/" + surveyId)
    .subscribe( () => {
      console.log('Deleted!');
      const updatedSurveys = this.surveys.filter(survey => survey.id !== surveyId);
      this.surveys = updatedSurveys;
      this.surveysUpdated.next([...this.surveys]);
    });
  }
}



// task: implement service for surveys and drop 2way binding
