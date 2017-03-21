import { Component, ViewChild } from '@angular/core';

import { NavController, LoadingController, Content } from 'ionic-angular';

import { Article as ArticlePage } from '../article/article';
import { Posts } from '../../providers/posts';
import { Utils } from '../../providers/utils';
import { Article } from '../../models/article';

@Component({
  selector: 'page-headlines',
  templateUrl: 'headlines.html'
})
export class Headlines {
  @ViewChild(Content) content: Content;

  featuredPost: Article;
  recentPosts: Article[];
  maxPage: number;
  error: boolean;

  constructor(public navCtrl: NavController, public loadingCtrl: LoadingController, public posts: Posts, public utils: Utils) {
    this.load(true);
  }

  load(showLoader: boolean) {
    let loader = this.loadingCtrl.create({
      content: 'Loading',
    });

    if (showLoader) {
      loader.present();
    }

    return this.posts.getEditorsPicks()
      .then((response: any) => {
        this.recentPosts = this.utils.process(response.posts).slice(0, 6);
        this.maxPage = response.pages;

        this.error = false;

        return this.posts.getFeaturedPosts()
          .then((response: any) => {
            const featuredPosts = this.utils.process(response.posts);
            this.featuredPost = featuredPosts[0];
            this.recentPosts.unshift(featuredPosts[1], featuredPosts[2], featuredPosts[3]);

            this.error = false;

            loader.dismiss();
          })
          .catch((err) => {
            loader.dismiss();

            this.error = true;
          });
      })
      .catch((err) => {
        loader.dismiss();
  
        this.error = true;
      });    
  }

  doRefresh(refresher) {
    this.load(false)
      .then(() => {
        refresher.complete();
      });
  }

  goToArticle(event, post) {
    this.navCtrl.push(ArticlePage, {
      id: post.id,
    });
  }
}
