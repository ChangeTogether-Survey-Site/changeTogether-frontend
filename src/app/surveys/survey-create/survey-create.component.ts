import { Component } from "@angular/core";

@Component({
  selector: 'app-survey-create',
  templateUrl: './survey-create.component.html'
})
export class SurveyCreateComponent {
  onAddSurvey(){
    alert('Survey added!');

  }
}
