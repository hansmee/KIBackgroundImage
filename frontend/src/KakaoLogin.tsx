import { useEffect } from 'react';
import { useState } from 'react';

declare var Kakao: any;

export default function KakaoLogin(props: any) {
  const { setKakaoProfileImg } = props;
  const [kakaoLogin, setKakaoLogin] = useState<boolean>(false);

  useEffect(() => {
    /*global Kakao*/

    // 초기화를 안 했을 경우에만 초기화 진행
    !Kakao.isInitialized() && Kakao.init(process.env.REACT_APP_KAKAO_API_KEY);

    if (Kakao.Auth.getAccessToken()) {
      getKakaoProfile();
    }
  }, []);

  const getKakaoProfile = () => {
    setKakaoLogin(true);

    Kakao.API.request({
      url: '/v2/user/me',
      success: (res: any) => {
        res.properties?.profile_image && setKakaoProfileImg(res.properties.profile_image);
      },
      fail: (error: any) => {
        console.log(error);
      },
    });
  };

  const handleLogin = () => {
    const scope = 'profile_nickname, profile_image';
    Kakao.Auth.login({
      scope,
      success: (response: any) => {
        //카카오 SDK에 사용자 토큰을 설정한다.
        Kakao.Auth.setAccessToken(response.access_token);
        getKakaoProfile();
      },
      fail: (error: any) => {
        console.log(error);
      },
    });
  };

  const handleLogout = () => {
    if (!Kakao.Auth.getAccessToken()) return;

    Kakao.Auth.logout(() => {
      setKakaoLogin(false);
      setKakaoProfileImg('');
    });
  };

  return (
    <button
      className="kakao_login"
      onClick={kakaoLogin ? handleLogout : handleLogin}
      title={kakaoLogin ? '이미 로그인되어있습니다.' : '카카오톡 로그인을 진행해주세요.'}
    >
      {kakaoLogin ? '카카오톡 로그아웃하기' : '카카오톡 로그인하기'}
    </button>
  );
}
