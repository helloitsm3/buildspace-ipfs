import { useEffect, useState } from "react";

const useClipboard = () => {
    const [image, setImage] = useState(null);

    const handlePaste = (e) => {
        var reader = new FileReader();
        var items = e.clipboardData.items;

        reader.onload = function (e) {
            console.log("Printing out image");
            setImage(e.target.result);
        };

        for (let i = 0; i < items.length; i++) {
            if (items[i].type.includes("image")) {
                reader.readAsDataURL(items[i].getAsFile());
            }
        }
    };

    useEffect(() => {
        window.addEventListener("paste", handlePaste);

        return () => {
            window.removeEventListener("paste", handlePaste);
        };
    }, []);

    return image;
};

export default useClipboard;
