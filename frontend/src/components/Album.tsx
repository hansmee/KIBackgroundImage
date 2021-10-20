import '../css/Album.css';

export default function Album(props: any) {
  const { kakaoProfileImg, instaImgs } = props;

  return kakaoProfileImg || instaImgs.length > 0 ? (
    <div className="Album">
      {kakaoProfileImg && <img src={kakaoProfileImg} alt="카카오톡 프로필 이미지" />}
      {instaImgs &&
        instaImgs.map((instaFeed: any, idx: any) => (
          <img
            key={idx}
            src={`https://cors-anywhere.herokuapp.com/${instaFeed}`}
            alt="인스타그램 피드 이미지"
            crossOrigin="anonymous"
          />
        ))}
    </div>
  ) : (
    <div className="Album empty">
      <strong>이미지가 없습니다.</strong> <br />
      <br />
      카카오톡 로그인을 통해 프로필 이미지를 가져오거나 <br /> 인스타그램 로그인을 통해 피드
      이미지를 가져올 수 있습니다.
    </div>
  );
}
