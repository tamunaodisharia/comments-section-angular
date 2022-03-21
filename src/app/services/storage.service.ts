import { Injectable } from '@angular/core';

import * as data from '../data.json';
import { DataService } from '../services/data.service';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  constructor(private dataService: DataService) {}

  pushToStorage() {
    localStorage.clear();
    if (localStorage.getItem('comments')) {
    } else {
      for (let key in data) {
        localStorage.setItem(
          key,
          JSON.stringify(data[key as keyof typeof data])
        );
      }
    }
  }
  addChangesToStorage() {
    if (localStorage.getItem('comments')) {
      localStorage.setItem(
        'comments',
        JSON.stringify(this.dataService.comments)
      );
    }
  }
}
