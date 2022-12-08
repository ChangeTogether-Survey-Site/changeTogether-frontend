import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { SurveyListComponent } from "./surveys/survey-list/survey-list.component";
import { SurveyCreateComponent } from "./surveys/survey-create/survey-create.component";
import { LoginComponent } from "./auth/login/login.component";

const routes: Routes = [
  { path: "", component: SurveyListComponent },
  { path: "create", component: SurveyCreateComponent },
  { path: "edit/:surveyId", component: SurveyCreateComponent },
  { path: "login", component: LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
