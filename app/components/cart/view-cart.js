export default class ViewCart {
    constructor(cbDel, cbCount, cbMakeOrder, cbSubmitOrder, cbFormInputs, cbCancel) {
      this.cbOnDel = cbDel;
      this.cbCount = cbCount;
      this.cbMakeOrder = cbMakeOrder;
      this.cbSubmitOrder = cbSubmitOrder;
      this.cbFormInputs = cbFormInputs;
      this.cbCancel = cbCancel;
      
      this.modalContainer = document.querySelector(".modal-windows");
      this.cartBtn = document.querySelector("#cartBtn");
  
      this.modalContainer.innerHTML = `
<div class="modal fade" id="cart" tabindex="-1" aria-labelledby="exampleModalLabel" data-bs-backdrop="static"  aria-hidden="true">
  <div class="modal-dialog modal-lg">
    <div class="modal-content cart-inside">
    </div>
  </div>
</div> `;
      this.cartContent= document.querySelector(".cart-inside");
      this.renderEmptyCart();
  }

    counterGoods(qty) {
        this.cartBtn.innerText = `Cart (${qty})`;
    }

    renderEmptyCart() {
      this.cartContent.innerHTML = `      
<div class="modal-header">
    <h5 class="modal-title" id="exampleModalLabel">Cart</h5>
    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
</div>
<div class="modal-body">
    <h6>Your cart is empty, please, choose some products.</h6>
</div>
<div class="modal-footer">
    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
</div>`;
    }

    renderCart() {
        this.cartContent.innerHTML = `
        <div class="modal-header">
          <h5 class="modal-title">Cart</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <ol id="products-list"></ol>
        </div>
        <div class="modal-footer">
          <button type="button" id="countSum" class="btn btn-info">Count/confirm order</button>
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
          <button type="button" class="btn btn-primary" id="order">Make order</button>
        </div> `;
        this.productsList = document.querySelector("#products-list");
        this.productsList.addEventListener("click", this.cbOnDel);
        
        this.countSum = document.querySelector("#countSum");
        this.countSum.addEventListener("click", this.cbCount);
        
        this.makeOrder = document.querySelector("#order");
        this.makeOrder.addEventListener("click", this.cbMakeOrder);
    }

    renderList(listGoods, sum) {
        const list = document.querySelector("#products-list");
        list.innerHTML = "";
        listGoods.forEach(({id, product, manufacture, price, count}) => {
            const bigL = product[0].toUpperCase();
            const productName = `${bigL}${product.slice(1).toLowerCase()}`;
            const listItem = document.createElement("li");
            listItem.innerHTML = `
            <p><b>${productName}</b></p>
            <p>${id}</p>
            <p>${manufacture}</p>
            <p>$ ${price}</p>
            Qty: <input data-qty="${id}" value="${count}"> 
            <button data-del="${id}" type="button" class="btn btn-danger btn-sm">delete</button> `;
            list.append(listItem);   
        });

        const sumLi = document.createElement("li");
        sumLi.classList.add("sumLi");
        sumLi.innerHTML = `<h6>Summary: ${sum} $</h6>`;
        list.append(sumLi);
    }

    emptyOrder() {
        const sumLi = document.querySelector(".sumLi");
        sumLi.innerHTML = "";
        sumLi.innerHTML = "<h6>You didn't confirm order.</h6>";
    }

    renderForm() {
        this.cartContent.innerHTML = `         
<div class="modal-header">
  <h5 class="modal-title">Form</h5>
</div>
<div class="modal-body">
  <form id="order-form">
    <div class="mb-3">
      <label for="validationCustom01" class="form-label">First name</label>
      <input type="text" class="form-control text-inps" name="name" id="validationCustom01">
      <div class="invalid-feedback"></div>
    </div>
    <div class="mb-3">
      <label for="validationCustom02" class="form-label">Last name</label>
      <input type="text" class="form-control text-inps" name="surname" id="validationCustom02">
      <div class="invalid-feedback"></div>
    </div>         
    <div class="mb-3">
      <label for="exampleInputEmail1" class="form-label">Email address</label>
      <input type="email" class="form-control text-inps mail" name="mail" id="exampleInputEmail1" aria-describedby="emailHelp">
      <div class="invalid-feedback"></div>
    </div>
    <button type="submit" class="btn btn-primary">Submit</button>
    <button type="button" id="cancel-form" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
  </form>
</div>
`; 

    this.form = document.querySelector("#order-form");
    this.form.addEventListener("submit", this.cbSubmitOrder);

    this.cancelForm = document.querySelector("#cancel-form");
    this.cancelForm.addEventListener("click", this.cbCancel);

    for (let el of this.form.elements) {
      if(el.classList.contains("text-inps")) {
        el.addEventListener("input", () => this.cbFormInputs(el));
      }
    }

  }
    
}