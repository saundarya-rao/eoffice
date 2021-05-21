import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocaldataService {

  
    myinfo=null;
    email=""
    displayname=""
    userId=""
    imageurl=""
  
    people=null;
    assignedtasks=null;
    mytasks=null;
    reviewtasks=null;
    notifications=null;
    todo=null;
  constructor() { }

  //TODO
  savetodo(todo:Object){
    this.todo=todo;
  }
  gettodo(){
    return this.todo;
  }

  //NOTIFICATIONS
  savenotifications(notifications:Object){
    this.notifications=notifications;
  }
  getnotifications(){
    return this.notifications;
  }

  //MY REVIEW TASKS
  savereviewtasks(reviewtasks:Object){
    this.reviewtasks=reviewtasks;
  }
  getreviewtasks(){
    return this.reviewtasks;
  }

  // MY TASKS
  savemytasks(mytasks:Object){
    this.mytasks=mytasks;
  }
  getmytasks(){
    return this.mytasks;
  }

  //MY INFO
  getmyinfo(){
    return [this.email,this.displayname,this.userId,this.imageurl];
  }
  getnewmyinfo(){
    return this.myinfo
  }
  savejsonmyinfo(myinfo:any){
    this.myinfo=myinfo;
  }
  savemyinfo(email:any,displayname:any,userid:any,imageurl:any){
    this.email=email;
    this.userId=userid;
    this.imageurl=imageurl;
    this.displayname=displayname;
  }

  //MY PEOPLE
  savepeople(info:Object){ 
    this.people=info;
  }
  
  getpeople(){
    return this.people
  }
  //MY ASSIGNED TASKS
  saveassignedtask(task:Object){
    this.assignedtasks=task;
  }
  getassignedtask(){
    return this.assignedtasks;
  }
}
