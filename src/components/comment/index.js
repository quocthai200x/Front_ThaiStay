import React, { Component } from 'react'
import axios from 'axios'
import CommentItem from '../commentItem/index'
import { FaStar, FaTimes } from 'react-icons/fa'
import './index.css'
import StarRatingComponent from 'react-star-rating-component';

class Comment extends Component {
    state = {
        listComment: [],
        content: '',
        rating: 0,
        preRate: 0,
        isOpen: false,
    }

    onStarClick(nextValue, prevValue, name) {
        this.setState({ rating: nextValue, preRate: nextValue });
    }

    onStarHover(nextValue, prevValue, name) {
        this.setState({
            rating: nextValue
        })
        this.onChangeColor()
    }

    onStarHoverOut(nextValue, prevValue, name) {
        this.setState({
            rating: prevValue
        })
        this.onChangeColorOut()
    }

    onChangeColor = () => {
        const stars = document.getElementsByClassName('dv-star-rating-empty-star');
        for (let i = 0; i < this.state.rating - this.state.preRate; i++) {
            stars[stars.length - i - 1].style.color = "#ffb400"
            stars[stars.length - i - 1].style.transition = "all 0.5s"
        }
    }

    onChangeColorOut = () => {
        const stars = document.getElementsByClassName('dv-star-rating-empty-star');
        for (let i = 0; i < this.state.rating - this.state.preRate; i++) {
            stars[stars.length - i - 1].style.color = "#333"
            stars[stars.length - i - 1].style.transition = "all 0.5s"
        }
    }

    onChange = (e) => { this.setState({ content: e.target.value }) }

    onSubmit = async (e) => {
        console.log('submit')
        e.preventDefault()
        const res = await axios.post(`http://localhost:5000/room/cmt/${this.props.idRoom}`, {
            idUser: this.props.idUser,
            rate: this.state.rating,
            content: this.state.content
        })
        if (res.status === 200) {
            alert('cmt done');
            // this.setState({
            //     content: '',
            //     rating: 0,
            //     preRate: 0,
            // })
            this.getListComment()
        }
    }

    getListComment = async () => {
        const res = await axios.get(`http://localhost:5000/room/cmt/${this.props.idRoom}`);
        if (res.status === 200)
            this.setState({
                listComment: [...res.data]
            })

        console.log(this.state.listComment)
    }

    onClickGetFullCmt = () => {
        this.setState({
            isOpen: !this.state.isOpen
        })
    }

    onClickToClose = () => {
        this.setState({
            isOpen: !this.state.isOpen
        })
    }

    async componentDidMount() {
        const result = await this.getListComment()
    }

    render() {
        return (
            <>
                <div className={this.state.isOpen ? "comment-tab comment-tab-active" : "comment-tab"}>
                    <div className="icon"><FaTimes style={{ width: "100px", float: "right", marginBottom: "100px" }} onClick={this.onClickToClose} /></div>
                    <hr />
                    <h1 style={{ marginBottom: "30px" }}>{this.state.length} Đánh giá</h1>
                    <div className='list-cmt'>
                        {this.state.listComment.map(item => (
                            <CommentItem key={item.id} comment={item} />
                        ))}
                    </div>
                </div>

                {/* comment form and rate */}
                <div className='comment-full'>
                    <div className="comment-form">
                        <form onSubmit={this.onSubmit}>
                            <div className='in'>
                                <div className="rate-star">
                                    <img style={{ width: "50px", height: "50px", borderRadius: "50%" }} src="https://image.shutterstock.com/image-vector/male-default-avatar-profile-gray-260nw-362901362.jpg" />
                                    <div className='name-star'>
                                        <div className='user-name'>tuan dat</div>
                                        <StarRatingComponent
                                            name="rate"
                                            renderStarIcon={() => <FaStar />}
                                            starCount={5}
                                            onStarClick={this.onStarClick.bind(this)}
                                            onStarHover={this.onStarHover.bind(this)}
                                            onStarHoverOut={this.onStarHoverOut.bind(this)}
                                        />
                                    </div>
                                </div>
                                <textarea type='input' placeholder="Nhập nhận xét..." value={this.state.content} onChange={this.onChange} />
                            </div>
                            <button>Gửi</button>
                        </form>
                    </div>

                    <div className="list-comment">
                        {this.state.listComment.map((item,index) => (
                            index<3?<CommentItem key={item.id} comment={item} />:null
                        ))}
                        <div className='get-full-cmt' onClick={this.onClickGetFullCmt}>Xem thêm {this.state.listComment.length - 3}</div>
                    </div>
                </div>
            </>
        )
    }
}


export default Comment;
