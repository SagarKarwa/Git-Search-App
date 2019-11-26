import { Injectable } from '@angular/core';
import { UnifiedSearch } from './unified-search';
import { Observable } from 'rxjs';
import { forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';
import { GitSearchService } from './git-search.service';
import { GitCodeSearchService } from './git-code-search.service';
import { GitSearch } from './git-search';
import { GitCodeSearch } from './git-code-search';

@Injectable({
  providedIn: 'root'
})
export class UnifiedSearchService {

  constructor(
    private searchService: GitSearchService,
    private codeSearchService: GitCodeSearchService
  ) { }

  unifiedSearch : Function = (query:string):Observable<UnifiedSearch> => {
    return forkJoin(this.searchService.gitSearch(query), this.codeSearchService.codeSearch(query)).map(
      (response : [GitSearch, GitCodeSearch]) => {
        return {
          'repositories':response[0],
          'code' : response[1]
        }
      }
    )
  }
}
