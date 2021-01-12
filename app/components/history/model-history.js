export default class ModelHistory {
    constructor() {
        if(localStorage.getItem("history") !== null) {
            this.historyArr = JSON.parse(localStorage.getItem("history"));
        } else {
            this.historyArr = [];
        }  
       
    }

    addHistoryToStorage(order) {
        this.historyArr.push(order);
        localStorage.setItem("history", JSON.stringify(this.historyArr));
    }
}