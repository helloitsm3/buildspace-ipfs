import React from "react";
import useIPFS from '../hooks/useIPFS';

export default function Item({ item }) {
    console.log("this is the item", item);
    const { id, filename, title, creator, date_created, description, hash } = item;
    const imgUrl = useIPFS(hash, filename)

    return (
        <div className='meme'>
            <div>
                <img className="meme-img" src={imgUrl} alt={title} />
            </div>

            <div className=''>
                <div className=''>
                    <div className=''>{title}</div>
                    <div className=''>{description}</div>
                </div>

                <div className=''>
                    <div className=''>{creator}</div>
                    <div className=''>{date_created}</div>
                </div>
            </div>
        </div>
    );
}