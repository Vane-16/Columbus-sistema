// ===============================
// VARIABLES GLOBALES
// ===============================
let empleados = JSON.parse(localStorage.getItem("empleados")) || [];
let indiceEditando = null;


// ===============================
// VERIFICAR SESIÓN
// ===============================
if (window.location.pathname.includes("empleados.html")) {
    if (localStorage.getItem("sesionActiva") !== "true") {
        window.location.href = "login.html";
    }
}


// ===============================
// CUANDO CARGA LA PÁGINA
// ===============================
document.addEventListener("DOMContentLoaded", function () {

    cargarEmpleados();

    const form = document.getElementById("formEmpleado");

    form.addEventListener("submit", function (e) {

        e.preventDefault();

        console.log("Indice actual:", indiceEditando); // 🔎 prueba

        if (indiceEditando !== null) {
            actualizarEmpleado();
        } else {
            guardarEmpleado();
        }

    });

});


// ===============================
// GUARDAR NUEVO EMPLEADO
// ===============================
function guardarEmpleado() {

    const empleado = obtenerDatosFormulario();

    empleados.push(empleado);

    guardarEnLocalStorage();

    limpiarFormulario();
    cargarEmpleados();

    alert("Empleado guardado correctamente");
}


// ===============================
// ACTUALIZAR EMPLEADO
// ===============================
function actualizarEmpleado() {

    empleados[indiceEditando] = obtenerDatosFormulario();

    localStorage.setItem("empleados", JSON.stringify(empleados));

    indiceEditando = null;

    document.getElementById("btnGuardar").textContent = "Guardar";

    limpiarFormulario();
    cargarEmpleados();
}



// ===============================
// EDITAR
// ===============================
function editarEmpleado(index) {

    const emp = empleados[index];

    document.getElementById("nombre").value = emp.nombre || "";
    document.getElementById("apellidos").value = emp.apellidos || "";
    document.getElementById("tipoDocumento").value = emp.tipoDocumento || "";
    document.getElementById("numeroDocumento").value = emp.numeroDocumento || "";
    document.getElementById("fechaNacimiento").value = emp.fechaNacimiento || "";
    document.getElementById("estadoCivil").value = emp.estadoCivil || "";

    indiceEditando = index;

    document.getElementById("btnGuardar").textContent = "Actualizar";
}


// ===============================
// ELIMINAR
// ===============================
function eliminarEmpleado(index) {

    empleados.splice(index, 1);

    guardarEnLocalStorage();

    cargarEmpleados();
}


// ===============================
// CARGAR TABLA
// ===============================
function cargarEmpleados() {

    const tabla = document.getElementById("tablaEmpleados");
    tabla.innerHTML = "";

    empleados.forEach((emp, index) => {

        tabla.innerHTML += `
            <tr>
                <td>${emp.nombre || ""}</td>
                <td>${emp.apellidos || ""}</td>
                <td>${emp.tipoDocumento || ""} ${emp.numeroDocumento || ""}</td>
                <td>${emp.fechaNacimiento || ""}</td>
                <td>${emp.estadoCivil || ""}</td>
                <td>
                    <button type="button" onclick="editarEmpleado(${index})">
                        Editar
                    </button>
                    <button type="button" onclick="eliminarEmpleado(${index})">
                        Eliminar
                    </button>
                </td>
            </tr>
        `;

    });
}


// ===============================
// GUARDAR EN LOCALSTORAGE
// ===============================
function guardarEnLocalStorage() {
    localStorage.setItem("empleados", JSON.stringify(empleados));
}


// ===============================
// OBTENER DATOS FORMULARIO
// ===============================
function obtenerDatosFormulario() {

    return {
        nombre: document.getElementById("nombre").value,
        apellidos: document.getElementById("apellidos").value,
        tipoDocumento: document.getElementById("tipoDocumento").value,
        numeroDocumento: document.getElementById("numeroDocumento").value,
        fechaNacimiento: document.getElementById("fechaNacimiento").value,
        estadoCivil: document.getElementById("estadoCivil").value
    };

}


// ===============================
// LIMPIAR FORMULARIO
// ===============================
function limpiarFormulario() {
    document.getElementById("formEmpleado").reset();
}


// ===============================
// CAMBIAR SECCIONES
// ===============================
function mostrarSeccion(seccion) {

    document.getElementById("seccionEmpleado").style.display = "none";
    document.getElementById("seccionContrato").style.display = "none";
    document.getElementById("seccionSeguridad").style.display = "none";

    if (seccion === "empleado") {
        document.getElementById("seccionEmpleado").style.display = "block";
    }

    if (seccion === "contrato") {
        document.getElementById("seccionContrato").style.display = "block";
    }

    if (seccion === "seguridad") {
        document.getElementById("seccionSeguridad").style.display = "block";
    }
}


// ===============================
// CERRAR SESIÓN
// ===============================
function cerrarSesion() {
    localStorage.removeItem("sesionActiva");
    window.location.href = "login.html";
}

function login() {

    const usuario = document.getElementById("usuario").value;
    const password = document.getElementById("password").value;
    const error = document.getElementById("errorLogin");

    if (usuario === "admin" && password === "1234") {

        localStorage.setItem("sesionActiva", "true");
        window.location.href = "empleados.html";

    } else {
        error.textContent = "Usuario o contraseña incorrectos";
    }
}
