import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { LocaldataService } from '../services/localdata.service';
import { OnlinedatabaseService } from '../services/onlinedatabase.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.page.html',
  styleUrls: ['./notification.page.scss'],
})
export class NotificationPage implements OnInit {

  public items=[
    ["warning","assets/male.png","Rahul","do Assignement","23/04/2020"],
    ["warning","assets/female.png","Hauva","check papers","23/04/2020"],
    ["warning","assets/female.png","Saundarya","create ppt for class","03/04/2020"],
    ["warning","assets/male.png","Ram","Bring bookay","02/03/2020"],
    ["warning","assets/male.png","Parth","Sign certificates","13/02/2020"],
    ["warning","assets/female.png","Vaishnavi","bring notes for class","25/04/2020"],
    ["warning","assets/male.png","Nihar","clan the classroom","12/03/2020"],
    ["warning","assets/male.png","Onkar","Create question paper for exam","07/04/2020"],
    ];
    condition=[false,true,true,false,true,true,false,true];
    userId;
  constructor(public alertController: AlertController,public local:LocaldataService,public onlinedata:OnlinedatabaseService) { }

  ngOnInit() {
    this.userId=this.local.getmyinfo()[2];
      this.onlinedata.getnotifications(this.userId).subscribe(
        (response)=>{
          const data=JSON.stringify(response);
          console.log(data)
          console.log(JSON.parse(data))
          this.local.savenotifications(JSON.parse(data));
  
        },
        (err)=>{
          console.log(err);
          this.ngOnInit();
        }
      )
  }
  refresh(event){
    this.userId=this.local.getmyinfo()[2];
      this.onlinedata.getnotifications(this.userId).subscribe(
        (response)=>{
          const data=JSON.stringify(response);
          console.log(data)
          console.log(JSON.parse(data))
          this.local.savenotifications(JSON.parse(data));
          event.target.complete();
  
        },
        (err)=>{
          console.log(err);
          this.ngOnInit();
        }
      )

  }

  
  async infowarning(item ):Promise<void>{
    
    const alert = await this.alertController.create({
      header: item.displayName+" sent you a Reminder:",

      message: 'Task:'+item.task+"<br/> Deadline is " +item.date ,
      
    });

    await alert.present();
  }

  

  // info(item){
  //   if(item[0]=="danger"){
  //     this.infodanger(item);
  //   }else if(item[0]=="warning"){
  //     this.infowarning(item);
  //   }else{
  //     this.infosuccess(item);
  //   }
  // }
  // async infosuccess(item ):Promise<void>{
    
  //   const alert = await this.alertController.create({
  //     header: item[2]+" has completed the task",

  //     message: item[3]+"<br/> Deadline was " +item[4] ,
  //     buttons: [
  //       {
  //         text: 'ok',
  //       }
  //     ]
  //   });

  //   await alert.present();
  // }
  // async infodanger(item ):Promise<void>{
    
  //   const alert = await this.alertController.create({
  //     header: item[2]+" sent you a task:",

  //     message: item[3]+"<br/> Deadline is " +item[4] ,
  //     buttons: [
  //       {
  //         text: 'ok',
  //       }
  //     ]
  //   });

  //   await alert.present();
  // }


}
