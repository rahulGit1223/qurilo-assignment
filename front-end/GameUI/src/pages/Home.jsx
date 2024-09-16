import React from 'react';
import GameCard from '../component/GameCard';
import { Link } from 'react-router-dom';
import { games } from '../data/gameMockData';

const Home = () => {
  return (
    <div className="min-h-screen p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
      {Object.keys(games).map((key) => {
        const game = games[key];
        return (
          <Link to={`/tournaments/${key}`} key={game.name}>
            <div className="w-full mb-10 cursor-pointer border border-white rounded-md">
              <GameCard gameName={game.name} imageUrl={game.imageUrl} />
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default Home;
