let transactions = [];
let isExpense = true;
let removeActive = false;

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

const deleteTransaction = (id, element) => {
  axios({
    method: "post",
    url: `http://localhost/expenseTracker/backend/api/deleteTransaction.php?id=${id}`,
    data: new URLSearchParams({
      password: password,
    }),
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  })
    .then((response) => {
      console.log("success");
      element.remove();
    })
    .catch((error) => {
      console.error("Error:", error);
      alert("An error occurred. Please try again.");
    });
};

const password = localStorage.getItem("password");
const userId = localStorage.getItem("id");

console.log(password);
console.log(userId);

loadTransactions(userId, password);
