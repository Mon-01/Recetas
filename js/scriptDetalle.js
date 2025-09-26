const params = new URLSearchParams(window.location.search);
const nombre = params.get("nombre");
var titulo = document.getElementById("titulo");
titulo.innerHTML = nombre;

async function generarRecetas() {
    try {
        const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${nombre}`);

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const datos = await response.json();
        console.log(datos);

        const recetas = datos.meals;

        let img = document.createElement("img");
        img.setAttribute("src", recetas[0].strMealThumb);
        img.style.marginRight = "30px";

        var contenedor = document.getElementById("receta");
        contenedor.appendChild(img);

        let contenido = document.createElement("div");
        contenedor.appendChild(contenido);

        let instrucciones = document.createElement("div");
        contenido.appendChild(instrucciones);
        instrucciones.innerHTML = recetas[0].strInstructions;
        instrucciones.style.marginBottom = "30px";

        if (recetas[0].strYoutube) {
            let videoContenedor = document.createElement("div");
            contenido.appendChild(videoContenedor);

            let iframe = document.createElement("iframe");
            let videoId = recetas[0].strYoutube.split("v=")[1];

            iframe.setAttribute("src", `https://www.youtube.com/embed/${videoId}`);
            iframe.setAttribute("width", "560");
            iframe.setAttribute("height", "315");

            videoContenedor.appendChild(iframe);
        }



    } catch (error) {
        console.error("Error al obtener datos:", error);
    }
}

generarRecetas();