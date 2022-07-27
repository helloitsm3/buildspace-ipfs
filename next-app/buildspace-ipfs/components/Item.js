import React from "react";
import useIPFS from "../hooks/useIPFS";

export default function Item({ item, setLoading }) {
    const [el1, el2] = item;
    const [{ path }] = el1;
    const [{ title, creator, date_created, description }] = el2;

    const imgUrl = useIPFS(path);
    const d = new Date(date_created).toDateString();

    function isValidDate(d) {
        return d instanceof Date && !isNaN(d);
    }

    return (
        <div className="item-container">
            <p>{isValidDate(d) ? d : date_created}</p>

            <div className="img-container">
                <img className="item-image" src={imgUrl} alt={title} />
            </div>

            <div className="item-details-container">
                <span className="item-title">{title}</span>
                <span className="item-description">{description}</span>
            </div>

            <span className="item-creator">{creator}</span>
        </div>
    );
}
