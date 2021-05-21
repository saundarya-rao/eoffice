import { Component, OnInit } from '@angular/core';
import { NavController, AlertController, ToastController } from '@ionic/angular';
import { LocaldataService } from '../services/localdata.service';
import { OnlinedatabaseService } from '../services/onlinedatabase.service';
import { async } from '@angular/core/testing';
import { GooglePlus } from '@ionic-native/google-plus/ngx';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  
  displayName: any;
  email: any;
  familyName: any;
  givenName: any;
  userId: any;
  imageUrl:any;
  isLoggedIn;
  once=true;

  myinfo=null;

  

  constructor(public navCtrl: NavController,public local:LocaldataService,public onlinedata:OnlinedatabaseService,public altr:AlertController,public toastController: ToastController,private googlePlus: GooglePlus) { }

  launchonce(){
    if(this.once){
      this.nextpage();
      this.once=false;
    }
  }
  nextpage(): void {

    this.googlePlus.login({})
      .then(res => {
        console.log(res);

        console.log(JSON.parse(JSON.stringify(res)));
        this.displayName = res.displayName;
        this.email = res.email;
        this.familyName = res.familyName;
        this.givenName = res.givenName;
        this.userId = res.userId;

        this.onlinedata.getinfo(res.userId).subscribe(
          async (response)=>{
            if(!JSON.parse(JSON.stringify(response))){
              this.presentToast();
            }else{
              this.myinfo=await JSON.parse(JSON.stringify(response));
              this.local.savemyinfo(this.myinfo.email,this.myinfo.displayName,this.myinfo.userId,this.myinfo.imageUrl);
              this.local.savejsonmyinfo(this.myinfo);
              this.onlinedata.gettodo(this.local.getmyinfo()[2]).subscribe(
                (response)=>{
                  console.log(response)
                  var todo=JSON.parse(JSON.stringify(response))
                  if(!JSON.parse(JSON.stringify(response))){
                    todo=[];
                  }
                  this.local.savetodo(todo);
                },
                (err)=>console.log(err)
              )
              this.navCtrl.navigateForward('/mytasks');
            }

          },
          (err)=>console.log(err)
        )
        
        
      })
      .catch(err => console.error(err));
  
 }

 save(){

  this.local.savemyinfo(this.email,this.displayName,this.userId,this.imageUrl);
  this.local.savejsonmyinfo({
    displayName:this.displayName,
    email:this.email,
    familyName:this.familyName,
    givenName:this.givenName,
    userId:this.userId,
    imageUrl:this.imageUrl
  });
  this.onlinedata.saveinfo(
    {
    displayName:this.displayName,
    email:this.email,
    familyName:this.familyName,
    givenName:this.givenName,
    userId:this.userId,
    imageUrl:this.imageUrl
  }
  ,this.userId).subscribe(
    (response)=>console.log(response),
    (err)=>console.log(err)
  );

  this.onlinedata.gettodo(this.local.getmyinfo()[2]).subscribe(
    (response)=>{
      console.log(response)
      var todo=JSON.parse(JSON.stringify(response))
      if(!JSON.parse(JSON.stringify(response))){
        todo=[];
      }
      this.local.savetodo(todo);
    },
    (err)=>console.log(err)
  )

 }

 async presentToast() {
  const alert = await this.altr.create({
    header: 'Select your gender:',
    buttons: [
      {
        text: 'Male',
        cssClass: 'secondary',
        handler: () => {
          this.imageUrl="assets/male.png"
          this.save();
          console.log('Confirm Cancel: blah');
          this.isLoggedIn=true;
          this.navCtrl.navigateForward('/mytasks');

        }
      }, {
        text: 'Femlae',
        handler: async () => {
          this.imageUrl="assets/female.png"
          this.save();
          this.isLoggedIn=true;
          this.navCtrl.navigateForward('/mytasks');

        }
      }
    ]
  });

  await alert.present();

}
mytasks(){
  if(this.isLoggedIn){
    this.navCtrl.navigateForward('/mytasks')
  }
}

  ngOnInit() {
  }

}
