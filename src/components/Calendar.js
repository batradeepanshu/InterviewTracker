import React, {Fragment, Component } from 'react';
import BigCalendar from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from 'moment';
import myEventsList from '../events';
import CalendarPopup from './CalendarPopup';
import axios from 'axios';
import {colorInterviewerList} from '../consts/generalConstants';
import Interviewers from './Interviewers';
import '../stylesheets/calendar.css';
import {API_URLS,urlResolver} from '../consts/apiConsts';

BigCalendar.momentLocalizer(moment);
let allViews = Object.keys(BigCalendar.Views).map(k => {
return BigCalendar.Views[k];
});


class Calendar extends Component {
  constructor(props){
    super(props);
    this.state={
      showCalendarPopup:false,
      myEventsList:myEventsList,
      colorInterviewerList:props.colorInterviewerList || []
    }
  }
  deleteInterviewer(name){
    let deletedIndex;
    this.state.colorInterviewerList.forEach((int,index)=>{
      if(int.name==name){
        deletedIndex=index;
      }
    });
    let colorInterviewerList=[...this.state.colorInterviewerList];
    colorInterviewerList.splice(deletedIndex,1);
    this.setState({colorInterviewerList});
  }
  urlResolver(){

  }
  saveInterviewerDetails(name,color){
    axios.post(urlResolver()+API_URLS.INT_SAVE,{
      intDetails:{
        name,
        color
      }
    }).then((resp)=>{
      let savedObj={name:resp.data.saved.name,
      color:resp.data.saved.color};
      let colorInterviewerList=[...this.state.colorInterviewerList];
      colorInterviewerList.push(savedObj);
      this.setState({colorInterviewerList});
    });
  }

  filterDeletedEvents(events){
    return events.filter((event,index)=>{
      return !event.deleted;
    })
  }
  getIntColor(cIL,name){
    let color='';
    if(cIL){
      cIL.forEach((cil,index)=>{
        if(cil.name==name){
          color=cil.color;
        }
      });
    }
    return color;
  }
  componentWillMount(){
    axios.get(urlResolver()).then((resp)=>{
      let events=resp.data.map((event)=>{
        return {...event,start:new Date(event.start),
          end:new Date(event.end),
          color:this.getIntColor(this.state.colorInterviewerList,event.interviewer)
      }
    }
  );
       events=this.filterDeletedEvents(events);
      this.setState({myEventsList:events,showCalendar:true});
    },(err)=>{});
  }

    eventStyleGetter (event, start, end, isSelected) {
    console.log(event);
    var backgroundColor = event.color;
    var style = {
        backgroundColor: backgroundColor,
        borderRadius: '0px',
        opacity: 0.8,
        color: 'black',
        border: '0px',
        display: 'block'
    };
    return {
        style: style
    };
}
  onSlotChange(slotInfo) {
      let startDate=moment(slotInfo.start).format("DD/MM/YYYY");
      let startTime=moment(slotInfo.start).format("hh:mm:ss")
      let endTime=moment(slotInfo.end).format("hh:mm:ss");
      this.setState({showCalendarPopup:true,
        calendarMode:'edit',
        selectedSlotInfo:slotInfo,
        selectedDate:startDate,
        interviewer:slotInfo.interviewer,
        startTime,
        endTime});
  }

