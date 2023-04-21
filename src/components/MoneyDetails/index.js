// Write your code here
import './index.css'

const Moneydetails = props => {
  const {item, deleteMoney} = props
  const {title, amount, active, id} = item

  const onDelete = () => {
    deleteMoney(id, active, amount)
  }

  return (
    <li className="box">
      <p>{title}</p>
      <p>{amount}</p>
      <p>{active}</p>
      <button onClick={onDelete} type="button" data-testid="delete">
        <img
          className="delete"
          src="https://assets.ccbp.in/frontend/react-js/money-manager/delete.png"
          alt="delete"
        />
      </button>
    </li>
  )
}

export default Moneydetails
