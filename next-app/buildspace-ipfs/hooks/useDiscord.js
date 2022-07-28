import { useState, useEffect } from "react";

const useDiscord = () => {
    const [account, setAccount] = useState(null);

    useEffect(() => {
        const fragment = new URLSearchParams(window.location.hash.slice(1));
        const [accessToken, tokenType] = [fragment.get("access_token"), fragment.get("token_type")];

        if (accessToken) {
            fetch("https://discord.com/api/users/@me", {
                headers: {
                    authorization: `${tokenType} ${accessToken}`,
                },
            })
                .then((result) => result.json())
                .then((response) => {
                    setAccount(response);
                })
                .catch(console.error);
        }
    }, []);

    return account;
};

export default useDiscord;
