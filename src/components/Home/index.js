import React, { Component } from 'react'
import{ withRouter,Route} from "react-router-dom"
import Homepage from '../Homepage'
import Search from '../Search'
import SearchNav from '../searchNav'
import axios from 'axios'
import { isThisSecond } from 'date-fns'
class Home extends Component {

    state={
        room:[],
        check:true,
    }

    componentDidMount(){
        localStorage.setItem("text","null")
        localStorage.setItem("endDate","null")
        localStorage.setItem("startDate","null")
        localStorage.setItem("people","null")
        localStorage.setItem("price","null")
    }

    searchingRoom = async (q)=>{
        const {text,startDate,endDate,price,people} =q
        // console.log(check)
        // if(check===true){
        // const text = localStorage.getItem(text);
        // const startDate = localStorage.getItem(startDate)
        // const endDate = localStorage.getItem(endDate)
        // const price = localStorage.getItem(price)
        // const people = localStorage.getItem(people)

        // console.log(`http://localhost:5000/room/search?text=${this.state.text}&&startDate=${this.state.startDate}&&endDate=${this.state.endDate}&&price=${this.state.price}&&people=${this.state.people}`)
        // console.log('chekc 1')
        // const res = await axios.get(`http://localhost:5000/room/search?text=${text}&&startDate=${startDate}&&endDate=${endDate}&&price=${price}&&people=${people}`)
        // if(res.status ===200){
        //     console.log(res)
        //     this.setState({
        //         room:res.data,
        //         check:false,
        //     })
        // }

    // }
    }

    render() {
        // console.log(this.state.room)
        const check = !this.state.check?<SearchNav/> :<SearchNav onSearch={this.searchingRoom}/>
        return (<>
                <Route path = {["/homepage","/search",]} render = {()=>check} />
                <Route path = "/search" render = {()=><Search Room={this.state.room}/> }/>
                <Route path = "/homepage" component = {Homepage}/>
                
            </>
         
        )
    }
}
export default withRouter(Home);
