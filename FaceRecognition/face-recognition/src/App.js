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
import Signin from './signin/signin';
//import particleOptions from './particles.json';
import Register from './register/register';

const app = new Clarifai.App({
 apiKey: 'bf49e7d50ec9414cab121fa8dbc3491e'
});

const particleOptions = {
            		particles: {
            			line_linked: {
            				shadow: {
            					enable: true,
            					color: "#0044A0",
            					blur: 3
            				}
            			},
                    number : {
                        value : 40,
                        density : {
                        enable:  true,
                        value_area: 700
                    }
                    },
                    interactivity: {
    detect_on: 'canvas',
    events: {
      onhover: {
        enable: true,
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


const initialState = {
            input : '',
            imageURL : '',
            box : '',
            route : 'signin',
            isSignedIn : false,
    isSignedOut : true,
            user: {
                id: '',
                name : '',
                email : '',
                entries : 0,
                joined : '' 
            }
        }   

class App extends Component {
    
    constructor(){
        super();
        this.state = initialState;
    }
    
  
    
    calculateFaceLocation = (data) => {
        const clarifaiData = data.outputs[0].data.regions[0].region_info.bounding_box;
        const image = document.getElementById('inputImage');
        const width = parseInt(image.width);
        const height = parseInt(image.height);
        const boxData = {
            leftCol:  clarifaiData.left_col * width,
            topRow:  clarifaiData.top_row * height,
            rightCol:  width - (clarifaiData.right_col*width),
            bottomRow:  height - ( clarifaiData.bottom_row * height)
        }
        return boxData;
    }
    
    displayBox = (box) => {
        this.setState({box: box});
    }
    
    onTextInput = (event) => {
        this.setState({input: event.target.value});
    }
    
     onSubmit = () => {
        this.setState({imageURL: this.state.input});
         
        app.models
            .predict(Clarifai.FACE_DETECT_MODEL, this.state.input)
            .then(
          response => 
            {
              if(response) {
                fetch('https://infinite-ocean-40943.herokuapp.com/image',{method: 'put',
  headers: { 'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    id: this.state.user.id
  })}).then(response => response.json())
        .then(count => {
                this.setState(Object.assign(this.state.user,{entries : count}))    
                    
                })
                }
                
            
            this.displayBox( this.calculateFaceLocation(response))
            })
            .catch(err => console.log(err));
  
    }
     
     onRouteChange = (route) => {
      
         if (route === 'signout' ){
             console.log('in signout func')
            this.setState(initialState); 
             
         }else if (route === 'home' ){
             this.setState({isSignedIn : true});
         }
            this.setState({route : route});
     }
     
     loadUser = (data) => {
         this.setState( {user: {
                id: data.id,
                name : data.name,
                email : data.email,
                entries : data.entries,
                joined : data.joined
            }});
     }
    
  render() {
    return (
      <div className="App">
     
        <Particles className = 'particles' params={particleOptions} />
          <Navigation isSignedIn = {this.state.isSignedIn} isSignedOut ={this.state.isSignedOut} onRouteChange = {this.onRouteChange}/>
        {
        (this.state.route === 'home')
        ?  <div> 
            <Logo />
            <Rank name={this.state.user.name} entries={this.state.user.entries} />
            <ImageLinkForm onTextInput={this.onTextInput} onSubmit={this.onSubmit} />
            <FaceRecognition box ={this.state.box} imageURL ={this.state.imageURL}/>
        </div>
        
        : (this.state.route === 'signin'
        ?
        <Signin loadUser = {this.loadUser} onRouteChange = {this.onRouteChange}/>         
         : 
        <Register loadUser = {this.loadUser} onRouteChange = {this.onRouteChange}/>   
          )
            

        }
        </div>
    );
  }
}

export default App;
