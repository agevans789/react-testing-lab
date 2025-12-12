import React from "react";
import { render } from "@testing-library/react";
import '@testing-library/jest-dom';
import Transaction from "../../components/Transaction";

describe('Our app will', () => {
    test('displays all transactions on startup', async () => {
        global.setFetchResponse(global.transactions);
        let {findAllByTestId} = render(<Transaction/>);
        const transactionItems = await findAllByTestId('transaction');
        expect(transactionItems).toHaveLength(global.transactions.length);
        const transactionDates = transactionItems.map(i => i.querySelector('date'));
        const fetchedTransactionDates = global.transactions.map(u => u.date);
        expect(transactionDates).toEqual(fetchedTransactionDates);
        const transactionDescriptions = transactionItems.map(i => i.querySelector('description').textContent);
        const fetchedTransactionDescriptions = global.transactions.map(u => u.description);
        expect(transactionDescriptions).toEqual(fetchedTransactionDescriptions);
        const transactionCategories = transactionItems.map(i => i.querySelector('category').textContent);
        const fetchedTransactionCategories = global.transactions.map(u => u.category);
        expect(transactionCategories).toEqual(fetchedTransactionCategories);
        const transactionAmount = transactionItems.map(i => i.querySelector('amount'));
        const fetchedTransactionAmount = global.transactions.map(u => u.amount);
        expect(transactionAmount).toEqual(fetchedTransactionAmount);
    })
})