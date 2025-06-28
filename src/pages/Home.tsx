import { useState } from "react";
import Header from "../component/Header";
const Home = () => {
  const [isPreferencesOpen, setIsPreferencesOpen] = useState(false);
  return (
    <div>
      <Header onOpenPreferences={() => setIsPreferencesOpen(true)} />
    </div>
  );
};

export default Home;
