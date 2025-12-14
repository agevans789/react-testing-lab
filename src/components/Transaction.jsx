import React from "react";

function Transaction({transaction}) {
  if (!transaction) {
    return null;
  }
  return (
    <tr data-testid='transaction'>
      <td data-testid='transaction-date'>{transaction.date}</td>
      <td data-testid='transaction-description'>{transaction.description}</td>
      <td data-testid='transaction-category'>{transaction.category}</td>
      <td data-testid='transaction-amount'>{transaction.amount}</td>
    </tr>
  );
}

export default Transaction;
