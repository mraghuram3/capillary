import { Component, OnInit } from '@angular/core';

import { Game } from './../model/game';
import { BackendService } from './../service/backend.service';

import {SlimLoadingBarService} from 'ng2-slim-loading-bar';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

    errorMessage: string;
    games: Game[] = new Array<Game>();
    gamesCopy: Game[] = new Array<Game>();
    query = '';
  constructor(private backend: BackendService, private slimLoadingBarService: SlimLoadingBarService) {
    this.getData();
  }

  ngOnInit() {
  }
  getData() {
      this.startLoading();
      this.backend.getGames().subscribe( (data: any) => (this.games = this.gamesCopy = data, this.completeLoading()),
                       error =>  this.errorMessage = <any>error);
  }
  search() {
      this.startLoading();
      this.backend.search(this.query).subscribe( (data: any) => (this.games = data, this.completeLoading()),
                       error =>  this.errorMessage = <any>error);
  }
  sort(query: string, by: string) {
      this.startLoading();
      this.backend.sort(query, by).subscribe( (data: any) => (this.games = data, this.completeLoading()),
                       error =>  this.errorMessage = <any>error);
  }
  reset() {
       this.games = this.gamesCopy;
       this.query = '';
    }

   startLoading() {
        this.slimLoadingBarService.start(() => {
            console.log('Loading complete');
        });
    }

    stopLoading() {
        this.slimLoadingBarService.stop();
    }
    completeLoading() {
        this.slimLoadingBarService.complete();
    }
}
