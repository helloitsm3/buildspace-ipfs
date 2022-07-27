import { useState } from 'react';
import { Web3Storage } from 'web3.storage'
import { create } from 'ipfs-http-client';

function getAccessToken() {

  //const NEXT_PUBLIC_WEB3STORAGE_TOKEN ='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDI4NDQyNzlkMDRmRDc2NDJDMUQyNzZhQkRmNDI3ZDBkOWJmMGU0NzkiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2NTM0MzIxMDY3MjAsIm5hbWUiOiJkZXYifQ.gFBojcATcuBQeXse4O1OAVEIrrmdKPxyHlK83AaqZrQ'
  const NEXT_PUBLIC_WEB3STORAGE_TOKEN ='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweEU0ZkI5MDA3MEFDNWRjMDA0MWZCODYxM0Q5Mzg0MGU2NTkxNzlmNUEiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2NTAwNjQxMDMzMzksIm5hbWUiOiJuZXdBcGlLZXkifQ.3TrRqcc_BUzMFV8gNIMAs8bhiobDGiGmslYCMYLG3ok'
  return NEXT_PUBLIC_WEB3STORAGE_TOKEN;
}

function makeStorageClient() {
  return new Web3Storage({ token: getAccessToken() })
}

async function listUploads() {
    const itemsArr = []
    const client = makeStorageClient()
    for await (const upload of client.list()) {
      const _res = await getLinks(upload.cid);
      console.log("_res is: ", _res[0]);
      itemsArr.push(_res)
    }

    return itemsArr;
}

async function getLinks(ipfsPath) {
  const url = 'https://dweb.link/api/v0';
  const ipfs = create({ url });
  const links = [];
  const metadata = [];
  for await (const link of ipfs.ls(ipfsPath)) {
    // for the index with the link path ending in 'metadata.json' we want to get the metadata, otherwise we want the link
    if (link.name.endsWith('metadata.json')) {
      console.log("link is: ", link);
      const _index = link.path;
      const _metadataURL = "https://ipfs.io/ipfs/"+_index;
      console.log("_metadataURL is: ", _metadataURL);
      const _metadata = await fetch(_metadataURL);

      if(_metadata){
        const _data = await _metadata.json();
        console.log("_data is: ", _data);
        metadata.push(_data);
      }
    }
    else {
      links.push(link);
    }
  }
  return [links, metadata];
}

export default listUploads;