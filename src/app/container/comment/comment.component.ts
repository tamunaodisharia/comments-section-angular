import { Component, Input, OnInit } from '@angular/core';

import { DataService } from '../../services/data.service';
import { CommentsService } from '../../services/comments.service';
export interface Comment {
  id: string;
  content: string;
  createdAt: string;
  score: number;
  user: {
    image: {
      png: string;
      webp: string;
    };
    username: string;
  };
  replies: any[];
}
@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss'],
})
export class CommentComponent implements OnInit {
  @Input() comment!: Comment;

  comments = this.dataService.comments;
  currentUser = this.dataService.currentUser;

  toggleEdit = false;
  toggleReply = false;

  constructor(
    private dataService: DataService,
    private commentsService: CommentsService
  ) {
    this.comments.sort((a: { score: number }, b: { score: number }) =>
      a.score < b.score ? 1 : -1
    );

    this.comments.forEach((element: { replies: { score: number }[] }) => {
      if (element.replies.length) {
        element.replies.sort((a: { score: number }, b: { score: number }) =>
          a.score < b.score ? 1 : -1
        );
      }
    });
  }

  ngOnInit(): void {}

  upvoteComment(comment: Comment) {
    this.commentsService.upvoteComment(comment);
  }
  downvoteComment(comment: Comment) {
    this.commentsService.downvoteComment(comment);
  }
  replyToComment(comment: Comment) {
    this.toggleReply = true;
  }
  editComment(comment: Comment) {
    this.toggleEdit = true;
  }
  deleteComment(comment: Comment) {
    this.commentsService.deleteComment(comment);
  }
}
