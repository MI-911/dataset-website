import React from 'react';

const BlankLink = (props) => {
    return <a href={props.href} target="_blank" rel="noopener noreferrer">{props.children}</a>;
};

export default BlankLink;