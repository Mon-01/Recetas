
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
            carta.className = "col card"; 
            let img = document.createElement("img");
            img.setAttribute("src", recetas[i].strMealThumb);
            img.className = "card-img-top";
            carta.appendChild(img);

            let cuerpo = document.createElement("div");
            cuerpo.className = "card-body";
            cuerpo.innerHTML = recetas[i].strMeal;  

            carta.appendChild(cuerpo);
            clicable(carta, cuerpo);
            document.getElementById("recetas").appendChild(carta);
        }

    } catch (error) {
        console.error("Error al obtener datos:", error);
    }
}
function clicable(carta, cuerpo){
    carta.addEventListener("click",() => {
        
        let nombre = cuerpo.innerHTML;
        window.location.href = `recetaDetalle.html?nombre=${nombre}`;
    }
    );
}

generarRecetas();