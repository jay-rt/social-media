import "./story.scss";

const Story = ({ img, name, btn }) => {
  return (
    <div className="story">
      <img src={img} alt="" />
      <span>{name}</span>
      {btn && <button>+</button>}
    </div>
  );
};

export default Story;
