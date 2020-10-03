import React, { Component } from 'react'
import Sections from '../sections'
import axios from "axios"
import "./homepage.css"


export default class Homepage extends Component {

    // componentDidMount = async ()=>{
    //     const res = await axios.get(`http://localhost:5000/room/search?city=hanoi`)
    //     if(res.status === 200){
    //         this.setState((state)=>{
    //             rooms : [...res.data]
    //         })
    //     }
    // }
    
    render() {
        return (<>
            <div className = "container1">  
            <div className = 'homepage-sections'> 
            <Sections title = "Hà Nội mùa hoa sữa" text = "text" value = "Hà Nội"/>
            <Sections title = "Tiền nhiều để làm gì" text = "price" value = "23940" /> 
            <Sections title = "Gia đình đông con" text = "people" value = "8" /> 
            </div>
            </div>      
            </>)
    }
}
