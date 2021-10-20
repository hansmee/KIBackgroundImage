import { useState } from 'react';
import '../css/Instagram.css';

export default function Instagram(props: any) {
  const { setInstaImgs } = props;
  const [showModal, setShowModal] = useState<boolean>(false);
  const [instaId, setInstaId] = useState<string>('');
  const [instaPw, setInstaPw] = useState<string>('');
  const [feedUser, setFeedUser] = useState<string>('');

  const clickModal = () => {
    setShowModal(!showModal);
  };

  return (
    <>
      <button className="instagram_login" onClick={clickModal}>
        인스타그램 피드 가져오기
      </button>
      <div className={`modal_layer ${!showModal && 'hidden'}`} onClick={clickModal}>
        <div className="modal" onClick={(e: any) => e.stopPropagation()}>
          <section className="modal_header">
            <span>인스타그램 로그인</span>
            <button onClick={clickModal}>X</button>
          </section>
          <section className="modal_body">
            <input
              value={instaId}
              onChange={(e: any) => setInstaId(e.target.value)}
              placeholder="아이디"
              type="text"
              autoComplete="new-password"
            />
            <input
              value={instaPw}
              onChange={(e: any) => setInstaPw(e.target.value)}
              placeholder="비밀번호"
              type="password"
              autoComplete="new-password"
            />
            <input
              value={feedUser}
              onChange={(e: any) => setFeedUser(e.target.value)}
              placeholder="가져올 인스타그램 피드 사용자"
              type="text"
              autoComplete="new-password"
            />
            <button>로그인하고 피드 가져오기</button>
          </section>
        </div>
      </div>
    </>
  );
}
