import { Component, Input } from "@angular/core";

import { Survey } from "../survey.model";
import { SurveysService } from "../surveys.service";

@Component({
  selector: 'app-survey-list',
  templateUrl: './survey-list.component.html',
  styleUrls: ['./survey-list.component.css']
})
export class SurveyListComponent {
  @Input() surveys: Survey[] = [];

  constructor(public surveysService: SurveysService){}

  // posts = [
  //   {title: 'First Post', content: 'This is the first post\'s content'},
  //   {title: 'Second Post', content: 'This is the second post\'s content'},
  //   {title: 'Third Post', content: 'This is the third post\'s content'}
  // ]
}
