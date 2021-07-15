import React, { useState, useRef } from "react";
import { dbService, storageService } from "fbase";
import { v4 as uuidv4 } from "uuid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPencilAlt } from "@fortawesome/free-solid-svg-icons";
import { faFile } from "@fortawesome/free-solid-svg-icons";

// 내가 Owner일 때만 수정과 삭제 버튼을 볼 수 있다.
// confirm은 확인창을 사용자에게 띄워 true or false를 반환해준다.
// dbService의 doc func은 collection 내의 doc을 반환하며 삭제와 업데이트를 담당하는 delete, update func을 가지고 있다.
// Nweet은 우리가 만든 컴포넌트고 nweetObj는 전체의 nweet이다.
const Nweet = ({ userObj, nweetObj, isOwner }) => {
  const [editing, setEditing] = useState(false);
  const [newNweet, setNewNweet] = useState(nweetObj.text);
  const [prevAttachmentUrl, setPrevAttachmentUrl] = useState(
    nweetObj.attachmentUrl
  );
  const [newAttachment, setNewAttachment] = useState("");
  const fileName = useRef();
  const onDeleteClick = async () => {
    const ok = window.confirm("Are you sure you wnat to delete this nweet?");
    if (ok) {
      await dbService.doc(`nweets/${nweetObj.id}`).delete();
      if (nweetObj.attachmentUrl !== "") {
        await storageService.refFromURL(nweetObj.attachmentUrl).delete();
      }
    }
  };
  const toggleEditing = () => setEditing((prev) => !prev);
  const onSubmit = async (event) => {
    let attachmentUrl = "";
    event.preventDefault();
    if (prevAttachmentUrl !== "") {
      await storageService.refFromURL(nweetObj.attachmentUrl).delete();
    }
    if (newAttachment !== "") {
      const attachmentRef = storageService
        .ref()
        .child(`${userObj.uid}/${uuidv4()}`);
      const response = await attachmentRef.putString(newAttachment, "data_url");
      attachmentUrl = await response.ref.getDownloadURL();
      setPrevAttachmentUrl(attachmentUrl);
    } else {
      setPrevAttachmentUrl("");
    }
    await dbService
      .doc(`nweets/${nweetObj.id}`)
      .update({ text: newNweet, attachmentUrl });
    setEditing(false);
    setNewAttachment("");
  };
  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setNewNweet(value);
  };
  const onFileChange = (event) => {
    const {
      target: {
        files: {
          0: { name },
        },
      },
    } = event;
    const {
      target: { files },
    } = event;
    const theFile = files[0];
    const reader = new FileReader();
    reader.onloadend = (finishedEvent) => {
      const {
        currentTarget: { result },
      } = finishedEvent;
      setNewAttachment(result);
    };
    let name_string = "";
    if (theFile !== null) {
      reader.readAsDataURL(theFile);
      name_string = JSON.stringify(name).substring();
    } else {
      setNewAttachment("");
    }
    fileName.current.innerText = name_string.substring(
      1,
      name_string.length - 1
    );
  };
  return (
    <div className="nweet">
      {editing ? (
        <>
          <form onSubmit={onSubmit} className="container nweetEdit">
            <input
              type="text"
              placeholder="Edit your nweet"
              value={newNweet}
              required
              autoFocus
              onChange={onChange}
              className="formInput newText"
            />
            <input
              type="file"
              accept="image/*"
              onChange={onFileChange}
              className="formInput"
              id="newFile"
            />
            <label for="newFile" className="formInput newFile" ref={fileName}>
              <FontAwesomeIcon icon={faFile} />
              &nbsp;파일 선택
            </label>
            <input type="submit" value="Update Nweet" className="formBtn" />
          </form>
          <span onClick={toggleEditing} className="formBtn cancelBtn">
            Cancel
          </span>
        </>
      ) : (
        <>
          {nweetObj.userName && (
            <span className="nweetName">{nweetObj.userName}</span>
          )}
          <h4>{nweetObj.text}</h4>
          {nweetObj.attachmentUrl && <img src={nweetObj.attachmentUrl} />}
          {isOwner && (
            <div class="nweet__actions">
              <span onClick={onDeleteClick}>
                <FontAwesomeIcon icon={faTrash} />
              </span>
              <span onClick={toggleEditing}>
                <FontAwesomeIcon icon={faPencilAlt} />
              </span>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Nweet;
