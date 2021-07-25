import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { LocaldataService } from '../services/localdata.service';
import { OnlinedatabaseService } from '../services/onlinedatabase.service';

@Component({
  selector: 'app-reviewtasks',
  templateUrl: './reviewtasks.page.html',
  styleUrls: ['./reviewtasks.page.scss'],
})
export class ReviewtasksPage implements OnInit {

  
  constructor(public alertController: AlertController,public local:LocaldataService,public onlinedata:OnlinedatabaseService) { }
  reviewtasks;

  refresh(event){
    this.onlinedata.getreviewtasks(this.local.getmyinfo()[2]).subscribe(
      (response)=>{
        this.reviewtasks=JSON.parse(JSON.stringify(response));
        console.log(response);
        this.local.savereviewtasks(this.reviewtasks);
        event.target.complete();

      },
      (err)=>console.log(err)

    )

  }

  ngOnInit() {
    this.onlinedata.getreviewtasks(this.local.getmyinfo()[2]).subscribe(
      (response)=>{
        this.reviewtasks=JSON.parse(JSON.stringify(response));
        console.log(response);
        this.local.savereviewtasks(this.reviewtasks);
      },
      (err)=>console.log(err)

    )
  }
  async infowarning(p ):Promise<void>{
    
    const alert = await this.alertController.create({
      header: p.displayName,

      message: p.task+"<br/> Deadline is " +p.date ,
      buttons: [
      {
        text: 'Approve', handler: () => {
          for( var i = 0; i < this.reviewtasks.length; i++){ if (this.reviewtasks[i].time === p.time) { this.reviewtasks.splice(i, 1); }}
          this.onlinedata.savereviewtasks(this.local.getmyinfo()[2],this.reviewtasks).subscribe(
            (response)=>console.log(response),
            (err)=>console.log(err)
          )
        }
      },
      {
        text: 'Reassign Task', handler: () => {
          const reassin={
            date:p.date,
            displayName:this.local.getmyinfo()[1],
            imageUrl:this.local.getmyinfo()[3],
            task:p.task,
            time:p.time,
            userId:this.local.getmyinfo()[2]
          }
          const assign={
            date:p.date,
            displayName:p.displayName,
            imageUrl:p.imageUrl,
            task:p.task,
            time:p.time,
            userId:p.userId
          }

          var data;
          this.onlinedata.getmytask(p.userId).subscribe(
             async (response)=>{
              console.log(response),
              data=await JSON.parse(JSON.stringify(response))
                if(!data){
                  data=[]
                }
                data.push(reassin)
              
              this.onlinedata.savemytask(p.userId,data).subscribe(
                (response2)=>console.log(response2),
                (err)=>console.log(err)
              )
            }
          )

          var data2;
          this.onlinedata.getassignedtask(this.local.getmyinfo()[2]).subscribe(
            async (response3)=>{
             console.log(response3),
             data2=await JSON.parse(JSON.stringify(response3))
               if(!data2){
                 data2=[]
               }
               data2.push(assign)
             
             this.onlinedata.saveassignedtask(this.local.getmyinfo()[2],data2).subscribe(
               (response4)=>console.log(response4),
               (err)=>console.log(err)
             )
           }
         )
          

          for( var i = 0; i < this.reviewtasks.length; i++){ if (this.reviewtasks[i].time === p.time) { this.reviewtasks.splice(i, 1); }}
          this.onlinedata.savereviewtasks(this.local.getmyinfo()[2],this.reviewtasks).subscribe(
            (response5)=>console.log(response5),
            (err)=>console.log(err)
          )

        }
      },
      { text: 'Cancel', role: 'cancel' },
      ]
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
