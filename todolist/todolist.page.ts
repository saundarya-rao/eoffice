import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { LocaldataService } from '../services/localdata.service';
import { OnlinedatabaseService } from '../services/onlinedatabase.service';

@Component({
  selector: 'app-todolist',
  templateUrl: './todolist.page.html',
  styleUrls: ['./todolist.page.scss'],
})
export class TodolistPage implements OnInit {

  taskList=[];
  todo;
  taskName: string ="";
  constructor(public alertCtrl: AlertController,public local:LocaldataService,public onlinedata:OnlinedatabaseService) { 
    this.taskList.push("write 7th practical");
    this.taskList.push("Install ionic");
    this.taskList.push("buy manual");
    this.taskList.push("write cn tutorial");
    
    
    
  }

  addTask(){
    if(this.taskName!=""){
      this.todo.push({task:this.taskName,state:true})
      this.taskName="";
      this.savetodo(this.todo);
      this.savetodolocal(this.todo)

    }
  }
  strip(i:any){
    this.todo[i].state=!this.todo[i].state;
    console.log(this.todo[i].state)
    this.savetodo(this.todo)
    this.savetodolocal(this.todo)


  }

  async updateTask(i:any) {
    const alert = await this.alertCtrl.create({
      header: 'Update Task?',
      message: 'Type in your new task to update.',
      inputs: [{ name: 'editTask', placeholder: 'Task' }],
      buttons: [{ text: 'Cancel', role: 'cancel' },
      {
        text: 'Update', handler: (data) => {
          this.todo[i].task=data.editTask;
          this.savetodo(this.todo);
          this.savetodolocal(this.todo)

        }
      }
      ]
    });
    await alert.present();
  }
  ngOnInit() {
    this.todo=this.local.gettodo();

  }
  deleteTask(i:any){
    this.todo.splice(i,1);
    this.savetodo(this.todo)
    this.savetodolocal(this.todo)
  }

  savetodo(data:Object){
    this.onlinedata.savetodo(this.local.getmyinfo()[2],data).subscribe(
      (response)=>console.log(response),
      (err)=>console.log(err)
    )
  }
  savetodolocal(data:Object){
    this.local.savetodo(data);
  }

}
