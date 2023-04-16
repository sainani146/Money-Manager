// Write your code here
import './index.css'

const TransactionItem = props => {
  const {item} = props
  const {optionId, displayText} = item

  return (
    <option value={optionId} key={optionId}>
      {displayText}
    </option>
  )
}
export default TransactionItem
