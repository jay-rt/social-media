import "./leftbaritem.scss";

const LeftbarItem = ({ img, title }) => {
  return (
    <div className="item">
      <img src={img} alt="" />
      <span>{title}</span>
    </div>
  );
};

export default LeftbarItem;
