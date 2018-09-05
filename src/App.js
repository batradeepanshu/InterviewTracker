import React, {Fragment, Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter,Route,withRouter,Switch} from 'react-router-dom'
import Login from './components/Login';
import Calendar from './components/Calendar';
import axios from 'axios';


const ConditionalHOC = (Component,condition)=>{
  if(condition){
    debugger;
    return <Component colorInterviewerList={condition}/>
  }
  else {
    return '';
  }
}


class App extends Component{
  constructor(props){
    super(props);
    this.state={};
  }
  componentWillMount(){
    axios.get('http://wkwin5422023.global.publicisgroupe.net:8080/interviewer/get').then((resp)=>{
      this.setState({colorInterviewerList:resp.data});
    })
  }

  render(){
    return (
      <BrowserRouter>
      <Switch>
        <Route exact path='/login' component={Login}/>
        <Route exact path='/calendar' render={()=> ConditionalHOC(Calendar,this.state.colorInterviewerList)}/>
      </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
