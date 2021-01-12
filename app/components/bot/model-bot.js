export default class ModelBot {
    constructor() {
        this.bot = localStorage.getItem("bot");
        this.chat = localStorage.getItem("chat");
    }

    get url() {
        return `https://api.telegram.org/bot${ this.bot }/sendMessage?chat_id=${ this.chat }&parse_mode=MarkdownV2&text=`;      
    }

    makeMessage(order) {
        console.log(order);
        const {name, surname, mail, qty, summary, date} = order;
        const str1 = `
*Date:* ${date.replace(/\./g, '\\-')}
*Name:* ${name}
*Surname:* ${surname}
*Mail:* ${mail}
*Qty:* ${qty}
*Summary:* ${summary} $
`;
        let str2 = "";
        for(let key in order) { 
            if (+key) {
                str2 += `●*Id*: ${order[key]["id"]}\n`;
                str2 += `   *Product*: ${order[key]["product"].toLowerCase().replace(/\-/g, '\\-')}\n`;
                str2 += `   *Eaches:* ${order[key]["count"]}\n`;
                str2 += `   *Price:* ${order[key]["price"]} $\n`;
            }


        }
        let str3 = str1 + '\n' + str2;
        let str4 = str3.replace(/\./g, '\\.');
        return str4;
    }

    sendMessage(msg) {
        const message = encodeURI(msg);
        fetch(`${ this.url }${ message }`);

    }


}