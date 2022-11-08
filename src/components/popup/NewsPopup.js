import Modal from "./Modal";
import Image from 'next/image'

const NewsPopup = ({ data, open, close }) => {
  return (
    <Modal open={open} close={close}>
      <div className="news_popup_details">
        <div className="top_image">
          <Image src="/img/thumbs/4-2.jpg" alt=""  layout="fill"/>
          <div
            className="main"
            data-img-url={data && data.img}
            style={{ backgroundImage: `url(${data && data.img})` }}
          />
        </div>
        <div className="news_main_title">
          <h3>{data && data.title}</h3>
          <span>
            <a href="#">{data && data.tag}</a>
          </span>
          <div />
        </div>
        <div className="text">
          {data && data.des && data.des.map((des, i) => <p key={i}>{des}</p>)}
        </div>
      </div>
    </Modal>
  );
};
export default NewsPopup;
