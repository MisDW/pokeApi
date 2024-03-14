function cargarPokemon(url) {
    fetch(url)
        .then(response => response.json())
        .then(data => {
            const pokemonContainer = document.getElementById('pokemonContainer');
            
            data.results.forEach(pokemon => {
                fetch(pokemon.url)
                    .then(response => response.json())
                    .then(pokemonData => {
                        const nombre = pokemonData.name;
                        const imagen = pokemonData.sprites.front_default;
                        const habilidades = pokemonData.abilities.map(habilidad => habilidad.ability.name).join(', ');
                        const tipos = pokemonData.types.map(tipo => tipo.type.name).join(', '); // Obtener los tipos de Pokémon
                        
                        // Asignar un color a cada tipo de Pokémon
                        const tipoColor = obtenerColorTipo(tipos.split(',')[0]); // Tomamos solo el primer tipo
                        
                        const pokemonCard = document.createElement('div');
                        pokemonCard.classList.add('pokemon-card');
                        pokemonCard.style.backgroundImage = tipoColor; // Asignar color basado en el tipo de Pokémon
                        pokemonCard.innerHTML = `
                            <h3>${nombre.toUpperCase()}</h3>
                            <img src="${imagen}" alt="${nombre}">
                            <p><i class="bi bi-lightning-charge-fill"></i> ${habilidades}</p>
                            <p><i class="bi bi-fire"></i> ${tipos}</p>
                            <button class="ver_mas" data-url="${pokemon.url}"><i class="bi bi-eye-fill"></i> Ver mas ...</button>
                        `;
                        pokemonContainer.appendChild(pokemonCard);

                        // Agregar evento de clic para redireccionar al usuario a la página de detalles del Pokémon
                        pokemonCard.querySelector('.ver_mas').addEventListener('click', function() {
                            const pokemonUrl = this.getAttribute('data-url');
                            window.location.href = `pokemon-details.html?url=${pokemonUrl}`;
                        });
                    });
            });
        })
        .catch(error => console.error('Error al cargar los datos:', error));
}

function cargarMasPokemon() {
    const url = 'https://pokeapi.co/api/v2/pokemon?limit=10&offset=20'; // Cargar los siguientes 10 Pokémon
    
    cargarPokemon(url);
}

function obtenerColorTipo(tipo) {
    // Mapear tipos de Pokémon a colores
    const coloresTipo = {
        normal: 'linear-gradient(135deg, #A8A77A 0%, #C6C6A7 100%)',
        fire: 'linear-gradient(135deg, #F08030 0%, #FFA07A 100%)',
        water: 'linear-gradient(135deg, #6890F0 0%, #98D8D8 100%)',
        electric: 'linear-gradient(135deg, #F8D030 0%, #FFD700 100%)',
        grass: 'linear-gradient(135deg, #78C850 0%, #C6E58A 100%)',
        ice: 'linear-gradient(135deg, #98D8D8 0%, #00BFFF 100%)',
        fighting: 'linear-gradient(135deg, #C03028 0%, #CD5C5C 100%)',
        poison: 'linear-gradient(135deg, #A040A0 0%, #D98CA1 100%)',
        ground: 'linear-gradient(135deg, #E0C068 0%, #DAA520 100%)',
        flying: 'linear-gradient(135deg, #A890F0 0%, #D6A8FF 100%)',
        psychic: 'linear-gradient(135deg, #F85888 0%, #FFA1B5 100%)',
        bug: 'linear-gradient(135deg, #A8B820 0%, #C2D21F 100%)',
        rock: 'linear-gradient(135deg, #B8A038 0%, #D2B48C 100%)',
        ghost: 'linear-gradient(135deg, #705898 0%, #A292BC 100%)',
        dragon: 'linear-gradient(135deg, #7038F8 0%, #7B62A3 100%)',
        dark: 'linear-gradient(135deg, #705848 0%, #A29288 100%)',
        steel: 'linear-gradient(135deg, #B8B8D0 0%, #D1D1E0 100%)',
        fairy: 'linear-gradient(135deg, #EE99AC 0%, #FFCCCC 100%)'
    };
    
    // Retornar el color correspondiente al tipo de Pokémon
    return coloresTipo[tipo] || '#68A090'; // Si el tipo no está definido, se asigna un color predeterminado
}

document.addEventListener('DOMContentLoaded', function() {
    cargarPokemon('https://pokeapi.co/api/v2/pokemon?limit=20');

    const loadMoreButton = document.getElementById('loadMore');
    loadMoreButton.addEventListener('click', cargarMasPokemon);
});
