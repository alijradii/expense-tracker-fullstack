let removeActive = false;
let transactions = [];

const displayTransactions = () => {
  const transactionsList = document.getElementById("transactions-list");
  transactionsList.innerHTML = "";

  transactions.forEach((transaction, index) => {
    const element = document.createElement("div");
    element.classList.add("transaction");
    element.setAttribute("id", `transaction-${"id"}`);
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
      transactions = transactions.filter((t) => transaction.id !== t.id);
      localStorage.setItem("transactions", JSON.stringify(transactions));
      renderTransactions(transactions);
    });

    element.appendChild(button);

    transactionsList.appendChild(element);
  });
};

const loadTransactions = (id, password) => {
  axios({
    method: "post",
    url: `http://localhost/expenseTracker/backend/api/getTransactions.php?id=${id}`,
    data: new URLSearchParams({
      password: password,
    }),
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  })
    .then((response) => {
      console.log(response.data);
      transactions = response.data.transactions;
      displayTransactions();
    })
    .catch((error) => {
      console.error("Error:", error);
      alert("An error occurred. Please try again.");
    });
};

loadTransactions(1, "ingodwetrust");
