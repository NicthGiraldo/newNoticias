import { Component, Input, OnInit } from '@angular/core';
import { Article } from '../../interface/index';
import { InAppBrowser } from '@awesome-cordova-plugins/in-app-browser/ngx';
import { SocialSharing } from '@awesome-cordova-plugins/social-sharing/ngx';
import { ActionSheetController } from '@ionic/angular';
import { StorageService } from '../../services/storage.service';


@Component({
  selector: 'app-noticia',
  templateUrl: './noticia.component.html',
  styleUrls: ['./noticia.component.scss'],
})
export class NoticiaComponent implements OnInit {

  @Input() noticia: Article;
  @Input() indice: number;

  constructor(private iab: InAppBrowser,
              private actionSheetCtrl: ActionSheetController,
              private socialSharing: SocialSharing,
              private storageService: StorageService) { }

  ngOnInit() {}

  lanzarNoticia(){
    const browser = this.iab.create(this.noticia.url, '_system');
  }

  async lanzarMenu(){

    const noticiaEnFavoritos = this.storageService.noticiaEnFavoritos(this.noticia);

    const actionSheet = await this.actionSheetCtrl.create({
      buttons: [{
        text: 'Compartir noticia',
        icon: 'share-social',
        handler: () => {
          this.socialSharing.share(
            this.noticia.title,
            this.noticia.source.name,
            '',
            this.noticia.url
          )
        }
      }, {
        text: noticiaEnFavoritos ? 'Remover de favoritos' : 'Agregar a favoritos',
        icon: noticiaEnFavoritos ? 'star' : 'star-outline',
        handler: () => {
          this.storageService.saveRemoveNoticia(this.noticia);
        }
      }, {
        text: 'Cancelar',
        icon: 'close',
        role: 'cancel'
      }]
    });
    await actionSheet.present();
  }

}
