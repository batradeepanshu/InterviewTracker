import React, { Fragment, Component } from "react";
import axios from "axios";
import { colorInterviewerList } from "../consts/generalConstants";
import DeletePopup from "./DeletePopup";
import '../stylesheets/calendarPopup.css';

class CalendarPopup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      desc: "",
      colorInterviewerList:props.colorInterviewerList
    };
  }

  saveEvent() {
    this.props.togglePopup();
    let { slotInfo } = this.props;
    let eventObject = {
      title: this.refs.title.value,
      start: slotInfo.start,
      end: slotInfo.end,
      desc: this.refs.desc.value,
      interviewer: this.refs.interviewer.value
    };
    
    axios.post("http://wkwin5422023.global.publicisgroupe.net:8080/save", {
      eventObject
    }).then((response)=>{
    this.props.addToEventsList({...eventObject,_id:response.data.savedEvent._id});
    });

  }
  showDeletePopup(){
    this.setState({ showDeletePopup: true });
  }
  deleteEntry(comment,code) {
    axios.post("http://wkwin5422023.global.publicisgroupe.net:8080/delete", {
      id: this.props.selectedId,
      comment,
      code
    });
    let eventObject = {
      id: this.props.selectedId
    };
    this.props.togglePopup();
    this.props.deleteEntry(eventObject);
  }
  renderInterviewerOptions() {
    return this.state.colorInterviewerList.map((cI, index) => {
      return (
        <option value={cI.name} key={cI.name + index}>
          {cI.name}
        </option>
      );
    });
  }
  render() {
    const { mode, date, title, desc, startTime, endTime } = this.props;
    return (
      <Fragment>
        <div className="popup-backdrop" onClick={this.props.togglePopup} />
        <div className="calendar-popup">
          {!this.state.showDeletePopup ? (
            <Fragment>
              <div className="meeting-info">Date: {date}</div>
              <div className="meeting-info">
                Time : {startTime + " to " + endTime}
              </div>

              {mode == "saved" ? (
                <Fragment>
                  <div className="meeting-info">
                    Interviewer : {this.props.interviewer}
                  </div>
                  <div className="meeting-info">Event : {title}</div>
                  <div className="meeting-info">Description : {desc}</div>
                </Fragment>
              ) : (
                <Fragment>
                  <select ref="interviewer" className="select-int">
                    {this.renderInterviewerOptions()}
                  </select>
                  <input type="text" placeholder="Enter Event" ref="title" />
                  <textarea
                    type="text"
                    placeholder="Event Description"
                    ref="desc"
                    rows="2" cols="50"
                  />
                <div className='save-event-btn btn btn-success'
                    onClick={this.saveEvent.bind(this)}
                  >SAVE</div>
                </Fragment>
              )}
              {mode == "saved" && (
                <div
                  className="delete-entry btn btn-danger"
                  onClick={this.showDeletePopup.bind(this)}
                >
                  Delete
                </div>
              )}
            </Fragment>
          ) : (
            <DeletePopup deleteEntry={this.deleteEntry.bind(this)}/>
          )}
        </div>
      </Fragment>
    );
  }
}

export default CalendarPopup;
