import React from 'react';

const Label = ({title,htmlFor}) => {
  return <label htmlFor={htmlFor} className='block pb-2 font-serif roboto-subtitulos'>{title}</label>
  
}

export default Label;
