import { api, LightningElement } from 'lwc';

export default class IncSelectionComp extends LightningElement {
    @api record;
    handleChange(event){
        let isChecked = event.target.checked;
        let payload={rec:this.record,check:isChecked};
        let clickEvent = new CustomEvent('incselect', { detail: payload });
        this.dispatchEvent(clickEvent);
    }

}