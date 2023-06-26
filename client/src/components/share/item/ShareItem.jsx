import "./shareitem.scss";

const ShareItem = ({ img, title }) => {
  return (
    <div className="share__item">
      <img src={img} alt="" />
      <span>{title}</span>
    </div>
  );
};

export default ShareItem;
