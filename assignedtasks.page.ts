import { Component, OnInit } from '@angular/core';
import { ToastController, NavController, AlertController } from '@ionic/angular';
import { OnlinedatabaseService } from '../services/onlinedatabase.service';
import { LocaldataService } from '../services/localdata.service';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-assignedtasks',
  templateUrl: './assignedtasks.page.html',
  styleUrls: ['./assignedtasks.page.scss'],
})
export class AssignedtasksPage implements OnInit {

  people=null;
  userId=null;

    
    constructor(public toastController: ToastController,public navCtrl:NavController,public alertController: AlertController,public local:LocaldataService,public onlinedata:OnlinedatabaseService) {}
  
    editProfile(i):boolean{
      
        if (i) {
          return true
         }
      
      return false
    }

    async presentToast() {
      const alert = await this.alertController.create({
        header: 'Confirm!',
        message: 'Do You want to send <strong>Reminder</strong>!!!',
        buttons: [
          {
            text: 'Cancel',
            role: 'cancel',
            cssClass: 'secondary',
            handler: () => {
              console.log('Confirm Cancel: blah');
            }
          }, {
            text: 'Send',
            handler: async () => {
              const toast = await this.toastController.create({
                message: 'Reminder Send',
                duration: 2000
              });
              toast.present();
            }
          }
        ]
      });
  
      await alert.present();
   
    }

    peoplepage(): void {
      this.userId=this.local.getmyinfo()[2];
    this.onlinedata.getpeople(this.userId).subscribe(
      (response)=>{
        const data=JSON.stringify(response);
        console.log(data)
        this.people=JSON.parse(data)
        console.log(this.people)
        this.local.savepeople(this.people);

      },
      (err)=>{
        console.log(err);
        this.peoplepage();
      }
    )
      this.navCtrl.navigateForward('/people');
    }

    removedata(useridmytask:any,item:any){
      for( var i = 0; i < useridmytask.length; i++){ if (useridmytask[i].time === item.time) { useridmytask.splice(i, 1); }}
                this.onlinedata.savemytask(item.userId,useridmytask).subscribe(
                  (response)=>console.log(response),
                  (err)=>console.log(err)
                )
    }

    async info(item ):Promise<void>{
      var useridmytask;
      
      this.onlinedata.getmytask(item.userId).subscribe(
        (response)=>{
           useridmytask=JSON.parse(JSON.stringify(response));
           console.log(useridmytask);
        },
        (err)=>console.log(err)
      )
      const alert = await this.alertController.create({
        header: item.displayName,
  
        message:"Task :" +item.task+"<br/> Deadline:" +item.date,
        buttons: [
          
        {
          text: 'Remove Task', handler: async() => {
            this.removedata(useridmytask,item);         
            var arr=this.local.getassignedtask();
            for( var i = 0; i < arr.length; i++){ if (arr[i].time === item.time) { arr.splice(i, 1); }}
            this.local.saveassignedtask(arr);
            this.onlinedata.saveassignedtask(this.local.getmyinfo()[2],arr).subscribe(
              (response)=>console.log(response),
              (err)=>console.log(err)
            )
            
            const toast = await this.toastController.create({
              message: 'Task Removed',

              duration: 2000,

            });
            
            toast.present();
          }
        },
        {
          text: 'Send Reminder', handler: async() => {
            var notif;
            this.onlinedata.getnotifications(item.userId).subscribe(
              (response)=>{
                console.log(response);
                notif=JSON.parse(JSON.stringify(response))
                if(!notif){
                  notif=[];
                }
                notif.push(
                  {
                    date:item.date,
                    displayName:this.local.getmyinfo()[1],
                    imageUrl:this.local.getmyinfo()[3],
                    task:item.task,
                    time:item.time,
                    userId:this.local.getmyinfo()[2]
                  }
                )
                this.onlinedata.savenotification(item.userId,notif).subscribe(
                  (response2)=>console.log(response),
                  (err)=>console.log(err)
                )
              }
            )


            const toast = await this.toastController.create({
              message: 'Reminder Send',
              duration: 2000
            });
            toast.present();
          }
        },
        { text: 'Cancel', role: 'cancel' },
        ]
      });
  
      await alert.present();
    }
    
    repeat(){    
      setTimeout(this.ngOnInit, 15000);
    }
    refresh(event){
      this.userId=this.local.getmyinfo()[2];
      this.onlinedata.getassignedtask(this.userId).subscribe(
        (response)=>{
          const data=JSON.stringify(response);
          console.log(data)
          console.log(JSON.parse(data))
          this.local.saveassignedtask(JSON.parse(data));
          event.target.complete();

  
        },
        (err)=>{
          console.log(err);
          this.ngOnInit();
        }
      )
    }
    ngOnInit() {
        this.userId=this.local.getmyinfo()[2];
      this.onlinedata.getassignedtask(this.userId).subscribe(
        (response)=>{
          const data=JSON.stringify(response);
          console.log(data)
          console.log(JSON.parse(data))
          this.local.saveassignedtask(JSON.parse(data));
  
        },
        (err)=>{
          console.log(err);
          this.ngOnInit();
        }
      )
    }
  

}
