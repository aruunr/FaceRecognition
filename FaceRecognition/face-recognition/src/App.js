import React, { Component } from 'react';
//import logo from './logo.svg';
import './App.css';
import Navigation from './components/Navigation';
import Logo from './components/Logo';

import ImageLinkForm from './components/ImageLinkForm';
import Rank from './components/Rank';
import Particles from 'react-particles-js';
import Clarifai from 'clarifai';
import FaceRecognition from './components/FaceRecognition';
import 'tachyons';

const app = new Clarifai.App({
 apiKey: 'bf49e7d50ec9414cab121fa8dbc3491e'
});

const particleOptions = {
            		particles: {
            			line_linked: {
            				shadow: {
            					enable: true,
            					color: "#3CA9D1",
            					blur: 5
            				}
            			},
                    number : {
                        value : 30,
                        density : {
                        enable:  true,
                        value_area: 700
                    }
                    },
                    interactivity: {
    detect_on: 'canvas',
    events: {
      onhover: {
        enable: false,
        mode: 'repulse'
      },
      onclick: {
        enable: true,
        mode: 'push'
      },
      resize: true
    }
            		}}
            	}

class App extends Component {
    
    constructor(){
        super();
        this.state = {
            input : '',
            imageURL : ''
        }   
    }
    
    onTextInput = (event) => {
        this.setState({input: event.target.value});
    }
    
     onSubmit = () => {
        this.setState({imageURL: this.state.input});
         
        app.models.predict(Clarifai.FACE_DETECT_MODEL, this.state.input).then(
    function(response) {
      console.log(response);
    },
    function(err) {
      // there was an error
    }
  );
    }
    
  render() {
    return (
      <div className="App">
    <Particles className = 'particles'
              params={particleOptions}
             
            />
      <Navigation />
      <Logo />
     <Rank />
      <ImageLinkForm onTextInput={this.onTextInput} onSubmit={this.onSubmit} />
       <FaceRecognition imageURL ={this.state.imageURL}/>
      </div>
    );
  }
}

export default App;
