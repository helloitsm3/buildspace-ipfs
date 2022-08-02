import React, { useState } from "react";
import { useCreating } from "../lib/ItemModuleContext";

import Memes from "./Memes";
import CreateItem from "./CreateItem";

const GatedAccess = ({ accessGranted, setAccessGranted, currentWalletNftsImages }) => {
    const [viewNfts, setViewNfts] = useState(false);
    const { creating, setCreating } = useCreating();

    const renderAccessDeniedContainer = () => (
        <div className="memes-container">
            <img src="https://media.giphy.com/media/f8Gk0YteGgcqaEktvD/giphy.gif" alt="access denied" />
        </div>
    );

    const renderNftImageContainer = () => (
        <div className="memes-container">
            {currentWalletNftsImages.map((nft, index) => (
                <div key={index}>
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

            {accessGranted ? (
                <>
                    <button className="cta-button" onClick={() => setCreating(!creating)}>
                        {creating ? "Back" : "Create Product"}
                    </button>
                </>
            ) : null}

            {creating && <CreateItem />}
            <Memes />
            {viewNfts && renderNftImageContainer()}
            {!accessGranted && renderAccessDeniedContainer()}
        </div>
    );
};

export default GatedAccess;
