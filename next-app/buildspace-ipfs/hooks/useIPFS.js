import { useState, useEffect } from 'react';

const useIPFS = (hash, filename) => {
  const [imgUrl, setImgUrl] = useState(null);

  useEffect(() => {
    setImgUrl(`https://ipfs.io/ipfs/${hash}/${filename}`);
  }, []);

  return imgUrl;
};

export default useIPFS;