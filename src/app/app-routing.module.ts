import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { SurveyListComponent } from "./surveys/survey-list/survey-list.component";
import { SurveyCreateComponent } from "./surveys/survey-create/survey-create.component";

const routes: Routes = [
  { path: "", component: SurveyListComponent },
  { path: "create", component: SurveyCreateComponent },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
