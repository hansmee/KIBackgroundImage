import axios from 'axios';
import { useState } from 'react';
import { KakaoLogin, Instagram, Album, Unsplash, Loading } from './components';
import './css/App.css';
import { getSotrageImgs } from './utils/storageFunctions';

export default function App() {
  const [kakaoProfileImg, setKakaoProfileImg] = useState<string>('');
  const [instaImgs, setInstaImgs] = useState<Array<string>>(getSotrageImgs());
  const [showUnsplash, setShowUnsplash] = useState<boolean>(false);
  const [keyword, setKeyword] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const clickRecommend = async () => {
    setLoading(true);
    const images = [];
    images.push(kakaoProfileImg);

    axios
      .post('/api/recommend', {
        images: [...images, ...instaImgs],
      })
      .then((res: any) => {
        const recommended = res.data?.result;
        if (recommended) {
          setKeyword(recommended);
          setShowUnsplash(true);
        }
        setLoading(false);
      })
      .catch((err: any) => {
        console.log(err);
        setLoading(false);
      });
  };

  return (
    <div className="App">
      <img
        className="App_background"
        src="https://images.unsplash.com/photo-1612820153700-a4f8795c77f4?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=3240&q=80"
        alt="KIBackgroundImage"
      />
      <div className="App_container">
        <header className="App-header">
          <div className="App-title">KIBackgroundImage</div>
          <div className="button_container">
            <KakaoLogin setKakaoProfileImg={setKakaoProfileImg} />
            <Instagram instaImgs={instaImgs} setInstaImgs={setInstaImgs} />
          </div>
        </header>
        <main className="App-body">
          <Album kakaoProfileImg={kakaoProfileImg} instaImgs={instaImgs} />
          <button
            className="result_button"
            disabled={kakaoProfileImg === '' && instaImgs.length === 0}
            onClick={clickRecommend}
          >
            배경 이미지 추천 받기
          </button>
          {showUnsplash && (
            <Unsplash show={showUnsplash} setShow={setShowUnsplash} keyword={keyword} />
          )}
        </main>
        {loading ? <Loading isOpen={true} /> : null}
      </div>
    </div>
  );
}
