import { Component, Input, OnInit } from '@angular/core';

import { DataService } from '../../services/data.service';

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
  replies: [];
}
@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss'],
})
export class CommentComponent implements OnInit {
  @Input() comment!: Comment;

  currentUser = this.dataService.currentUser;

  constructor(private dataService: DataService) {}

  ngOnInit(): void {}
}
