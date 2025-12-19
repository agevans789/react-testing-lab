// test that on submit of form input, each value in the input form is logged as part of a posted transaction
import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import '@testing-library/jest-dom';
import AccountContainer from "../../components/AccountContainer";
import { beforeEach, vi } from "vitest";
import userEvent from "@testing-library/user-event";

describe('Our app will', () => {
    // set up initial mock data
    beforeEach(() => {
        global.setFetchResponse(global.transactions);
        vi.spyOn(global, "fetch").mockImplementation((url, options ) => {
            if (options && options.method === 'POST') {
                const body = JSON.parse(options.body);
                return Promise.resolve({
                    ok: true,
                    json: () => Promise.resolve({
                        ...body,
                        id: Math.random().toString(),
                    })
                })
            };
            return Promise.resolve({json: () => Promise.resolve(global.transactions)})
        })
    });
    test('add transactions from form input', async () => {
        // render the full container
        render(<AccountContainer/>);
        const user = userEvent.setup();
        // ensure initial transactions are loaded 
        const initialTransactionItems = await screen.findAllByTestId('transaction');
        expect(initialTransactionItems).toHaveLength(global.transactions.length);
        // simulate user input for a new transaction
        const newDate = screen.getByPlaceholderText(/Date/i);
        const newDescription = screen.getByPlaceholderText(/Description/i);
        const newCategory = screen.getByPlaceholderText(/Category/i);
        const newAmount = screen.getByPlaceholderText(/Amount/i);
        // make up inputs
        const dateValue = "2025-12-13";
        const descriptionValue = "Drinks";
        const categoryValue = "Food";
        const amountValue = "30";
        fireEvent.change(newDate, {target: {value: dateValue}});
        fireEvent.change(newDescription, {target: {value: descriptionValue}});
        fireEvent.change(newCategory, {target: {value: categoryValue}});
        fireEvent.change(newAmount, {target: {value: amountValue}});
        // target the form and fire submit
        const form = screen.getByTestId("add-transaction-form");
        fireEvent.submit(form);
        // wait for UI to update
        const newEntry = await screen.findByText(/Drinks/i)
        expect(newEntry).toBeInTheDocument();
        const emptyDateInput = screen.getByDisplayValue("");
        expect(emptyDateInput).toBeInTheDocument();
        expect(screen.getByDisplayValue("")).toBeInTheDocument();
        // check DOM that was updated after click happened 
        const newTransactionText = await screen.findByText(descriptionValue);
        // check that new item is now in the list 
        expect(newTransactionText).toBeInTheDocument();
        // use findlAllByTestId waiting for list length to increase
        // don't use global variable because that's defined in setup
        const initialLength = initialTransactionItems.length;
        const updatedTransactionItems = await screen.findAllByTestId('transaction');
        expect (updatedTransactionItems).toHaveLength(initialLength + 1);
        // check that the specific new description text is now visible
        expect(screen.getByText(descriptionValue)).toBeInTheDocument();
        expect(screen.getByText(dateValue)).toBeInTheDocument();
        expect(screen.getByText(categoryValue)).toBeInTheDocument();
        expect(screen.getByText(amountValue)).toBeInTheDocument();
    })
})