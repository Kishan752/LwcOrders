import { LightningElement,wire, api,track } from 'lwc';
import { publish, MessageContext } from 'lightning/messageService';
import BOATMC from '@salesforce/messageChannel/QuantityMessageChannel__c';

export default class TableRowProductsComp extends LightningElement {
    @api record;
    totalValue=0;
    @api quant=0;
    @api quanta;
    retrievedRecordId = false;
    recId;

    @wire(MessageContext)
    messageContext;
 

    handleChange(event){
        let value = event.target.value;
        this.quant=value;
        this.totalValue=value * this.record.Price;
        const payload = { pId: this.record.Id,quantity:value };
        publish(this.messageContext, BOATMC, payload);  
    
    }
    renderedCallback() {
        console.log('in render'+this.quant);
        console.log(this.quant);
        if(this.recId!=this.record.Id  ){
            console.log('updated rec id');
            this.quant=this.quanta;
            this.totalValue=this.quant * this.record.Price;
            //this.template.querySelector('.container').value=this.quanta;
            //this.template.querySelector('.container1').value=this.quanta;
            this.recId=this.record.Id;
        }
    }
    connectedCallback(){
        console.log('in connected callback');
        this.recId=this.record.Id;
    }
    /*constructor(){
        super();
        console.log('in constructor');
        
    }
    disconnectedCallback(){
        console.log('called disconnectedCallback()');
    }*/
}