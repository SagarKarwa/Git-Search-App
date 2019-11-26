import { Component, OnInit } from '@angular/core';
import { GitSearchService } from '../git-search.service';
import {GitUsers} from '../git-users'
import { ActivatedRoute, Router, ParamMap } from '@angular/router';

@Component({
  selector: 'app-git-users',
  templateUrl: './git-users.component.html',
  styleUrls: ['./git-users.component.css']
})

export class GitUsersComponent implements OnInit {
  searchResults : GitUsers;
  searchQuery : string;
  title : string;
  displayQuery : string;

  constructor(private GitSearchService : GitSearchService,
              private route : ActivatedRoute,
              private router : Router ) { }

  ngOnInit(){

    this.route.paramMap.subscribe((params : ParamMap) => {
      this.searchQuery = params.get('query');
      this.displayQuery = params.get('query');
      this.gitUsers();
    })

    this.route.data.subscribe((result) => {
      this.title = result.title;
    })
  }

  gitUsers = () => {
    
    this.GitSearchService.gitUsers(this.searchQuery).then(
      (response) => {
        this.searchResults = response;
      },
      (error) => {
        alert("Error : " + error.statusText)
      }
    )
  }

  sendQuery = () => {
    this.searchResults = null;
    this.router.navigate(['/users/' + this.searchQuery])
  }

  onKeyDown = (event) => {
    if (event.keyCode === 13)this.sendQuery();
  }

}
