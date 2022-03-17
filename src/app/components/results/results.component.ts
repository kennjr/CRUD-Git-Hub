import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SearchService } from 'src/app/services/search.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})
export class ResultsComponent implements OnInit, OnDestroy {

  searchResults:any[] = []
  searchType: string = "Repos";
  message = "";
  search = "";

  constructor(private searchservice :SearchService, private router: Router) { }

  ngOnInit(): void {
    this.getSearchResults();
    this.getMyData();
    this.getSearchType();
    this.getMessage()
    this.searchservice.makeSearchRequest("angular")
  }

  subscription!: Subscription;
  searchTypeSub!: Subscription;
  messageSub!: Subscription;

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.searchTypeSub.unsubscribe();
    this.messageSub.unsubscribe();
    // throw new Error('Method not implemented.');
  }

  getSearchResults (){
    console.log("The search type is running")
    this.subscription = this.searchservice.getSearchResults().subscribe((response : any) => {
      this.searchResults = response;
    })
  }

  getMyData (){
    this.searchservice.getMyData("joymush")
  }

  navigateToDetailsView(user: any){
    this.router.navigate(['/users', user.api_url]);
  }

  getSearchType (){
    this.searchTypeSub = this.searchservice.getExternalSearchType().subscribe((type:any) => {
      // console.log("The type has changed " + type);
      if(type != ""){
        this.searchType = type;
        this.searchResults = []
        // console.log("The type has changed confirm" + this.searchType);
      }
    })
  }

  getMessage(){
    this.messageSub = this.searchservice.getMessageFromServer().subscribe((message) => {
      this.message = message;
      console.log("The message is " + this.message);
    })
  }

}
