import React, { useMemo } from "react";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import { ConnectionProvider, WalletProvider } from "@solana/wallet-adapter-react";
import {
    GlowWalletAdapter,
    PhantomWalletAdapter,
    SlopeWalletAdapter,
    SolflareWalletAdapter,
    TorusWalletAdapter,
} from "@solana/wallet-adapter-wallets";
import { clusterApiUrl } from "@solana/web3.js";
import { ItemModuleProvider } from "../lib/ItemModuleContext";
import { ItemsProvider } from "../lib/ItemsContext";

import { getDefaultProvider } from "ethers";
import { WagmiConfig, createClient } from "wagmi";

import "../styles/App.css";
import "../styles/Item.css";
import "../styles/Wallet.css";
import "../styles/globals.css";
import "../styles/createitem.css";
import "@solana/wallet-adapter-react-ui/styles.css";

const client = createClient({
    autoConnect: true,
    provider: getDefaultProvider(),
});

const App = ({ Component, pageProps }) => {
    // Can be set to 'devnet', 'testnet', or 'mainnet-beta'
    const network = WalletAdapterNetwork.Mainnet;

    // You can also provide a custom RPC endpoint
    const endpoint = useMemo(() => clusterApiUrl(network), [network]);

    // @solana/wallet-adapter-wallets includes all the adapters but supports tree shaking and lazy loading --
    // Only the wallets you configure here will be compiled into your application, and only the dependencies
    // of wallets that your users connect to will be loaded
    const wallets = useMemo(
        () => [
            new PhantomWalletAdapter(),
            new GlowWalletAdapter(),
            new SlopeWalletAdapter(),
            new SolflareWalletAdapter({ network }),
            new TorusWalletAdapter(),
        ],
        [network]
    );

    return (
        <WagmiConfig client={client}>
            <ConnectionProvider endpoint={endpoint}>
                <WalletProvider wallets={wallets} autoConnect>
                    <WalletModalProvider>
                        <ItemsProvider>
                            <ItemModuleProvider>
                                <Component {...pageProps} />
                            </ItemModuleProvider>
                        </ItemsProvider>
                    </WalletModalProvider>
                </WalletProvider>
            </ConnectionProvider>
        </WagmiConfig>
    );
};

export default App;
