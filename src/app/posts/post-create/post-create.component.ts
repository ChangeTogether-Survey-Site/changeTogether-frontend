import { Component } from "@angular/core";

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html'
})
export class PostCreateComponent {
  newPost = 'edit this text';
  enteredValue = '';
  onAddPost(postInput: HTMLTextAreaElement) {
    this.newPost = postInput.value;
    console.log(postInput);
  }
  onAddPost2() {
    this.newPost = this.enteredValue;
  }
}
