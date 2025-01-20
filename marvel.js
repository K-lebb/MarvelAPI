const timeStamp = '1737300360';
const apiKey = 'dd361ff2995c08961d504690af3e99ac';
const md5 = 'b9167f19018d6d34a7fc5e130087008a';

fetch(`https://gateway.marvel.com:443/v1/public/characters?ts=${timeStamp}&apikey=${apiKey}&hash=${md5}&limit=100`)
  .then((response) => response.json())
  .then((jsonParsed) => {  
    console.log(jsonParsed);

    const divHero = document.querySelector('#herois');

    jsonParsed.data.results.forEach(element => {
        const srcImage = element.thumbnail.path + '.' + element.thumbnail.extension;
        const nameHero = element.name;

        // Verifique se a imagem é válida antes de criar o card
        if (!srcImage.includes('image_not_available')) {
            createCard(srcImage, nameHero, divHero);
        }
    });
  })
  .catch((error) => {  
    console.error('Erro ao buscar dados:', error);
  });

function createCard(srcImage, nameHero, divToAppend) {
    const card = document.createElement('div');
    card.classList.add('character-card');

    const img = document.createElement('img');
    img.src = srcImage;
    img.alt = nameHero;

    const name = document.createElement('h3');
    name.textContent = nameHero;

    card.appendChild(img);
    card.appendChild(name);

    divToAppend.appendChild(card);
}
