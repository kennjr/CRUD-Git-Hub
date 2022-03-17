import { Component, OnInit } from '@angular/core';
import { faArrowLeft, faHeart } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-repo-view',
  templateUrl: './repo-view.component.html',
  styleUrls: ['./repo-view.component.css']
})
export class RepoViewComponent implements OnInit {

  faArrow = faArrowLeft;
  faHeart = faHeart;

  constructor() { }

  ngOnInit(): void {
  }

}
