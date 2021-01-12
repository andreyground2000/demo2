import ViewSortSearch from "./view-sort-search.js";
import ModelSortSearch from "./model-sort-search.js";
import Observer from "../../helpers/observer.js";

export default class ControllerSortSearch{
    constructor() {
        this.onLoad = this.onLoad.bind(this);
        this.sortByCategories = this.sortByCategories.bind(this);
        this.sortByPrice = this.sortByPrice.bind(this);
        this.onSearch = this.onSearch.bind(this);

        this.obserever = new Observer();
        this.view = new ViewSortSearch(this.sortByCategories, this.sortByPrice, this.onSearch);
        this.model = new ModelSortSearch();

        this.notify = this.obserever.notify;
        this.events = this.obserever.events;

        this.obserever.subscribe(this.events.LOADED_DATA, this.onLoad);

    }

    onLoad(data) {
        this.model.defGoods = data;
        this.model.goods = [...this.model.defGoods];
        this.sortedCatGoods = [];
        this.sortedForDef = [];
    }

    sortByCategories(ev) {
        const sortedGoodsCat = this.model.sortCat(ev.target.dataset.category);
        this.notify(this.events.AFTER_SORT, sortedGoodsCat);
    }

    sortByPrice(ev) {
        const sortedGoodsPr = this.model.sortPrice(ev.target.dataset.price);
        this.notify(this.events.AFTER_SORT, sortedGoodsPr);
    }

    onSearch() {
        const searchedGoods = this.model.search(this.view.searchInp.value);
        this.notify(this.events.AFTER_SEARCH, searchedGoods);
        this.view.searchInp.value = "";
    }

}