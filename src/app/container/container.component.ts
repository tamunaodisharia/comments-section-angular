import { Component, OnInit } from '@angular/core';

import { DataService } from '../services/data.service';

@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.scss'],
})
export class ContainerComponent implements OnInit {
  constructor(private dataService: DataService) {}

  comments = this.dataService.comments.sort(
    (a: { score: number }, b: { score: number }) => (a.score < b.score ? 1 : -1)
  );

  ngOnInit(): void {}
}
