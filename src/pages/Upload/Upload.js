import "./Upload.scss";
import uploadVideo from "../../assets/images/upload-video-preview.jpg";
import axios from "axios";
import { API_URL } from "../../config";

function Upload(props) {
  const successResponse = (e) => {
    e.preventDefault();
    if (!validateForm(e.target)) {
      return;
    }
    axios
      .post(`${API_URL}/videos`, {
        title: e.target.title.value,
        channel: "New channel",
        image: "https://i.imgur.com/l2Xfgpl.jpg",
        description: e.target.description.value,
        video: "https://project-2-api.herokuapp.com/stream",
      })
      .then(() => {
        props.getData();
      });
    alert("The video uploaded successfully");
    props.history.push("/");
  };
  const validateInput = (input) => {
    if (input.value.trim() === "") {
      input.classList.add("upload__input--error");
      return false;
    }
    input.classList.remove("upload__input--error");
    return true;
  };

  const validateForm = (form) => {
    let isValid = true;
    isValid = validateInput(form.title) && isValid;
    isValid = validateInput(form.description) && isValid;
    return isValid;
  };
  return (
    <section className="upload">
      <div className="upload__wrapper">
        <h1 className="upload__title">Upload video</h1>
        <form className="upload__form" action="" onSubmit={successResponse}>
          <div className="upload__underline">
            <div className="upload__thumbnail">
              <p className="upload__label">VIDEO THUMBNAIL</p>
              <img src={uploadVideo} alt="" className="upload__image" />
            </div>
            <div className="upload__top">
              <label className="upload__label">
                TITLE YOUR VIDEO
                <input
                  type="text"
                  className="upload__new-title"
                  name="title"
                  placeholder="Add a title to your video"
                />
              </label>
              <label className="upload__label">
                ADD A VIDEO DESCRIPTION
                <textarea
                  type="text"
                  className="upload__description"
                  name="description"
                  placeholder="Add a description to your video"
                ></textarea>
              </label>
            </div>
          </div>
          <div className="upload__bottom">
            <input
              className="upload__publish cta-btn"
              type="submit"
              name="submit"
              value="Publish"
            />
            <button className="upload__calcel cta-btn">Cancel</button>
          </div>
        </form>
      </div>
    </section>
  );
}

export default Upload;
