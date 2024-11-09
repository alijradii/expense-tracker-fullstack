const deleteTransaction = (id, element) => {
  axios({
    method: "post",
    url: `http://localhost/expenseTracker/backend/api/deleteTransaction.php?id=${userId}&transaction_id=${id}`,

    data: new URLSearchParams({
      password: password,
    }),
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  })
    .then((response) => {
      console.log("success");
      console.log(response);
      element.remove();
    })
    .catch((error) => {
      console.error("Error:", error);
      alert("An error occurred. Please try again.");
    });
};
