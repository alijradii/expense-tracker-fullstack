const removeElementButton = document.getElementById("remove-button");

removeElementButton.addEventListener("click", () => {
  removeActive = !removeActive;
  removeElementButton.classList.toggle("clicked");
  transactionButtons = Array.from(
    document.getElementsByClassName("transaction-button"),
  );

  transactionButtons.forEach((button) => {
    button.classList.toggle("hidden");
  });
});
