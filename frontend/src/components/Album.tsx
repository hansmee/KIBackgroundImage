import '../css/Album.css';

export default function Album(props: any) {
  const { kakaoProfileImg, instaImgs } = props;

  return (
    <div className="Album">
      {kakaoProfileImg && <img src={kakaoProfileImg} alt="카카오톡 프로필 이미지" />}
      {instaImgs &&
        instaImgs.map((instaFeed: any, idx: Number) => (
          <img src={instaFeed} alt="인스타그램 피드 이미지" />
        ))}
    </div>
  );
}
