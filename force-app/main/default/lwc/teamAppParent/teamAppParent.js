import SystemModstamp from '@salesforce/schema/Account.SystemModstamp';
import { LightningElement } from 'lwc';

export default class TeamAppParent extends LightningElement {
    parentTeamValue;
    teamValue;
    handleTeamMemberRecordUpdate(){
       // debugger;
        this.teamValue =this.parentTeamValue;
        console.log('On Parent TeamMember Record Update new teamValue'+this.teamValue);
        this.template.querySelector("c-team-list-component").getTemMembersList(this.parentTeamValue);   
   //  this.template.querySelector("c-team-list-component").handleTeamChangeFromParent();   
    }

    // don not touch
    handlerParentTeamValueChange(event){
        // this.teamValue = null;
        // this.template.querySelector("c-team-list-component").hideTeamMembers();   

         this.parentTeamValue = event.detail.selectedValue;
         console.log('On Parnet ParentTeamValueChange parent team value',this.parentTeamValue);
    }

}