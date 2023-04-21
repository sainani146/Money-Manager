// Write your code here
import './index.css'

const TransactionItem = props => {
  const {item} = props
  const {optionId, displayText} = item

  return (
    <option key={optionId} value={optionId}>
      {displayText}
    </option>
  )
}
export default TransactionItem
