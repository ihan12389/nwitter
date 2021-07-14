import React, { useState } from "react";
import { dbService, storageService } from "fbase";
import { v4 as uuidv4 } from "uuid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPencilAlt } from "@fortawesome/free-solid-svg-icons";

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
      console.log("storage delete");
      await storageService.refFromURL(nweetObj.attachmentUrl).delete();
    }
    if (newAttachment !== "") {
      console.log("newAttachment is there");
      const attachmentRef = storageService
        .ref()
        .child(`${userObj.uid}/${uuidv4()}`);
      const response = await attachmentRef.putString(newAttachment, "data_url");
      attachmentUrl = await response.ref.getDownloadURL();
      setPrevAttachmentUrl(attachmentUrl);
    } else {
      console.log("newAttachment is not");
      console.log(attachmentUrl);
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
    if (theFile !== null) {
      console.log("theFile is not null");
      reader.readAsDataURL(theFile);
    } else {
      console.log("theFile is null");
      setNewAttachment("");
    }
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
              className="formInput"
            />
            <input
              type="file"
              accept="image/*"
              onChange={onFileChange}
              className="formInput"
            />
            <input type="submit" value="Update Nweet" className="formBtn" />
          </form>
          <span onClick={toggleEditing} className="formBtn cancelBtn">
            Cancel
          </span>
        </>
      ) : (
        <>
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
