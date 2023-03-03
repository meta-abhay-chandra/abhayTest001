import { LightningElement, wire,api } from 'lwc';
import getTeamList from '@salesforce/apex/teamAppController.getTeamList';
import createTeamMember from '@salesforce/apex/teamAppController.createTeamMember';


export default class TeamMemberChild extends LightningElement {
   recordList =[];
   nameValue;
   teamValue;
   skillValue;
    @wire(getTeamList)
      wiredDate({data, error}){
         if(data){
            this.recordList = data.map(type => {
               return {
                  label : type.teamName,
                  value : type.teamId,
               };
            });
            console.log(this.recordList);
         }else if(error){
             console.log(error);
         }
      }
   // handleClick(){
   //    console.log('Submit Function called');
   // }
   handleTeamChange(event){
      this.teamValue = event.detail.value;
      console.log('this.teamValue',this.teamValue);
      this.passteamvalue();     
   }
   passteamvalue(){    
     const passEventr = new CustomEvent('teamselection', {
      detail: { selectedValue: this.teamValue }
   });
   this.dispatchEvent(passEventr);
   }
   
   handleSubmitClick(){
      debugger;
      this.createTeamMembers();
      console.log('On TeamMember child handleSubmitClick');
      let ev = new CustomEvent('submit');
      this.dispatchEvent(ev);
   }


   // do no touch these function
   handleSkillChange(event){
      this.skillValue = event.detail.value;
   }
   handleNameChange(event){
      this.nameValue = event.detail.value;
   }
   createTeamMembers(){
      console.log('Create method');
      createTeamMember({Name :this.nameValue ,Skills: this.skillValue ,TeamId :this.teamValue})
      .then(() =>{
         this.setfieldsNull();      
      }).catch((error) =>{
          alert('Error');
      })
   }
   setfieldsNull(){
      this.teamValue  =null;
      this.nameValue  =null;
      this.skillValue =null;
   }

}