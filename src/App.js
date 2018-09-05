import React, {Fragment, Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter,Route,withRouter,Switch} from 'react-router-dom'
import Login from './components/Login';
import Calendar from './components/Calendar';
import axios from 'axios';
import {API_URLS,urlResolver} from './consts/apiConsts';


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
    console.log(process.env.NODE_ENV);
    this.state={};
  }
  componentWillMount(){
    axios.get(urlResolver()+API_URLS.INT_GET).then((resp)=>{
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
