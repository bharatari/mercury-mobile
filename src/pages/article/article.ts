import { Component } from '@angular/core';

import { NavController, NavParams, LoadingController } from 'ionic-angular';

import { Article as ArticleModel } from '../../models/article';
import { Posts } from '../../providers/posts';
import { Utils } from '../../providers/utils';

@Component({
  selector: 'page-article',
  templateUrl: 'article.html'
})
export class Article {
  id: string;
  article: ArticleModel;
  error: boolean;

  constructor(public navCtrl: NavController, public loadingCtrl: LoadingController, public posts: Posts, public utils: Utils, public navParams: NavParams) {
    let loader = this.loadingCtrl.create({
      content: 'Loading',
    });

    loader.present();

    this.id = navParams.get('id');

    posts.getPost(this.id)
      .then((response) => {
        this.article = utils.processArticle(response.post);

        this.error = false;

        loader.dismiss();
      })
      .catch((err) => {
        this.error = true;
      });
  }
}
