import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

import { HttpClientModule } from '@angular/common/http';
import {GitSearchService} from './git-search.service';
import { GitSearchComponent } from './git-search/git-search.component';

import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HomePageComponent } from './home-page/home-page.component';
import { NotFoundComponent } from './not-found/not-found.component'

import { RouterModule, Routes } from '@angular/router';
import { UsersComponent } from './users/users.component';
import { GitUsersComponent } from './git-users/git-users.component';
import { GitEmojiComponent } from './git-emoji/git-emoji.component';
import { EmojiComponent } from './emoji/emoji.component';
import { NoSpecialCharsDirective } from './no-special-chars.directive';
import { GitCodeSearchService } from './git-code-search.service';
import { UnifiedSearchService } from './unified-search.service';
import { RepositoryDisplayComponent } from './repository-display/repository-display.component';
import { CodeDisplayComponent } from './code-display/code-display.component';
import { FadeDirective } from './fade.directive';
import { FavoriteTextPipe } from './favorite-text.pipe';

const appRoutes: Routes = [
  {path : '', component : HomePageComponent},
  {path : 'search', pathMatch : 'full' , redirectTo : '/search/angular'},
  {path : 'search/:query', component : GitSearchComponent, data : { title : 'Git Search'}},
  {path : 'users', pathMatch : 'full' , redirectTo : '/users/tom'},
  {path : 'users/:query', component : GitUsersComponent, data : { title : 'Git Users Search'}},
  {path : 'emoji', component : GitEmojiComponent},
  {path : '**', component : NotFoundComponent }
 
];

@NgModule({
  declarations: [
    AppComponent,
    GitSearchComponent,
    HomePageComponent,
    NotFoundComponent,
    UsersComponent,
    GitUsersComponent,
    GitEmojiComponent,
    EmojiComponent,
    NoSpecialCharsDirective,
    RepositoryDisplayComponent,
    CodeDisplayComponent,
    FadeDirective,
    FavoriteTextPipe
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [GitSearchService, GitCodeSearchService, UnifiedSearchService],
  bootstrap: [AppComponent]
})
export class AppModule { }
