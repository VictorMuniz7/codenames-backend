var __getOwnPropNames = Object.getOwnPropertyNames;
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};

// util/words.js
var require_words = __commonJS({
  "util/words.js"(exports2, module2) {
    var words = [
      "success",
      "appointment",
      "administration",
      "procedure",
      "situation",
      "food",
      "advice",
      "emphasis",
      "vehicle",
      "education",
      "writing",
      "gate",
      "dinner",
      "independence",
      "ratio",
      "wife",
      "possession",
      "alcohol",
      "love",
      "university",
      "importance",
      "committee",
      "decision",
      "session",
      "thanks",
      "replacement",
      "fortune",
      "sister",
      "article",
      "studio",
      "reputation",
      "math",
      "percentage",
      "heart",
      "topic",
      "desk",
      "interaction",
      "homework",
      "grandmother",
      "cell",
      "reaction",
      "combination",
      "indication",
      "baseball",
      "currency",
      "cigarette",
      "client",
      "discussion",
      "breath",
      "actor"
    ];
    function createGame2() {
      return new Promise(function(resolve, reject) {
        let cardIndex = [];
        let cards = [];
        let cardsfinal = [];
        for (let i = 0; i < 25; i++) {
          let singleIndex = getRandomInt(words.length);
          while (cardIndex.includes(singleIndex)) {
            singleIndex = getRandomInt(words.length);
          }
          cardIndex.push(singleIndex);
          cards.push(
            {
              word: words[singleIndex],
              color: "neutral",
              selected: false
            }
          );
        }
        for (let red = 0; red < 9; red++) {
          let singleIndex = getRandomInt(cards.length);
          cards[singleIndex].color = "red";
          cardsfinal.push(cards[singleIndex]);
          cards.splice(singleIndex, 1);
        }
        for (let blue = 0; blue < 8; blue++) {
          let singleIndex = getRandomInt(cards.length);
          cards[singleIndex].color = "blue";
          cardsfinal.push(cards[singleIndex]);
          cards.splice(singleIndex, 1);
        }
        let bombIndex = getRandomInt(cards.length);
        cards[bombIndex].color = "black";
        let final = cards.concat(cardsfinal);
        final = shuffle(final);
        resolve(final);
      });
    }
    function shuffle(array) {
      let currentIndex = array.length, temporaryValue, randomIndex;
      while (0 !== currentIndex) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
      }
      return array;
    }
    function getRandomInt(max) {
      return Math.floor(Math.random() * Math.floor(max));
    }
    module2.exports = {
      createGame: createGame2
    };
  }
});

// index.js
var app = require("express");
var httpServer = require("http").createServer(app);
var io = require("socket.io")(httpServer, {
  cors: true,
  origins: ["*"]
});
var { createGame } = require_words();
io.on("connection", (socket) => {
  console.log("a user connected");
  socket.on("startGame", ({ gameId }) => {
    createGame().then((words) => {
      io.to(gameId).emit("startGame", words);
    });
  });
  socket.on("gameUpdate", ({ gameId, words }) => {
    io.to(gameId).emit(gameId, words);
  });
  socket.on("joinGame", ({ gameId }) => {
    socket.join(gameId);
    console.log("a player joined the room " + gameId);
    socket.to(gameId).emit("joinGame", "A player joined the game!");
  });
});
var PORT = process.env.PORT || 3e3;
httpServer.listen(PORT, () => console.log("Server is Running on port " + PORT));
