import { Component } from '@angular/core';
import { HomepageService } from '../../services/homepage.service';
import { GitService } from '../../services/git.service';
import { HttpClient } from '@angular/common/http';
import { OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Repo } from '../../models/repo';
import { BookmarkService } from '../../services/bookmark.service';
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-gitpage',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './gitpage.component.html',
  styleUrl: './gitpage.component.scss',
})
export class GitpageComponent {
  gitUsers: string[] = [];
  gitProfile: any = null;
  gitRepos: any[] = [];
  filteredUsers: string[] = [];
  username: string = '';
  searchInput = new FormControl('', Validators.required);
  bookmarked :boolean = false;
  bookmarkedRepos: any[] = [];
  constructor(
  private homepageService: HomepageService,
  private gitService: GitService,
  private bookmarkService: BookmarkService
) {}
  ngOnInit() {
    this.homepageService.getArticles().subscribe((articles: any[]) => {
      console.log(articles);
      for (const article of articles) {
        this.gitUsers.push(article.user.github_username);
      }
      
    });

    this.searchInput.valueChanges.subscribe((value) => {
      const searchValue = (value ?? '').toLowerCase();
      if (!searchValue) {
        this.filteredUsers = [];
        return;
      }
      this.filteredUsers = this.gitUsers.filter(
        (user) => user && user.toLowerCase().includes(searchValue),
      );  
    });
  }
  showProfile(username: string) {
    const bookmarks = this.bookmarkService.getGithubBookmarks();
    this.searchInput.setValue(username);
    this.filteredUsers = [];
    this.gitService.getUsers(username).subscribe((user) => {
      this.gitProfile = user;
    });

    this.gitService.getRepos(username).subscribe((repos) => {
      this.gitRepos = repos.map((repo) => ({
        ...repo,
        bookmarked: bookmarks.some((r: Repo) => r.id === repo.id)
      }));
    });
  }

 toggleGithubBookmark(repo: Repo) {
 

  const bookmarks = this.bookmarkService.getGithubBookmarks();
  if(repo.bookmarked) {
    repo.bookmarked = false;
    this.bookmarkService.saveGithubBookmarks(
      bookmarks.filter((r: Repo) => r.id !== repo.id)
    );
  }
  else{
    repo.bookmarked = true;
    bookmarks.push(repo);
    this.bookmarkService.saveGithubBookmarks(bookmarks); 

  }


}
}
