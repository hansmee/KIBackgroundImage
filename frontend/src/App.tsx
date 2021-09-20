
import axios from "axios";
import "./css/App.css";
import React, { useEffect } from "react";

declare var Kakao :any;

export default function App() {
  const callApi = async () => {
    axios.get("/api").then((res) => {
      console.log(res.data);
    });
  };

  useEffect(() => {
    callApi();
    Kakao.init(process.env.REACT_APP_KAKAO_API_KEY);
  }, []);

  const handleKakaoLogin = ()=>{
    console.log()
  }

  return (
    <div className="App">
      <div className="App-header">KIBackgroundImage</div>
      <div className="body">
        <div>
          <div className="container">
            <label>카카오톡 아이디</label>
            <input />
          </div>
          <div className="container">
            <label>카카오톡 비밀번호</label>
            <input />
          </div>
          <button onClick={handleKakaoLogin}>카카오톡 크롤링하기</button>
          <div className="container">
            <label>인스타그램 아이디</label>
            <input />
          </div>
          <button>인스타그램 크롤링하기</button>
        </div>
      </div>
    </div>
  );
}
