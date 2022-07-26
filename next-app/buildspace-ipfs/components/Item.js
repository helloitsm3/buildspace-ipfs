import React from "react";
import useIPFS from "../hooks/useIPFS";

export default function Item({ item }) {
    const { id, filename, title, creator, date_created, description, hash } = item;
    const imgUrl = useIPFS(hash, filename);
    const d = new Date(date_created).toDateString();

    return (
        <div className="item-container">
            <p>{d}</p>
            <img className="item-image" src={imgUrl} alt={title} />

            <p>{title}</p>
            <p>{description}</p>

            <p>{creator}</p>
        </div>
    );
}
