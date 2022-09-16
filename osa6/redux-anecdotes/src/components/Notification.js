import { connect } from "react-redux"

const Notification = (props) => {

  let style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }

  if(props.notifications === null) {
    style = {
      display: 'none',
    }
  }

  return (
    <div style={style}>
      {props.notifications}
    </div>
  )
}

const mapStateToProps = state => {
  return {
    notifications: state.notifications
  }
}

const ConnectedNotification = connect(mapStateToProps)(Notification)
export default ConnectedNotification