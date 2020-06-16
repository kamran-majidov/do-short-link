import React from 'react';

const LinkCard = ({link}) => {

    return (
        <>
         <h4 className="teal-text">Detail info</h4>
            <p>Original link: <a href={link.from} target="_blank" rel="noopener noreferrer">{link.from}</a>
            </p>
            <p>Shorted link: <a href={link.to} target="_blank" rel="noopener noreferrer">{link.to}</a>
            </p>
            <p>Created date: <strong>{new Date(link.date).toLocaleString()}</strong>
            </p>
            <p>Clicks: <strong>{link.clicks}</strong>
            </p>

        </>
    );
};

export default LinkCard;
