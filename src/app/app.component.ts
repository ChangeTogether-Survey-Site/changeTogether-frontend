import { Component } from '@angular/core';

// model
import { Post } from  './posts/post.model';
import { Survey } from './surveys/survey.model'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  storedPosts: Post[] = [];
  storedSurveys: Survey[] = [];

  onPostAdded(post){
    this.storedPosts.push(post);
  }
  onSurveyAdded(survey){
    this.storedSurveys.push(survey);
  }
}
