import Image from "next/image";

const Test = () => {
    const image = [
        "https://images.unsplash.com/photo-1593642702821-c8da6771f0c6",
        "https://images.unsplash.com/photo-1552308995-2baac1ad5490",
        "https://images.unsplash.com/photo-1593642532973-d31b6557fa68",
        "https://images.unsplash.com/photo-1593642634367-d91a135587b5",
    ];
    return (
        <div>
            {image.map((img, index) => (
                <Image key={index} src={img} alt="Github" width={800} height={800} loading="lazy" />
            ))}
        </div>
    );
};

export default Test;
