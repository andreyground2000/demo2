import events from "./events.js";

export default class Observer {
    constructor() {
        if (typeof Observer.instance === 'object') return Observer.instance;

        this.listeners = {};
        this.events = events;
        this.getListeners = this.getListeners.bind(this);
        this.subscribe = this.subscribe.bind(this);
        this.unsubscribe = this.unsubscribe.bind(this);
        this.notify = this.notify.bind(this);

        Observer.instance = this;
        return this;
    }

    subscribe(eventType, listener)  {
        this.getListeners(eventType).push(listener);
    }
        
    unsubscribe(eventType, listener)  {
        this.listeners[eventType] = this.getListeners(eventType).filter(func => func != listener);
    }

    notify(eventType, data)  {
        this.getListeners(eventType).forEach(listener => listener(data));
    }

    getListeners (eventType)  {
        if(!this.listeners[eventType]){
            this.listeners[eventType] = [];
        }

        return this.listeners[eventType];
    }

}