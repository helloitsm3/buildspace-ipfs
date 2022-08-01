import useDiscord from "../hooks/useDiscord";

const RenderBtn = () => {
    const response_type = "token";
    const client_id = "YOUR_DISCORD_CLIENT_ID";
    const baseUrl = "https://discord.com/api/oauth2/authorize";
    const scope = "identify%20guilds%20guilds.members.read";

    return (
        <a
            href={`${baseUrl}?client_id=${client_id}&redirect_uri=http%3A%2F%2Flocalhost%3A3000&response_type=${response_type}&scope=${scope}`}
        >
            <span className="cta-button discord-btn">Login with Discord</span>
        </a>
    );
};

const DiscordLogin = () => {
    const discord = useDiscord("869321815833575434");
    const { account, guild } = discord || {};

    return (
        <div>
            {account ? (
                <span>
                    {account.username}#{account.discriminator} is a member of: {guild[0].name}
                </span>
            ) : (
                <RenderBtn />
            )}
        </div>
    );
};

export default DiscordLogin;
