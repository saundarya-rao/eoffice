import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { LocaldataService } from '../services/localdata.service';
import { GooglePlus } from '@ionic-native/google-plus/ngx';
@Component({
  selector: 'app-logout',
  templateUrl: './logout.page.html',
  styleUrls: ['./logout.page.scss'],
})
export class LogoutPage implements OnInit {

  constructor(public navCtrl: NavController,private googlePlus: GooglePlus) { }

  nextpage(): void {
    this.googlePlus.logout()
    .then(res =>{
      console.log(res);
    })
    .catch(err=>console.error(err));
  
    this.navCtrl.navigateForward('/login');
 }

  ngOnInit() {
  }

}
