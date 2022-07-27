import { useState, useEffect } from 'react';

const useIPFS = (path) => {
  const [imgUrl, setImgUrl] = useState(null);

  useEffect(() => {
    setImgUrl(`https://ipfs.io/ipfs/${path}`);
  }, []);

  return imgUrl;
};

export default useIPFS;