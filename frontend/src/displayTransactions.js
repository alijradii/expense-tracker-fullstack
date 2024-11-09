const displayTransactions = () => {
  const transactionsList = document.getElementById("transactions-list");
  transactionsList.innerHTML = "";

  transactions.forEach((transaction, index) => {
    const element = document.createElement("div");
    const id = transaction.id;
    element.classList.add("transaction");
    element.setAttribute("id", `transaction-${id}`);
    element.innerHTML = `
      <h3 class="grow2">${transaction["note"]}</h3>
      <h3 class="grow1">${transaction["amount"]}</h3>
      <h3 class="grow1 text-align-right">${transaction["date"]}</h3>
    `;

    const button = document.createElement("button");
    button.setAttribute(
      "class",
      `transaction-button ${removeActive ? "" : "hidden"}`,
    );

    button.innerHTML = `<i class="fa fa-trash text-color-black"></i>`;
    button.addEventListener("click", () => {
      deleteTransaction(id, element);
    });

    element.appendChild(button);

    transactionsList.appendChild(element);
  });
};
