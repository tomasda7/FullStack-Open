import { useDispatch } from 'react-redux'
import { byContent } from '../reducers/filterReducer'

const Filter = () => {
  const dispatch = useDispatch()

  const handleChange = (e) => {
    e.preventDefault()
    const text = e.target.value
    dispatch(byContent(text))
  }

  const style = {
    marginBottom: 10
  }

  return (
    <div style={style}>
      filter <input type="text" onChange={handleChange} />
    </div>
  )
}

export default Filter
