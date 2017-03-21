import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the Search provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class Search {
  constructor(public http: Http) { }

  getSearch(term) {
    return this.http.get(`http://www.utdmercury.com/api/core/get_search_results/?search=${term}`);
  }

  getSearchPage(term, page) {
    return this.http.get(`http://www.utdmercury.com/api/core/get_search_results/?search=${term}&page=${page}`);
  }
}
