import "./home.scss";
import Share from "../../components/share/Share";
import Story from "../../components/story/Story";
import Posts from "../../components/posts/Posts";

//TEMPORARY
const stories = [
  {
    id: 1,
    name: "John Doe",
    img: "https://images.pexels.com/photos/13916254/pexels-photo-13916254.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load",
  },
  {
    id: 2,
    name: "John Doe",
    img: "https://images.pexels.com/photos/13916254/pexels-photo-13916254.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load",
  },
  {
    id: 3,
    name: "John Doe",
    img: "https://images.pexels.com/photos/13916254/pexels-photo-13916254.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load",
  },
];

const Home = () => {
  return (
    <div className="home">
      <div className="stories">
        <Story
          name="John Doe"
          img="https://images.pexels.com/photos/3228727/pexels-photo-3228727.jpeg?auto=compress&cs=tinysrgb&w=1600"
          btn
        />
        {stories.map((story) => (
          <Story key={story.id} name={story.name} img={story.img} />
        ))}
      </div>
      <Share />
      <Posts />
    </div>
  );
};

export default Home;
