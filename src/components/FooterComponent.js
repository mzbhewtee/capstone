import React from 'react';

function ListItem({ title, paragraphs }) {
    return (
        <div className='flex flex-col items-start mr-14'>
            <h2 className='text-sm md:text-lg font-bold mb-0 text-pText'>{title}</h2>
            {paragraphs.map((paragraph, index) => (
                <p key={index} className='text-pText text-xs md:text-sm mt-2'>
                    <a href={paragraph.link} className='underline'>{paragraph.text}</a>
                </p>
            ))}
        </div>
    );
}

export default ListItem;
