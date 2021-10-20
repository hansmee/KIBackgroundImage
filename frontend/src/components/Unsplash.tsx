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
    const uri = `https://api.unsplash.com/search/photos/?client_id=${process.env.REACT_APP_UNSPLASH_API_KEY}&query=${keyword}&page=${pageNum}&orientation=landscape`;
    setIsLoading(true);
    await axios
      .get(uri)
      .then((res) => {
        if (pageNum === 1) {
          setUnsplashImgs(res.data.results);
        } else {
          setUnsplashImgs((u) => [...u, ...res.data.results]);
        }
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [keyword, pageNum, setUnsplashImgs]);

  useEffect(() => {
    getProducts();
  }, [getProducts]);

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
      <div className="unsplash_header">
        <span>Unsplash 추천 이미지</span>
        <button onClick={() => setShow(false)}>X</button>
      </div>

      <div className="unsplash_img_container">
        <div className="unsplash_img_container_column">
          {unsplashImgs
            .filter((_, idx) => idx % 2 === 0)
            .map((img) => (
              <div className="img_container" key={img.id}>
                <img
                  className="unsplash_img"
                  src={img.urls.regular}
                  alt="추천 배경이미지"
                  onClick={() =>
                    window.open(
                      `${img.links.download_location}&client_id=${process.env.REACT_APP_UNSPLASH_API_KEY}&force=true`,
                      '_blank'
                    )
                  }
                />
              </div>
            ))}
        </div>
        <div className="unsplash_img_container_column">
          {unsplashImgs
            .filter((_, idx) => idx % 2 === 1)
            .map((img) => (
              <div className="img_container" key={img.id}>
                <img
                  className="unsplash_img"
                  src={img.urls.regular}
                  alt="추천 배경이미지"
                  onClick={() =>
                    window.open(
                      `${img.links.download_location}&client_id=${process.env.REACT_APP_UNSPLASH_API_KEY}&force=true`,
                      '_blank'
                    )
                  }
                />
              </div>
            ))}
        </div>
      </div>
      <div className="img_loading" ref={setTarget}>
        {isLoading && 'Loading...'}
      </div>
    </div>
  );
}
