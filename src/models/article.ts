export class Article {
  date: string;

  constructor(public id: string, public title: string, public author: string, public authorLabel: string, public category: string, public image: string, public caption: string, public content: string) { }

  getTruncatedTitle() {
    if (this.title.length > 40) {
      return this.title.substring(0, 40) + "...";
    }

    return this.title;
  }

  getBackgroundImage() {
    return `url(${this.image})`;
  }
}