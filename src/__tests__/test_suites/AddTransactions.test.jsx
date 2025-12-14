// test that on submit of form input, each value in the input form is logged as part of a posted transaction
import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import '@testing-library/jest-dom';
import AccountContainer from "../../components/AccountContainer";


describe('Our app will', () => {
    test('add transactions from form input', async () => {
        global.setFetchResponse(global.transactions);
        const {findAllByTestId} = render(<AccountContainer/>);
        const transactionInputs = await findAllByTestId('')
    })
})