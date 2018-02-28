import React, { Component } from 'react';
import {Alert} from 'react-bootstrap';
import { PropagateLoader } from 'react-spinners';
  

class signin extends Component{
   constructor(props){
      super(props);
      this.state = {
        signInEmail : '',
        signInPassword : '',
        showErrorMessage : false,
          isLoading :false 
    } 
   }
    
  onEmailChange = (event) => {
       this.setState({signInEmail: event.target.value})
  }
  onPasswordChange = (event) => {
       this.setState({signInPassword: event.target.value})
  }
  onSigninSubmit = () => {
      console.log("in signin");
     this.setState({isLoading : true})
      fetch('https://infinite-ocean-40943.herokuapp.com/signin', {
  method: 'post',
  headers: {
    
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    email: this.state.signInEmail,
    password: this.state.signInPassword
  })
      }).then(response => response.json())
      .then(user => {
          this.setState({isLoading : false});
          if (user.id) {  
              console.log("in signin user");
            this.props.loadUser(user);  
            this.props.onRouteChange('home');
          }
          else{ 
              console.log("in signin else");
              this.setState({showErrorMessage: true});
              this.props.onRouteChange('signin');
          }
      })
      
  }
  
  
    
  render(){
   
 if  (this.state.isLoading) 
return (
       <div className=" w-100 w-50-m w-25-l center" >
        <PropagateLoader
          color={'#36D7B7'} 
          loading={this.state.isLoading} 
        />
      </div>
 
        );
   
   
else      
return (
    <div>
    <article className="br3 ba  b--black-10 mv4 w-100 w-50-m w-25-l mw5 center shadow-5">    
    <main className="pa4 black-80">
      <div className = 'measure'>
        <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
          <legend className="f2 fw6 ph0 mh0">Sign In</legend>
          <div className="mt3">
            <label className="db fw6 lh-copy f6" >Email</label>
            <input onChange={this.onEmailChange} className="pa2 input-reset ba hover-bg-black hover-white w-100" type="email" name="emailddress"  id="emailddress" />
          </div>
          <div className="mv3">
            <label className="db fw6 lh-copy f6" >Password</label>
            <input onChange={this.onPasswordChange} className="b pa2 input-reset ba  hover-bg-black hover-white w-100" type="password" name="password"  id="password" />
          </div>
        </fieldset>
            <div >
          <input onClick={
 this.onSigninSubmit
} className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" type="submit" value="Sign in" />
        </div>
        <div className="lh-copy mt3">
          <p onClick={() => this.props.onRouteChange('register')} href="#0" className="f6 link dim black db pointer">Register</p>
        </div>
      </div>
    </main>
    </article>
   { (this.state.showErrorMessage) ?
    <div >
       <Alert bsStyle="danger">
  <strong>Error!</strong> Check the username and password.
     </Alert>
   </div>
   : <div></div>
   }
    </div>  
  );
 }
}

export default signin;