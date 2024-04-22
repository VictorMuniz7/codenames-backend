const words = ["ADMINISTRADOR   ",
    "STREAMER",
    "LAGARTIXA",
    "DESIGNER",
    "MORCEGO",
    "ASPIRADOR",
    "IMPRESSORA",
    "GORILA",
    "FIBRA",
    "PAÇOCA",
    "FUNK",
    "MEDO",
    "APATIA",
    "BRONZE",
    "FILTRO",
    "COREIA",
    "GORDURA",
    "BASQUETE",
    "ISRAEL",
    "TERNO",
    "DOMINÓ",
    "PANDA",
    "PANDEIRO",
    "COTOVELO",
    "MÚSCULO",
    "UMBIGO",
    "UNIFORME",
    "VELHICE",
    "PANDEMIA",
    "DEPRESSÃO",
    "AZUL",
    "POBREZA",
    "ROXO",
    "JANEIRO",
    "ESTÁTUA",
    "PIERCING",
    "DEZEMBRO",
    "OUTUBRO",
    "CHUPETA",
    "KATANA",
    "TECLADO",
    "NOTEBOOK",
    "BUDA",
    "PELÉ",
    "ZEUS",
    "GOKU",
    "PALMEIRAS",
    "VASCO",
    "FLAMENGO",
    "ESGOTO"]

    function createGame() {
        return new Promise(function (resolve, reject) {

            let cardIndex = []
            let cards = []
            let cardsfinal = [];

            for (let i = 0; i < 25; i++) {
                let singleIndex = getRandomInt(words.length)
    
                while (cardIndex.includes(singleIndex)) {
                    singleIndex = getRandomInt(words.length);
                }
    
                cardIndex.push(singleIndex)
                cards.push(
                    {
                        word: words[singleIndex],
                        color: "neutral",
                        selected: false
                    })
            }
    
            for (let red = 0; red < 9; red++) {
                let singleIndex = getRandomInt(cards.length)
    
                cards[singleIndex].color = "red";
                cardsfinal.push(cards[singleIndex]);
                cards.splice(singleIndex, 1);
            }
    
            for (let blue = 0; blue < 8; blue++) {
                let singleIndex = getRandomInt(cards.length)
    
                cards[singleIndex].color = "blue";
                cardsfinal.push(cards[singleIndex]);
                cards.splice(singleIndex, 1);
            }
    
            let bombIndex = getRandomInt(cards.length)
            cards[bombIndex].color = "black";
    
            let final = cards.concat(cardsfinal);
            final = shuffle(final);
    
            resolve(final);
        });
    }
    
    
    function shuffle(array) {
        let currentIndex = array.length, temporaryValue, randomIndex;
    
        // While there remain elements to shuffle...
        while (0 !== currentIndex) {
    
            // Pick a remaining element...
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;
    
            // And swap it with the current element.
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }
    
        return array;
    }
    
    function getRandomInt(max) {
        return Math.floor(Math.random() * Math.floor(max));
    }
    
    module.exports = {
        createGame
    };