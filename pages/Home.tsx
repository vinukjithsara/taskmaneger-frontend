import Hero from "../components/Hero";

type HomeProps = {
  isLoggedIn: boolean;
};

const Home = ({ isLoggedIn }: HomeProps) => {
  return <Hero isLoggedIn={isLoggedIn} />;
};

export default Home;
