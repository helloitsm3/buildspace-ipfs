import { useState, useEffect } from "react";

const useDiscord = (server_id) => {
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
