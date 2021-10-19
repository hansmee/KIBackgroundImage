export default function Instagram(props: any) {
  const { setInstaImgs } = props;

  const clickInsta = () => {
    const INSTAGRAM_AUTH_URL = `https://api.instagram.com/oauth/authorize/?client_id=${process.env.REACT_APP_CLIENT_ID}&client_secret=${process.env.REACT_APP_INSTAGRAM_SECTRET}&redirect_uri=${process.env.REACT_APP_CALLBAK_URL}&response_type=code&scope=user_profile,user_media`;
    window.open(INSTAGRAM_AUTH_URL, '_blank');
  };

  return (
    <button className="instagram_login" onClick={clickInsta}>
      인스타그램 피드 가져오기
    </button>
  );
}
