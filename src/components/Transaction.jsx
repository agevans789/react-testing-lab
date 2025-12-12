import React from "react";

function Transaction({transaction}) {
  return (
    <tr data-testid='transaction'>
      <td data-testid='date'>{transaction.date}</td>
      <td data-testid='description'>{transaction.description}</td>
      <td data-testid='category'>{transaction.category}</td>
      <td date-testid='amount'>{transaction.amount}</td>
    </tr>
  );
}

export default Transaction;
