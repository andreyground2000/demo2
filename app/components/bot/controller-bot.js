import Observer from "../../helpers/observer.js";
import ModelBot from "./model-bot.js";

export default class ControllerBot {
    constructor() {
        this.onLoad = this.onLoad.bind(this);

        this.observer = new Observer();
        this.model = new ModelBot();
        this.observer.subscribe(this.observer.events.AFTER_COMPLETE, this.onLoad);
    }

    onLoad(order) {
        const message = this.model.makeMessage(order);
        this.model.sendMessage(message);   
    }
}