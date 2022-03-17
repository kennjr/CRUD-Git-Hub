import { Component, OnInit, Input } from '@angular/core';
import { faHeart } from '@fortawesome/free-regular-svg-icons';

@Component({
  selector: 'app-repo-item',
  templateUrl: './repo-item.component.html',
  styleUrls: ['./repo-item.component.css']
})
export class RepoItemComponent implements OnInit {

  faHeart = faHeart;

  @Input() repo!:any;

  constructor() { }

  ngOnInit(): void {
  } 

  goToLink(){
    window.open(this.repo.html_url, "_blank");
  }

}
