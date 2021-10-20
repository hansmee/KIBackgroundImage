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
      <div className="unsplash_header">
        <span>Unsplash 추천 이미지</span>
        <button
          onClick={() => {
            setShow(false);
          }}
        >
          X
        </button>
      </div>

      <div className="unsplash_img_container">
        <div className="unsplash_img_container_column">
          {unsplashImgs
            .filter((el, idx) => {
              return idx % 2 === 0;
            })
            .map((img) => {
              return (
                <div className="img_container">
                  <img
                    key={img.id}
                    className="unsplash_img"
                    src={img.urls.regular}
                    onClick={() =>
                      window.open(
                        `${img.links.download_location}&client_id=${process.env.REACT_APP_UNSPLASH_API_KEY}&force=true`,
                        '_blank'
                      )
                    }
                  />
                </div>
              );
            })}
        </div>
        <div className="unsplash_img_container_column">
          {unsplashImgs
            .filter((el, idx) => {
              return idx % 2 === 1;
            })
            .map((img) => {
              return (
                <div className="img_container">
                  <img
                    key={img.id}
                    className="unsplash_img"
                    src={img.urls.regular}
                    onClick={() =>
                      window.open(
                        `${img.links.download_location}&client_id=${process.env.REACT_APP_UNSPLASH_API_KEY}&force=true`,
                        '_blank'
                      )
                    }
                  />
                </div>
              );
            })}
        </div>
      </div>
      <div className="img_loading" ref={setTarget}>
        {isLoading && 'LOADING'}
      </div>
    </div>
  );
}
