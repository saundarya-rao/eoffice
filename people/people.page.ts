import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { OnlinedatabaseService } from '../services/onlinedatabase.service';
import { LocaldataService } from '../services/localdata.service';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-people',
  templateUrl: './people.page.html',
  styleUrls: ['./people.page.scss'],
})
export class PeoplePage implements OnInit {

  
  mytasks;
  assignedtasks;
  

  constructor(public alertCtrl: AlertController,public onlinedata:OnlinedatabaseService,public local:LocaldataService) { }


  sendtofriendsmytasks(userId:any){
    this.onlinedata.savemytask(userId,this.mytasks).subscribe(
      (response)=>console.log(response),
      (err)=>console.log(err)
    );
    
    
  }
  
  ngOnInit() {
    this.onlinedata.getassignedtask(this.local.getmyinfo()[2]).subscribe(
      (response)=>{
        console.log(JSON.stringify(response));
        //this.assignedtasks=JSON.parse(JSON.stringify(response));
        console.log('this is assigned tasks: '+this.assignedtasks);
        if(!JSON.parse(JSON.stringify(response))){
          this.assignedtasks=[];
          console.log('this is empty assigned tasks from internet');
        }else{
          this.assignedtasks=JSON.parse(JSON.stringify(response));
        }
      },
      (err)=>console.log("error in ngOnInit()"+err)
    )
  }

  assigntask(myuserid:any,task:any,date:any,time:any,userId:any,friendsdispalyname:any,freindsimageurl:any){
    this.assignedtasks.push({task:task,date:date,time:time,userId:userId,displayName:friendsdispalyname,imageUrl:freindsimageurl})
    this.onlinedata.saveassignedtask(myuserid,this.assignedtasks).subscribe(
      (response)=>console.log(response),
      (err)=>console.log(err)
    )
    this.local.saveassignedtask(this.assignedtasks);

  }

  savemytasksoffriend(userid:any,task:any,date:any,time:any,myuserid:any,mydisplayname:any,imageUrl:any){
    this.onlinedata.getmytask(userid).subscribe(
      (response2)=>{
        console.log(JSON.stringify(response2));
        //this.mytasks=JSON.parse(JSON.stringify(response2));
        console.log('this is mytasks:'+this.mytasks);
        if(!JSON.parse(JSON.stringify(response2))){
          this.mytasks=[];
          console.log('this is empty mytasks json from the internet');
          
        }else{
          this.mytasks=JSON.parse(JSON.stringify(response2));
          console.log('this means mytasks is not empty from json');
         
        }
        this.mytasks.push({task:task,date:date,time:time,userId:myuserid,displayName:mydisplayname,imageUrl:imageUrl});
        this.sendtofriendsmytasks(userid);
        

      },
      (err)=>console.log("error on savemytasksoffreind()"+err)
    )
  }

  async sendtask(i:any) {
    const alert = await this.alertCtrl.create({
      header: 'Send Task to '+(this.local.getpeople()[i].displayName),
      
      inputs: [{ name: 'editTask', placeholder: 'Type in your new task to Send' },{name:'list',type:'date',min: '01-01-2020',
      max: '20-12-2024'  }],
      buttons: [
        { text: 'Cancel', role: 'cancel' },
        {
          text: 'Send', handler: data => {
            var d=new Date().toISOString();
            this.savemytasksoffriend(this.local.getpeople()[i].userId,data.editTask,data.list,d,this.local.getmyinfo()[2],this.local.getmyinfo()[1],this.local.getmyinfo()[3]);
            this.assigntask(this.local.getmyinfo()[2],data.editTask,data.list,d,this.local.getpeople()[i].userId,this.local.getpeople()[i].displayName,this.local.getpeople()[i].imageUrl);


        }  
      }
      ]
    });
    await alert.present();
  }


}

//Tasks=null;
  // savetasktomyassignedtasks(
  //   task:any,
  //   date:any,
  //   myuid:any,
  //   displayName:any,
  //   email:any,
  //   familyName:any,
  //   givenName:any,
  //   imageUrl:any,
  //   userid:any){
  //    var taskinfo={
  //      task:task,
  //      date:date,
  //      uid:userid,
  //      displayName:displayName,
  //      email:email,
  //      familyName:familyName,
  //      givenName:givenName,
  //      imageUrl:imageUrl
  //     }
  //     //get assigned tasks
  //     this.onlinedata.getmyuidassignedtasks(myuid).subscribe(
  //       (response)=>{
  //         const data=JSON.stringify(response);
  //       this.Tasks=JSON.parse(data)
  //         console.log(response)
  //       },
  //       (err)=>console.log(err)
  //     );
  //     var tasks2
  //     if(this.Tasks==null)
  //      tasks2=[taskinfo];
  //     else
  //      tasks2=this.Tasks.push(taskinfo)

  //     //add assigned tasks
  //     this.onlinedata.savemyuidassignedtasks(myuid,tasks2).subscribe(
  //       (response)=>
  //           console.log(response),
  //       (err)=>console.log(err)
  //     )
  // }
