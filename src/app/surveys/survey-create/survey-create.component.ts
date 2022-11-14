import { Component, EventEmitter, Output } from "@angular/core";
import { Survey } from "../survey.model";

@Component({
  selector: 'app-survey-create',
  templateUrl: './survey-create.component.html',
  styleUrls: ['./survey-create.component.css']
})
export class SurveyCreateComponent {

  // post data
  enteredSurveyName = '';
  enteredOrganization = '';
  enteredDescription = '';
  enteredQuestions = '';
  // event
  @Output() surveyCreated = new EventEmitter<Survey>();

  onAddSurvey() {
    const survey: Survey = {
      surveyName: this.enteredSurveyName,
      organization: this.enteredOrganization,
      description: this.enteredDescription,
      questions: this.enteredQuestions
    };
    this.surveyCreated.emit(survey);
}
}
