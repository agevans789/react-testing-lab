import React, { useState } from "react";

function AddTransactionForm({postTransaction}) {
  // initialize state for form data
  const [formData, setFromData] = useState({
    date: "",
    description: "",
    category: "",
    amount: ""
  });
  // update state on every input change 
  function handleChange(e) {
    const {name, value} = e.target;
    setFromData(prevData => ({
      ...prevData,
      [name]: value
    }))
  }
  function submitForm(e){
    e.preventDefault();
    postTransaction(formData)
  };

  return (
    <div className="ui segment">
      <form className="ui form" data-testid="add-transaction-form" onSubmit={(e)=>{submitForm(e)}}>
        <div className="inline fields">
          <input type="date" name="date" placeholder="Date"/>
          <input type="text" name="description" placeholder="Description" />
          <input type="text" name="category" placeholder="Category" />
          <input type="number" name="amount" placeholder="Amount" step="0.01" />
        </div>
        <button className="ui button" type="submit" aria-label="button">
          Add Transaction
        </button>
      </form>
    </div>
  );
}

export default AddTransactionForm;
