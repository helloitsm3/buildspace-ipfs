import { useState, useEffect } from "react";

import Item from "./Item";
import listUploads from "../utils/getIPFS";

const Memes = () => {
    const [memes, setMemes] = useState([]);

    useEffect(() => {
        const getMemes = async () => {
            setLoading(true);
            const results = await listUploads();
            setLoading(false);
            setMemes(results);
        };

        getMemes();
    }, []);

    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        if (memes.length > 0) {
            setLoading(false);
        }
    }, [memes]);

    const renderMemesContainer = () => {
        return memes.map((meme, index) => <Item key={index} item={meme} setLoading={setLoading} className="meme" />);
    };

    return (
        <section className="memes-container">
            {isLoading && <span>Loading...</span>}
            {!isLoading && memes.length <= 0 && <span>You currently do not have any memes...</span>}
            <div className="grid">{renderMemesContainer()}</div>
        </section>
    );
};

export default Memes;
