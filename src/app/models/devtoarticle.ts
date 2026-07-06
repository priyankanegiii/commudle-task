export interface DevToArticle {
  id: number;
  title: string;
  cover_image: string | null;
  tag_list: string[];
  public_reactions_count: number;
  comments_count:number;
  reading_time_minutes: number;
  bookmarked?:boolean;
}