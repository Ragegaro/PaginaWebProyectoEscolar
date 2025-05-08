document.addEventListener("DOMContentLoaded", function () {
    // Detectar si estamos dentro de /productos/
    let pathPrefix = window.location.pathname.includes("/productos/") ? ".." : "";


     // Cargar el archivo CSS dinámicamente
     let link = document.createElement("link");
     link.rel = "stylesheet";
     link.href = `${pathPrefix}/styles/style.css`;  // Cambia esta ruta al CSS correcto
     document.head.appendChild(link);  // Añadir el CSS al <head> del documento
 
    // cargar el header
    fetch(`${pathPrefix}/todasPaginas/header.html`)
        .then(response => response.text())
        .then(data => {
            let tempDiv = document.createElement("div");
            tempDiv.innerHTML = data;

            // Ajustar rutas de los enlaces para que funcionen desde cualquier carpeta
            tempDiv.querySelectorAll("a").forEach(link => {
                let href = link.getAttribute("href");
                if (href && !href.startsWith("http")) { // No modificar enlaces absolutos
                    link.setAttribute("href", `${pathPrefix}/${href}`);
                }
            });

            // Insertar el header corregido en la página
            document.body.insertAdjacentHTML("afterbegin", tempDiv.innerHTML);
        })
        .catch(error => console.error("Error al cargar el header:", error));

    // Cargar el footer
    fetch(`${pathPrefix}/todasPaginas/footer.html`)
        .then(response => response.text())
        .then(data => {
            document.body.insertAdjacentHTML("beforeend", data);
        })
        .catch(error => console.error("Error al cargar el footer:", error));
});
