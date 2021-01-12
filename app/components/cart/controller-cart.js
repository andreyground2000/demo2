import ViewCart from "./view-cart.js";
import ModelCart from "./model-cart.js";
import Observer from "../../helpers/observer.js";

export default class ControllerCart {
    constructor() {
        this.onLoad = this.onLoad.bind(this);
        this.onDel = this.onDel.bind(this);
        this.onCount = this.onCount.bind(this);
        this.onMakeOrder = this.onMakeOrder.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onCancel = this.onCancel.bind(this);
        this.onFormInputs = this.onFormInputs.bind(this);

        this.observer = new Observer();
        this.model = new ModelCart();
        this.view = new ViewCart(this.onDel, this.onCount, this.onMakeOrder, this.onSubmit, this.onFormInputs, this.onCancel);
        
        this.events = this.observer.events;
        this.notify = this.observer.notify;

        this.observer.subscribe(this.events.AFTER_ADD, this.onLoad ); 
    }


    onLoad(product) {
        this.model.addProductToModel(product);
        this.model.addToCart();
        this.view.renderCart();

        this.model.countGoods(this.model.renderList);
        this.view.counterGoods(this.model.qty);

        this.model.countSummary(this.model.renderList);
        this.view.renderList(this.model.renderList, this.model.sum);     
    }

    onDel(ev) {
        if(ev.target.dataset.del) {
            this.model.deleteFromCart(ev.target.dataset.del);
            this.model.addToCart();

            this.model.countGoods(this.model.renderList);
            this.view.counterGoods(this.model.qty);

            this.model.countSummary(this.model.renderList);
            if (this.model.renderList < 1) {
                this.view.renderEmptyCart();
            } else {
                this.view.renderList(this.model.renderList, this.model.sum); 
            }   
        }
    }

    onCount(ev) {
        const qtyInputs = document.querySelectorAll("#products-list input");
        this.model.countSummaryByQty(qtyInputs);

        this.model.countGoods(this.model.renderList);
        this.view.counterGoods(this.model.qty);

        this.model.countSummary(this.model.renderList);
        this.view.renderList(this.model.renderList, this.model.sum);

        this.model.confirmOrder();
    }

    onMakeOrder() {
        if(this.model.confirmedOrder.length < 1) {
            this.view.emptyOrder();
        } else {
            this.view.renderForm();
        }
    }

    onSubmit(ev) {
        ev.preventDefault();
        this.model.validateFormSubmit(this.view.form.elements);
        const {emptyAll, validName, validSurname,  validMail} = this.model.validatedRes;
        if (emptyAll && validName && validSurname && validMail) {
            const completeOrder = this.model.makeOrder();
            this.view.form.reset();
            this.view.renderEmptyCart();
            this.view.counterGoods(this.model.renderList.length);
            this.notify(this.events.AFTER_COMPLETE, completeOrder);
        }
    }

    onFormInputs(inp) {
        this.model.validateForminputs(inp);
    }

    onCancel() {
        this.model.cancelOrder();
        this.view.counterGoods(this.model.renderList.length);
        this.view.renderEmptyCart();
    }
}