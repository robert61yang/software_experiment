import React from 'react';
import PropTypes from 'prop-types';
import {
    Alert,
    Button,
    Tooltip,
    Input,
    ListGroup,
    ListGroupItem
} from 'reactstrap';
import {connect} from 'react-redux';
import moment from 'moment';

import {getMoodIcon} from 'utilities/weather.js';
import {inputDanger,createComment,openComment,input,createVote, setTooltipToggle, toggleTooltip, followUp, deletePost, deleteFollow, commentUnknown} from 'states/post-actions.js';

import ImportantComment from 'components/ImportantComment.jsx';

import './ImportantItem.css';

class ImportantItem extends React.Component {
    static propTypes = {
        //id: PropTypes.number,
        mood: PropTypes.string,
        text: PropTypes.string,
        clearVotes: PropTypes.number,
        cloudsVotes: PropTypes.number,
        drizzleVotes: PropTypes.number,
        rainVotes: PropTypes.number,
        thunderVotes: PropTypes.number,
        snowVotes: PropTypes.number,
        windyVotes: PropTypes.number,
        tooltipOpen: PropTypes.bool,
        dispatch: PropTypes.func,
        url:PropTypes.string,
    };

    constructor(props) {
        super(props);

        this.commentopen = this.commentopen.bind(this);
        this.handleFollow = this.handleFollow.bind(this);
        //this.handleCommentInputChange = this.handleCommentInputChange.bind(this);
        this.handleComment = this.handleComment.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleTooltipToggle = this.handleTooltipToggle.bind(this);
        this.handleVote = this.handleVote.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleCommentUnknown = this.handleCommentUnknown.bind(this);
    }

    render() {
        const {id, text, ts, comments, numofcomment, follower, username} = this.props;


        let children = (
            <div></div>
        );
        
        if(numofcomment>0){
            children = comments.map(p => (
                <ListGroupItem key={p.id} action>
                    <ImportantComment {...p} />
                </ListGroupItem>
            ));
        }

        return (
            <div className='post-item d-flex flex-column' onClick={this.handleClick}>
            <div className='col post'>
                <div className = 'row usercon'>
                    <div className = 'col'>
                        <div className = 'row' id = 'userrow'>
                            <i class="fas fa-user-circle fa-2x" id = 'usericon'></i>
                            <div id = 'poster'>{this.props.username}</div>
                        </div>
                    </div>
                    <div className = 'col ml-auto'>
                        <div className = 'row'>
                            <i className="star fas fa-star ml-auto"></i>
                                <Button className = 'viewbtn' onClick={this.handleFollow}>
                                    <i className="far fa-eye"></i>
                                </Button>
                            <div className = 'viewnum'>{this.props.follownum}</div>
                            <div className='ts'>{moment(ts * 1000).calendar()}</div> 
                        </div>
                    </div>
                </div>
                    <div className = 'text-box'>
                        <div className='text'>{text}</div>
                        {(this.props.url != '') && <img class='image'  src={this.props.url} />}
                    </div>             
            </div>
            <div className = 'row justify-content-between'>
                {(this.props.curname == username) &&
                    <i class=" col fas fa-trash-alt" id = 'deletebtn'>
                        <Button className='deletepost' color="link" onClick={this.handleDelete}>刪除貼文</Button>
                    </i>
                }
                <div className = 'col'>
                    <div className = 'row justify-content-end'>
                        <div className='commentnum'>{this.props.numofcomment}則留言</div>
                        <Button className='opencomment' color="link" onClick={this.commentopen}>顯示留言板</Button>
                    </div>
                </div>
            </div>
            {(this.props.opencomment)   && 
            (<div>
                <div className = 'commentrow row'>
                    <Input className='input commentblock' type='textarea' innerRef={el => {this.inputEl = el}}  placeholder="留言....."></Input>
                    <div className="checkbox">
                        <label className = 'namelabel'>
                            <input type="checkbox" data-toggle="toggle"value={this.props.commentUnknown} onChange={this.handleCommentUnknown}/> 匿名
                        </label>
                    </div>
                    <Button className='commentpost commentbtn' color="info" onClick={this.handleComment}>確認</Button>
                </div>
                <div className='comment'>
                    <ListGroup id = 'commentlist'>
                        {children} 
                    </ListGroup>    
                </div>
            </div>
            )}
        </div>
        );
    }

    handleCommentUnknown(e){
        this.props.dispatch(commentUnknown());
    }

    handleDelete(){
        this.props.dispatch(deletePost(this.props.id, this.props.curname))
    }

    handleFollow(){
        if(!this.props.follower.find(el => el == this.props.curname)){
            this.props.dispatch(followUp(this.props.id, this.props.curname,this.props.curname));
        }else if(this.props.curname != this.props.username){
            this.props.dispatch(deleteFollow(this.props.id, this.props.curname,this.props.curname));
        }
    }

    handleComment() {
        if (!this.inputEl.value) {
            this.props.dispatch(inputDanger(true));
            return;
        }
        console.log("handleComment");
        if(this.props.commentUnknown == false){
            this.props.dispatch(createComment(this.props.id, this.inputEl.value, this.props.curname, this.props.curname));
        }else{
            this.props.dispatch(createComment(this.props.id, this.inputEl.value, '匿名小次郎', this.props.curname));
        }
        this.inputEl.value = '';
    }

    commentopen() {
        console.log("handleopenComment");
        this.props.dispatch(openComment(this.props.id, this.props.curname));
    }

    handleClick() {
        this.props.dispatch(setTooltipToggle(this.props.id, true));
    }

    handleTooltipToggle() {
        this.props.dispatch(toggleTooltip(this.props.id));
    }

    handleVote(vote) {
        this.props.dispatch(createVote(this.props.id, vote));
        this.props.dispatch(setTooltipToggle(this.props.id, false));
    }
}

export default connect((state, ownProps) => ({
    ...state.postForm,
    searchText: state.searchText,
    posts: state.post.posts,
    tooltipOpen: state.postItem.tooltipOpen[ownProps.id] ? true : false,
    curname: state.main.curname,
    commentUnknown: state.postItem.commentUnknown,
}))(ImportantItem);
