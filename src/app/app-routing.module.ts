import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { SurveyListComponent } from "./surveys/survey-list/survey-list.component";
import { SurveyCreateComponent } from "./surveys/survey-create/survey-create.component";
import { LoginComponent } from "./auth/login/login.component";
import { SignupComponent } from "./auth/signup/signup.component";
import { ContactComponent } from "./contact/contact.component";
import { AuthGuard } from "./auth/auth.guard";
import { AboutComponent } from "./about/about.component";

const routes: Routes = [
  { path: "", component: SurveyListComponent },
  { path: "create", component: SurveyCreateComponent, canActivate: [AuthGuard] },
  { path: "edit/:surveyId", component: SurveyCreateComponent, canActivate: [AuthGuard] },
  { path: "login", component: LoginComponent},
  { path: "signup", component: SignupComponent},
  { path: "contact", component: ContactComponent},
  { path: "about", component: AboutComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule {}
