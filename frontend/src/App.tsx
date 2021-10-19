import axios from 'axios';
import { useEffect, useState } from 'react';
import { KakaoLogin, Instagram, Album } from './components';
import './css/App.css';

export default function App() {
  const [kakaoProfileImg, setKakaoProfileImg] = useState<string>('');
  const [instaImgs, setInstaImgs] = useState<Array<string>>([]);

  const callApi = async () => {
    axios
      .get(
        `https://graph.instagram.com/me/media?access_token=${process.env.REACT_APP_INSTAGRAM_KEY}&fields=id,caption,media_type,media_url,thumbnail_url,permalink`
      )
      .then((res) => {
        console.log(res);
      });
    axios.get('/api').then((res) => {
      console.log(res.data);
    });
  };

  useEffect(() => {
    // callApi();
  }, []);

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
            <Instagram setInstaImgs={setInstaImgs} />
          </div>
        </header>
        <main className="App-body">
          <Album kakaoProfileImg={kakaoProfileImg} instaImgs={instaImgs} />
          <button className="result_button">배경 이미지 추천 받기</button>
        </main>
      </div>
    </div>
  );
}
