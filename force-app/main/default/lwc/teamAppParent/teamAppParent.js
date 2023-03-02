import SystemModstamp from '@salesforce/schema/Account.SystemModstamp';
import { LightningElement } from 'lwc';

export default class TeamAppParent extends LightningElement {
    parentTeamValue;
    handleTeamMemberRecordUpdate(){
        console.log('On Parent TeamMember Record Updateeee'+this.parentTeamValue);
        this.template.querySelector("c-team-list-component").handleTeamChangeFromParent();
        //   .forEach(element => {
        //       console.log('checkstatus');
        //     element.teamValue = this.parentTeamValue;
        //     element.handleTeamChangeFromParent();
        // });         
    }
    handlerParentTeamValueChange(event){
        
        this.parentTeamValue = event.detail.selectedValue;
        console.log('On Parnet ParentTeamValueChange',this.parentTeamValue);
    }

}