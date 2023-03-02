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
    /*  get teamOptions(){
         console.log('check');
         return this.recordList;
      }*/

   handleClick(){
      console.log('Submit Function called');
   }
   handleTeamChange(event){
      this.teamValue = event.detail.value;
      console.log('On TeamMember child handle Team change');
      console.log('value',this.teamValue); 
      this.passteamvalue();     
   }
   passteamvalue(){
     // changeTeamvalue on parent
     const passEventr = new CustomEvent('teamselection', {
      detail: { selectedValue: this.teamValue }
   });
   this.dispatchEvent(passEventr);
   }
   handleSkillChange(event){
      this.skillValue = event.detail.value;
     // console.log('selected value changed');
    //  console.log('value',this.skillValue);
   }
   handleNameChange(event){
      this.nameValue = event.detail.value;
      // console.log('selected value changed');
     // console.log('value',this.nameValue);
   }
   handleSubmitClick(){
      // console.log('teamValue',this.teamValue);
      // console.log('nameValue',this.nameValue);
      // console.log('skillValue',this.skillValue);
      this.createTeamMembers();
      // trying to connect parent\
      console.log('On TeamMember child handleSubmitClick');
      let ev = new CustomEvent('submit');
      this.dispatchEvent(ev);
   }
   createTeamMembers(){
      console.log('Create method');
      createTeamMember({Name :this.nameValue ,Skills: this.skillValue ,TeamId :this.teamValue})
      .then((result) =>{
         this.setfieldsNull();
        //  alert('Record Created Successfully');          
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