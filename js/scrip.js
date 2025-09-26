async function generarCategorias() {
    try {
        const response = await fetch("https://www.themealdb.com/api/json/v1/1/list.php?c=list");
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const datos = await response.json();  
        
        
        const categorias = datos.meals;

        for (let i = 0; i < categorias.length; i++) {
            let carta = document.createElement("div");
            carta.className = "col";  
            carta.innerHTML = categorias[i].strCategory; 
            document.getElementById("categorias").appendChild(carta);
        }
    } catch (error) {
        console.error("Error al obtener datos:", error);
    }
}

generarCategorias();
