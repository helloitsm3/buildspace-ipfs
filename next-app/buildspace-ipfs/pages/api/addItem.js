import items from './items.json';
import fs from "fs";

export default function handler(req, res){
  if (req.method === "POST"){
    try {
      console.log("body is ", req.body)
      const { name, price, image_url, description, filename, hash } = req.body;
  
      // Create new item ID based on last item ID
      const maxID = items.reduce((max, item) => Math.max(max, item.id), 0);
      items.push({
        id: maxID + 1,
        name,
        price,
        image_url,
        description,
        filename,
        hash,
      });
      fs.writeFileSync("./pages/api/items.json", JSON.stringify(items, null, 2));
      res.status(200).send({ status: "ok" });
    } catch (error) {
      console.error(error);
      res.status(500).json({error: "error adding item"});
      return;
    }
  }
  else {
    res.status(405).send(`Method ${req.method} not allowed`);
  }
}