const timeStamp = '1737300360';
const apiKey = 'dd361ff2995c08961d504690af3e99ac';
const md5 = 'b9167f19018d6d34a7fc5e130087008a';

fetchCharacters();

const searchButton = document.querySelector('#searchButton');
searchButton.addEventListener('click', () => {
    const query = document.querySelector('#searchInput').value.trim();
    fetchCharacters(query); 
});

function fetchCharacters(query = '') {
    const url = `https://gateway.marvel.com:443/v1/public/characters?ts=${timeStamp}&apikey=${apiKey}&hash=${md5}&limit=100${query ? '&nameStartsWith=' + query : ''}`;

    fetch(url)
        .then((response) => response.json())
        .then((jsonParsed) => {
            const divHero = document.querySelector('#herois');
            divHero.innerHTML = ''; 

            if (jsonParsed.data.results.length === 0) {
                divHero.innerHTML = '<p>Nenhum personagem encontrado.</p>';
            }

            jsonParsed.data.results.forEach(element => {
                const srcImage = element.thumbnail.path + '.' + element.thumbnail.extension;
                const nameHero = element.name;

                if (!srcImage.includes('image_not_available')) {
                    createDivHero(srcImage, nameHero, divHero);
                }
            });
        })
        .catch((error) => {
            console.error('Erro ao buscar dados:', error);
        });
}

function createDivHero(srcImage, nameHero, divToAppend) {
    const divPai = document.createElement('div');
    const divFilho = document.createElement('div');
    const textName = document.createElement('span');
    const img = document.createElement('img');

    textName.textContent = nameHero;
    img.src = srcImage;

    divFilho.appendChild(textName);

    divPai.appendChild(img);
    divPai.appendChild(divFilho);
    divToAppend.appendChild(divPai);

    divPai.classList.add('character-card');
}
