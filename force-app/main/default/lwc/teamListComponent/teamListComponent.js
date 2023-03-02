import { LightningElement, wire ,api} from 'lwc';
import getTeamList from '@salesforce/apex/teamAppController.getTeamList';
import getTeamMemberList from '@salesforce/apex/teamAppController.getTeamMemberList';

export default class TeamListComponent extends LightningElement {
   @api memberRecords=[];
   @api recordList =[];
   @api teamValue;
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
    handleTeamChange(event){
       // console.log(' On teamList Component handle team change');
        this.teamValue = event.detail.value;
      //   console.log('selected value changed');
      //   console.log('value',this.teamValue);
      this.getTemMembersList();
        
     }
     // print list of teammembers
     getTemMembersList(){
       getTeamMemberList({teamRecordId : this.teamValue})
        .then((data) =>{
         console.log('Data',data);
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
      console.log(' On teamList Component handleTeamChangeFromParent');
      console.log('value',this.teamValue);
      this.getTemMembersList();
     }
     
}