import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { MatInputModule } from '@angular/material/input';

import { AppComponent } from './app.component';
import { SurveyCreateComponent } from './surveys/survey-create/survey-create.component';
import { PostCreateComponent } from './posts/post-create/post-create.component';

@NgModule({
  declarations: [
    AppComponent,
    SurveyCreateComponent,
    PostCreateComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    MatInputModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
