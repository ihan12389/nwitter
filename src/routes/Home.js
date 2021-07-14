import React, { useState, useEffect, useRef } from "react";
// uuid는 어떤 특별한 식별자를 랜덤으로 준다.
import { v4 as uuidv4 } from "uuid";
import { dbService, storageService } from "fbase";
import Nweet from "components/Nweet";

// dbService를 통해 collection을 만들고 document를 추가한다.
// document는 key와 value 값의 쌍으로 입력한다.
// async와 await를 사용하여 순차적인 처리를 지시할 수 있다.
// get은 querysnapshot을 return한다. querysnapshot은 많은 걸 가지고 있다. 많은 정보를... doc은 그 중에 일부.
// nweetObject는 해당 document의 data를 가지고 document id를 가진다.
// onSnapshot은 listener다. 데이터베이스의 변화를 실시간으로 알려준다.(read, delete, write)
// 이런 방식을 통해서 리얼타임으로 반응하는 데이터베이스와 게시판을 만들 수 있다.
const Home = ({ userObj }) => {
  const [nweet, setNweet] = useState("");
  const [nweets, setNweets] = useState([]);
  // file을 read하면서 얻은 긴문자열을 담을 state
  const [attachment, setAttachment] = useState("");
  const fileInput = useRef();
  useEffect(() => {
    dbService
      .collection("nweets")
      .orderBy("createAt", "desc")
      .onSnapshot((snapshot) => {
        const nweetArray = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setNweets(nweetArray);
        console.log(nweetArray);
      });
  }, []);
  const onSubmit = async (event) => {
    event.preventDefault();
    let attachmentUrl = "";
    if (attachment !== "") {
      const attachmentRef = storageService
        .ref()
        .child(`${userObj.uid}/${uuidv4()}`);
      const response = await attachmentRef.putString(attachment, "data_url");
      attachmentUrl = await response.ref.getDownloadURL();
    }
    const nweetObj = {
      text: nweet,
      createAt: Date.now(),
      creatorId: userObj.uid,
      attachmentUrl,
    };
    await dbService.collection("nweets").add(nweetObj);
    setNweet("");
    setAttachment("");
    fileInput.current.value = "";
  };
  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setNweet(value);
  };
  // 업로드한 이미지를 미리보기 위한 func.
  // event.target을 통해 업로드한 file을 받아올 수 있다.
  // FileReader API는 말그대로 파일의 이름을 읽는다.
  // readAsDataURL을 통해 파일을 읽는다.
  // reader.onloadend 파일을 읽는 리더기에 이벤트리스너를 추가. 파일을 다 로드하면 실행한다.
  // reader.onloadend에 finishedEvnet의 result를 setAttachment로 설정
  const onFileChange = (event) => {
    const {
      target: { files },
    } = event;
    const theFile = files[0];
    const reader = new FileReader();
    reader.onloadend = (finishedEvent) => {
      const {
        currentTarget: { result },
      } = finishedEvent;
      setAttachment(result);
    };
    if (theFile != null) {
      reader.readAsDataURL(theFile);
    } else {
      setAttachment("");
    }
  };
  const onClearAttachment = () => setAttachment("");
  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          value={nweet}
          onChange={onChange}
          type="text"
          placeholder="What's on your mind?"
          maxLength={120}
        />
        {/* file형 input. image만을 받을 것이다.  */}
        <input
          type="file"
          accept="image/*"
          onChange={onFileChange}
          ref={fileInput}
        />
        <input type="submit" value="Nweet" />
        {attachment && (
          <div>
            <img src={attachment} width="50px" height="50px" />
            <button onClick={onClearAttachment}>Clear</button>
          </div>
        )}
      </form>
      <div>
        {nweets.map((nweet) => (
          <Nweet
            key={nweet.id}
            nweetObj={nweet}
            isOwner={nweet.creatorId === userObj.uid}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;
