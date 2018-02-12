import React from 'react';

const FaceRecognition = ({imageURL}) => {
    return (
       <div className='center ma'>
        <div className= 'absolute mt2'>
        <img  src={imageURL} width='300px' height='auto' />
        </div>
        </div>
    );
}


export default FaceRecognition;