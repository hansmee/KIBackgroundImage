import { useState } from 'react';
import { KakaoLogin, Instagram, Album } from './components';
import './css/App.css';

const getSotrageImgs = (): string[] => {
  const existedImgs = localStorage.getItem('instaImgs');
  if (existedImgs !== null) {
    const existedImgsArr = JSON.parse(existedImgs ?? []);
    if (Array.isArray(existedImgsArr)) return existedImgsArr;
  }
  return [];
};
export default function App() {
  const [kakaoProfileImg, setKakaoProfileImg] = useState<string>('');
  const [instaImgs, setInstaImgs] = useState<Array<string>>(getSotrageImgs());

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
