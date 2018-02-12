import React from 'react';

const FaceRecognition = ({box,imageURL}) => {
    return (
       <div className='center ma'>
        <div className= 'absolute mt2'>
        <img id='inputImage'  src={imageURL} width='300px' height='auto' />
        <div className = 'bounding-box'
        style = {{top: box.topRow, right: box.rightCol, bottom: box.bottomRow, left: box.leftCol}}
        >
            
        </div>
        </div>
        </div>
    );
}


export default FaceRecognition;