import "./user.scss";

const User = ({ img, name, paragraph, online }) => {
  return (
    <div className="user">
      <img src={img} alt="User avatar" />
      {online && <div className="online" />}
      {paragraph ? (
        <p>
          <span>{name}</span> changed their profile picture
        </p>
      ) : (
        <span>{name}</span>
      )}
    </div>
  );
};

export default User;
