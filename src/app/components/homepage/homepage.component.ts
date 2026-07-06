import { Component } from '@angular/core';
import { HomepageService } from '../../services/homepage.service';
import {OnInit} from "@angular/core";
import { DevToArticle } from '../../models/devtoarticle';
import {RouterLink} from "@angular/router";
import {BookmarkService} from "../../services/bookmark.service";
import {BookmarkpageComponent} from "../bookmarkpage/bookmarkpage.component";

@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.scss'
})
export class HomepageComponent implements OnInit {

  articlesList: DevToArticle[] = [];
  filteredArticles: DevToArticle[] = [];
  tagList : string[] = [];


  constructor(private homepageService: HomepageService, private bookmarkService: BookmarkService) {}

  ngOnInit() {
    this.homepageService.getArticles().subscribe((articles: DevToArticle[]) => {
      const bookmarks = this.bookmarkService.getArticleBookmarks();
      this.articlesList = articles.map(article => ({
        ...article,
        bookmarked: bookmarks.some((a: DevToArticle) => a.id === article.id)
      }));
     
      this.tagList = Array.from(new Set(articles.flatMap(article => article.tag_list)));
      this.filteredArticles = this.articlesList;
      
    });

    
  }

  
   filterArticle(event: Event) {
  const selectedTag = (event.target as HTMLSelectElement).value;

  this.filteredArticles = selectedTag
    ? this.articlesList.filter(article =>
        article.tag_list.includes(selectedTag)
      )
    : this.articlesList;
}
    
toggleArticleBookmark(article: DevToArticle) {
  const bookmarks = this.bookmarkService.getArticleBookmarks();

  if (article.bookmarked) {
    article.bookmarked = false;
    this.bookmarkService.saveArticleBookmarks(
      bookmarks.filter((a: DevToArticle) => a.id !== article.id)
    );
  } else {
    article.bookmarked = true;
    this.bookmarkService.saveArticleBookmarks([...bookmarks, article]);
  }
}
  


  

}
