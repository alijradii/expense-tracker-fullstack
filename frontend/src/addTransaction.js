const initAddTransactionButton = (dataArray, renderTransactions) => {
  const button = document.getElementById("add-transaction-button");

  button.addEventListener("click", () => {
    console.log("clicked");
    const noteInput = document.getElementById("transaction-note");
    const dateInput = document.getElementById("transaction-date");
    const amountInput = document.getElementById("transaction-amount");

    const note = noteInput.value.trim();
    const date = new Date(dateInput.value);
    const amount = amountInput.value.trim();
    const type = isExpense ? "EXP" : "INC";

    if (!note) {
      setInputError(noteInput);
      return;
    }
    if (!amount || isNaN(parseInt(amount))) {
      setInputError(amountInput);
      return;
    }
    if (!date) {
      setInputError(dateInput);
      return;
    }
    const formattedDate = date.toISOString().split("T")[0];

    axios({
      method: "post",
      url: `http://localhost/expenseTracker/backend/api/createTransaction.php?id=${userId}`,
      data: new URLSearchParams({
        password,
        amount,
        type,
        date,
        note,
      }),
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    })
      .then((response) => {
        loadTransactions(userId, password);
        displayTransactions();
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  });
};

initAddTransactionButton();
