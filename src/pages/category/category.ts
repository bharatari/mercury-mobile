import { Component, ViewChild } from '@angular/core';

import { NavController, NavParams, LoadingController, Content } from 'ionic-angular';

import { Article } from '../article/article';
import { Utils } from '../../providers/utils';
import { Posts } from '../../providers/posts';

@Component({
  selector: 'page-category',
  templateUrl: 'category.html'
})
export class Category {
  @ViewChild(Content) content: Content;

  title: string;
  category: string;
  categoryPosts: any[];
  error: boolean;
  maxPage: number;
  page: number;

  constructor(public navCtrl: NavController, public loadingCtrl: LoadingController, public posts: Posts, public utils: Utils, public navParams: NavParams) {
    this.load(true);
  }

  load(showLoader: boolean) {
    let loader = this.loadingCtrl.create({
      content: 'Loading',
    });

    if (showLoader) {
      loader.present();
    }

    this.category = this.navParams.get('category');
    this.title = this.utils.findCategory(this.category);

    return this.posts.getCategory(this.category)
      .then((response) => {
        this.categoryPosts = this.utils.process(response.posts);
        this.maxPage = response.pages;
        this.page = 1;

        this.error = false;

        loader.dismiss();
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

  doInfinite(infiniteScroll) {
    if (this.page >= this.maxPage) {
      infiniteScroll.complete();
    } else {
      this.page += 1;

      this.posts.getCategoryPage(this.category, this.page)
        .then((response) => {
          this.categoryPosts = this.categoryPosts.concat(this.utils.process(response.posts));

          infiniteScroll.complete();
        })
        .catch((err) => {
          infiniteScroll.complete();
        });
    }
  }

  goToArticle(event, post) {
    this.navCtrl.push(Article, {
      id: post.id,
    });
  }
}
