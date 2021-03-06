import { colorInterviewerList,setColorInterviewerList} from "../consts/generalConstants";
import React, { Fragment, Component } from "react";
import '../stylesheets/interviewers.css';
import axios from 'axios';
import {API_URLS,urlResolver} from '../consts/apiConsts';

export default class Interviewers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      colorInterviewerList:props.colorInterviewerList
    };
  }
    checkIfNameExists(){
      let error='';
      this.state.colorInterviewerList.forEach((CIL,index)=>{
        if(CIL.name.toLowerCase()==this.refs.name.value.toLowerCase()){
          error='Already exists';
        }
      });
      this.setState({error});
      return error;
    }
  saveInterviewerDetails(){
    if(this.checkIfNameExists()){
      return;
    }
    this.props.saveInterviewerDetails(this.refs.name.value,this.refs.color.value);
  }

  componentWillReceiveProps(newProps){
    this.setState({colorInterviewerList:newProps.colorInterviewerList})
  }

  showAddIntSection(){
    this.setState({showAddInt:!this.state.showAddInt});
  }
  deleteInterviewer(name){
    axios.post(urlResolver()+API_URLS.INT_DELETE,
    {code:this.refs.intDelKey.value,name}).then((resp)=>{
      console.log('int delteion resp ==>',resp);
      this.props.deleteInterviewer(name);
    })

  }
  renderDeleteIntSection(name){
      return (
        <div className='delete-int-container'>
          <input type='password' ref='intDelKey' placeholder='Enter Key'/>
          <div className='btn btn-danger' onClick={()=>{this.deleteInterviewer(name)}}>Delete</div>
        </div>
      );
  }

  showDeleteSection(intName){
    this.setState({deleteSectionInt:intName});
  }
  renderInts() {
    return this.state.colorInterviewerList.map((int, index) => {
      return (
        <div className="interviewer" key={int + index}>
          <div
            className="int-color"
            style={{ backgroundColor: int.color }}
          />
        <div className="int-name">{int.name}</div>
        <span className='int-delete btn ' onClick={()=>{this.showDeleteSection(int.name)}}>X</span>
        {this.state.deleteSectionInt==int.name && this.renderDeleteIntSection(int.name)}
        </div>
      );
    });
  }
  render() {
    return <div className="int-wrapper">
      <div className='int-head'>List of Interviewers</div>
      <div className='add-int-container'>
        <div className='add-new-btn btn btn-primary' onClick={this.showAddIntSection.bind(this)}>+</div>
        {this.state.showAddInt && <div className='add-int-section'>
          <input type='text' placeholder='Interviewer name' ref='name'/>
          <input type='text' placeholder='Color Code or name' ref='color'/>
          <div className='btn btn-success' onClick={this.saveInterviewerDetails.bind(this)}> Add </div>
          <div className='error'>{this.state.error}</div>
        </div>}
      </div>
      {this.state.colorInterviewerList && this.renderInts()}</div>;
  }
}
