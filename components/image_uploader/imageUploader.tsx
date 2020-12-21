// the onChange handler will return an array of file object/s.

import { Fragment, useState, useEffect } from "react";
import styles from "./image_uploader.module.scss";
import { Image } from 'antd';

export default function ImageUploader({ onChange }) {
  const [imageArray, setImageArray] = useState([]);
  const [imgUrls, setImgUrls] = useState([]);

  useEffect(() => {
    onChange(imageArray)
  },[imageArray])

  const imageHandler = (event) => {
    try {
      const file = event.target.files[0];
      setImageArray([...imageArray, file])
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setImgUrls([...imgUrls,{ url : reader.result, fileobj: file}]);
        }
      };
      reader.readAsDataURL(event.target.files[0]);
    }
    catch(err) {
      console.log(err)
    }
  };

  const delImg = (event) => {
    var delimg = event.target.dataset.imgurl
    var filteredUrls = imgUrls.filter((e) => {
      return e.url != delimg
    })
    setImgUrls(filteredUrls)
    let tmp = []
    for(let i=0;i<filteredUrls.length;i++) {
      tmp.push(filteredUrls[i].fileobj)
    }
    setImageArray(tmp)
  }
  
  return (
    <Fragment>
      <input
        id="image_upload"
        type="file"
        className="d-none"
        accept="image/svg, image/png, image/jpg, image/jpeg"
        onChange={imageHandler}
      />
      <div className="d-flex flex-row px-1 overflow-auto">
        {/* <div className="mx-1" id="imagePrivewArea">
          {imgUrls
            ? imgUrls.length > 0
              ? imgUrls.map((url) => {
                  return (
                    <img
                      src={`${url}`}
                      key={`${url}`}
                      className={`${styles.image} img-fluid mx-1`}
                      alt="image"
                      onClick={viewImg}
                    />
                  );
                })
              : null
            : null}
        </div> */}
        <Image.PreviewGroup>
        {
          imgUrls
          ? imgUrls.length > 0
            ? imgUrls.map((url) => {
                return (
                  <div key={`${url.url}`} className="position-relative overflow-hidden">
                    <Image
                      src={`${url.url}`}
                      key={`${url.url}`}
                      className={`${styles.image} img-fluid mx-1`}
                      alt="image"
                    />
                    <small data-imgurl={`${url.url}`} onClick={delImg} className={`${styles.del_btn} position-absolute p-1`}>
                      <img data-imgurl={`${url.url}`} width="20" src="/icons/trash_red.svg" alt="trash"/>
                    </small>
                  </div>
                );
              })
            : null
          : null
          }
        </Image.PreviewGroup>
        <label
          className={`${styles.label} bg-secondary p-2 mx-1`}
          htmlFor="image_upload"
        >
          <img src="/icons/add.svg" className="img-fluid" alt="add" />
        </label>
      </div>
    </Fragment>
  );
}
