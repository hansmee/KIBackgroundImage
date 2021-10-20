import axios from 'axios';
import { useEffect, useState } from 'react';
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

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    axios
      .post(`/api/feeds/${feedUser}`, {
        username: instaId,
        password: instaPw,
      })
      .then((res: any) => {
        const instaImgs = res.data?.images;
        setInstaImgs(instaImgs);
        localStorage.setItem('instaImgs', JSON.stringify(instaImgs));

        setInstaId('');
        setInstaPw('');
        setFeedUser('');
        setShowModal(false);
      })
      .catch((error: any) => {
        console.log(error);
      });
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
          <form className="modal_body">
            <input
              value={instaId}
              onChange={(e: any) => setInstaId(e.target.value)}
              placeholder="아이디"
              type="text"
              required
              autoComplete="new-password"
            />
            <input
              value={instaPw}
              onChange={(e: any) => setInstaPw(e.target.value)}
              placeholder="비밀번호"
              type="password"
              required
              autoComplete="new-password"
            />
            <input
              value={feedUser}
              onChange={(e: any) => setFeedUser(e.target.value)}
              placeholder="가져올 인스타그램 피드 사용자"
              type="text"
              required
              autoComplete="new-password"
            />
            <button onClick={handleSubmit}>로그인하고 피드 가져오기</button>
          </form>
        </div>
      </div>
    </>
  );
}
