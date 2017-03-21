import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import { Posts } from '../providers/posts';
import { Article } from '../models/article';

/*
  Generated class for the Utils provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class Utils {
  constructor(public http: Http, public posts: Posts) { }

  stringifyArray(array) {
    let string = '';

    for (let i = 0; i < array.length; i++) {
      if (i === 0) {
        string += array[i];
      } else {
        string += ', ' + array[i];
      }
    }
  }

  process(response): Article[] {
    if (Array.isArray(response)) {
      let articles: Article[] = [];

      for (let i = 0; i < response.length; i++) {
        articles.push(this.processArticle(response[i]));
      }

      return articles;
    }

    return [];
  }

  processArticle(response): Article {
    if (response) {
      const id = response.id;
      const title = response.title;
      const content = response.content;

      let author = '';
      let authorLabel = '';

      if (response.custom_fields) {
        if (response.custom_fields.credits_0_name) {
          author = response.custom_fields.credits_0_name[0];
        }

        if (response.custom_fields.credits_0_label) {
          authorLabel = response.custom_fields.credits_0_label[0];
        }
      }

      let category = '';

      if (response.categories) {
        if (response.categories[0]) {
          category = response.categories[0].title;
        }
      }

      let image = '';
      let caption = '';

      if (response.attachments) {
        const attachmentId = this.findImage(response.attachments);

        if (response.attachments[attachmentId]) {
          caption = response.attachments[attachmentId].caption;
          image = response.attachments[attachmentId].url;
        } else {
          const thumbnailUrl = this.findThumbnail(response.thumbnail_images);

          if (thumbnailUrl) {
            image = thumbnailUrl;
          }
        }
      }

      return new Article(id, title, author, authorLabel, category, image, caption, content);
    }
    
    return null;
  }

  findImage(attachments) {
    if (attachments) {
      for (let i = 0; i < attachments.length; i++) {
        if (attachments[i]) {
          if (this.isImage(attachments[i].url)) {
            return i;
          }
        }
      }
    }


    return -1;
  }

  findThumbnail(thumbnail_images) {
    if (thumbnail_images) {
      for (let property in thumbnail_images) {
        if (thumbnail_images[property]) {
          return thumbnail_images[property].url;
        }
      }
    }

    return null;
  }

  isImage(value) {
    return this.contains(value, '.jpeg') || this.contains(value, '.png') || this.contains(value, '.jpg');
  }

  contains(value, substring) {
    return value.indexOf(substring) !== -1;
  }

  findCategory(categoryName) {
      const categories = this.posts.getPostCategories();

      for (let i = 0; i < categories.length; i++) {
        if (categoryName === categories[i].id) {
          return categories[i].name;
        }
      }
  }
}
