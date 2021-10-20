import axios from 'axios';
import { Dispatch, SetStateAction, useCallback, useEffect, useState } from 'react';
import useIntersectionObserver from '../hooks/useIntersectionObserver';
import '../css/Unsplash.css';

type Props = {
  show: boolean;
  setShow: Dispatch<SetStateAction<boolean>>;
  keyword: string;
};

export default function Unsplash({ show, setShow, keyword }: Props) {
  const [pageNum, setPageNum] = useState<number>(1);
  const [target, setTarget] = useState<Element | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [unsplashImgs, setUnsplashImgs] = useState<Array<any>>([]);
  const callBackFunction: IntersectionObserverCallback = (
    [entry]: IntersectionObserverEntry[],
    observer: IntersectionObserver
  ) => {
    if (entry.isIntersecting && !isLoading) {
      setPageNum(pageNum + 1);
    }
  };

  useIntersectionObserver({ target, onIntersect: callBackFunction });

  const getProducts = useCallback(async () => {
    const uri = `https://api.unsplash.com/search/photos/?client_id=${process.env.REACT_APP_UNSPLASH_API_KEY}&query=${keyword}&page=${pageNum}`;
    setIsLoading(true);
    await axios
      .get(uri)
      .then((res) => {
        const totalPage = res.data.total_pages;
        const totalImgs = res.data.totalImgs;
        console.log(res.data);
        const imgs = res.data.results;
        if (pageNum === 1) {
          setUnsplashImgs(res.data.results);
        } else {
          setUnsplashImgs([...unsplashImgs, ...res.data.results]);
        }
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [keyword, pageNum]);

  useEffect(() => {
    getProducts();
  }, [keyword, pageNum]);

  const downloadImg = (downloadURL: string) => {
    // axios.get(downloadURL).then((res) => {
    //     const url = window.URL.createObjectURL(new Blob([res.data]))
    //     const link = document.createElement('a')
    //     link.href = url
    //     link.setAttribute('download', `${res.data}.jpg`)
    //     document.body.appendChild(link)
    //     link.click()
    // });
    if (window !== null) {
      //   window!.open(downloadURL, '_blank').focus();
    }
  };

  return (
    <div className="unsplash">
      <span>Unsplash 추천 이미지</span>
      <div className="unsplash_img_container">
        {unsplashImgs.map((img) => {
          return (
            <img
              className="unsplash_img"
              src={img.urls.regular}
              onClick={() =>
                window.open(
                  `${img.links.download_location}&client_id=${process.env.REACT_APP_UNSPLASH_API_KEY}&force=true`,
                  '_blank'
                )
              }
              //   onClick={() => downloadImg(img.links.download_location)}
            />
          );
        })}
      </div>
      <div className="img_loading" ref={setTarget}>
        {isLoading && 'LOADING'}
      </div>
    </div>
  );
}
