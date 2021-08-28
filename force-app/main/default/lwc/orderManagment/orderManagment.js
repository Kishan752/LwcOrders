import { api, LightningElement, track } from 'lwc';
import AccountData from '@salesforce/apex/OrdermanagmentController.AccountData';
import saveData from '@salesforce/apex/OrdermanagmentController.saveData';
import submitData from '@salesforce/apex/OrdermanagmentController.submitData';

export default class OrderManagment extends LightningElement {

    @api recordId;
    @track recData;
    render=false; 
    isLoading=false;
    recCount;
    @track data=[];
    @track productdata=[];
    @track incdata=[];
    renderTable=false;
    total=0;
    renderIncData=false;
    @track inc=[];
    @track orderProducts=[]

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

    handleSave(){
        this.orderProducts=this.template.querySelector("c-generic-pagination").getorderedProduct();
       console.log('Saving');
       console.log(JSON.stringify(this.orderProducts));
       saveData({productJson:JSON.stringify(this.orderProducts),Idd:this.recordId
       }).then(data =>{
        console.log(JSON.stringify(data));
        this.incdata=data;   
        this.render=false;
        this.renderIncData=true; 
    }).catch(error =>{

    });
    }

    handletotal(event){
        this.total=event.detail;
    }

    IncSelected(event){


     if(event.detail.check){
        this.inc.push(event.detail.rec); 
     }
     else{
        this.inc= this.inc.filter(el => el.Id !== event.detail.rec.Id);  
     }

     console.log(JSON.stringify(this.inc));
        

      /*  let index=-1;
      for(let i=0;i<this.inc.length;i++){
           if(this.inc.Id == event.detail.rec.Id){
            index=i;
           }
      }

      if(index == -1 && event.detail.check ){
        this.inc.push(event.detail);
      }
      else if(index!=-1 && event.detail.check ){
        this.inc[index]=event.detail.rec;
      }
      else if(index!=-1 && !event.detail.check ){
        //this.inc[index]=event.detail.rec;
        this.familyInfo= this.familyInfo.filter(el => el.Id !== val);
      }*/

    }

    handleSubmit(){
        submitData({productJson:JSON.stringify(this.orderProducts),
            Idd:this.recordId,
            incJSON:JSON.stringify(this.inc)
        }).then(data =>{



        }).catch(error =>{

        });


    }

   
}