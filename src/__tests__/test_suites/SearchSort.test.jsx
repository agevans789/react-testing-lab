// Create a test suite that will test: If a change event is triggered, the page updates accordingly. Search is incomplete, so build out the search functionality based on the test.

import { fireEvent, render, screen } from "@testing-library/react"
import AccountContainer from "../../components/AccountContainer"
import { beforeEach, expect } from "vitest"

describe('Our app will...', () => {
    beforeEach(() => {
        vi.stubGlobal('fetch', vi.fn(async (url, options) => {
            const method = options?.method?.toUpperCase() || 'GET';
            if (method === 'POST') {
                const body = options.body? JSON.parse(options.body) : {};
                await new Promise(resolve => setTimeout(resolve, 0));
                return {
                    ok: true,
                    status: 201,
                    json: () => Promise.resolve({...body, id: Math.random().toString()})
                }
            };
            return {
                ok: true,
                status: 200,
                json: () => Promise.resolve(global.transactions || [])
            }
        }))
    })
    test('filter the list of transactions when search input changes', async () => {
        render(<AccountContainer />)
        // wait for initial transactions to load
        const initialItems = await screen.findAllByTestId("transaction");
        const initialCount = initialItems.length;
        // locate the search
        const searchInput = screen.getByPlaceholderText(/Search Your Recent Transactions/i);
        // trigger a change event
        fireEvent.change(searchInput, {target: {value: "Paycheck"}});
        // verify page updates
        const filteredItems = screen.getAllByTestId("transaction");
        expect(filteredItems.length).toBeLessThan(initialCount);
        expect(screen.queryAllByText(/Paycheck from Bob's Burgers/i).length).toBeGreaterThan(0);
        expect(screen.queryByText(/South by Southwest Quinoa Bow/i)).not.toBeInTheDocument();
    })
})
