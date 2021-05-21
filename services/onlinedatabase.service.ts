import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class OnlinedatabaseService {
  baseurl= "https://myplusauth-c848c.firebaseio.com/"

  private header=new HttpHeaders({'Content-Type':'application/json'});

  constructor(private http:HttpClient) { }

  saveinfo(products:any,userid:any){
    return this.http.put(this.baseurl+userid +'/info.json',products,{headers:this.header})
   }
  
  getinfo(myuid:any){
    return this.http.get(this.baseurl+myuid+'/info.json')
  }
  
  //People
  savepeople(myuid:any,data:any){
    return this.http.put(this.baseurl+myuid +'/people.json',data,{headers:this.header})
  }
  
  getpeople(myuid:any){
    return this.http.get(this.baseurl+myuid+'/people.json')
  }

  //mytasks Tasks

  getmytask(userid:any){
    return this.http.get(this.baseurl+userid+'/mytasks.json')
  }
 
  savemytask(userid:any,data:any){
    return this.http.put(this.baseurl+userid+'/mytasks.json',data,{headers:this.header})

  }

  //Assigned Tasks

  saveassignedtask(userid:any,data:any){
    return this.http.put(this.baseurl+userid+'/assignedtasks.json',data,{headers:this.header})
  }
  getassignedtask(userid:any){
    return this.http.get(this.baseurl+userid+'/assignedtasks.json')
  }

  // Review Tasks
  savereviewtasks(userid:any,data:any){
    return this.http.put(this.baseurl+userid+'/reviewtasks.json',data,{headers:this.header})
  }
  getreviewtasks(userid:any){
    return this.http.get(this.baseurl+userid+'/reviewtasks.json')
  }

  //Notifications
  savenotification(userid:any,data:any){
    return this.http.put(this.baseurl+userid+'/notifications.json',data,{headers:this.header})
  }
  getnotifications(userid:any){
    return this.http.get(this.baseurl+userid+'/notifications.json')
  }

  //To-do
  savetodo(userid:any,data:any){
    return this.http.put(this.baseurl+userid+'/todo.json',data,{headers:this.header})
  }
  gettodo(userid:any){
    return this.http.get(this.baseurl+userid+'/todo.json')
  }
  
}
