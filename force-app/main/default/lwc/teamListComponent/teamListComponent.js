import { LightningElement, wire ,api, track} from 'lwc';
import getTeamList from '@salesforce/apex/teamAppController.getTeamList';
import getTeamMemberList from '@salesforce/apex/teamAppController.getTeamMemberList';

export default class TeamListComponent extends LightningElement {
  memberRecords=[];
   recordList =[];
   @api teamValue;
   isDisplay = false;
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
    @api handleTeamChange(event){      
      this.teamValue = event.detail.value;
      this.isDisplay = true;
      this.getTemMembersList(this.teamValue);        
    }
     // print list of teammembers
     @api getTemMembersList(recordID){
       getTeamMemberList({teamRecordId : recordID})
        .then((data) =>{
         console.log('Data',data);
         this.isDisplay = true;
         this.memberRecords = data.map(type => {
          return {
             Id :  type.Id,
             Name : type.Name,
             TeamName : type.TeamName,
             Skills : type.Skills,
          };
         });
       console.log('member records ',this.memberRecords);
      }).catch((error) =>{
           console.log(error)
      })
     }

   /**
     * team change from parent
     */
     @api handleTeamChangeFromParent(){
     
      console.log('Actual team value',this.teamValue);
      this.getTemMembersList(this.teamValue);
      this.isDisplay = true;
     }

   //   @api hideTeamMembers(){
   //      this.isDisplay = false;
   //   }

     
}