require('dotenv').config();
var axios = require("axios");
const API_KEY = process.env.RAWG_API_KEY || "e30cbb24af9548ab861b932c43604540";

const getGame = async function(name) {
    const gameName = encodeURIComponent(name);
    let config = {
        method: 'get',
        url: `https://api.rawg.io/api/games?key=${API_KEY}&ordering=rating&search_exact=true&page_size=1&search=${gameName}`,
        headers: { }
    };

    return axios(config)
}

module.exports = {
    getGame: getGame
}
