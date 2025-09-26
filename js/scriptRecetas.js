
const params = new URLSearchParams(window.location.search);
const categoria = params.get("categoria");
console.log(categoria);
document.getElementById("titulo").innerHTML += ": " + categoria;

async function generarRecetas() {
    try {
        const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${categoria}`);
        
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const datos = await response.json();  
        console.log(datos);
        
        const recetas = datos.meals;

        for (let i = 0; i < recetas.length; i++) {
            let carta = document.createElement("div");
            carta.className = "col";
            carta.className = "card";
            carta.innerHTML = recetas[i].strMeal; 
            document.getElementById("recetas").appendChild(carta);
        }
    } catch (error) {
        console.error("Error al obtener datos:", error);
    }
}

generarRecetas();