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

loadTransactions(userId, password);
