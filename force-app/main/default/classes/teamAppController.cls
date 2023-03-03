public with sharing class teamAppController {
    @AuraEnabled(cacheable = true)
    public static List<teamWrapper> getTeamList(){
        List<Team__c> teamList= [Select Id,Name From Team__c];
        List<teamWrapper> teamWrapperList = new List<teamWrapper>();
        for(Team__c team :teamList){
             teamWrapper tWrapper  = new  teamWrapper();
             tWrapper.teamId =team.Id;
             tWrapper.teamName = team.Name;
             teamWrapperList.add(tWrapper);
        }
        return teamWrapperList;

        // return [Select Id, Name From Team__c];
    }
    public class teamWrapper{
        @AuraEnabled public String teamId;
        @AuraEnabled public String teamName;
    }
    @AuraEnabled
    public static List<teamMemberWrapper> getTeamMemberList(Id teamRecordId){
        System.debug('getTeamMember Called');
        List<Team_Member__c> teamMemberList = [Select Id,Name,Team__r.Name,Skills__c From Team_Member__c where Team__c =: teamRecordId];
        System.debug('teamMemberList size'+teamMemberList.size());
        List<teamMemberWrapper> teamMemberWrapperList = new List<teamMemberWrapper>();
        for(Team_Member__c teamMember : teamMemberList){
            teamMemberWrapper tmw = new teamMemberWrapper();
            tmw.Id = teamMember.Id;
            tmw.Name = teamMember.Name;
            tmw.TeamName = teamMember.Team__r.Name;
            tmw.Skills = teamMember.Skills__c;
            teamMemberWrapperList.add(tmw);
        }
        return teamMemberWrapperList;
        
    }
    @AuraEnabled
    public static void createTeamMember(String Name,String Skills,String TeamId){
        System.debug('Name'+Name+''+Skills+''+TeamId);
        Team_Member__c newTeamMember = new Team_Member__c();
        newTeamMember.Name = Name;
        newTeamMember.Skills__c= Skills;
        newTeamMember.Team__c = TeamId;
        insert newTeamMember;
    }
    public class teamMemberWrapper{
         @AuraEnabled public String Id;
        @AuraEnabled public String Name;
        @AuraEnabled public String TeamName;
        @AuraEnabled public String Skills;
    }
}