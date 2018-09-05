import { colorInterviewerList,setColorInterviewerList} from "../consts/generalConstants";
import React, { Fragment, Component } from "react";
import '../stylesheets/interviewers.css';
import axios from 'axios';

export default class Interviewers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      colorInterviewerList:props.colorInterviewerList
    };
  }
    checkIfNameExists(){
      let error='';
      debugger
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
    axios.post('https://wkwin5422023.global.publicisgroupe.net:8080/interviewer/delete',
    {name}).then((resp)=>{
      console.log('int delteion resp ==>',resp);
      this.props.deleteInterviewer(name);
    })

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
        <span className='int-delete btn ' onClick={()=>{this.deleteInterviewer(int.name)}}>X</span>
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
