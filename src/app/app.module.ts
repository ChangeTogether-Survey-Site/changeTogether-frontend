import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { SurveyCreateComponent} from './surveys/survey-create/survey-create.component';

@NgModule({
  declarations: [
    AppComponent,
    SurveyCreateComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
