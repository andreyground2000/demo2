export default class ModelGoods {
    constructor() {
        this.link = 'https://spreadsheets.google.com/feeds/cells/1PXorfz2O2NqH-FcW0nA-HhmtZMmSSwgHheifWc0e1tU/1/public/full?alt=json';
        this.goods = [];
        this.listOfAddedProducts = [];
        this.names = [
              {
                name : 'id',
                type : 'float'
              },
              { 
                name : 'product',
                type : 'string'
              }, 
              {
                name : 'manufacture',
                type : 'string'
              }, 
              {
                name : 'category',
                type : 'string'
              },
              {
                name : 'ingridients',
                type : 'string'
              },
              {
                name : 'amount',
                type : 'float'
              },
              {
                name : 'package',
                type : 'string'
              },
              {
                name : 'price',
                type : 'float'
              },
              {
                name : 'img',
                type : 'string'
              },
          ];
    }

    loadGoods() {
        return fetch(this.link)
        .then(r => r.json())
        .then(d => {
            this.goods = this.parseData(d.feed.entry);
            return this.goods;
        });
    }

    parseData(arr) {
        const correctArr = arr.slice(9);
        let shift = this.names.length;

        return correctArr.reduce((acc, { content }, i) => {
          const index = Math.floor(i / shift);
          const { name, type } = this.names[i % shift];
          if (!acc[index]){
                acc[index] = {};
              }
          acc[index][name] = this.parseContent(content.$t, type);  
          return acc;       
        }, []);
    }

    parseContent(content, type = 'string') {
        let answ = content;
        switch(type){
            case 'float' :{
                answ = +content;
                break;
            }
            default: {
                answ = content;
                break;
            }
        }
        return answ;
    }

    addListToCart(itemId) {
      return this.goods.find(({ id }) => id === +itemId );
    }
}