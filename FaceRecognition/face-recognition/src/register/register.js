
import React, { Component } from 'react';

class register extends Component{
   constructor(props){
      super(props);
      this.state = {
        signInEmail : '',
        signInPassword : '',
        signInName : ''
    } 
   }
    
onNameChange = (event) => {
       this.setState({signInName: event.target.value})
  }    
  onEmailChange = (event) => {
       this.setState({signInEmail: event.target.value})
  }
  onPasswordChange = (event) => {
       this.setState({signInPassword: event.target.value})
  }
  onRegnSubmit = () => {
      console.log("in register");
     
      fetch('http://localhost:3000/register', {
  method: 'post',
  headers: {
    
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    email: this.state.signInEmail,
    password: this.state.signInPassword,
      name: this.state.signInName
  })
      }).then(response => response.json())
      .then(user => {
          if (user) { 
              this.props.loadUser(user);
            this.props.onRouteChange('home');
          }
          else{ 
             console.log("Error in regn");
          }
      })
      
  }
    
  render(){
    return (
    <div>
    <article className="br3 ba  b--black-10 mv6 w-100 w-50-m w-25-l mw5 center shadow-5">    
    <main className="pa4 black-80">
      <div className="measure">
        <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
          <legend className="f2 fw6 ph0 mh0">Register</legend>
          <div className="mt3">
            <label className="db fw6 lh-copy f6" >Name</label>
            <input onChange={this.onNameChange}  className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="text" name="name"  id="name" />
          </div>
           <div className="mt3">
            <label className="db fw6 lh-copy f6" >Email</label>
            <input onChange={this.onEmailChange} className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="email" name="email-address"  id="email-address" />
          </div>
          <div className="mv3">
            <label className="db fw6 lh-copy f6" >Password</label>
            <input onChange={this.onPasswordChange} className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="password" name="password"  id="password" />
          </div>
        </fieldset>
         <div className="">
          <input onClick={this.onRegnSubmit} className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" type="submit" value="Register" />
        </div>
        
      </div>
    </main>
    </article>
    </div>   
 );
}

}
export default register;