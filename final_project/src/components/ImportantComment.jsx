import React from 'react';
import PropTypes from 'prop-types';
import {
    Tooltip,
    Button
} from 'reactstrap';
import {connect} from 'react-redux';
import moment from 'moment';

import {getMoodIcon} from 'utilities/weather.js';
import {createVoteOfComment, setTooltipToggle, toggleTooltip, deleteComment} from 'states/post-actions.js';

import './ImportantComment.css';

class ImportantComment extends React.Component {
    static propTypes = {
        parentid:PropTypes.string,
        id: PropTypes.string,
        text: PropTypes.string,
        dispatch: PropTypes.func
    };

    constructor(props) {
        super(props);

        this.handleDelete = this.handleDelete.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleTooltipToggle = this.handleTooltipToggle.bind(this);
        this.handleVote = this.handleVote.bind(this);
    }

    render() {
        const {parentid, id,  text, ts, username} = this.props;

        return (
            <div className='post-item col commentitem' >
            <div className = 'row justify-content-between'>
                    <div className = 'col'>
                        <div className = 'row' id = 'commentuserrow'>
                            <i class="fas fa-user-circle fa" id = 'usericon'></i>
                            <div id = 'commentposter'>{this.props.username}</div>
                        </div>
                    </div>
                    <div className = 'col'>
                        <div className = 'row justify-content-end'>
                            <div className='comment-ts'>{moment(ts * 1000).calendar()}</div> 
                            {(this.props.curname == username) &&
                                <Button className='deletecomment' color="link"  onClick={this.handleDelete} ><i class=" col fas fa-trash-alt"></i></Button> 
                            }
                        </div>
                    </div>
            </div>
            <div className='post d-flex'>
                <div className='wrap'>
                    <div className='text'>{text}</div>
                </div>
            </div>
        </div>
        );
    }

    handleDelete(){
        this.props.dispatch(deleteComment(this.props.parentid, this.props.id, this.props.curname));
    }

    handleClick() {
        this.props.dispatch(setTooltipToggle(this.props.id, true));
    }

    handleTooltipToggle() {
        this.props.dispatch(toggleTooltip(this.props.id));
    }

    handleVote(vote) {
        console.log("handle");
        console.log(this.props.parentid);
        console.log(this.props.id);
        this.props.dispatch(createVoteOfComment(this.props.parentid,this.props.id, vote));
        this.props.dispatch(setTooltipToggle(this.props.id, false));
    }
}

export default connect((state, ownProps) => ({
    tooltipOpen: state.postItem.tooltipOpen[ownProps.id] ? true : false,
    curname: state.main.curname,
}))(ImportantComment);
