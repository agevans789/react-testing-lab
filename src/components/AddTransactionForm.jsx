import React, { useState } from "react";

function AddTransactionForm({postTransaction}) {
  // initialize state for form data
  const [formData, setFormData] = useState({
    date: "",
    description: "",
    category: "",
    amount: ""
  });
  // update state on every input change 
  function handleChange(e) {
    const {name, value} = e.target;
    setFormData(prevData => ({
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
      <form className="ui form" data-testid="add-transaction-form" onSubmit={submitForm}>
        <div className="inline fields">
          <input type="date" name="date" value={formData.date} placeholder="Date" onChange={handleChange}/>
          <input type="text" name="description" value={formData.description} placeholder="Description" onChange={handleChange}/>
          <input type="text" name="category" value={formData.category} placeholder="Category" onChange={handleChange}/>
          <input type="number" name="amount" value={formData.amount} placeholder="Amount" step="0.01" onChange={handleChange}/>
        </div>
        <button className="ui button" type="submit" aria-label="button">
          Add Transaction
        </button>
      </form>
    </div>
  );
}

export default AddTransactionForm;
