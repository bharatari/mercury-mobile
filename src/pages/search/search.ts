import { Component, ViewChild } from '@angular/core';

import { NavController, NavParams, LoadingController, Content } from 'ionic-angular';

import { Article } from '../article/article';
import { Utils } from '../../providers/utils';
import { Search as SearchUtils } from '../../providers/search';

@Component({
  selector: 'page-search',
  templateUrl: 'search.html'
})
export class Search {
  @ViewChild(Content) content: Content;

  title: string;
  category: string;
  searchPosts: any[];
  error: boolean;
  maxPage: number;
  page: number;
  term: string;

  constructor(public navCtrl: NavController, public loadingCtrl: LoadingController, public search: SearchUtils, public utils: Utils, public navParams: NavParams) { }

  load(showLoader: boolean) {
    let loader = this.loadingCtrl.create({
      content: 'Loading',
    });

    if (showLoader) {
      loader.present();
    }

    console.log(this.term);

    return this.search.getSearch(this.term)
      .then((response) => {
        this.searchPosts = this.utils.process(response.posts);
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

  doInfinite(infiniteScroll) {
    if (this.page >= this.maxPage) {
      infiniteScroll.complete();
    } else {
      this.page += 1;

      this.search.getSearchPage(this.term, this.page)
        .then((response) => {
          this.searchPosts = this.searchPosts.concat(this.utils.process(response.posts));

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
