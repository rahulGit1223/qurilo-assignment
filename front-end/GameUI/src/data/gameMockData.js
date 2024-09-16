// src/data/gamesData.js

import freefireImage from "../assets/games/freefireBanner.jpg";
import ffSoloImage from "../assets/games/solofreefire.webp";
import ffDuoImage from "../assets/games/duofreefire.jpeg";
import ffSquadImage from "../assets/games/squadfreefire.jpg";

export const games = {
  freefire: {
    name: "Free Fire",
    imageUrl: freefireImage,
    description:
      "Free Fire is a thrilling battle royale game where players parachute onto a remote island and fight to be the last person or team standing. The game features intense 10-minute matches, a variety of weapons, and strategic gameplay. With its dynamic environments and fast-paced action, Free Fire offers an engaging experience for players who enjoy competitive and strategic combat. Players can team up with friends or go solo in various game modes, making each match unique and exciting.",

    tournaments: [
        {
            name: "Free Fire Solo King",
            imageUrl: ffSoloImage,
            entryFees: "$5",
            prizePool: "$500",
            maxPlayers: 50,
            startTime: "2024-09-15T15:00:00Z",
            rules: "Solo players only, no teaming.",
          },
          {
            name: "Free Fire Duo Blast",
            imageUrl: ffDuoImage,
            entryFees: "$10",
            prizePool: "$1000",
            maxPlayers: 48,
            startTime: "2024-09-18T17:00:00Z",
            rules: "Teams of two players.",
          },
          {
            name: "Free Fire Squad Smashers",
            imageUrl: ffSquadImage,
            entryFees: "$20",
            prizePool: "$2000",
            maxPlayers: 48,
            startTime: "2024-09-20T18:00:00Z",
            rules: "Squads of four players.",
          },
          {
            name: "Free Fire Solo King",
            imageUrl: ffSoloImage,
            entryFees: "$5",
            prizePool: "$500",
            maxPlayers: 50,
            startTime: "2024-09-15T15:00:00Z",
            rules: "Solo players only, no teaming.",
          },
          {
            name: "Free Fire Duo Blast",
            imageUrl: ffDuoImage,
            entryFees: "$10",
            prizePool: "$1000",
            maxPlayers: 48,
            startTime: "2024-09-18T17:00:00Z",
            rules: "Teams of two players.",
          },
          {
            name: "Free Fire Squad Smashers",
            imageUrl: ffSquadImage,
            entryFees: "$20",
            prizePool: "$2000",
            maxPlayers: 48,
            startTime: "2024-09-20T18:00:00Z",
            rules: "Squads of four players.",
          },
    ],
  },
};
