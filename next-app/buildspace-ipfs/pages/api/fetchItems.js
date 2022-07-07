import items from "./items.json";

export default function handler(req, res) {
    // If get request
    if (req.method === "GET") {
        // Create a copy of items without the hashes and filenames
        const productsNoHashes = items.map((item) => {
            const {...rest} = item;
            return rest;
        });
        res.status(200).json(productsNoHashes);
    }
    else {
        res.status(405).send(`Method ${req.method} not allowed`);
    }
}