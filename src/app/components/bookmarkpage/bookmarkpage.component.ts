import { Component } from '@angular/core';
import { Repo } from '../../models/repo';
import {DevToArticle} from "../../models/devtoarticle";
import {BookmarkService} from "../../services/bookmark.service";
import {OnInit} from "@angular/core";
import{ RouterLink} from "@angular/router";



@Component({
  selector: 'app-bookmarkpage',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './bookmarkpage.component.html',
  styleUrl: './bookmarkpage.component.scss'
}) 
export class BookmarkpageComponent implements OnInit {
  githubBookmarks: Repo[] = [];
  articleBookmarks: DevToArticle[] = [];
  bookmarkedGithub:boolean = false;
  bookmarkedArticle:boolean = false;

constructor(private bookmarkService: BookmarkService) { }

ngOnInit() {
  this.githubBookmarks = this.bookmarkService.getGithubBookmarks();
  this.articleBookmarks = this.bookmarkService.getArticleBookmarks();
}


removeArticle(article: DevToArticle) {

  this.articleBookmarks =
    this.articleBookmarks.filter(a => a.id !== article.id);

  this.bookmarkService.saveArticleBookmarks(this.articleBookmarks);

}
removeGithub(repo: Repo) {

  this.githubBookmarks =
    this.githubBookmarks.filter(r => r.id !== repo.id);

  this.bookmarkService.saveGithubBookmarks(this.githubBookmarks);

}

}