const form = document.getElementById("imcForm");
const resultadoEl = document.getElementById("resultado");
const erroresEl = document.getElementById("errores");

form.addEventListener("submit", function (e) {
    e.preventDefault();

    // Limpiar mensajes previos
    resultadoEl.innerHTML = "";
    erroresEl.textContent = "";

    const peso = parseFloat(document.getElementById("peso").value);
    let estatura = parseFloat(document.getElementById("estatura").value);

    const errores = [];

    // Validaciones básicas
    if (isNaN(peso) || isNaN(estatura)) {
        errores.push("Por favor llena ambos campos con números.");
    }

    if (!isNaN(peso) && (peso <= 0 || peso > 400)) {
        errores.push("Ingresa un peso válido (mayor a 0 y menor a 400 kg).");
    }

    if (!isNaN(estatura) && estatura <= 0) {
        errores.push("Ingresa una estatura válida (mayor a 0).");
    }

    // Detectar si pusieron centímetros (ej. 170) y convertir a metros automáticamente
    if (!isNaN(estatura) && estatura >= 100 && estatura <= 250) {
        estatura = estatura / 100;
    } else if (!isNaN(estatura) && estatura > 3) {
        errores.push("La estatura debe estar en metros. Ejemplo: 1.70 (no 170).");
    }

    // Si hay errores, los mostramos y detenemos el cálculo
    if (errores.length > 0) {
        erroresEl.innerHTML = errores.join("<br>");
        return;
    }

    // Cálculo del IMC
    const imc = peso / (estatura * estatura);

    let interpretacion = "";
    let claseTag = "";

    if (imc < 18.5) {
        interpretacion = "Bajo peso";
        claseTag = "tag-bajo";
    } else if (imc < 25) {
        interpretacion = "Peso saludable";
        claseTag = "tag-saludable";
    } else if (imc < 30) {
        interpretacion = "Sobrepeso";
        claseTag = "tag-sobrepeso";
    } else {
        interpretacion = "Obesidad";
        claseTag = "tag-obesidad";
    }

    resultadoEl.innerHTML = `
        Tu IMC es <strong>${imc.toFixed(2)}</strong> — 
        <span class="tag ${claseTag}">${interpretacion}</span>
    `;
});
