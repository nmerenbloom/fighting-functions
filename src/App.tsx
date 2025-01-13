import scruffy from "./assets/scruffy.png";
import maple from "./assets/maple.png";
import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import { useEffect, useState } from "react";

export const App = () => {
  const [isFighting, setIsFighting] = useState(false);
  const [scruffyStats, setScruffyStats] = useState({ health: 100 });
  const [mapleStats, setMapleStats] = useState({ health: 100 });

  useEffect(() => {
    if (isFighting && scruffyStats.health > 0 && mapleStats.health > 0) {
      setTimeout(() => {
        scruffyFn();
        mapleFn();
      }, 1000);
    } else if (isFighting) {
      setIsFighting(false);
    }
  }, [isFighting, scruffyStats.health, mapleStats.health]);

  const scruffyFn = () => {
    //attacks maple
    const attackPower = Math.ceil(Math.random() * 10);
    setMapleStats((prev) => {
      const newHealth = prev.health - attackPower;
      return { ...prev, health: newHealth };
    });
  };
  const mapleFn = () => {
    //attacks scruffy
    const attackPower = Math.ceil(Math.random() * 10);
    setScruffyStats((prev) => {
      const newHealth = prev.health - attackPower;
      return { ...prev, health: newHealth };
    });
  };

  const scruffyStyles = {
    height: "40vmin",
    opacity: isFighting ? scruffyStats.health / 100 : 1,
  };
  const mapleStyles = {
    height: "40vmin",
    opacity: isFighting ? mapleStats.health / 100 : 1,
  };

  return (
    <div className="App">
      <header className="App-header p-5">
        <div className="d-flex justify-content-between w-100">
          <div className="d-flex flex-column">
            <img style={scruffyStyles} src={scruffy} alt="scruffy dog" />
            <p>{Math.max(scruffyStats.health, 0)}</p>
          </div>
          <div className="d-flex flex-column">
            <img style={mapleStyles} src={maple} alt="maple the cat" />
            <p>{Math.max(mapleStats.health, 0)}</p>
          </div>
        </div>
        <button
          onClick={() => {
            setIsFighting(true);
            setScruffyStats({ health: 100 });
            setMapleStats({ health: 100 });
          }}
          className="btn btn-danger"
        >
          Start Fight!
        </button>
      </header>
    </div>
  );
};
