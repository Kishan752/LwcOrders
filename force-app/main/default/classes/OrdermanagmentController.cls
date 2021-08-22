public class OrdermanagmentController {

    
    @auraEnabled
    public static ResponseWrapper AccountData(String Idd){
        System.debug(Idd);
        ResponseWrapper wrapper=new ResponseWrapper();
        wrapper.orderDate=String.valueOf(Date.today());
        Account ac=[Select name,Credit_Limit__c,Default_Credit_days__c,Avaiblable_Credit__c,Payment_Methods__c from account where id =:Idd];
        String [] paymethods=ac.Payment_Methods__c.split(';');
        wrapper.AccName=ac.Name;
        wrapper.creditLimit=String.valueOf(ac.Credit_Limit__c);
        wrapper.creditDays=String.valueOf(ac.Default_Credit_days__c);
        wrapper.avbCreditLimit=String.valueOf(ac.Avaiblable_Credit__c);
        Schema.DescribeSObjectResult objSchema = Account.sObjectType.getDescribe();
        Map<String, Schema.SObjectField> fieldMap = objSchema.fields.getmap();
        List<Schema.Picklistentry>fld =fieldmap.get('Payment_Methods__c').getDescribe().getpicklistValues();
        String payments='Payment Methods :';
        
        for(Schema.Picklistentry pl : fld)
        {
            for(String pic:paymethods){
                if(pic==pl.getValue()){
                 payments+=' '+pl.getlabel();        
                }
            }
        }
        wrapper.paymentmethods=payments;
                
        
        return wrapper;
    }
    
   public class ResponseWrapper{
    @AuraEnabled
    public String orderDate;
    @AuraEnabled
    public String AccName;
    @AuraEnabled
    public String creditLimit;
    @AuraEnabled
    public String creditDays;
    @AuraEnabled
    public String avbCreditLimit;
    @AuraEnabled
    public String paymentmethods;
       
       
       
   }
    
}