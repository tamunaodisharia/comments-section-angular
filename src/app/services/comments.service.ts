import { Injectable } from '@angular/core';

import { Comment } from '../container/comment/comment.component';

import { DataService } from '../services/data.service';
import { StorageService } from '../services/storage.service';

@Injectable({
  providedIn: 'root',
})
export class CommentsService {
  currentUser = this.dataService.currentUser;
  comments = this.dataService.comments;

  constructor(
    private dataService: DataService,
    private storageService: StorageService
  ) {}

  upvoteComment(comment: Comment) {
    comment.score++;
    this.storageService.addChangesToStorage();
  }

  downvoteComment(comment: Comment) {
    comment.score--;
    this.storageService.addChangesToStorage();
  }

  deleteComment(comment: Comment) {
    //check first level
    const findComment = this.comments.find(
      (item: { id: any }) => item.id == comment.id
    );
    //if not on first level
    if (!findComment) {
      let temp;
      this.comments.forEach((obj: { id: any; replies: any[] }) => {
        if (obj.replies.length) {
          obj.replies.forEach((el, index) => {
            if (el.id == comment.id) {
              obj.replies.splice(index, 1);
            } else {
              temp = el.replies.find(
                (element: { id: any }) => element.id == comment.id
              );
              if (temp) {
                //if the comment is located on the 3rd level, get the index from the array and remove it
                index = el.replies.indexOf(temp);
                el.replies.splice(index, 1);
              }
            }
          });
        }
      });
      this.storageService.addChangesToStorage();
      return;
    }
    const index = this.comments.indexOf(findComment);
    this.comments.splice(index, 1);
    this.storageService.addChangesToStorage();
  }

  updateComment(comment: Comment, value: string) {
    comment.content = value;
    this.storageService.addChangesToStorage();
  }

  addComment(comment: Comment, value: string, reply: boolean) {
    let id = this.dataService.calculateLength() + 1;
    if (reply) {
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
    } else {
      this.comments.push({
        id: id,
        content: value,
        createdAt: '1 sec ago',
        score: 0,
        user: {
          image: {
            png: this.currentUser.image.png,
            webp: this.currentUser.image.webp,
          },
          username: this.currentUser.username,
        },
        replies: [],
      });
    }
    this.storageService.addChangesToStorage();
  }
}
