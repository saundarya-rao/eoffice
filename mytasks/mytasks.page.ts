import { Component, OnInit } from '@angular/core';
import { NavController, AlertController } from '@ionic/angular';
import { OnlinedatabaseService } from '../services/onlinedatabase.service';
import { LocaldataService } from '../services/localdata.service';
import { CompileTemplateMetadata, R3TargetBinder } from '@angular/compiler';

@Component({
  selector: 'app-mytasks',
  templateUrl: './mytasks.page.html',
  styleUrls: ['./mytasks.page.scss'],
})
export class MytasksPage implements OnInit {

  public items=[
    ["2","assets/male.png","Rahul","complete assignement","23/04/2020"],
    ["0","assets/female.png","Hauva","check paper","23/04/2020"],
    ["6","assets/male.png","Saundarya","create ppt for class","03/04/2020"],
    ["2","assets/female.png","Ram","bring bookay","02/03/2020"],
    ["9","assets/male.png","Parth","Sign certificates","13/02/2020"],
    ["4","assets/female.png","Vaishnavi","bring notes for class","25/04/2020"],
    ["0","assets/male.png","Nihar","clean the classroom","12/03/2020"],
    ["0","assets/male.png","Onkar","Create question paper for exam","07/04/2020"],
    ];
    condition=[false,true,true,false,true,true,false,true];
    reviewtask;
    assignedtask;
  constructor(public navCtrl:NavController,public alertController: AlertController,public onlinedata:OnlinedatabaseService,public local:LocaldataService) { }
  dash(): void {
    this.navCtrl.navigateForward('/dashboard');
 }
  ngOnInit() {
    this.onlinedata.getmytask(this.local.getmyinfo()[2]).subscribe(
      (response)=>{
        console.log(response);
        console.log(JSON.parse(JSON.stringify(response)));
        this.local.savemytasks(JSON.parse(JSON.stringify(response)));
      },
      (err)=>console.log(err)

    )

  }

  refresh(event){
    this.onlinedata.getmytask(this.local.getmyinfo()[2]).subscribe(
      (response)=>{
        console.log(response);
        console.log(JSON.parse(JSON.stringify(response)));
        this.local.savemytasks(JSON.parse(JSON.stringify(response)));
        event.target.complete();

      },
      (err)=>console.log(err)

    )
    
  }

  reveiwtaskfunction(userId:any,c:Object){
    this.reviewtask.push(c);
    this.onlinedata.savereviewtasks(userId,this.reviewtask).subscribe(
      (response)=>console.log(response),
      (err)=>console.log(err)
    )
  }
   getreviewtask(userId:any){
    this.onlinedata.getreviewtasks(userId).subscribe(
      (response)=>{
        console.log(response)
        if(!JSON.parse(JSON.stringify(response))){
          this.reviewtask=[]
        }else{
          this.reviewtask=JSON.parse(JSON.stringify(response))
        }
      },
      (err)=>console.log(err)
    )
  }
   getmyassignedtasks(userId:any){
    this.onlinedata.getassignedtask(userId).subscribe(
      (response)=>{
        console.log(response)
        if(!JSON.parse(JSON.stringify(response))){
          this.assignedtask=[]
        }else{
          this.assignedtask=JSON.parse(JSON.stringify(response))
        }
      },
      (err)=>console.log(err)
    )
  }
  removefromassignedtask(userId:any,item:any){
    for( var i = 0; i < this.assignedtask.length; i++){ if (this.assignedtask[i].time === item.time) { this.assignedtask.splice(i, 1); }}
    this.onlinedata.saveassignedtask(userId,this.assignedtask).subscribe(
      (response)=>console.log(response),
      (err)=>console.log(err)
    )

  }
  async info(item ):Promise<void>{
    this.getreviewtask(item.userId);
    this.getmyassignedtasks(item.userId);
    
    const alert = await this.alertController.create({
      header: item.displayName+" sent you a task:",

      message: 'Task: '+item.task+"<br/> Deadline is " +item.date ,
      buttons: [{ text: 'Cancel', role: 'cancel' },
      {
        text: 'Submit', handler: () => {
          var d=new Date().toISOString();

         const c= {
            submitteddate:d,
            date:item.date,
            displayName:this.local.getmyinfo()[1],
            imageUrl:this.local.getmyinfo()[3],
            task:item.task,
            time:item.time,
            userId:this.local.getmyinfo()[2] 
          }
          this.reveiwtaskfunction(item.userId,c);
          this.removefromassignedtask(item.userId,item);
          var newmytasks=this.local.getmytasks();
          for( var i = 0; i < newmytasks.length; i++){ if (newmytasks[i].time === item.time) { newmytasks.splice(i, 1); }};
          this.local.savemytasks(newmytasks);
          this.removefrommytasks(this.local.getmyinfo()[2],newmytasks);
          console.log('the submit button is working');
        },
      }
      ]
    });

    await alert.present();
  }
   removefrommytasks(userId:any,data:any){
    this.onlinedata.savemytask(userId,data).subscribe(
      (response)=>console.log(response),
      (err)=>console.log(err)
    )
  }

}
