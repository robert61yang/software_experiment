import React from 'react';
import PropTypes from 'prop-types';
import {
    Alert,
    Input,
    Button,
    ButtonDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem
} from 'reactstrap';
import {connect} from 'react-redux';

import {getMoodIcon} from 'utilities/weather.js';
import {createPost, input, inputDanger, toggleMood, setMoodToggle, selectMood, postUnknown} from 'states/post-actions.js';

import './PostForm.css';

import  {createRef} from 'react';
import Dropzone from 'react-dropzone';
import request from 'superagent';
const CLOUDINARY_UPLOAD_PRESET = 'e810pi7z';
const CLOUDINARY_UPLOAD_URL = 'https://api.cloudinary.com/v1_1/dka9l5woo/upload';




class PostForm extends React.Component {
    static propTypes = {
        inputValue: PropTypes.string,
        inputDanger: PropTypes.bool,
        moodToggle: PropTypes.bool,
        mood: PropTypes.string,
        dispatch: PropTypes.func
    };

    constructor(props) {
        super(props);

        this.inputEl = null;
        this.moodToggleEl = null;


        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleDropdownSelect = this.handleDropdownSelect.bind(this);
        this.handleMoodToggle = this.handleMoodToggle.bind(this);
        this.handlePostUnknown = this.handlePostUnknown.bind(this);
        this.handlePost = this.handlePost.bind(this);
        
        this.state = {
            uploadedFile: null,
            uploadedFileCloudinaryUrl: ''
          };

    }

    render() {
        const {inputValue, moodToggle, mood} = this.props;
        const inputDanger = this.props.inputDanger ? 'has-danger' : '';

        const dropzoneRef = createRef();
        const openDialog = () => {
            // Note that the ref is set async,
            // so it might be null at some point 
            if (dropzoneRef.current) {
              dropzoneRef.current.open()
            }
          };


        return (
            <div className='post-form'>
                <Alert className={` ${inputDanger}`}>
                    <div classNAme = 'container'>
                        <h4 className='label'><i className ="fas fa-file-alt"></i>&nbsp;新增貼文</h4>
                        <Input className='input' type='textarea' getRef={el => {this.inputEl = el}} value={this.props.inputValue} onChange={this.handleInputChange} placeholder="寫些什麼吧....."></Input>
                        {(this.state.uploadedFileCloudinaryUrl != '')   && <img className='showimage' src={this.state.uploadedFileCloudinaryUrl} /> }
                        <div className = 'container' id = 'buttoncontainer'>
                            <div className = 'Btnrow row justify-content-end'>
                                <div className="checkbox">
                                    <label className = 'namelabel'>
                                        <input type="checkbox" data-toggle="toggle" value={this.props.postUnknown} onChange={this.handlePostUnknown}/> 匿名
                                    </label>
                                </div>

                                <Dropzone  ref={dropzoneRef} className='IMAGE' onDrop={this.onImageDrop.bind(this)} multiple={false} accept="image/*">
                                    {({getRootProps, getInputProps}) => {
                                        return (
                                        
                                        <div {...getRootProps()} >
                                            <input {...getInputProps()} />
                                            <Button className='imagebtn'
                                                type="button"
                                                onClick={this.openDialog}
                                            >
                                                新增檔案
                                            </Button>
                                            </div>
                                    )
                                    }}
                                </Dropzone>


                                <Button className='Btn col-2'  onClick={this.handlePost}>確認送出</Button>
                            </div>
                        </div>
                    </div>
                </Alert>
            </div>
        );
    }

    onImageDrop(files) {
        console.log("hi1");
        this.setState({
        uploadedFile: files[0],
        });
        console.log("hi2");
        this.handleImageUpload(files[0]);
    
        console.log("hi3");
        console.log(ploadedFileCloudinaryUrl);
      }
    
      handleImageUpload(file) {
        let upload = request.post(CLOUDINARY_UPLOAD_URL)
                         .field('upload_preset', CLOUDINARY_UPLOAD_PRESET)
                         .field('file', file);
    
        upload.end((err, response) => {
          if (err) {
            console.error(err);
          }
    
          if (response.body.secure_url !== '') {
            this.setState({
              uploadedFileCloudinaryUrl: response.body.secure_url
            });
          }
        }); 
      }






    handlePostUnknown(e){
        //console.log(e.target.value);
        this.props.dispatch(postUnknown());
    }
    


    handleDropdownSelect(mood) {
        this.props.dispatch(selectMood(mood));
    }

    

    handleInputChange(e) {
        const text = e.target.value
        this.props.dispatch(input(text));
        if (text && this.props.inputDanger) {
            this.props.dispatch(inputDanger(false));
        }
    }

    handleMoodToggle(e) {
        this.props.dispatch(toggleMood());
    }

    handlePost() {
        if (!this.props.inputValue) {
            this.props.dispatch(inputDanger(true));
            return;
        }
        if(this.props.postUnknown == false){
            this.props.dispatch(createPost(this.props.inputValue, this.props.username,this.state.uploadedFileCloudinaryUrl));
        }else{
            this.props.dispatch(createPost(this.props.inputValue, '匿名源之助', this.state.uploadedFileCloudinaryUrl));
        }
        this.props.dispatch(input(''));
        this.props.dispatch(selectMood('na'));

        this.setState({
            uploadedFile: null,
            uploadedFileCloudinaryUrl: ''
        });
    }

    
    
}

export default connect(state => ({
    ...state.postForm,
    username: state.main.curname,
}))(PostForm);
