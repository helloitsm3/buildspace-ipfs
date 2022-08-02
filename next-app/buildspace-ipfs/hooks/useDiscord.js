import { useState, useEffect } from "react";

const useDiscord = (server_id) => {
    const [account, setAccount] = useState(null);

    useEffect(() => {
        // This is to split the window's URL to an array of string
        const fragment = new URLSearchParams(window.location.hash.slice(1));

        // This is to fetch the access token and token type from the url that was sliced above.
        const [accessToken, tokenType] = [fragment.get("access_token"), fragment.get("token_type")];

        if (accessToken) {
            // This is to fetch the user profile upon logging in
            fetch("https://discord.com/api/users/@me", {
                headers: {
                    authorization: `${tokenType} ${accessToken}`,
                },
            })
                .then((result) => result.json())
                .then((response) => {
                    // This is to fetch the user's guild list
                    fetch("https://discordapp.com/api/users/@me/guilds", {
                        headers: {
                            authorization: `${tokenType} ${accessToken}`,
                        },
                    })
                        .then((guild) => guild.json())
                        .then((guild) => {
                            if (!guild?.message?.includes("rate limited")) {
                                setAccount({ account: response, guild: guild.filter((f) => f.id === server_id) });
                            }
                        });
                })
                .catch(console.error);
        }
    }, []);

    return account;
};

export default useDiscord;
