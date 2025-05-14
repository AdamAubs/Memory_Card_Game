import { useEffect, useState } from "react";
import MemoryCard from "./MemoryCard";
import ScoreBoard from "./ScoreBoard";

function shuffleGifys(gifs) {
  const shuffled = [...gifs];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export default function GameController() {
  const [gifs, setGifs] = useState([]);
  const [clickedGifs, setClickedGifs] = useState([]);

  const [currScore, setCurrScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);

  const API_KEY = "q80ZD8zWrDamqGFnIgu4bbwtZfiaSWfC";
  const queryType = "funny";
  const url = `https://api.giphy.com/v1/gifs/trending?api_key=${API_KEY}&q=${queryType}&limit=10`;

  useEffect(() => {
    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to connect to API");
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);

        if (data.data) {
          setGifs(data.data);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, [url]);

  const handleClick = (clickedGif) => {
    console.log("Clicked GIF", clickedGifs);

    if (clickedGifs.includes(clickedGif)) {
      if (bestScore < currScore) {
        setBestScore(currScore);
      }
      setCurrScore(0);
      setClickedGifs([]);
    } else {
      setClickedGifs((prevClickedGifs) => [...prevClickedGifs, clickedGif]);
      setCurrScore(clickedGifs.length + 1);
      if (currScore.length + 1 > bestScore) {
        setBestScore(currScore.length + 1);
      }
    }

    // Shuffle the cards and update the state
    const shuffledGifs = shuffleGifys(gifs);
    setGifs(shuffledGifs);
  };

  return (
    <div>
      <ScoreBoard currScore={currScore} bestScore={bestScore} />
      <div className="grid grid-cols-5 grid-rows-3 gap-4 m-10">
        {gifs.map((gif) => (
          <MemoryCard key={gif.id} gif={gif} onClick={handleClick} />
        ))}
      </div>
    </div>
  );
}
