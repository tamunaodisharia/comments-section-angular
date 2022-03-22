import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { CommentsService } from 'src/app/services/comments.service';

import { DataService } from '../../services/data.service';
import { Comment } from '../comment/comment.component';

@Component({
  selector: 'app-add-comment',
  templateUrl: './add-comment.component.html',
  styleUrls: ['./add-comment.component.scss'],
})
export class AddCommentComponent implements OnInit {
  @Input() comment!: Comment;
  @Input() toggleReply!: boolean;
  @Input() toggleEdit!: boolean;

  @Output() toggleReplyChange = new EventEmitter<boolean>();
  @Output() toggleEditChange = new EventEmitter<boolean>();

  currentUser = this.dataService.currentUser;

  constructor(
    private dataService: DataService,
    private commentsService: CommentsService
  ) {}

  ngOnInit(): void {}

  updateComment(comment: Comment, text: string) {
    this.commentsService.updateComment(comment, text);
    this.toggleEditChange.emit(false);
  }
  addComment(comment: Comment, text: string) {
    this.commentsService.addComment(comment, text, this.toggleReply);
    if (this.toggleReply) {
      this.toggleReplyChange.emit(false);
    }
  }
}
