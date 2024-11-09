const parseDate = (dateStr) => {
  const [month, day, year] = dateStr.split("/");
  return new Date(year, month - 1, day);
};

const filterTransactions = (filters) => {
  return transactions.filter((transaction) => {
    const transactionDate = parseDate(transaction.date);

    if (
      filters.date &&
      parseDate(filters.date).getTime() !== transactionDate.getTime()
    ) {
      return false;
    }

    if (
      filters.note &&
      !transaction.note.toLowerCase().includes(filters.note.toLowerCase())
    ) {
      return false;
    }

    if (filters.minAmount && Math.abs(transaction.amount) < filters.minAmount) {
      return false;
    }

    if (filters.maxAmount && Math.abs(transaction.amount) > filters.maxAmount) {
      return false;
    }

    if (filters.type) {
      const isIncome = transaction.amount > 0;
      if (
        (filters.type === "income" && !isIncome) ||
        (filters.type === "expense" && isIncome)
      ) {
        return false;
      }
    }

    return true;
  });
};

const initFilterCard = (dataArray, renderTransactions) => {
  document.getElementById("applyFilter").addEventListener("click", () => {
    const filters = {
      date: document.getElementById("filterDate").value,
      note: document.getElementById("filterNote").value.trim(),
      minAmount: parseFloat(document.getElementById("minAmount").value) || null,
      maxAmount: parseFloat(document.getElementById("maxAmount").value) || null,
      type: document.getElementById("transactionType").value,
    };

    const filteredTransactions = filterTransactions(filters);
    transaction = filterTransactions;
    dispalyTransactions();
  });
};
