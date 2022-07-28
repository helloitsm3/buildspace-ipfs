import GatedAccess from "./GatedAccess";

import { useEffect, useState } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { InjectedConnector } from "wagmi/connectors/injected";
import { useAccount, useConnect, useDisconnect } from "wagmi";
import { resolveToWalletAddress, getParsedNftAccountsByOwner } from "@nfteyez/sol-rayz";
import { WalletMultiButton, WalletDisconnectButton } from "@solana/wallet-adapter-react-ui";

const Wallet = () => {
    const { address } = useAccount();
    const { publicKey } = useWallet();
    const { disconnect } = useDisconnect();

    const { connect } = useConnect({
        connector: new InjectedConnector(),
    });
    const [accessGranted, setAccessGranted] = useState(false);
    const [currentWalletNftsImages, setWalletNftsImages] = useState([]);
    const [currentWalletNftSymbols, setWalletNftSymbols] = useState([]);

    useEffect(() => {
        if (publicKey) {
            checkOwnership();
        }
    }, [publicKey]);

    // SOL-Rayz NFT Parsing
    async function checkOwnership() {
        const address = publicKey.toString();
        const publicAddress = await resolveToWalletAddress({
            text: address,
        });
        const nftArray = await getParsedNftAccountsByOwner({
            publicAddress,
        });
        for (let i = 0; i <= nftArray.length - 1; i++) {
            const results = await fetch(nftArray[i].data.uri).catch((err) => {
                console.log(err);
            });
            if (results) {
                const data = await results.json();
                if (data.image != undefined) {
                    setWalletNftsImages([...currentWalletNftsImages, data.image]);
                }
                if (data.symbol != undefined) {
                    setWalletNftSymbols([...currentWalletNftSymbols, data.symbol]);
                    // SET ACCESS GRANTE SYMBOL HERE******
                    if (data.symbol === "NOOT") {
                        setAccessGranted(true);
                    }
                }
            }
        }
    }

    if (address) {
        return (
            <div>
                <button className="cta-button dc-btn" onClick={() => disconnect()}>
                    Disconnect
                </button>
            </div>
        );
    }

    if (publicKey) {
        return (
            <div className="dc-container">
                <WalletDisconnectButton />
                <GatedAccess
                    accessGranted={accessGranted}
                    setAccessGranted={setAccessGranted}
                    currentWalletNftsImages={currentWalletNftsImages}
                />
            </div>
        );
    }

    return (
        <div className="wallet-container">
            <button className="cta-button button-glow" onClick={() => connect()}>
                Metamask
            </button>

            <WalletMultiButton className="cta-button button-glow">
                <span className="button-text">Solana</span>
            </WalletMultiButton>
        </div>
    );
};

export default Wallet;
