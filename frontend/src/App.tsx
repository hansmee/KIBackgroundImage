import axios from 'axios';
import { useEffect, useState } from 'react';
import KakaoLogin from './KakaoLogin';
import Instagram from './Instagram';
import Album from './Album';
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
    callApi();
  }, []);

  return (
    <div className="App">
      <div className="App-header">KIBackgroundImage</div>
      <div className="App-body">
        <div className="button_container">
          <KakaoLogin setKakaoProfileImg={setKakaoProfileImg} />
          <Instagram setInstaImgs={setInstaImgs} />
        </div>
        <Album kakaoProfileImg={kakaoProfileImg} instaImgs={instaImgs} />
      </div>
    </div>
  );
}
