import React, { useState } from "react";
import { Web3Storage } from "web3.storage";
import { useCreating } from "../lib/ItemModuleContext";

import useClipboard from "../hooks/useClipboard";

const CreateItem = () => {
    function getAccessToken() {
        //const NEXT_PUBLIC_WEB3STORAGE_TOKEN ='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDI4NDQyNzlkMDRmRDc2NDJDMUQyNzZhQkRmNDI3ZDBkOWJmMGU0NzkiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2NTM0MzIxMDY3MjAsIm5hbWUiOiJkZXYifQ.gFBojcATcuBQeXse4O1OAVEIrrmdKPxyHlK83AaqZrQ'
        const NEXT_PUBLIC_WEB3STORAGE_TOKEN =
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweEU0ZkI5MDA3MEFDNWRjMDA0MWZCODYxM0Q5Mzg0MGU2NTkxNzlmNUEiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2NTAwNjQxMDMzMzksIm5hbWUiOiJuZXdBcGlLZXkifQ.3TrRqcc_BUzMFV8gNIMAs8bhiobDGiGmslYCMYLG3ok";
        return NEXT_PUBLIC_WEB3STORAGE_TOKEN;
    }

    function makeStorageClient() {
        return new Web3Storage({ token: getAccessToken() });
    }

    const client = makeStorageClient();
    const current = new Date();

    const [newItem, setNewItem] = useState({
        title: "",
        creator: "", //use wallet address here when using blockchain?
        date_created: "",
        description: "",
    });

    const [file, setFile] = useState({});
    const [uploading, setUploading] = useState(false);

    const [image, setImage] = useClipboard();
    const date = `${current.getDate()}/${current.getMonth() + 1}/${current.getFullYear()}`;
    const { setCreating } = useCreating();

    const convertImage = (img) => {
        var reader = new FileReader();

        reader.onload = function (e) {
            setImage(e.target.result);
        };

        reader.readAsDataURL(img);
    };

    async function onChange(e) {
        setUploading(true);
        const files = e.target.files;
        convertImage(files[0]);

        setFile(files);
        try {
            // console.log("got file", files[0]);
            setNewItem({ ...newItem, date_created: date });
            alert('Item Grabbed, please finish info and click "CREATE ITEM".');
        } catch (error) {
            console.log("Error uploading file: ", error);
        }
        setUploading(false);
    }

    const createItem = async () => {
        setUploading(true);
        try {
            //adding a check if user has uploaded a file or not
            if (file.length === 0) {
                alert("Upload File!");
                return;
            }

            // Combine product data and file.name
            const item = { ...newItem, filename: file[0].name };
            console.log(item);
            const buffer = Buffer.from(JSON.stringify(item));
            const filesArr = [file[0], new File([buffer], "metadata.json")];

            const cid = await client.put(filesArr);
            console.log(cid);
            async function checkStatus(cid) {
                const status = await client.status(cid);
                if (status) {
                    // your code to do something fun with the status info here
                    console.log("current status:", status);
                    // check status every second until status.pins.length is greater than one
                    if (status.pins.length < 1) {
                        setTimeout(() => checkStatus(cid), 1000);
                    }
                    // when status.pins.length is greater than one then alert user that item has been created and display the cid
                    if (status.pins.length > 0) {
                        alert("Item Created! CID: " + cid);
                        setCreating(false);
                        setUploading(false);
                    }
                }
            }
            // check status every second until complete
            checkStatus(cid);
        } catch (error) {
            console.log(error);
            setUploading(false);
        }
    };

    return (
        <div className="background_blur">
            <div className="create_item_container">
                <div className="create_item_form">
                    <header className="header">
                        <h1>Create Product</h1>
                        <button onClick={() => setCreating(false)}>&#10006;</button>
                    </header>

                    <div className="form_container">
                        <div className="image-preview-container">
                            <img src={image} className="image-preview" />
                        </div>
                        <input type="file" className="input" accept=".png,.gif,.jpeg,.pdf,.mp4" placeholder="Images" onChange={onChange} />

                        {file.name != null && <p className="file-name">{file.filename}</p>}

                        <div className="flex_row">
                            <h3>Title:</h3>
                            <input
                                className="input_name"
                                type="text"
                                placeholder="Item Title"
                                onChange={(e) => {
                                    setNewItem({ ...newItem, title: e.target.value });
                                }}
                            />
                        </div>
                        <div className="flex_row">
                            <h3>Creator:</h3>
                            <input
                                className="input_name"
                                type="text"
                                placeholder="@Pepe"
                                onChange={(e) => {
                                    setNewItem({ ...newItem, creator: e.target.value });
                                }}
                            />
                        </div>
                        <textarea
                            className="text_area"
                            placeholder="Description here..."
                            onChange={(e) => {
                                setNewItem({ ...newItem, description: e.target.value });
                            }}
                        />

                        <button
                            className={`button ${uploading && "uploading-btn"}`}
                            onClick={() => {
                                createItem();
                            }}
                            disabled={uploading}
                        >
                            {uploading ? "Uploading..." : "Create Item"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreateItem;
