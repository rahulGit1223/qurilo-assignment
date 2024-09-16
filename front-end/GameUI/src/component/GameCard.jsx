import React from "react";

const GameCard = ({ gameName, imageUrl }) => {
  return (
    <div className="w-70 bg-gray-700 rounded-xl shadow-lg hover:bg-gray-700 transition duration-300">
      <img
        src={imageUrl}
        alt={gameName}
        className="w-full object-cover"
      />
      <div className="flex flex-col bg-gray-300 items-center mt-2">
        <h2 className="text-xl font-bold text-black">
          {gameName}
        </h2>
        <h3>
        Click to View Tournaments
        </h3> 
      </div>
    </div>
  );
};

export default GameCard;
