import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ContainerComponent } from './container/container.component';
import { CommentComponent } from './container/comment/comment.component';
import { AddCommentComponent } from './container/add-comment/add-comment.component';
@NgModule({
  declarations: [
    AppComponent,
    ContainerComponent,
    CommentComponent,
    AddCommentComponent,
  ],
  imports: [BrowserModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
