import axios from 'axios';
import './css/App.css';
import React, { useEffect } from 'react';
import { useState } from 'react';
import Album from './Album';
// import InstagramLogin from 'react-instagram-login';

declare var Kakao: any;

export default function App() {
  const [kakaoLogin, setKakaoLogin] = useState<boolean>(false);
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

  const apiKey: string | undefined = process.env.REACT_APP_KAKAO_API_KEY;

  useEffect(() => {
    /*global Kakao*/
    callApi();

    // 초기화를 안 했을 경우에만 초기화 진행
    !Kakao.isInitialized() && Kakao.init(process.env.REACT_APP_KAKAO_API_KEY);

    console.log(Kakao.Auth.getAccessToken());
    if (Kakao.Auth.getAccessToken()) {
      setKakaoLogin(true);
      getKakaoProfile();
    }

    const config = {
      clientId: process.env.INSTAGRAM_CLIENT_ID,
      secret: process.env.INSTAGRAM_CLIENT_SECRET,
      url: process.env.INSTAGRAM_CALLBACK_URL,
    };
  }, []);

  const handleKakaoLoginSuccess = (res: any) => {
    console.log(res);
    const nickname = res.properties.nickname;
    const thumbnailUrl = res.properties.thumbnail_image;
    const profileUrl = res.properties.profile_image;
    console.log(nickname, thumbnailUrl, profileUrl);
    setKakaoProfileImg(profileUrl);
  };

  const getKakaoProfile = () => {
    Kakao.API.request({
      url: '/v2/user/me',
      success: (res: any) => {
        handleKakaoLoginSuccess(res);
      },
      fail: (error: any) => {
        console.log(error);
      },
    });
  };

  const showAgreement = () => {
    const scope = 'profile_nickname, profile_image';
    let loginResult = false;
    Kakao.Auth.login({
      scope,
      // success는 인증 정보를 응답(response)으로 받는다.
      success: function (response: any) {
        //카카오 SDK에 사용자 토큰을 설정한다.
        Kakao.Auth.setAccessToken(response.access_token);
        console.log(`is set?: ${Kakao.Auth.getAccessToken()}`);
        loginResult = true;
        // 성공 사항에 따라 페이지를 수정하기 위한 setState
        getKakaoProfile();
      },
      fail: function (error: any) {
        console.log(error);
      },
    });
  };

  const clickInsta = () => {
    const INSTAGRAM_AUTH_URL = `https://api.instagram.com/oauth/authorize/?client_id=${process.env.REACT_APP_CLIENT_ID}&client_secret=${process.env.REACT_APP_INSTAGRAM_SECTRET}&redirect_uri=${process.env.REACT_APP_CALLBAK_URL}&response_type=code&scope=user_profile,user_media`;
    window.open(INSTAGRAM_AUTH_URL, '_blank');
  };

  const handleLogout = () => {
    if (Kakao.Auth.getAccessToken()) {
      console.log('카카오 인증 엑세스 토큰 존재', Kakao.Auth.getAccessToken());
      Kakao.Auth.logout(() => {
        console.log('카카오 로그아웃 완료', Kakao.Auth.getAccessToken());
      });
    }
  };

  return (
    <div className="App">
      <div className="App-header">KIBackgroundImage</div>
      <div className="App-body">
        <div className="button_container">
          <button
            className="kakao_login"
            disabled={kakaoLogin}
            onClick={showAgreement}
            title={kakaoLogin ? '이미 로그인되어있습니다.' : ''}
          >
            카카오톡 로그인하기
          </button>
          <button className="instagram_login" onClick={clickInsta}>
            인스타그램 로그인하기
          </button>
        </div>
        <Album kakaoProfileImg={kakaoProfileImg} instaImgs={instaImgs} />
        <button className="kakao_logout" onClick={handleLogout}>
          서비스에서 로그아웃하기
        </button>
      </div>
    </div>
  );
}
