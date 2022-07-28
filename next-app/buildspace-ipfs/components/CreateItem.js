import React, { useState, useEffect } from "react";
import styles from '../styles/CreateItem.module.css';
import { Web3Storage } from 'web3.storage';
import { useCreating } from '../lib/ItemModuleContext';

const CreateItem= () => {
  function getAccessToken () {
    //const NEXT_PUBLIC_WEB3STORAGE_TOKEN ='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDI4NDQyNzlkMDRmRDc2NDJDMUQyNzZhQkRmNDI3ZDBkOWJmMGU0NzkiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2NTM0MzIxMDY3MjAsIm5hbWUiOiJkZXYifQ.gFBojcATcuBQeXse4O1OAVEIrrmdKPxyHlK83AaqZrQ'
    const NEXT_PUBLIC_WEB3STORAGE_TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweEU0ZkI5MDA3MEFDNWRjMDA0MWZCODYxM0Q5Mzg0MGU2NTkxNzlmNUEiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2NTAwNjQxMDMzMzksIm5hbWUiOiJuZXdBcGlLZXkifQ.3TrRqcc_BUzMFV8gNIMAs8bhiobDGiGmslYCMYLG3ok';
    return NEXT_PUBLIC_WEB3STORAGE_TOKEN
  }

  function makeStorageClient () {
    return new Web3Storage({ token: getAccessToken() })
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
  const date = `${current.getDate()}/${current.getMonth()+1}/${current.getFullYear()}`;
  const { setCreating } = useCreating();

  async function onChange(e) {
    setUploading(true);
    const files = e.target.files;
    setFile(files);
    try {
      console.log("got file",files[0]);
      setNewItem({...newItem, date_created: date})
      alert("Item Grabbed, please finish info and click \"CREATE ITEM\".");
    } catch (error) {
      console.log("Error uploading file: ", error);
    }
    setUploading(false);
  }

  const createItem = async () => {
    try {
      //adding a check if user has uploaded a file or not
      if(file.length ===0 ) {
        alert("Upload File!");
        return;
      }

      // Combine product data and file.name
      const item = { ...newItem, filename: file[0].name };
      console.log(item)
      const buffer = Buffer.from(JSON.stringify(item))
      const filesArr = [
        file[0],
        new File([buffer], 'metadata.json')
      ]

      const cid = await client.put(filesArr)
      console.log(cid)
      async function checkStatus (cid) {
        const status = await client.status(cid)
        if (status) {
          // your code to do something fun with the status info here
          console.log("current status:", status)
          // check status every second until status.pins.length is greater than one
          if (status.pins.length < 1) {
            setTimeout(() => checkStatus(cid), 1000)
          }
          // when status.pins.length is greater than one then alert user that item has been created and display the cid
          if (status.pins.length > 0) {
            alert("Item Created! CID: " + cid)
            setCreating(false);
          }
        }
      }
      // check status every second until complete
      checkStatus(cid)
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={styles.background_blur}>
      <div className={styles.create_item_container}>
        <div className={styles.create_item_form}>
          <header className={styles.header}>
            <h1>Create Product</h1>
            <button onClick={()=>setCreating(false)}>&#10006;</button>
          </header>

          <div className={styles.form_container}>
            <input
              type="file"
              className={styles.input}
              accept=".png,.gif,.jpeg,.pdf,.mp4"
              placeholder="Images"
              onChange={onChange}
            />
            {file.name != null && <p className="file-name">{file.filename}</p>}
            <div className={styles.flex_row}>
            <h3>Title:</h3>
              <input
                className={styles.input_name}
                type="text"
                placeholder="Item Title"
                onChange={(e) => {
                  setNewItem({ ...newItem, title: e.target.value });
                }}
              />

            </div>
            <div className={styles.flex_row}>
            <h3>Creator:</h3>
              <input
                className={styles.input_name}
                type="text"
                placeholder="@Pepe"
                onChange={(e) => {
                  setNewItem({ ...newItem, creator: e.target.value });
                }}
              /> 
            </div>  
            <textarea
              className={styles.text_area}
              placeholder="Description here..."
              onChange={(e) => {
                setNewItem({ ...newItem, description: e.target.value })
              }}
            />

            <button
              className={styles.button}
              onClick={() => {
                createItem();
                // window.location.reload();// Can we find a better way to reset the page? event handler?
              }}
              disabled={uploading}
            >
              Create Item
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateItem;