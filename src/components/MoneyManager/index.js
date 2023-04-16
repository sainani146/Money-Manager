import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import './index.css'
import TransactionItem from '../TransactionItem'
import Moneydetails from '../MoneyDetails'

const transactionTypeOptions = [
  {
    optionId: 'INCOME',
    displayText: 'Income',
  },
  {
    optionId: 'EXPENSES',
    displayText: 'Expenses',
  },
]

// Write your code here
export default class MoneyManager extends Component {
  state = {
    income: 0,
    expenses: 0,
    transactions: [],
    title: '',
    amount: '',
    active: transactionTypeOptions[0].displayText,
  }

  onTitle = event => {
    this.setState({title: event.target.value})
  }

  onAmount = event => {
    this.setState({amount: event.target.value})
  }

  onType = event => {
    this.setState({active: event.target.value})
  }

  onAddTransaction = event => {
    event.preventDefault()
    const {income, expenses, title, amount, active} = this.state

    const newItem = {
      id: uuidv4(),
      title,
      amount,
      active,
    }

    this.setState(prevState => ({
      transactions: [...prevState.transactions, newItem],
      title: '',
      amount: '',
      active: transactionTypeOptions[0].displayText,
    }))

    let inc = income
    let exp = expenses

    if (active.toLowerCase() === 'income') {
      inc += parseInt(amount)
      this.setState({income: inc})
    }

    if (active.toLowerCase() === 'expenses') {
      exp += parseInt(amount)
      this.setState({expenses: exp})
    }
  }

  deleteMoney = (id, active, amount) => {
    const {transactions, income, expenses} = this.state
    const filterdata = transactions.filter(each => each.id !== id)
    this.setState({transactions: filterdata})

    let inc = income
    let exp = expenses

    if (active.toLowerCase() === 'income') {
      inc -= parseInt(amount)
      this.setState({income: inc})
    }

    if (active.toLowerCase() === 'expenses') {
      exp -= parseInt(amount)
      this.setState({expenses: exp})
    }
  }

  render() {
    const {income, expenses, title, amount, active, transactions} = this.state
    const balc = income - expenses

    return (
      <div className="container">
        <div className="user-card">
          <h1>Hi, Richard</h1>
          <p>
            Welcome back to your <span>Money Manager</span>
          </p>
        </div>
        <div className="money-section">
          <div className="money-card money-card1">
            <img
              className="money-img"
              src="https://assets.ccbp.in/frontend/react-js/money-manager/balance-image.png"
              alt="balance"
            />
            <div>
              <p>Your Balance</p>
              <p className="amount" data-testid="balanceAmount">
                Rs {balc}
              </p>
            </div>
          </div>

          <div className="money-card money-card2">
            <img
              className="money-img"
              src="https://assets.ccbp.in/frontend/react-js/money-manager/income-image.png"
              alt="income"
            />
            <div>
              <p>Your Income</p>
              <p className="amount" data-testid="incomeAmount">
                Rs {income}
              </p>
            </div>
          </div>

          <div className="money-card money-card3">
            <img
              className="money-img"
              src="https://assets.ccbp.in/frontend/react-js/money-manager/expenses-image.png"
              alt="expenses"
            />
            <div>
              <p>Your Expenses</p>
              <p className="amount" data-testid="expensesAmount">
                Rs {expenses}
              </p>
            </div>
          </div>
        </div>
        <div className="transc-history">
          <div className="t-sec">
            <h1>Add Transaction</h1>
            <form
              className="transaction-section"
              onSubmit={this.onAddTransaction}
            >
              <label htmlFor="title">TITLE</label>
              <input
                value={title}
                onChange={this.onTitle}
                placeholder="TITLE"
                id="title"
              />
              <label htmlFor="amount">AMOUNT</label>
              <input
                value={amount}
                onChange={this.onAmount}
                placeholder="AMOUNT"
                id="amount"
              />
              <label htmlFor="type">TYPE</label>
              <select id="type" onChange={this.onType} value={active}>
                {transactionTypeOptions.map(each => (
                  <TransactionItem key={each.id} item={each} />
                ))}
              </select>
              <button type="submit" className="transaction-btn">
                Add
              </button>
            </form>
          </div>
          <div className="h-sec">
            <h1>History</h1>
            <div className="h-items">
              <ul>
                <table>
                  <tr>
                    <p>Title</p>
                    <p>Amount</p>
                    <p>Type</p>
                  </tr>
                  {transactions.map(eachitem => (
                    <Moneydetails
                      key={eachitem.id}
                      item={eachitem}
                      deleteMoney={this.deleteMoney}
                    />
                  ))}
                </table>
              </ul>
            </div>
          </div>
        </div>
      </div> //  container
    )
  }
}
