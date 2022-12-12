import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { SurveyListComponent } from "./surveys/survey-list/survey-list.component";
import { SurveyCreateComponent } from "./surveys/survey-create/survey-create.component";
import { LoginComponent } from "./auth/login/login.component";
import { SignupComponent } from "./auth/signup/signup.component";
import { AuthGuard } from "./auth/auth.guard";

const routes: Routes = [
  { path: "", component: SurveyListComponent },
  { path: "create", component: SurveyCreateComponent, canActivate: [AuthGuard] },
  { path: "edit/:surveyId", component: SurveyCreateComponent, canActivate: [AuthGuard] },
  { path: "login", component: LoginComponent},
  { path: "signup", component: SignupComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule {}
