import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { Headlines } from '../pages/headlines/headlines';
import { Category } from '../pages/category/category';
import { Article } from '../pages/article/article';
import { Search as SearchPage } from '../pages/search/search';
import { Posts } from '../providers/posts';
import { Search } from '../providers/search';
import { Utils } from '../providers/utils';
import { PostComponent } from '../components/post/post';

@NgModule({
  declarations: [
    MyApp,
    Headlines,
    PostComponent,
    Category,
    Article,
    SearchPage
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    Headlines,
    Category,
    Article,
    SearchPage
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}, Posts, Search, Utils]
})
export class AppModule {}
