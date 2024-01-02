const metacritic = require("./metacritic.js");

console.log("start test")

const gameName = "The Last of Us";

const game = metacritic.getGame(gameName);
game.then((response) => {    
    const gameData = response.data.results[0];
    console.log(JSON.stringify(gameData));

    console.log(`A nota do jogo ${gameData.name} é a de ${gameData.metacritic}`);
})
.catch((error) => {
    console.log(error);
});

console.log("end test")