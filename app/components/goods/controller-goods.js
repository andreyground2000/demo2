import Observer from "../../helpers/observer.js";
import  ModelGoods  from "./model-goods.js";
import  ViewGoods from "./view-goods.js";


export default class ControllerGoods {
    constructor() {
        this.onAdd = this.onAdd.bind(this);
        this.onSortSearch = this.onSortSearch.bind(this);

        this.observer = new Observer();
        this.view = new ViewGoods();
        this.model = new ModelGoods();

        this.init();

        this.notify = this.observer.notify;
        this.events = this.observer.events;

        this.observer.subscribe(this.events.AFTER_SORT, this.onSortSearch);
        this.observer.subscribe(this.events.AFTER_SEARCH, this.onSortSearch);
    }
    
    init() {
        this.model.loadGoods()
        .then(d => {
            this.view.render(d, this.onAdd);
            this.notify(this.events.LOADED_DATA, d);
        });
    }

    onSortSearch(data)  {
        this.view.render(data, this.onAdd);
    }

    onAdd(ev) {
        const addedProduct = this.model.addListToCart(ev.target.dataset.add);
        this.notify(this.events.AFTER_ADD, addedProduct);
    }
}