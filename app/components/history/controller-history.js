import ViewHistory from "./view-history.js";
import ModelHistory from "./model-history.js";
import Observer from "../../helpers/observer.js";

export default class ControllerHistory {
    constructor() {
        this.onLoad = this.onLoad.bind(this);

        this.observer = new Observer();
        this.model = new ModelHistory();
        this.view = new ViewHistory(this.model.historyArr);

        this.observer.subscribe(this.observer.events.AFTER_COMPLETE, this.onLoad);
    }

    onLoad(order) {
        this.model.addHistoryToStorage(order);
        this.view.renderHistory();
        this.view.renderHistoryList(this.model.historyArr);
    }

}