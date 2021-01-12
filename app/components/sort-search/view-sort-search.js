export default class ViewSortSearch {
  constructor(cbSortCat, cbSortPrice, cbSearch){
      this.htmlHeader = document.querySelector('header');
      this.htmlHeader.insertAdjacentHTML('beforeend', `
      <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <div class="container">
        <a class="navbar-brand" href="#">SuperShop</a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarTogglerDemo02">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <div class="dropdown">
                <button class="btn btn-secondary" type="button"  data-bs-toggle="dropdown" aria-expanded="false">
                  Categories
                </button>
                <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton" id="сategoriesSort">
                  <li><span class="dropdown-item dropdown-span-hover" data-category="All goods">All goods</span></li>
                  <li><span class="dropdown-item dropdown-span-hover" data-category="Beverages">Beverages</span></li>
                  <li><span class="dropdown-item dropdown-span-hover" data-category="Tea & Coffee">Tea & Coffee</span></li>
                  <li><span class="dropdown-item dropdown-span-hover" data-category="Dairy, Eggs & Cheese">Dairy, Eggs & Cheese</span></li>
                  <li><span class="dropdown-item dropdown-span-hover" data-category="Meat & Seafood">Meat & Seafood</span></li>
                  <li><span class="dropdown-item dropdown-span-hover" data-category="Grains, Pasta & Sides">Grains, Pasta & Sides</span></li>
                  <li><span class="dropdown-item dropdown-span-hover" data-category="Sauces">Sauces</span></li>
                  <li><span class="dropdown-item dropdown-span-hover" data-category="Bread & Bakery">Bread & Bakery</span></li>
                  <li><span class="dropdown-item dropdown-span-hover" data-category="Snacks">Snacks</span></li>
                  <li><span class="dropdown-item dropdown-span-hover" data-category="Sweets">Sweets</span></li>
                  <li><span class="dropdown-item dropdown-span-hover" data-category="Fruits & Vegetables">Fruits & Vegetables</span></li>
                </ul>
              </div>
            </li>
            <li>
              <div class="dropdown">
                <button class="btn btn-secondary" type="button"  data-bs-toggle="dropdown" aria-expanded="false">
                  Prices
                </button>
                <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton" id="priceSort">
                  <li><span class="dropdown-item dropdown-span-hover" data-price="def">Default order</span></li>
                  <li><span class="dropdown-item dropdown-span-hover" data-price="exp">Expansive first</span></li>
                  <li><span class="dropdown-item dropdown-span-hover" data-price="cheap">Cheap first</span></li>
                </ul>
              </div>
            </li>
            <li>
                <button class="btn btn-secondary" type="button" id="cartBtn" data-bs-toggle="modal" data-bs-target="#cart">
                  Cart (0) 
                </button>
            </li>
            <li>
                <button class="btn btn-secondary" type="button" id="orderHistory" data-bs-toggle="modal" data-bs-target="#history">
                  History
                </button>
              </li>
          </ul>
          <form class="d-flex">
            <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search" id="searchInp">
            <button class="btn btn-outline-success" type="button" id="searchBtn">Search</button>
          </form>
        </div>
      </div>
    </nav> `);

    this.sortCategoriesList = document.querySelector("#сategoriesSort");
    this.sortCategoriesList.addEventListener("click", cbSortCat);

    this.sortPricesList = document.querySelector("#priceSort");
    this.sortPricesList.addEventListener("click", cbSortPrice);

    this.searchBtn = document.querySelector("#searchBtn");
    this.searchInp = document.querySelector("#searchInp");
    this.searchBtn.addEventListener("click", cbSearch);
    
  }
}