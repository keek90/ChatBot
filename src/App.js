import React,{Component} from "react";
import {
  Route,BrowserRouter as Router,
  Routes
}from 'react-router-dom';
import './App.css'
import Home from './pages/Home/Home';
import Chat from './pages/Home/Home';
import Profile from './pages/Profile/Profile';
import  Signup from './pages/Signup/Signup';
import Login from './pages/Login/Login';
import {toast,ToastContainer} from 'react-toastify';

class App extends Component{

  showToast = (type,message) =>{
    switch(type){
      case 0:
        toast.warning(message)
        break;
      case 1:
        toast.warning(message)  
        default:
          break;

    }
  }
  render(){
    return (
      <Router>
        <ToastContainer
        autoClose = {2000}
        hideProgressBar={true}
        position={toast.POSITION.BOTTOM_CENTER}
        />
        <Routes>
          <Route
          exact
          path="/"
          render={ props => <Home{...props}/>}/>

         <Route
         path = "/login"
         render={props => <Login showToast={this.showToast}{...props}/>}
         />
         <Route
         path = "/profile"
         render={props => <Profile showToast={this.showToast}{...props}/>}
         />
         <Route
         path = "/signup"
         render={props => <Signup showToast={this.showToast}{...props}/>}
         />
         <Route
         path = "/Chat"
         render={props => <Chat showToast={this.showToast}{...props}/>}
         />
        </Routes>
      </Router>
    )
  }
}
export default App;