  onEventClick(event) {
    this.setState({showCalendarPopup:true,
      calendarMode:'saved',
      eventTitle:event.title,
      eventDesc:event.desc,
      selectedDate:moment(event.start).format("DD/MM/YYYY"),
      startTime:moment(event.start).format("hh:mm:ss"),
      endTime:moment(event.end).format("hh:mm:ss"),
      interviewer:event.interviewer,
      id:event._id
    });
      console.log(event) //Shows the event details provided while booking
  }
  togglePopup(){
    this.setState({showCalendarPopup:!this.state.showCalendarPopup});
  }
  addToEventsList(eventObject){
    eventObject.color=this.getIntColor(this.state.colorInterviewerList,eventObject.interviewer);
    let eventsList=this.state.myEventsList;
    let filteredEventsList=this.state.filteredEventsList;
    if(this.state.filterValue==eventObject.interviewer || this.state.filterValue==''){
    filteredEventsList.push(eventObject);
    }
    eventsList.push(eventObject);
    this.setState({myEventsList:eventsList,filteredEventsList});
  }
  deleteFromEventsList(eventObject,adminKey){
    let myEventsList=this.state.myEventsList;
    let filteredEventsList=this.state.filteredEventsList;
    let indexToDelete;
    for(let i=0;i<myEventsList.length;i++){
      if(myEventsList[i]._id==eventObject.id){
        myEventsList.splice(i,1);
      }
      if(filteredEventsList && filteredEventsList[i] && filteredEventsList[i]._id==eventObject.id ){
        filteredEventsList.splice(i,1);
      }
    }
    this.setState({myEventsList,filteredEventsList})
  }
  renderInterviewerOptions(){
      return this.state.colorInterviewerList.map((cI,index)=>{
        return <option value={cI.name} key={cI.name+index}>{cI.name}</option>
      });
  }

  setFilterValue(e){
    let filteredEventsList=this.state.myEventsList.filter((event)=>{
          if(e.target.value){
            return event.interviewer==e.target.value;
          }
          else{
            return true
          }
        });
        this.setState({filteredEventsList:filteredEventsList,filterValue:e.target.value});
  }
  render(){
    return (
      <Fragment>
      {this.state.showCalendarPopup &&
         <CalendarPopup
           colorInterviewerList={this.state.colorInterviewerList}
           mode={this.state.calendarMode}
         date={this.state.selectedDate}
         startTime={this.state.startTime}
         endTime={this.state.endTime}
         title={this.state.eventTitle}
         desc={this.state.eventDesc}
         interviewer={this.state.interviewer}
         togglePopup={this.togglePopup.bind(this)}
         addToEventsList={this.addToEventsList.bind(this)}
         slotInfo={this.state.selectedSlotInfo}
         deleteEntry={this.deleteFromEventsList.bind(this)}
         selectedId={this.state.id}
         />}

      <div className='filter-wrap'>
      FILTER
      <select ref='interviewer' className='filter' onChange={this.setFilterValue.bind(this)}>
      <option value={''} >All</option>
      {this.renderInterviewerOptions()}
      </select>
      </div>

      <div className='col-md-2'>
        <Interviewers
          saveInterviewerDetails={this.saveInterviewerDetails.bind(this)}
          colorInterviewerList={this.state.colorInterviewerList}
          deleteInterviewer={this.deleteInterviewer.bind(this)}
          />

      </div>
        <div className='calendar-wrapper col-md-10'>
        <h1>Calendar</h1>
      {this.state.showCalendar && <BigCalendar
        events={this.state.filteredEventsList || this.state.myEventsList}
        views={allViews}
        selectable
        onSelectEvent={event => this.onEventClick(event)}
        onSelectSlot={(slotInfo) => this.onSlotChange(slotInfo) }
        step={30}
        timeslots={1}
        defaultView='week'
        views={['week','day','work_week']}
        defaultDate={new Date()}
        eventPropGetter={(this.eventStyleGetter)}
        min={new Date(2017, 10, 0, 9, 0, 0)}
       max={new Date(2017, 10, 0, 20, 0, 0)}
        components={{
                     event: Event,
                     agenda: {
                              event: EventAgenda
                     }
       }}
    />
      }
    </div>
    </Fragment>
  );
  }

}


function Event({ event }) {
    return (
        <span>
      <strong>
      {event.title}
      </strong>
            { event.desc && (':  ' + event.desc)}
    </span>
    )
}

function EventAgenda({ event }) {
    return <span>
    <em style={{ color: 'magenta'}}>{event.title}</em><p>{ event.desc }</p>
  </span>
}

export default Calendar;
