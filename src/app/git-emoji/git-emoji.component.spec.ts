import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GitEmojiComponent } from './git-emoji.component';

describe('GitEmojiComponent', () => {
  let component: GitEmojiComponent;
  let fixture: ComponentFixture<GitEmojiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GitEmojiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GitEmojiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
