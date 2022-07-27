import React, { useState } from "react";
import { useCreating } from "../lib/ItemModuleContext";

import CreateItem from "./CreateItem";

const GatedAccess = ({ accessGranted, setAccessGranted, currentWalletNftsImages }) => {
    const [viewNfts, setViewNfts] = useState(false);
    const [viewMemes, setViewMemes] = useState(false);
    const { creating, setCreating } = useCreating();

    const renderAccessDeniedContainer = () => (
        <div className="memes-container">
            <img src="https://media.giphy.com/media/f8Gk0YteGgcqaEktvD/giphy.gif" alt="access denied" />
        </div>
    );

    const renderNftImageContainer = () => (
        <div className="memes-container">
            {currentWalletNftsImages.splice(0, 4).map((nft) => (
                <div key={nft.id}>
                    <img src={nft} className="meme" />
                </div>
            ))}
        </div>
    );

    return (
        <div className="gated-container">
            {!accessGranted && (
                <button className="cta-button" onClick={() => setAccessGranted(true)}>
                    {!accessGranted ? "Grant Access" : "Deny Access"}
                </button>
            )}
            {accessGranted && (
                <button className="cta-button" onClick={() => setAccessGranted(false)}>
                    {accessGranted ? "Deny Access" : "Grant Access"}
                </button>
            )}

            <button className="cta-button" onClick={() => setViewNfts(!viewNfts)}>
                {viewNfts ? "Back" : "View Nfts in Wallet"}
            </button>

            {creating && <CreateItem />}
            {viewMemes && renderMemesContainer()}
            {viewNfts && renderNftImageContainer()}
            {!accessGranted && renderAccessDeniedContainer()}

            {accessGranted ? (
                <>
                    <button className="cta-button" onClick={() => setCreating(!creating)}>
                        {creating ? "Back" : "Create Product"}
                    </button>
                    <button className="cta-button" onClick={() => setViewMemes(!viewMemes)}>
                        {viewMemes ? "Back" : "View Memes"}
                    </button>
                </>
            ) : null}
        </div>
    );
};

export default GatedAccess;
