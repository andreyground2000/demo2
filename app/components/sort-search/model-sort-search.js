export default class ModelSortSearch{
    constructor() {
        this.defGoods = [];
        this.goods = [];
        this.sortedCatGoods = [];
        this.sortedForDef = [];
    }

    sortCat(category) {
        const neededCategory = category;
        if (neededCategory === "All goods") {
            this.sortedCatGoods = [...this.defGoods];
            this.sortedForDef = [...this.defGoods];
            return this.defGoods;
        }

        this.sortedCatGoods = this.defGoods.filter(({ category }) => category.includes(neededCategory));
        this.sortedForDef = [...this.sortedCatGoods];
        return this.sortedCatGoods;
    }

    sortPrice(type) {
        if (type === "def") {
            if (this.sortedForDef.length === 0) {
                return this.defGoods;
            }
            return this.sortedForDef;
        }
        const sortMethods = {
            'exp' : (a, b) => +(b.price) - +(a.price),
            'cheap' : (a, b) => +(a.price) - +(b.price)
        };
        if (this.sortedCatGoods.length === 0) {
            this.goods.sort(sortMethods[type]);
            return this.goods;
        }
        this.sortedCatGoods.sort(sortMethods[type]);
        return this.sortedCatGoods;
    }

    search(text) {
        const textL = text.toUpperCase().trim();
        return this.defGoods.filter(({ product }) => product.includes(textL));
    }
}