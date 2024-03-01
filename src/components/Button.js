import React from 'react';

const Button = (props) => {
    return (
        <div className='items-center justify-center'>
            <button className='bg-primary text-accent pl-10 pr-10 pt-3 pb-3 rounded-lg font-link'>{props.children}</button>
        </div>
    );
};

export default Button;
