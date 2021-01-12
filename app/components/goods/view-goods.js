export default class ViewGoods{
    constructor() {
        this.listingsContainer = document.querySelector("#listings-container");
    }

    render(arr, cbOnAdd) {
        this.listingsContainer.innerHTML = arr.map(this.renderCard).join('');
        this.addButtons = document.querySelectorAll(".btn-add-to-cart");
        this.addButtons.forEach(item => {
            item.addEventListener("click", cbOnAdd);
        });
    }

    renderCard ({ id, category, product, price, ingridients, img }) {
        const bigL = product[0].toUpperCase();
        const productName = `${bigL}${product.slice(1).toLowerCase()}`;
        return ` 
<div class="col"> 
    <div class="card text-center"> 
        <img src="${ img }"> 
        <div class="card-body h-100"> 
            <h6 class="card-title">${ productName }</h6> 
            <p class="card-subtitle mb-2 text-muted">${id}</p> 
            <div class="text-start"> 
            <p class="card-text"><strong>Category: </strong>${category}</p> 
            <p class="card-text"><strong>Price: </strong>$ ${price}</p> 
            <div class="accordion accordion-flush" id="accordionFlushExample"> 
                <div class="accordion-item"> 
                <h2 class="accordion-header" id="flush-headingOne"> 
                    <button class="accordion-button collapsed accordion-btn-p" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapse-${id}" aria-expanded="false" aria-controls="flush-collapseOne"> 
                    Product details 
                    </button> 
                </h2> 
                <div id="flush-collapse-${id}" class="accordion-collapse collapse" aria-labelledby="flush-headingOne" data-bs-parent="#accordionFlushExample"> 
                    <div class="accordion-body accordion-p"><strong>Ingridients: </strong>${ingridients.toLowerCase()}</div> 
                </div> 
                </div> 
            </div> 
            <button class="btn btn-secondary btn-add-to-cart" type="button" data-add="${id}">Add to cart</button> 
            </div> 
        </div> 
    </div> 
</div> `; 
    } 
}