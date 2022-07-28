import React, { useEffect } from "react";
import Wallet from "../components/Wallet";

import useIPFS from "../hooks/useIPFS";

export default function App() {
    const data = useIPFS("bafybeigoypshtc4zj2f4dmysluccbjilykycarla35lwxynowu5jozj5mu");

    useEffect(() => {
        console.log(data);
    }, [data]);

    return (
        <div className="container">
            <main className="m-container">
                <Wallet />
            </main>

            <footer>
                <a href="https://twitter.com/_buildspace">
                    <img src="twitter-logo.svg" className="footer-img" />
                </a>
                <p className="footer-text">built on @_buildspace</p>
            </footer>
        </div>
    );
}
