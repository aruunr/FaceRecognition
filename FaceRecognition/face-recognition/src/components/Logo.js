import React from 'react';
import Tilt from 'react-tilt'
import brainSVG from './thinking.svg';

const Logo = () => {
    return (
        <div className="center">
            <Tilt className="Tilt br2 shawdow" options={{ max : 55 }} style={{ height: 150, width: 150 }} >
 <div> <img style =  {{paddingTop: '5px'}} alt='logo' src={brainSVG}/></div>
</Tilt>
        </div>   
    );
}


export default Logo;