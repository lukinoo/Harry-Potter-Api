const container = $('#container');
let characters = [];

$('#search').keyup((e) => {
    const searchValue = e.target.value;
    // filtered search characters
    const filteredChras = characters.filter((char) => {
        return char.name.toLowerCase().includes(searchValue) ||
               char.house.toLowerCase().includes(searchValue)
    })
    displayCharacters(filteredChras);
})

const fetchApi = async () => {
    try {
        const res = await fetch('https://hp-api.herokuapp.com/api/characters');
        characters = await res.json();
        displayCharacters(characters);
    } catch (err) {
        console.error(err);
    }
}

const displayCharacters = (characters) => {
    let date = new Date();
    let currentYear = date.getFullYear()
    const characterInfo = characters.map((character) => {
        return `<div class="character-info">
                    <img src="${character.image}" alt="" class="image"/>
                    <h2 class="name">${character.name}</h2>
                    <p class="species">House: ${character.house}</p>
                    <div class="extra-information">
                        <p class="gender">gender: ${character.gender}</p>
                        <p class="year">age: ${character.yearOfBirth ? currentYear - character.yearOfBirth : null}</p>
                        <p class="eye-color">eye color: ${character.eyeColour}</p>
                    </div>
                </div>`
    })
    .join('');
    container.html(characterInfo);
}

fetchApi()