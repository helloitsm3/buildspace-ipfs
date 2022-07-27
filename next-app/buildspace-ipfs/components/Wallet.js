import { useEffect } from "react";
import { InjectedConnector } from "wagmi/connectors/injected";
import { useAccount, useConnect, useDisconnect } from "wagmi";

import { useWallet } from "@solana/wallet-adapter-react";
import { resolveToWalletAddress, getParsedNftAccountsByOwner } from "@nfteyez/sol-rayz";
import { WalletMultiButton, WalletDisconnectButton } from "@solana/wallet-adapter-react-ui";

const Wallet = () => {
    const { address } = useAccount();
    const { publicKey } = useWallet();
    const { disconnect } = useDisconnect();
    const { connect } = useConnect({
        connector: new InjectedConnector(),
    });

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
                    // currentWalletNftsImages.push(data.image);
                }
                if (data.symbol != undefined) {
                    // currentWalletNftSymbols.push(data.symbol);
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
                Connected to {address}
                <button className="cta-button" onClick={() => disconnect()}>
                    Disconnect
                </button>
            </div>
        );
    }

    if (publicKey) {
        return <WalletDisconnectButton />;
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