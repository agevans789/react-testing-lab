import React from "react";
import { render, within } from "@testing-library/react";
import '@testing-library/jest-dom';
import { afterEach, beforeEach } from "vitest";
import '../setup';
import AccountContainer from "../../components/AccountContainer";

describe('Our app will', () => {
    beforeEach(() => {
        global.setFetchResponse(global.transactions);
    });
    test('displays all transactions on startup', async () => {
        let {findAllByTestId} = render(<AccountContainer/>);
        const transactionItems = await findAllByTestId('transaction');
        expect(transactionItems).toHaveLength(global.transactions.length);
        const transactionDates = transactionItems.map(i => within(i).getByTestId('transaction-date').textContent);
        const fetchedTransactionDates = global.transactions.map(u => u.date);
        expect(transactionDates).toEqual(fetchedTransactionDates);
        const transactionDescriptions = transactionItems.map(i => within(i).getByTestId('transaction-description').textContent);
        const fetchedTransactionDescriptions = global.transactions.map(u => u.description);
        expect(transactionDescriptions).toEqual(fetchedTransactionDescriptions);
        const transactionCategories = transactionItems.map(i => within(i).getByTestId('transaction-category').textContent);
        const fetchedTransactionCategories = global.transactions.map(u => u.category);
        expect(transactionCategories).toEqual(fetchedTransactionCategories);
        const transactionAmount = transactionItems.map(i => parseFloat(within(i).getByTestId('transaction-amount').textContent));
        const fetchedTransactionAmount = global.transactions.map(u => parseFloat(u.amount));
        expect(transactionAmount).toEqual(fetchedTransactionAmount);
    })
})