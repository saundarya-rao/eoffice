import { Component, OnInit } from '@angular/core';

import { Platform, ToastController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { LocaldataService } from './services/localdata.service';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {
  public selectedIndex = 0;
  public appPages = [
    {
      title: 'My Tasks',
      url: '/mytasks',
      icon: 'hourglass'
    },
    {
      title: 'Assisned Tasks',
      url: '/assignedtasks',
      icon: 'briefcase'
    },
    {
      title: 'Review Tasks',
      url: '/reviewtasks',
      icon: 'warning'
    },
    {
      title: 'Todo List',
      url: '/todolist',
      icon: 'add-circle'
    },
    {
      title: 'notification',
      url: '/notification',
      icon: 'notifications'
    },
    {
      title:'logout',
      url:'/logout',
      icon: 'exit'
    }

  ];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    public local:LocaldataService,  
    public toastController: ToastController,

  ) {
    this.initializeApp();
    
  }
   
    email="";
    displayname="";
    userId="";
    imageurl=""
  
  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
  async copytoclipboard(){
    console.log(" hello world");
    //this.clipboard.copy('tow plus three');
    const toast = await this.toastController.create({
      message: 'code copied ',
      duration: 1000
    });
    toast.present();
  
  }
  onstartfunction(){
    this.email=this.local.getmyinfo()[0];
    this.displayname=this.local.getmyinfo()[1];
    this.userId=this.local.getmyinfo()[2];
    this.imageurl=this.local.getmyinfo()[3];
  }
  ngOnInit() {
    const path = window.location.pathname.split('folder/')[1];
    if (path !== undefined) {
      this.selectedIndex = this.appPages.findIndex(page => page.title.toLowerCase() === path.toLowerCase());
    }
  }
}
