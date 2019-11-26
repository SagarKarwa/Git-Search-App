import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { GitSearch } from '../git-search';

@Component({
  selector: 'app-code-display',
  templateUrl: './code-display.component.html',
  styleUrls: ['./code-display.component.css']
})
export class CodeDisplayComponent implements OnInit {

  @Input() searchResults : GitSearch;
  @Input() favorites: Array<number>;
  @Output() updateFavorites = new EventEmitter<string>();
  @Output() removeFavorites = new EventEmitter<string>();

  constructor() { }

  ngOnInit() {
  }

  addFavorite = (item) =>{
    this.updateFavorites.emit(item.repository.id);
  }

  removeFavorite = (item) =>{
    this.removeFavorites.emit(item.repository.id);
  }

  checkFavorite = (item) => {
    return this.favorites.indexOf(item.repository.id) > -1;
  }
}
