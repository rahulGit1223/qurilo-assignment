import React from "react";
import { useParams } from "react-router-dom";
import { games } from "../data/gameMockData";

const Tounaments = () => {
  const { gameId } = useParams();
  const game = games[gameId];
  if (!game) {
    return <div className="text-white">Game not found!!</div>;
  }
  return (
    <div className="text-white p-4 ">
      <div className="flex gap-6  ">
        <img src={game.imageUrl} className="w-1/2" />
        <div className="w-1/2">
          <div className="w-full flex justify-between" >
            <span className="text-4xl font-semibold text-gray-200">
              {game.name.toUpperCase()}
            </span>
            <button className="border border-gray-600 rounded-lg p-4">View Rules</button>
          </div>
          <p className="text-xl font-semibold text-gray-500 mt-4">
            {game.description}
          </p>
        </div>
      </div>

      <div className="w-full mt-6 mb-10">
        <span className="text-3xl font-semibold text-gray-200">
          Tournament Types
        </span>
        <hr className="w-full mb-4 cursor-pointer border border-gray-600 rounded-md mt-4" />
        <div className="p-3 w-full flex flex-wrap gap-4 items-center ">
          {game.tournaments.map((tournament) => {
            return (
              <div className="bg-gray-800 p-4 rounded-lg shadow-lg">
                <h2 className="text-2xl font-semibold text-white mb-4">
                  {tournament.name}
                </h2>
                <div className="flex">
                  <img
                    src={tournament.imageUrl}
                    alt={tournament.name}
                    className="w-24 h-24 object-cover rounded-md mt-3 mr-4"
                  />
                  <div className="flex-1 text-gray-300">
                    <p className="mb-2">
                      <span className="font-semibold text-white">
                        Entry Fees:
                      </span>{" "}
                      {tournament.entryFees}
                    </p>
                    <p className="mb-2">
                      <span className="font-semibold text-white">
                        Prize Pool:
                      </span>{" "}
                      {tournament.prizePool}
                    </p>
                    <p className="mb-2">
                      <span className="font-semibold text-white">
                        Max Players:
                      </span>{" "}
                      {tournament.maxPlayers}
                    </p>
                    <p className="mb-2">
                      <span className="font-semibold text-white">
                        Start Time:
                      </span>{" "}
                      {new Date(tournament.startTime).toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Tounaments;
