import "./styles.css";
import React, { useState, useEffect } from "react";

export default function App() {
  const [budget, setBudget] = useState("0");
  const [expenses, setExpenses] = useState("$0");
  const [savings, setSavings] = useState("$0");
  const [budgetValue, setBudgetValue] = useState("");

  // Expenses
  const [expenseAmountValue, setExpenseValue] = useState("");
  const [expenseDescriptionValue, setExpenseDescriptionvValue] = useState("");
  const [expenseData, setExpenseData] = useState([]);

  const handleSubmit = () => {
    event.preventDefault();
    if (
      !isNaN(expenseAmountValue) &&
      expenseAmountValue !== "" &&
      expenseDescriptionValue !== ""
    ) {
      const newExData = {
        amount: expenseAmountValue,
        description: expenseDescriptionValue,
        dataId: Date.now()
      };
      setExpenseData([...expenseData, newExData]);
    } else {
      console.log("enter all values");
    }
  };

  const deleteExpenseHandler = (currId) => {
    const newExpense = expenseData.filter((id) => id.dataId !== currId);
    console.log(newExpense);
    setExpenseData(newExpense);
  };

  // Total Expenses

  useEffect(() => {
    let totalExpenses = 0;
    if (expenseData.length > 0) {
      totalExpenses = expenseData
        .map((num) => num.amount)
        .map((num) => Number(num))
        .reduce((num, sum) => (num += sum));
      console.log(totalExpenses);
      setExpenses(totalExpenses);

      //Savings
      setSavings(() => budget - totalExpenses);
    }
  }, [expenseData, budget]);

  return (
    <div className="App">
      <div id="tracer-info">
        <h3> Budget ${budget} </h3>

        <h3> Expenses {expenses} </h3>
        <h3> Savings {savings} </h3>
      </div>

      <form>
        <input
          id="budget-input"
          placeholder="Enter your Budget"
          type="text"
          value={budgetValue}
          onChange={(e) => {
            setBudgetValue(e.target.value);
          }}
        />
      </form>

      <button
        onClick={() => {
          if (!isNaN(budgetValue) && budgetValue !== "") {
            setBudget(budgetValue);
            setBudgetValue("");
          } else {
            alert("Enter numeric values");
            setBudgetValue("");
          }
        }}
      >
        Enter Budget
      </button>

      <div id="expenses-div">
        <h3>Expenses </h3>
        <form>
          <lable> Amount: </lable>
          <input
            type="text"
            value={expenseAmountValue}
            onChange={(e) => {
              setExpenseValue(e.target.value);
            }}
          />
          <label> Enter Description </label>
          <input
            type="text"
            value={expenseDescriptionValue}
            onChange={(e) => {
              setExpenseDescriptionvValue(e.target.value);
            }}
          />
          <button type="submit" onClick={handleSubmit}>
            Submit{" "}
          </button>
        </form>
      </div>

      {/* Display all the  expenses */}
      <div>
        {expenseData.map((data) => (
          <div id="expense-data" key={data.dataId}>
            <p> {data.description} </p>
            <p> {data.amount} </p>

            <button onClick={() => deleteExpenseHandler(data.dataId)}>
              delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
