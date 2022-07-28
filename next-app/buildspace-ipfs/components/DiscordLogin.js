import useDiscord from "../hooks/useDiscord";

const RenderBtn = () => {
    const response_type = "token";
    const client_id = "YOUR_DISCORD_CLIENT_ID";
    const baseUrl = "https://discord.com/api/oauth2/authorize";

    return (
        <a
            href={`${baseUrl}?client_id=${client_id}&redirect_uri=http%3A%2F%2Flocalhost%3A3000&response_type=${response_type}&scope=identify`}
        >
            <span className="cta-button discord-btn">Login with Discord</span>
        </a>
    );
};

const DiscordLogin = () => {
    const account = useDiscord();

    return (
        <div>
            {account ? (
                <span>
                    {account.username}#{account.discriminator}
                </span>
            ) : (
                <RenderBtn />
            )}
        </div>
    );
};

export default DiscordLogin;
