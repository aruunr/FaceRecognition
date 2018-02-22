import React from 'react';

const Rank = ({name, entries}) => {
    return (
        <div>
         <div className = 'Black f3'>
         {`${name}, The current entry count is `}
         </div>
        
        <div className = 'Black f2'>
         {`${entries}`}
         </div>
        </div>   
    );
}


export default Rank;