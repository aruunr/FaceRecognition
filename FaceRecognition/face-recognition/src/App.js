import React, { Component } from 'react';
//import logo from './logo.svg';
import './App.css';
import Navigation from './components/Navigation';
import Logo from './components/Logo';

import ImageLinkForm from './components/ImageLinkForm';
import Rank from './components/Rank';
import Particles from 'react-particles-js';

import 'tachyons';


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
  render() {
    return (
      <div className="App">
    <Particles className = 'particles'
              params={particleOptions}
             
            />
      <Navigation />
      <Logo />
     
      <ImageLinkForm />
       <Rank />
      </div>
    );
  }
}

export default App;
