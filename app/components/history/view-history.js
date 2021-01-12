export default class ViewHistory {
    constructor(historyArr) {
        this.modalContainer = document.querySelector(".modal-windows");
        this.modalContainer.insertAdjacentHTML("beforeend", `
<div class="modal fade" id="history" tabindex="-1" aria-labelledby="exampleModalLabel" data-bs-backdrop="static"  aria-hidden="true">
  <div class="modal-dialog modal-xl">
    <div class="modal-content history-inside">
    </div>
  </div>
</div>`);
        this.historyContent = document.querySelector(".history-inside");

        if(historyArr.length < 1) {
            this.renderEmptyHistory();
        } else {
            this.renderHistory();
            this.renderHistoryList(historyArr);
        }
    }

    renderEmptyHistory() {
        this.historyContent.innerHTML = `      
        <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Order history</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
            <h6>Unfortunately you haven't made any purchases.</h6>
        </div>
        <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        </div>`; 
    }

    renderHistory() {
        this.historyContent.innerHTML = `
        <div class="modal-header">
          <h5 class="modal-title">History</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <ol id="history-list">history</ol>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        </div> `;
    }

    renderHistoryList(arr) {
        const historyList = document.querySelector("#history-list");
        historyList.innerHTML = "";
        console.log(arr);
        arr.forEach(item => {
            const listItem = document.createElement("li");
            for(let key in item) {
                
                if (+key) {
                    listItem.insertAdjacentHTML("beforeend", `
                    <p class = "beforeProd"><strong>${item[key]["product"]}</strong></p>
                    <p>id: ${item[key]["id"]}</p>
                    <p>price: ${item[key]["price"]} $</p>
                    <p>package: ${item[key]["package"]}</p>
                    <p>qty: ${item[key]["count"]}</p>
                    `);
                }
                if (key === `qty`) {
                    listItem.insertAdjacentHTML("beforeend", `
                    <p><strong>Main qty: ${item.qty}</strong></p>
                    `);
                }
                if (key === `summary`) {
                    listItem.insertAdjacentHTML("beforeend", `
                    <p><strong>Summary: ${item.summary} $</strong></p>
                    `);
                }
                if (key === `date`) {
                    listItem.insertAdjacentHTML("afterbegin", `
                    <p><strong>Date: ${item.date}</strong></p>
                    `);
                }

            }
            listItem.classList.add("brd");
            historyList.append(listItem);
        });

    }
}