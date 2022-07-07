import React from "react";
import useIPFS from '../hooks/useIPFS';
import styles from '../styles/CreateItem.module.css';


export default function Item({ item }) {
    console.log("this is the item", item);
    const { id, filename, title, creator, date_created, description, hash } = item;
    const imgUrl = useIPFS(hash, filename)

    return (
        <div className={styles.product_containter}>
            <div>
                <img className={styles.product_image} src={imgUrl} alt={title} />
            </div>

            <div className={styles.product_details}>
                <div className={styles.product_text}>
                    <div className={styles.product_title}>{title}</div>
                    <div className={styles.product_description}>{description}</div>
                </div>

                <div className={styles.product_action}>
                    <div className={styles.product_price}>{creator}</div>
                    <div className={styles.product_price}>{date_created}</div>
                </div>
            </div>
        </div>
    );
}