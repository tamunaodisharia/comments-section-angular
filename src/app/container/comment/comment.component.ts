import { Component, Input, OnInit } from '@angular/core';

import { DataService } from '../../services/data.service';
import { StorageService } from '../../services/storage.service';
interface Comment {
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
  toggleEdit: boolean = false;
  toggleReply: boolean = false;

  constructor(
    private dataService: DataService,
    private storageService: StorageService
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
    comment.score++;
    this.storageService.addChangesToStorage();
  }
  downvoteComment(comment: Comment) {
    comment.score--;
    this.storageService.addChangesToStorage();
  }

  deleteComment(comment: Comment) {
    this.comments = this.comments.filter(
      (item: { id: any }) => item.id !== comment.id
    );
    this.comments.forEach((element: { replies: any[] }) => {
      if (element.replies.length) {
        element.replies = element.replies.filter(
          (item: { id: any }) => item.id !== comment.id
        );
      }
    });
    this.storageService.addChangesToStorage();
  }
  editComment(comment: Comment) {
    this.toggleEdit = true;
  }
  updateComment(comment: Comment, value: string) {
    comment.content = value;
    this.toggleEdit = false;
    this.storageService.addChangesToStorage();
  }
  replyToComment(comment: Comment) {
    this.toggleReply = true;
  }
  addComment(comment: Comment, value: string) {
    let id = this.dataService.calculateLength() + 1;
    console.log(value);
    comment.replies.push({
      id: id,
      content: value,
      createdAt: '1 sec ago',
      score: 0,
      replyingTo: comment.user.username,
      user: {
        image: {
          png: this.currentUser.image.png,
          webp: this.currentUser.image.webp,
        },
        username: this.currentUser.username,
      },
      replies: [],
    });
    this.toggleReply = false;
    this.storageService.addChangesToStorage();
    console.log(this.currentUser.user);
  }
}
