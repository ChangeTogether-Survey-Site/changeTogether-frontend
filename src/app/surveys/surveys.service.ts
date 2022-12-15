import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';

import { Survey } from './survey.model';
import { environment } from '../../environments/environment';

const BACKEND_URL = environment.apiUrl;

@Injectable({providedIn: 'root'})
export class SurveysService {
  private surveys: Survey[] = [];
  private surveysUpdated = new Subject<Survey[]>();

  // inject the http module
constructor(private http: HttpClient, private router: Router) {}

  getSurveys(){
    // request to the api (the type is the same as the output from server)
    this.http.get<{message: string, surveys: any}>(BACKEND_URL + '/surveys')
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

  getSurvey(id: string){
    console.log(`getSurvey id: ${id}`);
    return this.http.get<{_id: string, surveyName: string, organization: string, description: string, questions: string}>
      (BACKEND_URL + '/surveys/' + id);
    //return {...this.surveys.find(s => s.id === id)}
  }

  //

  // numberOfQuestions: this must be changed to an array of the questions later
  addSurvey(surveyName: string, organization: string, description: string, numberOfQuestions: string){
    const survey: Survey = {id: null!, surveyName: surveyName, organization: organization, description: description, questions: numberOfQuestions};
    this.http
    .post<{ message: string, surveyId: string }>(BACKEND_URL + '/surveys', survey)
      .subscribe( (responseData)=>{
        const responseId = responseData.surveyId; // get the id from the response
        survey.id = responseId;
        console.log(`created a survey`);
        this.surveys.push(survey);
        this.surveysUpdated.next([...this.surveys]);
        this.router.navigate(["/"])
      });
  }

  updateSurvey(id: string, surveyName: string, organization: string,
    description: string, numberOfQuestions: string){
      const survey: Survey = { id: id, surveyName: surveyName, organization: organization,
        description: description, questions: numberOfQuestions };
      this.http.put(BACKEND_URL + "/surveys/" + id, survey)
      .subscribe(response => {
        const updatedSurveys = [...this.surveys];
        const oldSurveyIndex = updatedSurveys.findIndex(s => s.id === survey.id);
        updatedSurveys[oldSurveyIndex] = survey;
        this.surveys = updatedSurveys;
        this.surveysUpdated.next([...this.surveys]);
        this.router.navigate(["/"])
      });
    }

  deleteSurvey(surveyId: string){
    this.http.delete(BACKEND_URL + "/surveys/" + surveyId)
    .subscribe( () => {
      console.log('Deleted!');
      const updatedSurveys = this.surveys.filter(survey => survey.id !== surveyId);
      this.surveys = updatedSurveys;
      this.surveysUpdated.next([...this.surveys]);
    });
  }
}



// task: implement service for surveys and drop 2way binding
