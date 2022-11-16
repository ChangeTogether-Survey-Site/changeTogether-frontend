import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";

import { Survey } from "../survey.model";
import { SurveysService } from "../surveys.service";

@Component({
  selector: 'app-survey-list',
  templateUrl: './survey-list.component.html',
  styleUrls: ['./survey-list.component.css']
})
export class SurveyListComponent implements OnInit, OnDestroy{
  surveys: Survey[] = [];
  private surveysSub: Subscription;

  constructor(private surveysService: SurveysService){}
  ngOnInit(): void {
    this.surveysService.getSurveys();
    this.surveysSub = this.surveysService.getSurveyUpdateListener().subscribe((surveys: Survey[])=>{
      this.surveys = surveys;
    });
  }

  // unsubscribe from the observable if the component is destroyed
  // prevents memory leaks
  ngOnDestroy(): void {
    this.surveysSub.unsubscribe();
  }

  onDelete(surveyId: string){
    this.surveysService.deleteSurvey(surveyId);
  }

  // posts = [
  //   {title: 'First Post', content: 'This is the first post\'s content'},
  //   {title: 'Second Post', content: 'This is the second post\'s content'},
  //   {title: 'Third Post', content: 'This is the third post\'s content'}
  // ]
}
