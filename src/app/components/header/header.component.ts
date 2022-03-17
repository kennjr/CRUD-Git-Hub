import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { faFilter , faTimes, faHeart, faLanguage} from '@fortawesome/free-solid-svg-icons';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';

import { SearchService } from 'src/app/services/search.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  providers: [Location, {provide: LocationStrategy, useClass: PathLocationStrategy}]
})
export class HeaderComponent implements OnInit {

  faArrow = faArrowLeft;
  faFilter = faFilter;
  faTimes = faTimes;
  faHeart = faHeart;
  faTags = faLanguage;

  showFilterOptions = false;
  searchType = "Repos"

  searchString = "";

  constructor(private router:Router, private searchservice: SearchService, private location: Location) { }

  ngOnInit(): void {
    this.makeSearchDataRequest()
  }

  hasRoute(route: string){
    return this.router.url === route;
  }

  navigateBack(){
    this.goBack()
  }

  // For making the search request based on the searchstring
  makeSearchDataRequest(){
    if(this.searchString !== "" && (this.searchType === "Users" || this.searchType === "Repos")){
      this.searchservice.makeSearchRequest(this.searchString)
    }
  }

  showFitlerOptions(){
    this.showFilterOptions = !this.showFilterOptions
  }

  changeSearchType (newType: string){
    if(newType == "Users" || newType == "Repos"){
      this.searchType = newType;
      this.searchservice.updateSearchType(newType)
    }
  }

  goBack() {
    this.location.back();
  }
  
}
