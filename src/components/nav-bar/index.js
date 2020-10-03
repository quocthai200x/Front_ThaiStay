import React from 'react';
import {
  Container
} from 'reactstrap';
import { Link } from "react-router-dom"
import "./navBar.css"
export default class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLogin: false,
      width: 1200,
      height: 1200,
      resize: true,
      isOpenToggle: false,
      isHide: false,
      // TODO nhận từ bên App
      // username : this.props.username,
    }

  }
  checkLogin = () => {
    // TODO truyền xuống check có token hay chưa , chưa thì ko isLogin false
  }
  isOpenToggle = () => {
    this.setState({
      isOpenToggle: !this.state.isOpenToggle,
    })
  }
  componentDidMount() {
    this.checkLogin()
  }

  componentDidMount() {
    this.updateWindowDimensions();
    window.addEventListener('resize', this.updateWindowDimensions);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions);
  }
  componentDidUpdate() {
    this.updateNavbar()
  }

  updateNavbar = () => {
    if (this.state.resize && this.state.width <= 800) {
      this.setState({
        resize: false
      })
    } else if (!this.state.resize && this.state.width > 800) {
      this.setState({
        resize: true
      })
    }
  }

  updateWindowDimensions = () => {
    this.setState({ width: window.innerWidth, height: window.innerHeight });
  }
  signOut = () => {

    // TODO : xoa Token
    this.setState({
      isLogin: false
    })
  }

  render() {
    // đây là hiện đăng nhập hay chưa --navbar
    const isLogin = this.state.isLogin ? <div id="nav-bar-items">
      <div className="nav-bar-item" style={{ display: "flex", alignItems: 'center' }}>
        <div id="become-host-btn" style={{ lineHeight: '20px', borderRadius: '8px', height: '40px' }}>
          <Link to="/host/dash-board">Trở thành chủ phòng</Link>

        </div>
      </div>
      <div className="nav-bar-item" style={{ display: "flex", alignItems: "center" }} >

        <img src='ava' style={{ borderRadius: "50%", width: '40px', height: "40px" }} />
        <div style={{ marginLeft: '10px' }}>hello,username</div>
        {/* TODO :them ava username */}
      </div>
      <div onClick={this.signOut} className="nav-bar-item">
        Đăng xuất
    </div>
    </div>
      :
      <div id="nav-bar-items">
        <div className="nav-bar-item" style={{ display: "flex", alignItems: 'center' }}>
          <div id="become-host-btn" style={{ lineHeight: '20px', borderRadius: '8px', height: '40px' }}>
            <Link to="/host/dash-board">Trở thành chủ phòng</Link>
          </div>
        </div>
        <div className="nav-bar-item">
          <Link to="/sign-in"> Đăng nhập</Link>
        </div>
        <div className="nav-bar-item">
          <Link to="/sign-up"> Đăng kí</Link>

        </div>
      </div>

    // đây là nút hiện side bar
    const isResize = this.state.resize ? isLogin : <span onClick={this.isOpenToggle} style={{ marginRight: '8px' }}><i class="fas fa-bars"></i></span>

    // đây là hiện sidebar có đăng nhập hay chưa
    const isLoginSideBar = this.state.isLogin ?
      <div className={this.state.isOpenToggle ? "layer layer-active" : "layer layer-deactive"}>
        <div className={this.state.isOpenToggle ? "side-nav-bar-items active" : "side-nav-bar-items deactive"} >
          <i onClick={this.isOpenToggle} class="fas fa-times"></i>
          <div className="side-nav-bar-item"  >
            <img src="http://cdn.hoahoctro.vn/uploads/2018/10/5bc41f947aa93-1.jpg" style={{ width: "50px", height: "50px", borderRadius: "50%", marginTop: '10px', marginBottom: "10px" }} />
            <div >Hello, Administrator</div>
            {/* TODO : thêm ava và username */}
          </div>
          <div className="side-nav-bar-item" >
            <div id="side-become-host-btn" >
              <Link to="/host/dash-board">Trở thành chủ phòng</Link>

            </div>
          </div>

          <div onClick={this.signOut} className="side-nav-bar-item" >
            Đăng xuất
          </div>
        </div>
        {/* <div style = {{width:'auto',height:"100vh"}} onClick = {this.isOpenToggle}></div> */}

      </div>
      :
      <div className={this.state.isOpenToggle ? "layer layer-active" : "layer layer-deactive"} >
        <div className={this.state.isOpenToggle ? "side-nav-bar-items active" : "side-nav-bar-items deactive"}>
          <i onClick={this.isOpenToggle} class="fas fa-times"></i>
          <div className="side-nav-bar-item"  >
            <div id="side-become-host-btn" >
              <Link to="/host/dash-board">Trở thành chủ phòng</Link>
            </div>
          </div>
          <div className="side-nav-bar-item" >
            <Link onClick={this.isOpenToggle} to="/sign-in"> Đăng nhập</Link>


          </div>
          <div className="side-nav-bar-item"  >
            <Link onClick={this.isOpenToggle} to="/sign-up"> Đăng kí</Link>

          </div>
        </div>
        {/* <div style = {{width:'auto',height:"100vh"}} onClick = {this.isOpenToggle}></div> */}
      </div>


    //mở sidebar hay ko


    return (<>
      {isLoginSideBar}
      <div id="nav-bar">

        <div className="container">
          <div id="nav-bar-content">
            <div id="logo">
              <Link to="/homepage">
                <img src="https://www.xahara.vn/wp-content/uploads/ch%C3%B3-husky-ng%C3%A1o.jpg" style={{ height: "40px", width: "40px", marginRight: "10px" }} />
                <span>ThaiStay</span>
              </Link>
            </div>{isResize}
          </div>

        </div>
      </div>
    </>
    )
  }
}