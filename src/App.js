import React, { Component } from 'react'
import {Route,BrowserRouter} from "react-router-dom"
import "./App.css"
import Footer from "./components/footer"
import NavBar from "./components//nav-bar"
import SignUp from "./components/sign-up"
import SignIn from "./components/sign-in"
import DashBoard from './components/host-dashboard'
import AddNewHomeStay from './components/host-add-new-home-stay'
import HostInfo from './components/host-info'
import HostMessage from './components/host-message'
import RoomManager from './components/host-updateRoom'
import Homepage from './components/Homepage'
import RoomInfo from './components/RoomInfo'

import Search from './components/Search'
import SearchNav from './components/searchNav'
import Home from './components/Home'
import Example from "./test_bill"
import ConfirmBill from './components/confirm-bill'
import DoneSuccess from './components/doneSuccess'

export default class App extends Component {
  render() {
    return (<>                
      
      <BrowserRouter>
        <>
        <NavBar />
        <Route path = "/check-out" render = {()=><ConfirmBill />}/>
        <Route path = "/paypal" component = {Example}/>
        <Route path="/sign-up" component = {SignUp}/>
        <Route path = "/sign-in" component = {SignIn}/>
        <Route path = "/host" component = {HostInfo}/>
        <Route path = "/host/dash-board" component = {DashBoard}/> 
        <Route path = "/host/add-new-home-stay" component = {AddNewHomeStay}/>
        <Route path = "/host/message" component = {HostMessage}/>
        <Route path = "/host/room-manager" component = {RoomManager}/>
        <Route path = "/" component = {Home}/>
        <Route path = "/room/detail" component = {RoomInfo} />
        {/* <Route path = "/search" component = {Search}/> */}
        <Route path = '/done-success' component = {DoneSuccess}/>
        <div  style = {{ zIndex:1}}id='footer'>
            <Footer/>
        </div>
        </>

      </BrowserRouter>
    </>
    )
  }
}
