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

import Postcommand from 'components/Postcommand.jsx';

import './PostItem.css';

class PostItem extends React.Component {
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

        this.inputEl = null;
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
        const {id, text, ts, comments, numofcomment, follower, username, follownum} = this.props;


        let children = (
            <div></div>
        );
        
        if(numofcomment>0){
            children = comments.map(p => (
                <ListGroupItem key={p.id} action>
                    <Postcommand {...p} />
                </ListGroupItem>
            ));
        }

        return (
            <div className='post-item d-flex flex-column' onClick={this.handleClick}>
            <div className='col post'>
                <div className = 'row usercon'>
                    <div className = 'col'>
                        <div className = 'row' id = 'userrow'>
                            <i className="fas fa-user-circle fa-2x" id = 'usericon'></i>
                            <div id = 'poster'>{this.props.username}</div>
                        </div>
                    </div>
                    <div className = 'col ml-auto'>
                        <div className = 'row'>
                            <Button className = 'viewbtn ml-auto' onClick = {this.handleFollow}>
                                <i class="far fa-eye"></i>
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
                    <i className=" col fas fa-trash-alt" id = 'deletebtn'>
                        <Button className='deletepost' color="link" onClick={this.handleDelete}>????????????</Button>
                    </i>
                }
                <div className = 'col'>
                    <div className = 'row justify-content-end'>
                        <div className='commentnum'>{this.props.numofcomment}?????????</div>
                        <Button className='opencomment' color="link" onClick={this.commentopen}>???????????????</Button>
                    </div>
                </div>
            </div>
            {(this.props.opencomment)   && 
            (<div>
                <div className = 'commentrow row'>
                    <Input className='input commentblock' type='textarea' innerRef={el => {this.inputEl = el}}  placeholder="??????....."></Input>
                    <div className="checkbox">
                        <label className = 'namelabel'>
                            <input type="checkbox" data-toggle="toggle" value={this.props.commentUnknown} onChange={this.handleCommentUnknown}/> ??????
                        </label>
                    </div>
                    <Button className='commentpost commentbtn' color="info" onClick={this.handleComment}>??????</Button>
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
        this.props.dispatch(deletePost(this.props.id))
    }

    handleFollow(){
        if(!this.props.follower.find(el => el == this.props.curname)){
            this.props.dispatch(followUp(this.props.id, this.props.curname));
        }else if(this.props.curname != this.props.username){
            this.props.dispatch(deleteFollow(this.props.id, this.props.curname));
        }
    }

    handleComment() {
        if (!this.inputEl.value) {
            this.props.dispatch(inputDanger(true));
            return;
        }
        
        console.log("handleComment");
        if(this.props.commentUnknown == false){
            this.props.dispatch(createComment(this.props.id, this.inputEl.value, this.props.curname));
        }else{
            this.props.dispatch(createComment(this.props.id, this.inputEl.value, '???????????????'));
        }
        this.inputEl.value = '';
    }

    commentopen() {
        console.log("handleopenComment");
        this.props.dispatch(openComment(this.props.id));
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
    commentUnknown: state.postItem.commentUnknown,
    curname: state.main.curname
}))(PostItem);
