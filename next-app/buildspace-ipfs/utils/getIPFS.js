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
      itemsArr.push(_res)
    }

    return itemsArr;
}

async function getLinks(ipfsPath) {
  const url = 'https://dweb.link/api/v0';
  const ipfs = create({ url });

  const links = [];
  for await (const link of ipfs.ls(ipfsPath)) {
    links.push(link);
  }

  try {
    if(links[1]["name"]==="metadata.json") {
        const _index = links[1]["path"].indexOf("/");
        const _metadataURL = "https://"+links[1]["path"].substring(0, _index)+".ipfs.dweb.link/metadata.json";
        let _res = await fetch(_metadataURL).then(res => { return res.json() });
        _res["hash"] = links[1]["path"].substring(0, _index);
        return _res;
      }
  } catch(err) {
    return {}
  }
  
}

export default listUploads;