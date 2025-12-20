// test that on submit of form input, each value in the input form is logged as part of a posted transaction
import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import '@testing-library/jest-dom';
import AccountContainer from "../../components/AccountContainer";
import { vi } from "vitest";
import userEvent from "@testing-library/user-event";

describe('Our app will', () => {
    beforeEach(() => {
// main mocking logic
// reset implementation before every test 
// forcefully stub global fetch to ensure it works for all tests 
        vi.stubGlobal('fetch', vi.fn(async (url, options) => {
            // handle POST requests
            // make sure fallback is bulletproof
            const method = options?.method?.toUpperCase() || 'GET';
            if (method === 'POST') {
                const body = options.body ? JSON.parse(options.body) : {};
                // ensure state updates
                await new Promise(resolve => setTimeout(resolve, 0));
                return {
                    ok: true,
                    status: 201,
                    json: () => Promise.resolve({...body, id: Math.random().toString()})
                }};
            // default GET response outside of if statement
            return {
                ok: true,
                status: 200,
                json: () => Promise.resolve(global.transactions || [])
                }
            }
        ));
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
        const newEntry = await screen.findByText(/Drinks/i);
        expect(newEntry).toBeInTheDocument();
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
        expect(screen.queryAllByText(categoryValue)[0]).toBeInTheDocument();
        expect(screen.getByText(amountValue)).toBeInTheDocument();
        // reset
        const emptyDateInput = screen.getByDisplayValue("");
        expect(emptyDateInput).toBeInTheDocument();
        expect(screen.getByDisplayValue("")).toBeInTheDocument();
    })
})