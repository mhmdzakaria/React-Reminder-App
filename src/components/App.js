import React, { Component } from "react";
import { connect } from "react-redux";
import moment from "moment";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { add_Reminder, remove_Reminder, clear_Reminder } from "../actions";
import logo from "./reminder.png";
import "./App.css";

class App extends Component {
  state = {
    text: "",
    date: new Date(),
  };

  render_Reminders = () => {
    const { reminders } = this.props;
    return (
      <ul className="list-group">
        {reminders.map((reminder) => {
          return (
            <li className="list-group-item" key={reminder.id}>
              <div>{reminder.text}</div>
              <div>{moment(new Date(reminder.date)).fromNow()}</div>
              <button
                className="btn btn-danger remove closeIcon"
                onClick={() => this.props.remove_Reminder(reminder.id)}
              >
                X
              </button>
            </li>
          );
        })}
      </ul>
    );
  };

  render() {
    const handelChangeRminder = (e) => {
      this.setState({
        text: e.target.value,
      });
    };

    const handelChangeDate = (e) => {
      this.setState({
        date: e.target.value,
      });
    };

    // console.log(this.props);

    return (
      <div className="App">
        <img src={logo} alt=""></img>

        <div className="reminder-title">
          <h1>The application Title</h1>
        </div>

        <input
          type="text"
          className="form-control"
          value={this.state.text}
          placeholder=" Enter what You Think"
          onChange={handelChangeRminder}
        ></input>

        {/* <input
          className="form-control"
          value={this.state.date}
          type="datetime-local"
          onChange={handelChangeDate}
        ></input> */}

        <DatePicker
          selected={this.state.date}
          onChange={(date) => {
            this.setState({ date: date });
          }}
          showTimeSelect
          timeFormat="HH:mm"
          timeIntervals={15}
          timeCaption="time"
          dateFormat="MMMM d, yyyy h:mm aa"
          className="form-control"
          value={this.state.date}
          placeholderText="Enter Date ... "
        />

        <div className='buttons-container'>

          <button
            className="btn btn-primary btn-block"
            onClick={() => {
              this.props.add_Reminder(this.state.text, this.state.date);
              this.setState({
                text: "",
                date: "",
              });
            }}
          >
            Add Reminder
          </button>

          {this.render_Reminders()}

          <button
            className="btn btn-danger btn-block"
            onClick={() => this.props.clear_Reminder()}
          >
            clear Reminder
          </button>

        </div>

      </div>
    );
  }
}

// function mapDispatchToProps(dispatch) {
//   return {
//     add_Reminder: () => dispatch(add_Reminder()),
//   };
// }

function mapStateToProps(state) {
  return {
    reminders: state,
  };
}

export default connect(mapStateToProps, {
  add_Reminder,
  remove_Reminder,
  clear_Reminder,
})(App);
