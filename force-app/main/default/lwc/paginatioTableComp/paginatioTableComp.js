import { LightningElement,track,api } from 'lwc';

export default class PaginatioTableComp extends LightningElement {
    @track myheaders=['Name','Price','Quantity','Total Value'];
    @api accountdata;
    isRender=false;
    a=0;
    @api total;
    connectedCallback(){
        this.isRender=true;
    }
}