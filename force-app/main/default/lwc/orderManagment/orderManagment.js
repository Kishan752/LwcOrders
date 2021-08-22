import { api, LightningElement, track } from 'lwc';
import AccountData from '@salesforce/apex/OrdermanagmentController.AccountData';

export default class OrderManagment extends LightningElement {

    @api recordId;
    @track recData;
    render=false; 
    isLoading=false;

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
           this.isLoading=false;
           this.render=true;
        }).catch(error =>{

        });

    }

   
}