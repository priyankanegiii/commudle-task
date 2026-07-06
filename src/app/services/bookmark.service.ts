import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BookmarkService {

  private githubKey = 'githubBookmarks';
  private articleKey = 'devtoBookmarks';

  getGithubBookmarks() {
    return JSON.parse(localStorage.getItem(this.githubKey) || '[]');
  }

  getArticleBookmarks() {
    return JSON.parse(localStorage.getItem(this.articleKey) || '[]');
  }

  saveGithubBookmarks(bookmarks: any[]) {
    localStorage.setItem(this.githubKey, JSON.stringify(bookmarks));
  }

  saveArticleBookmarks(bookmarks: any[]) {
    localStorage.setItem(this.articleKey, JSON.stringify(bookmarks));
  }
}