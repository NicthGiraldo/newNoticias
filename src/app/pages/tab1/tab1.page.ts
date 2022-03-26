import { Component, OnInit } from '@angular/core';
import { NewsService } from "../../services/news.service";
import { Article } from '../../interface/index';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit{

  noticias: Article[] = [];

  constructor(private newService: NewsService) {}

  ngOnInit() {
    this.cargarNoticias();
  }

  loadData(event){
    this.cargarNoticias(event);
  }

  cargarNoticias(event?){
    this.newService.getTopHeadLines()
    .subscribe( resp => {
      if(resp.articles.length === 0){
        event.target.disabled = true;
        return;
      }

      this.noticias.push(...resp.articles);

      if(event){
        event.target.complete();
      }
    })
  }

}
