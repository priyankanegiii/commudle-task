import { Component } from '@angular/core';
import { GitService } from '../../services/git.service';
import { ReactiveFormsModule } from '@angular/forms';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Repo } from '../../models/repo';
import { BookmarkService } from '../../services/bookmark.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-gitpage',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './gitpage.component.html',
  styleUrl: './gitpage.component.scss',
})
export class GitpageComponent {
  gitProfile: any = null;
  gitRepos: any[] = [];
  searchInput = new FormControl('', Validators.required);
  toggleSearchInput: boolean = false;
  bookmarked: boolean = false;
  bookmarkedRepos: any[] = [];
  constructor(
    private gitService: GitService,
    private bookmarkService: BookmarkService,
  ) {}

  showProfile(username: string | null) {
    if (!username?.trim()) {
      return;
    }
    const bookmarks = this.bookmarkService.getGithubBookmarks();
    this.searchInput.setValue(username);
    this.gitService.getUsers(username).subscribe((user) => {
      this.gitProfile = user;
    });

    this.gitService.getRepos(username).subscribe((repos) => {
      this.gitRepos = repos.map((repo) => ({
        ...repo,
        bookmarked: bookmarks.some((r: Repo) => r.id === repo.id),
      }));
    });
  }

  toggleSearch() {
    this.toggleSearchInput = !this.toggleSearchInput;
  }

  toggleGithubBookmark(repo: Repo) {
    const bookmarks = this.bookmarkService.getGithubBookmarks();
    if (repo.bookmarked) {
      repo.bookmarked = false;
      this.bookmarkService.saveGithubBookmarks(
        bookmarks.filter((r: Repo) => r.id !== repo.id),
      );
    } else {
      repo.bookmarked = true;
      bookmarks.push(repo);
      this.bookmarkService.saveGithubBookmarks(bookmarks);
    }
  }
  navigateToUserProfile(url: string | null) {
    window.open(url!, '_blank');
  }

  navigateToRepo(url: string | null) {
    window.open(url!, '_blank');
  }
}
