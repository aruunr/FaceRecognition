import React from 'react';
import Tilt from 'react-tilt'
import brainSVG from './thinking.svg';

const Logo = () => {
    return (
        <div>
            <Tilt className="Tilt br2 shawdow" options={{ max : 95 }} style={{ height: 150, width: 150 }} >
 <div className="center"> <img style =  {{paddingTop: '5px'}} alt='logo' src={brainSVG}/></div>
</Tilt>
        </div>   
    );
}


export default Logo;