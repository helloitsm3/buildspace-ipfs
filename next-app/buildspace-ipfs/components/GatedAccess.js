import React, { useState } from "react";
import { useCreating } from "../lib/ItemModuleContext";

const GatedAccess = ({ accessGranted, setAccessGranted }) => {
    const [viewNfts, setViewNfts] = useState(false);
    const [viewMemes, setViewMemes] = useState(false);
    const { creating, setCreating } = useCreating();

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
                    <button className="cta-button" onClick={() => setViewMemes(!viewMemes)}>
                        {viewMemes ? "Back" : "View Memes"}
                    </button>
                </>
            ) : null}
        </div>
    );
};

export default GatedAccess;
