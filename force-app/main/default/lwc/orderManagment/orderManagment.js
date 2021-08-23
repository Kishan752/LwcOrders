import { api, LightningElement, track } from 'lwc';
import AccountData from '@salesforce/apex/OrdermanagmentController.AccountData';

export default class OrderManagment extends LightningElement {

    @api recordId;
    @track recData;
    render=false; 
    isLoading=false;
    recCount;
    @track data=[];
    @track productdata=[];
    renderTable=false;
    total=0;

    retrievedRecordId = false;

    renderedCallback() {
        console.log(this.recordId);
        if (!this.retrievedRecordId && this.recordId) {
            
            this.retrievedRecordId = true; // Escape case from recursion
            console.log('Found recordId: ' + this.recordId);
             this.handleCallack();
        }
    }
   
    connectedCallback(){
        console.log(this.recordId);
        this.isLoading=true;
     
    }
    
     handleCallack(){
       console.log(this.recordId);
        AccountData({Idd:this.recordId
        }).then(data =>{
           console.log(JSON.stringify(data));
           this.recData=data;
           for(let i=0;i<data.products.length;i++){
               let d={
                   Id:data.products[i].Id,
                   Name:data.products[i].Name,
                   Price:data.products[i].Unit_Price__c,
                   Quantity:0
               };
               this.productdata.push(d);
           }
           this.recCount=this.recData.products.length; 
           this.isLoading=false;
           this.render=true;
        }).catch(error =>{

        });

    }
    handleSyncData(event){
        console.log('Handling sync');
        console.log(JSON.stringify(event.detail));
        this.renderTable=false;
        this.data=[];
        this.data=event.detail;
        this.renderTable=true;
    
    }

    handletotal(event){
        this.total=event.detail;
    }

   
}