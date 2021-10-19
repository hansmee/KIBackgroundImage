import axios from 'axios';
import './css/App.css';
import { useEffect } from 'react';
import { useState } from 'react';
import KakaoLogin from './KakaoLogin';
import Album from './Album';

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
    callApi();
  }, []);

  const clickInsta = () => {
    const INSTAGRAM_AUTH_URL = `https://api.instagram.com/oauth/authorize/?client_id=${process.env.REACT_APP_CLIENT_ID}&client_secret=${process.env.REACT_APP_INSTAGRAM_SECTRET}&redirect_uri=${process.env.REACT_APP_CALLBAK_URL}&response_type=code&scope=user_profile,user_media`;
    window.open(INSTAGRAM_AUTH_URL, '_blank');
  };

  return (
    <div className="App">
      <div className="App-header">KIBackgroundImage</div>
      <div className="App-body">
        <div className="button_container">
          <KakaoLogin setKakaoProfileImg={setKakaoProfileImg} />
          <button className="instagram_login" onClick={clickInsta}>
            인스타그램 로그인하기
          </button>
        </div>
        <Album kakaoProfileImg={kakaoProfileImg} instaImgs={instaImgs} />
      </div>
    </div>
  );
}
