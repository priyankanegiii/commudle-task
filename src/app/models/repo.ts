export interface Repo {
  name: string;
  id: number;
  description: string;
  stargazers_count: number;
  forks_count: number;
  language: string;
  bookmarked?: boolean ;
}