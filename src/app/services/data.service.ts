import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor() {}

  private storageComments = localStorage.getItem('comments');
  private storageCurrentUser = localStorage.getItem('currentUser');

  comments =
    this.storageComments !== null ? JSON.parse(this.storageComments) : {};

  currentUser =
    this.storageCurrentUser !== null ? JSON.parse(this.storageCurrentUser) : {};

  sortData() {
    this.comments.sort((a: { score: number }, b: { score: number }) =>
      a.score < b.score ? 1 : -1
    );
  }
  calculateLength() {
    let length = this.comments.reduce(
      (previousValue: any, currentValue: any) =>
        previousValue +
        currentValue.replies.length +
        currentValue.replies.reduce(
          (previousValue: any, currentValue: any) =>
            previousValue + currentValue.replies.length,
          0
        ),
      0
    );
    length += this.comments.length;
    return length;
  }
}
