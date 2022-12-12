import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../../auth/auth.service';

import { Survey } from '../survey.model';
import { SurveysService } from '../surveys.service';

@Component({
  selector: 'app-survey-list',
  templateUrl: './survey-list.component.html',
  styleUrls: ['./survey-list.component.css'],
})
export class SurveyListComponent implements OnInit, OnDestroy {
  surveys: Survey[] = [];
  private surveysSub: Subscription;
  isLoading: boolean = false;
  private authStatusSub: Subscription;
  public userIsAuthenticated = false;

  constructor(private surveysService: SurveysService, private authService: AuthService) {}
  ngOnInit(): void {
    this.isLoading = true;
    this.surveysService.getSurveys();
    this.surveysSub = this.surveysService
      .getSurveyUpdateListener()
      .subscribe((surveys: Survey[]) => {
        this.isLoading = false;
        this.surveys = surveys;
      });
    this.userIsAuthenticated = this.authService.getIsAuthenticated();
    this.authStatusSub = this.authService.getAuthStatusListener().subscribe(isAuthenticated => {
      this.userIsAuthenticated = isAuthenticated;
    });
  }

  // unsubscribe from the observable if the component is destroyed
  // prevents memory leaks
  ngOnDestroy(): void {
    this.surveysSub.unsubscribe();
    this.authStatusSub.unsubscribe();
  }

  onDelete(surveyId: string) {
    this.surveysService.deleteSurvey(surveyId);
  }

  // posts = [
  //   {title: 'First Post', content: 'This is the first post\'s content'},
  //   {title: 'Second Post', content: 'This is the second post\'s content'},
  //   {title: 'Third Post', content: 'This is the third post\'s content'}
  // ]
}
