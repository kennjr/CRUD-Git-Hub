import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { BehaviorSubject, lastValueFrom } from 'rxjs';

const httpOptions = {
  headers : new HttpHeaders({
    "Authorization": environment.access_token
  })
}

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor(private httpClient: HttpClient) { }

  searchType:string = "Repos";
  externalSearchType = new BehaviorSubject<any>("")
  resultsList = new BehaviorSubject<any>([]);
  resultsCount = new BehaviorSubject<any>(0);
  currentUserData = new BehaviorSubject<any>({})

  messageFromServer = new BehaviorSubject<any>("")

  makeSearchRequest (searchstring :string){
    this.messageFromServer.next("Loading...")
    let url = this.createSearchUrl("angular")
    if(url != ""){

      lastValueFrom(this.httpClient
        .get(url, httpOptions)
      ).then((response: any) => {
        // Success
        this.messageFromServer.next("")
        console.log("The promise was a success")
        this.resultsCount.next(response.total_count)
        this.resultsList.next(response.items);
      },err => {
        this.messageFromServer.next("An error ocurred " + err.toString())
      });
        

      // this.httpClient.get(url, httpOptions).subscribe((response :any) => {
      //   // if(!response.incomplete_results){
          
      //   // }
        
      // })
    }
  }

  createSearchUrl (searchstring :string): string{
    let trimmedSearchString = searchstring.trim()
    let searchUrl = "";
    if(this.searchType === "Users"){
      searchUrl = `https://api.github.com/search/users?q=${trimmedSearchString}`;
    }else if(this.searchType === "Repos"){
      searchUrl = `https://api.github.com/search/repositories?q=${trimmedSearchString}`;
    }    
    return searchUrl;
  }

  getSearchResults (){
    return this.resultsList.asObservable()
  }

  getResultsCount (){
    return this.resultsCount.asObservable()
  }

  updateSearchType(newType :string){
    this.searchType = newType
    this.externalSearchType.next(newType);
  }

  getExternalSearchType (){
    // return of(this.searchType);
    return this.externalSearchType.asObservable();
  }

  getMessageFromServer (){
    // return of(this.searchType);
    return this.messageFromServer.asObservable();
  }
  
  getMyData (gh_username:string){
    this.messageFromServer.next("Loading...")
    let url = `https://api.github.com/users/${gh_username}`
    if(url != ""){

      lastValueFrom(this.httpClient
        .get(url, httpOptions)
      ).then((response: any) => {
        // Success
        this.messageFromServer.next("")
        console.log("The promise was a success")

        this.resultsList.next([response]);
      },err => {
        this.messageFromServer.next("An error ocurred " + err.toString())
      });
        

      // this.httpClient.get(url, httpOptions).subscribe((response :any) => {
      //   // if(!response.incomplete_results){
          
      //   // }
        
      // })
    }
  }

  getCurrentUserData (gh_username:string){
    this.messageFromServer.next("Loading...")
    let url = `https://api.github.com/users/${gh_username}`
    if(url != ""){

      lastValueFrom(this.httpClient
        .get(url, httpOptions)
      ).then((response: any) => {
        // Success
        this.messageFromServer.next("")
        console.log("The promise was a ", {response})

        this.currentUserData.next(response);
      },err => {
        this.messageFromServer.next("An error ocurred " + err.toString())
      });
    }
  }

}
