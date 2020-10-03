import React, { Component } from 'react'
import { Container } from "reactstrap"
import { Link } from "react-router-dom"
import ListGuests from "../list-guest"
import axios from "axios"
import DatePicker from "react-datepicker"
import "./hostDashboard.css"
import AwaitGuest from '../host-awaitGuests'

export default class DashBoard extends Component {
    state = {
        date: new Date().toLocaleDateString(),
        listGuest : [],
        listGuestsOfType :[1,2,3],
        status : "in",
        awaitGuest :[
            {name:"dfdsf"},  {name:"t day"},  {name:"aaaa"}
        ]
    }


    componentDidMount() {
        this.checkLoginHost()
        this.getListGuests()
        this.checkIn()
        this.awaitGuest()
    }

    onChangeDate = (e) => {
        this.setState({
            date: e.target.value    
        })
        this.getListGuests();
        

    }
    checkLoginHost = () => {
        // TODO check token from host
    }
    getListGuests = async ()=>{
        // const res = await axios.get(`http://localhost:5000/...../${id}/${this.state.date}`)
        // this.setState({
        //     listGuest :  ...TODO
        // })
    }
    awaitGuest = async ()=>{
        // const res = ...
        // this.setState({
        //     awaitGuest: res
        // })

    }
    checkIn =()=>{
        // let arrayGuest = [];
        // this.state.listGuests.forEach(element => {
        //     if(element.time.start == this.state.date){
        //         arrayGuest.push(element)
        //     }
        // });
        this.setState({
            listGuestsOfType : [
                {
                    nameUser : "Quốc Thái"
                },
                {
                    nameUser : "Alo ai đó ạ"
                },
    
            ],
        })
        // TODO
        this.setState({
            status : "in"
        })
    }
    checkOut =()=>{
        // TODO
        this.setState({
            listGuestsOfType : [
                {
                    nameUser : "Hello Hello"
                },
                {
                    nameUser : "Không có ai cả"
                },
    
            ],
        })
        this.setState({
            status : "out"
        })
    }
    overNight =()=>{
        // TODO
        this.setState({
            listGuestsOfType : [
                {
                    nameUser : "Something there"
                },
                {
                    nameUser : "Nobody can defeat me"
                },
    
            ],
        })
        this.setState({
            status : "over"
        })
    }
    onAccept = async (e)=>{
        console.log(e)
        // const res = await axios.get(`http://localhost:5000/`) 
        let array = this.state.awaitGuest.filter(ele =>ele != e)
        this.setState({
            awaitGuest : array
        })
    }


    render() {
        console.log(this.state.status)
        const activeIn = this.state.status == "in"?
        <div><li onClick = {this.checkIn}>Khách nhận phòng</li></div>        
        :<li onClick = {this.checkIn}>Khách nhận phòng</li>
        
        const activeOut = this.state.status == "out"?
        <div><li onClick = {this.checkOut}>Khách trả phòng</li></div>        
        :<li onClick = {this.checkOut}>Khách trả phòng</li>
        
        const activeOver = this.state.status == "over"?
        <div><li onClick = {this.overNight}>Lưu trú qua đêm</li></div>        
        :<li onClick = {this.overNight}>Lưu trú qua đêm</li>
        return (
            < Container >
                <div className = "add-new-btn"><Link to="/host/add-new-home-stay">
                     <span>+ Thêm chỗ ở mới</span>
                     </Link>
                </div>
                <div className = "boxes" >
                <div className = "box1">
                <div className='booking-calendar-box'>
                    <div className="date-box">
                        <div style = {{fontSize:"24px"}}>{this.state.date}</div>
                        <div>
                       
                        <DatePicker id = 'date-pickker' type="date" value={this.state.date} onChange={this.onChangeDate} />
                        <label for = "date-pickker" style = {{width:0,height:0,margin:0}} ><i   style = {{position:"relative",marginLeft:'-36px',zIndex:999}} class="fas fa-angle-down"></i></label>
                        </div>
                    </div>
                    <div className="list-bill">
                        <ul>
                            {activeIn}
                            {activeOut}
                            {activeOver}
                        </ul>
                        <ListGuests listGuestsOfType = {this.state.listGuestsOfType} />                        
                    </div>
            
                </div>
                <div className = "waiting-req">
                    <div style = {{fontSize:"24px",fontWeight:700}}>Yêu cầu đang chờ</div>
                    <ul>
                    {this.state.awaitGuest.map(item=><AwaitGuest awaitGuest = {item} onAccept = {this.onAccept}/>)}
                    </ul>

                </div>
                </div>
                <div className="box2">
                    
                </div>
                </div>
            </Container>
        )
    }
}
