import React from 'react';

const ImageLinkForm = ({onTextInput,onSubmit}) => {
    return (
        <div>
         <p className = 'f3'>
        This App can detect faces in an image
         </p>
         <div className='center'>
          <div className='center pa4 br3 shadow-5'>
          <input className='f4 pa2 w70 center' type='text' onChange={onTextInput}>
          </input>
        
          <button className='w-30 grow f4 link ph3 pv2 dib dark-gray bg-light-blue' onClick = {onSubmit}>
           Detect
          </button>
          </div>
         </div>
        </div>   
    );
}


export default ImageLinkForm;