import React from "react";
import useIPFS from '../hooks/useIPFS';

export default function Item({ item }) {
    console.log("this is the item", item[1][0]);
    const { id, title, creator, date_created, description} = item[1][0];
    const imgUrl = useIPFS(item[0][0].path);

    return (
        <div className='meme' key={id}>
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