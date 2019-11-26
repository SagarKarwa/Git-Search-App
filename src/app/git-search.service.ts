import { Injectable } from '@angular/core';
import { GitSearch } from './git-search';
import {GitUsers} from './git-users';
import { resolve } from 'url';
import { reject } from 'q';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { map,publishReplay } from 'rxjs/operators';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/publishReplay';

@Injectable({
  providedIn: 'root'
})
export class GitSearchService {
  cachedValue : string;
  cachedValuesUsers : Array<{
    [query : string] : GitUsers
  }> = [];

  search:Observable<GitSearch>;

  constructor(private http : HttpClient) {
    this.http = http;
   }

  gitSearch = (query : string): Observable<GitSearch> => {
    //Code written using Promises
    // this.search = new Promise<GitSearch>((resolve,reject) => {
    //   if(this.cachedValues[query]){
    //     resolve(this.cachedValues[query])
    //   }
    //   else{
    //     this.http.get('https://api.github.com/search/repositories?q=' + query)
    //     .toPromise()
    //     .then((response) => {
    //       resolve(response as GitSearch);
    //     }, (error) => {
    //       reject(error);
    //     })
    //   }
    // })

    //Code written using Observables
    if(!this.search){
      this.search = this.http.get<GitSearch>('https://api.github.com/search/repositories?q=' + query).publishReplay(1).refCount()
      this.cachedValue = query;
    }
    else if(this.cachedValue !== query){
      this.search = null;
      this.gitSearch(query);
    }
    return this.search;
  }

  gitUsers = (query : string): Promise<GitUsers> =>{
    let promise = new Promise<GitUsers>((resolve,reject) => {
      if(this.cachedValuesUsers[query]){
        resolve(this.cachedValuesUsers[query]);
      }
      else{
        this.http.get("https://api.github.com/search/users?q="+ query)
        .toPromise()
        .then((response) => {
          resolve(response as GitUsers);
        },
        (error) => {
          reject(error);
        })
      }
    })
    return promise;
  }

  gitEmoji = () =>{
    let promise = new Promise((resolve,reject) => {
        this.http.get("https://api.github.com/emojis")
        .toPromise()
        .then((response) => {
          var i = 0;
          var result = Object.keys(response).map(function(key) {
            ++i;
            if(i < 50){
              return [key, response[key]];
            }
            
          });
          resolve(result);
        },
        (error) => {
          reject(error);
        })
    })
    return promise;
  }
}
