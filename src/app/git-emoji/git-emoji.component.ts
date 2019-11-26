import { Component, OnInit } from '@angular/core';
import { GitSearchService } from '../git-search.service';

@Component({
  selector: 'app-git-emoji',
  templateUrl: './git-emoji.component.html',
  styleUrls: ['./git-emoji.component.css']
})
export class GitEmojiComponent implements OnInit {

  constructor(private GitSearchService : GitSearchService) { }
  searchResults : any;
  ngOnInit() {
    this.gitEmoji();
  }

  gitEmoji = () => {
    
    this.GitSearchService.gitEmoji().then(
      (response) => {
        this.searchResults = response;
      },
      (error) => {
        alert("Error : " + error.statusText)
      }
    )
  }

}
