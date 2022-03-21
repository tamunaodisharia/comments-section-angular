import { Component } from '@angular/core';

import { StorageService } from './services/storage.service';
import { DataService } from './services/data.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  currentUser = this.dataService.currentUser;

  constructor(
    private storageService: StorageService,
    private dataService: DataService
  ) {}

  ngOnInit() {
    this.storageService.pushToStorage();
  }
}
