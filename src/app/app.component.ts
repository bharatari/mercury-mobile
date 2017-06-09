import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';

import { Headlines } from '../pages/headlines/headlines';
import { Category } from '../pages/category/category';
import { Search } from '../pages/search/search';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = Headlines;

  pages: Array<{title: string, component: any, category: string}>;

  constructor(public platform: Platform) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Headlines', component: Headlines, category: null },
      { title: 'News', component: Category, category: 'news' },
      { title: 'Life & Arts', component: Category, category: 'life-arts' },
      { title: 'Opinion', component: Category, category: 'opinion' },
      { title: 'Sports', component: Category, category: 'sports' },
      { title: 'Comics', component: Category, category: 'comics' },
      { title: 'Search', component: Search, category: null }
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      Splashscreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component, {
      category: page.category
    });
  }
}
