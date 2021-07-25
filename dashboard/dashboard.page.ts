import { Component, OnInit } from '@angular/core';
import { NavController, AlertController } from '@ionic/angular';
import { LocaldataService } from '../services/localdata.service';
import { OnlinedatabaseService } from '../services/onlinedatabase.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {

  myuserid=this.local.getmyinfo()[2];
  userId = null;//used
  rahul=null;//notused
  boolforaccessingpeople=false;//notused
  people;//used  //it is the people of myuserid
  people2;//used //it is the people of userid
  userinfo=null;//used


  constructor(public navCtrl:NavController,public local:LocaldataService,public onlinedata:OnlinedatabaseService,public alertCtrl: AlertController,) { }
  
  //ngOnInit(){}
  ngOnInit() {
    this.onlinedata.getpeople(this.myuserid).subscribe(
      (response)=>{
        console.log(JSON.stringify(response));
        this.people=JSON.parse(JSON.stringify(response));
        console.log('this is people:'+this.people);
        if(!JSON.parse(JSON.stringify(response))){
          this.people=[];
          console.log('this is empty people json file from internet')
        }else{
          this.people=JSON.parse(JSON.stringify(response));
        }
      },
      (err)=>console.log("error in ngOnInit()"+err)
    )
  }
  
  

   async uploaddata(){
    const alert =  await this.alertCtrl.create({
      header: 'connect to ' + this.userinfo.displayName,
      message: this.userinfo.email,
      buttons: [{ text: 'Cancel', role: 'cancel' },
      {
        text: 'Connect', handler: data => {
          this.people.push(this.userinfo);
          this.people2.push(this.local.getnewmyinfo());
          this.onlinedata.savepeople(this.userId, this.people2).subscribe((response4) => console.log(response4), (err) => console.log(err));
          this.onlinedata.savepeople(this.myuserid, this.people).subscribe((resonponse3) => console.log(resonponse3), (err) => console.log(err));
          this.people2=[]
          this.userinfo=null;
        }
      }
      ]
    });
       alert.present();
      console.log("inside showalert()")
    
  }
  async showuser(){
    this.onlinedata.getinfo(this.userId).subscribe(
      (response2)=>{
        this.userinfo=JSON.parse(JSON.stringify(response2));
      },
      (err)=>console.log("error in showuser() in getinfo()"),
    )

    this.onlinedata.getpeople(this.userId).subscribe(
      (response)=>{
        console.log(JSON.stringify(response));
        this.people2=JSON.parse(JSON.stringify(response));
        console.log('this is people:'+this.people2);
        if(!JSON.parse(JSON.stringify(response))){
          this.people2=[];
          console.log('this is empty people json file from internet')
        }else{
          this.people2=JSON.parse(JSON.stringify(response));
        }
      },
      (err)=>console.log("error in showuser() in getpeople()"+err)
    )
    

    await this.uploaddata();
  }

  /* async getuseridinfoforrahul(userid:any){
    this.onlinedata.getinfo(userid).subscribe(
      ((response)=>{
         const data=JSON.stringify(response);
         console.log(data);
        this.rahul=JSON.parse(data);
        console.log('got info of '+this.rahul.displayName)
        //rahul is the info of other friends
      }),
      (err: string)=>console.log('mool1'+err));
  }
  
  async getpeopleforpeople(myuserid:any){
    var bool=true
    this.onlinedata.getpeople(this.myuserid).subscribe(
      (response)=>{
        let data2=JSON.stringify(response);
        console.log(data2);
        console.log('if null means my user id means rahul has no people either')
        this.people=JSON.parse(data2);//people are the peoples in myuserid
        //if no data in found inside people then save rahul in people
        if(this.people===null){
          this.people=[this.rahul];
        }
        //else push rahul inside people
        else{
          //start logic to find same peopel
          for (var i = 0; i < this.people.length; i++) {
            if (this.people[i]['email'] === this.rahul.email) {
              bool=false;
            }
          }
          //end
          if(bool){
            this.people.push(this.rahul);
          }
        }
      }),
      (err)=>console.log('mool2'+err)
    
    if(this.people===null){
      this.people=Array(this.rahul)
    }
    else if(bool){
      this.savemyinfoofpeople(this.myuserid,this.people,this.userid);
    }
    //save people inside the myuser id of other user
  }
  async savemyinfoofpeople(myuserid:any,people:any,userid:any){
    this.onlinedata.savepeople(this.myuserid,this.people).subscribe(
      await new Promise((response)=>{
        console.log(response);
      }),
      (err)=>{
        console.log('mool3');
        console.log(err);
      }
    );
  }

   saveinsidemyuserid(myuserid:any,userid:any){
    
    //getting info of other friend user id as rahul
    if(this.rahul===null){
      this.getuseridinfoforrahul(userid);
    }
    this.getpeopleforpeople(myuserid);
    //getting people from myuserid and saving it inside people
  }
  

  async saveinsidefirendsuserid(myuserid:any,userid:any){
    var bool=true;
    //get people of other friends user id 
    this.onlinedata.getpeople(this.userid).subscribe(
    ((response)=>{
        const data3=JSON.stringify(response);
        console.log(data3);
        console.log('if null it means userid has no people')
        this.people2=JSON.parse(data3);
        if(this.people2===null){
          this.people2=[this.myinfo];
        }
        else{
          
          //start logic to find same peopel
          for (var i = 0; i < this.people2.length; i++) {
            if (this.people2[i]['email'] === this.rahul.email) {
                bool=false;
            }
          }
          //end
          if(bool){
            this.people.push(this.rahul);
          }
        }
      }),
      (err)=>console.log('mool4'+err)
    );

    //save people in other user id
    this.onlinedata.savepeople(this.userid,this.people2).subscribe(
      (response)=>{ 
        console.log(response);
      },
      (err)=>{
        console.log('mool5');
        console.log(err);
      }
    );

  }

   createCode(){
    //getting myuserid and userid 
    this.myuserid=this.local.getmyinfo()[2];
    this.userid = this.input;
    if(this.myuserid===""){
      this.createCode();
    }
    this.saveinsidemyuserid(this.myuserid,this.userid)
    this.saveinsidefirendsuserid(this.myuserid,this.userid)
    console.log("this is people2:"+this.people2);
    //this.local.savepeople(this.onlinedata.getpeople(this.myuserid));
    //this.showpeople();
  }*/

  onefunction(){
    this.onlinedata.getpeople(this.myuserid).subscribe(
      (response)=>{
        console.log(JSON.stringify(response));
        this.people=JSON.parse(JSON.stringify(response));
        console.log('this is people:'+this.people);
        if(!JSON.parse(JSON.stringify(response))){
          this.people=[];
          console.log('this is empty people json file from internet')
        }else{
          this.people=JSON.parse(JSON.stringify(response));
        }
        this.onlinedata.getpeople(this.userId).subscribe(
          (response)=>{
            console.log(JSON.stringify(response));
            this.people2=JSON.parse(JSON.stringify(response));
            console.log('this is people:'+this.people2);
            if(!JSON.parse(JSON.stringify(response))){
              this.people2=[];
              console.log('this is empty people json file from internet')
            }else{
              this.people2=JSON.parse(JSON.stringify(response));
            }
            this.people.push(this.local.getnewmyinfo());
            

          },
          (err)=>console.log("error in showuser() in getpeople()"+err)
        )
      },
      (err)=>console.log("error in ngOnInit()"+err)
    )
    //next
    /*this.onlinedata.getinfo(this.userid).subscribe(
      (response2)=>{
        this.userinfo=JSON.parse(JSON.stringify(response2));




      },
      (err)=>console.log("error in showuser() in getinfo()"),
      this.people2.push(this.userinfo)
    )*/
    this.onlinedata.savepeople(this.userId,this.people).subscribe(
      (response4)=>{
        console.log(response4)
      


      },
      (err)=>console.log(err)
    );

    /*this.onlinedata.savepeople(this.myuserid,this.people2).subscribe( 
      (resonponse3)=>console.log(resonponse3),
      (err)=>console.log(err)
    );*/

  }

  
  /*
  onefunctiontrytwo()
  {
    this.onlinedata.getinfo(this.userid).subscribe(
      (response2)=>{
        const userinfo2=JSON.parse(JSON.stringify(response2));
        this.onlinedata.getpeople(this.myuserid).subscribe(
          (response)=>{
            /*console.log(JSON.stringify(response));
            this.people=JSON.parse(JSON.stringify(response));
            console.log('this is people:'+this.people);
            if(!JSON.parse(JSON.stringify(response))){
              this.people=[];
              console.log('this is empty people json file from internet')
            }else{
              this.people=JSON.parse(JSON.stringify(response));
            }
            if(!JSON.parse(JSON.stringify(response))){
              this.onlinedata.savepeople(this.userid,[].push(userinfo2)).subscribe(
                (response4)=>console.log(response4),
                (err)=>console.log(err)
              );
            }else{
              this.onlinedata.savepeople(this.userid,JSON.parse(JSON.stringify(response)).push(userinfo2).subscribe(
                (response4)=>console.log(response4),
                (err)=>console.log(err)
              )
        

            }


          },
          (err)=>console.log("error in ngOnInit()"+err)
        )

      },
      (err)=>console.log("error in showuser() in getinfo()"),
    )

  }
  */


}
