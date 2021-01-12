export default class ModelCart {
    constructor() {
        this.list = [];
        this.validatedRes = {};
        this.clientInfo = {};
        this.uniqList = new Set();
        this.renderList = [];
        this.confirmedOrder = [];
        this.qty = 0;
        this.sum = 0;
    }

    countGoods(arr) {
        this.qty = arr.reduce((acc, { count }) => {
            acc += count;
            return acc;
        }, 0);
    }

    countSummary(arr) {
        this.sum = arr.reduce((acc, {count, price}) => {
            acc += count * price;
            return acc;
        }, 0);
    }

    addProductToModel(prod) {
        this.list.push(prod);
        this.uniqList.add(prod);
    }

    addToCart() {
        this.renderList.length = 0;
        this.uniqList.forEach(el => {
            const count = this.list.reduce((c, prod) => prod === el ? ++c : c, 0);
            this.renderList.push({
                count, 
                ...el
            });
        });
    }

    deleteFromCart(productId) {
        this.list = this.list.filter(({ id }) => id !== + productId);
        this.uniqList.forEach((el) => {
            if(el.id === +productId) {
                this.uniqList.delete(el);
            }
        });  
    }

    countSummaryByQty(inputs) {
        inputs.forEach((item) => {
            this.renderList.forEach((item2) => {
                if(item2.id === +item.dataset.qty) {
                    item2.count = +item.value;
                }
            });
        });
    }

    confirmOrder() {
        this.confirmedOrder.length = 0;
        this.confirmedOrder = [...this.renderList];
        this.confirmedOrder.push({qty: this.qty, summary: this.sum});
    }

    validateFormSubmit(elementsForm) {
        for (let el of elementsForm) {
            if(el.classList.contains("text-inps")) {
                if(el.value === "") {
                    el.nextElementSibling.innerText = "Empty field. Please, insert value.";
                    el.classList.add("is-invalid");
                    this.validatedRes.emptyAll = false;
                } else {
                    el.nextElementSibling.innerText = "";
                    el.classList.remove("is-invalid");
                    this.validatedRes.emptyAll = true;
                }
            }
        }
    }

    validateForminputs(inp) {
        const nameReg = /^[a-zA-Zа-яА-Я]{4,16}$/;
        const surnameReg = /^[a-zA-Zа-яА-Я-]{4,16}$/;
        const mailReg = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

        if (inp.name === "name") {
            if(!nameReg.test(inp.value) && inp.value !== "") {
                inp.nextElementSibling.innerText = "Oops. The name should includes min 4 letters and max 16 letters without any other symbols.";
                inp.classList.add("is-invalid");
                this.validatedRes.validName = false;
            } else {
                inp.nextElementSibling.innerText = "";
                inp.classList.remove("is-invalid");
                this.validatedRes.validName = true;
                this.clientInfo.name = inp.value;
            }
        }

        if (inp.name === "surname") {
            if(!surnameReg.test(inp.value) && inp.value !== "") {
                inp.nextElementSibling.innerText = "Oops. The last name should includes min 4 letters and max 16 and `-` letters without any other symbols.";
                inp.classList.add("is-invalid");
                this.validatedRes.validSurname = false;
            } else {
                inp.nextElementSibling.innerText = "";
                inp.classList.remove("is-invalid");
                this.validatedRes.validSurname = true;
                this.clientInfo.surname = inp.value;
            }
            
        }

        if (inp.name === "mail") {
            if(!mailReg.test(inp.value) && inp.value !== "") {
                inp.nextElementSibling.innerText = "Oops. insert correct e-mail.";
                inp.classList.add("is-invalid");
                this.validatedRes.validMail = false;
            } else {
                inp.nextElementSibling.innerText = "";
                inp.classList.remove("is-invalid");
                this.validatedRes.validMail = true;
                this.clientInfo.mail = inp.value;
            }
        }
    }

    makeOrder() {
        let d = new Date().toLocaleString();
        let obj = {};
        this.confirmedOrder.forEach(item => {
            if(item.id) obj[item.id] = item;
            if(item.qty) obj.qty = item.qty;
            if(item.summary) obj.summary = item.summary;
        });

        obj = Object.assign(obj, this.clientInfo);
        obj.date = d;
        this.list = [];
        this.uniqList = new Set();
        this.renderList = [];
        this.confirmedOrder = [];
        return obj; 
    }

    cancelOrder() {
        this.list = [];
        this.uniqList = new Set();
        this.renderList = [];
        this.confirmedOrder = [];
    }

}