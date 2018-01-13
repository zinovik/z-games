import { Component } from '@angular/core';

import { NavParams, ViewController } from 'ionic-angular';


@Component({
  selector: 'page-games-filter',
  templateUrl: 'games-filter.html'
})
export class GamesFilterPage {
  tracks: Array<{name: string, isChecked: boolean}> = [];

  constructor(
    public navParams: NavParams,
    public viewCtrl: ViewController
  ) {
  }

  resetFilters() {
    // reset all of the toggles to be checked
    this.tracks.forEach(track => {
      track.isChecked = true;
    });
  }

  applyFilters() {
    // Pass back a new array of track names to exclude
    let excludedTrackNames = this.tracks.filter(c => !c.isChecked).map(c => c.name);
    this.dismiss(excludedTrackNames);
  }

  dismiss(data?: any) {
    // using the injected ViewController this page
    // can "dismiss" itself and pass back data
    this.viewCtrl.dismiss(data);
  }
}
