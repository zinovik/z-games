import { Component, ViewChild } from '@angular/core';

import { MenuController, Nav, Platform, ToastController, LoadingController } from 'ionic-angular';

import { Storage } from '@ionic/storage';

import { AboutPage } from '../pages/about/about';
import { AccountPage } from '../pages/account/account';
import { LoginPage } from '../pages/login/login';
import { SignupPage } from '../pages/signup/signup';
import { GamesPage } from '../pages/games/games';
import { SupportPage } from '../pages/support/support';

import { GamesServerProvider } from '../providers/gamesserver/gamesserver';

export interface PageInterface {
  title: string;
  name: string;
  component: any;
  icon: string;
  logsOut?: boolean;
  index?: number;
  tabName?: string;
  tabComponent?: any;
}

@Component({
  templateUrl: 'app.template.html'
})
export class ConferenceApp {
  // the root nav is a child of the root app component
  // @ViewChild(Nav) gets a reference to the app's root nav
  @ViewChild(Nav) nav: Nav;

  // List of pages that can be navigated to from the left menu
  // the left menu only works after login
  // the login page disables the left menu
  appPages: PageInterface[] = [
    { title: 'Games', name: 'GamesPage', component: GamesPage, icon: 'calendar' },
    { title: 'About', name: 'AboutPage', component: AboutPage, icon: 'information-circle' }
  ];
  loggedInPages: PageInterface[] = [
    { title: 'Account', name: 'AccountPage', component: AccountPage, icon: 'person' },
    { title: 'Support', name: 'SupportPage', component: SupportPage, icon: 'help' },
    { title: 'Logout', name: 'SchedulePage', component: GamesPage, icon: 'log-out', logsOut: true }
  ];
  loggedOutPages: PageInterface[] = [
    { title: 'Login', name: 'LoginPage', component: LoginPage, icon: 'log-in' },
    { title: 'Support', name: 'SupportPage', component: SupportPage, icon: 'help' },
    { title: 'Signup', name: 'SignupPage', component: SignupPage, icon: 'person-add' }
  ];
  rootPage: any;
  currentUsernameSubscription: any;

  constructor(
    public menu: MenuController,
    public platform: Platform,
    public storage: Storage,
    public gamesServer: GamesServerProvider,
    public toastCtrl: ToastController,
    public loadingCtrl: LoadingController,
  ) {

    this.rootPage = GamesPage;

    this.currentUsernameSubscription = gamesServer.getCurrentUsername().subscribe((currentUsername) => {
      this.enableMenu(!!currentUsername);
    });
    this.enableMenu(true);
  }

  openPage(page: PageInterface) {
    let params = {};

    // the nav component was found using @ViewChild(Nav)
    // setRoot on the nav to remove previous pages and only have this page
    // we wouldn't want the back button to show in this scenario
    if (page.index) {
      params = { tabIndex: page.index };
    }

    // If we are already on tabs just change the selected tab
    // don't setRoot again, this maintains the history stack of the
    // tabs even if changing them from the menu
    if (this.nav.getActiveChildNavs().length && page.index != undefined) {
      this.nav.getActiveChildNavs()[0].select(page.index);
    } else {
      // Set the root of the nav with params if it's a tab index
      this.nav.setRoot(page.name, params).catch((err: any) => {
        console.log(`Didn't set nav root: ${err}`);
      });
    }

    if (page.logsOut === true) {
      // Give the menu time to close before changing to logged out
      let loading = this.loadingCtrl.create({
        content: 'Please wait...'
      });
      let logoutSubscription = this.gamesServer.logout().subscribe(() => {
        loading.dismiss();
        this.toastCtrl.create({
          message: `You have successfully logged out`,
          duration: 3000,
          position: 'top'
        }).present();
        setTimeout(() => {
          logoutSubscription.unsubscribe();
        });
      });
    }
  }

  enableMenu(loggedIn: boolean) {
    this.menu.enable(loggedIn, 'loggedInMenu');
    this.menu.enable(!loggedIn, 'loggedOutMenu');
  }

  isActive(page: PageInterface) {
    let childNav = this.nav.getActiveChildNavs()[0];

    // Tabs are a special case because they have their own navigation
    if (childNav) {
      if (childNav.getSelected() && childNav.getSelected().root === page.tabComponent) {
        return 'primary';
      }
      return;
    }

    if (this.nav.getActive() && (this.nav.getActive().name === page.name || this.nav.getActive().id === page.name || this.nav.getActive().id === page.title.toLowerCase())) {
      return 'secondary';
    }
    return;
  }
}
