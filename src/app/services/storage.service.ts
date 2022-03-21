import { Injectable } from '@angular/core';
import * as data from '../data.json';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  constructor() {}

  pushToStorage() {
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
}
