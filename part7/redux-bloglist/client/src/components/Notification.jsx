import './Notification.css'
import { useSelector } from 'react-redux'

const Notification = () => {
  const { text, style } = useSelector((state) => state.notification)

  if (text === null) {
    return null
  }

  return <div className={style}>{text}</div>
}

export default Notification
