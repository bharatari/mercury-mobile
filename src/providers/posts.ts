import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the Posts provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class Posts {
  constructor(public http: Http) { }

  get(url) {
    return this.http.get(url).toPromise()
      .then((res) => res.json());
  }

  getRecentPosts() {
    return this.get('http://utdmercury.com/?json=get_recent_posts');
  }

  getRecentPage(page) {
    return this.get(`http://utdmercury.com/?json=get_recent_posts&page=${page}`);
  }

  getFeaturedPosts() {
    return this.getCategory('featured');
  }

  getEditorsPicks() {
    return this.getCategory('editors-picks');
  }

  getPost(id) {
    return this.get(`http://utdmercury.com/api/core/get_post/?id=${id}`);
  }

  getCategory(name) {
    return this.get(`http://utdmercury.com/api/core/get_category_posts/?category_slug=${name}`);
  }

  getCategoryPage(name, page) {
    return this.get(`http://utdmercury.com/api/core/get_category_posts/?category_slug=${name}&page=${page}`);
  }

  getPostCategories() {
    return [
      { id:'news', name:'News' },
      { id:'life-arts', name:'Life & Arts' },
      { id:'opinion', name:'Opinion' },
      { id:'sports', name:'Sports' },
      { id:'comics', name:'Comics' }
    ];
  }
}
