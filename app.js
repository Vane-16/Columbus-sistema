let indiceEditando = null;

// ===============================
// CUANDO CARGA LA PÁGINA
// ===============================

if (localStorage.getItem("sesionActiva") === "true") {
    document.querySelector(".login-container").style.display = "none";
    document.getElementById("sistema").style.display = "block";
}

document.addEventListener("DOMContentLoaded", function () {

    cargarEmpleados();

    document.getElementById("btnGuardar").addEventListener("click", function () {

        if (indiceEditando === null) {
            guardarEmpleado();
        } else {
            actualizarEmpleado();
        }

    });

});


// ===============================
// GUARDAR NUEVO EMPLEADO
// ===============================

function guardarEmpleado() {

    const empleado = obtenerDatosFormulario();

    if (!empleado.nombre || !empleado.apellidos || !empleado.numeroDocumento) {
        alert("Complete los campos obligatorios");
        return;
    }

    let empleados = JSON.parse(localStorage.getItem("empleados")) || [];
    empleados.push(empleado);

    localStorage.setItem("empleados", JSON.stringify(empleados));

    limpiarFormulario();
    cargarEmpleados();
}


// ===============================
// ACTUALIZAR EMPLEADO
// ===============================

function actualizarEmpleado() {

    let empleados = JSON.parse(localStorage.getItem("empleados")) || [];

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

    let empleados = JSON.parse(localStorage.getItem("empleados")) || [];
    const emp = empleados[index];

    document.getElementById("nombre").value = emp.nombre;
    document.getElementById("apellidos").value = emp.apellidos;
    document.getElementById("tipoDocumento").value = emp.tipoDocumento;
    document.getElementById("numeroDocumento").value = emp.numeroDocumento;
    document.getElementById("fechaNacimiento").value = emp.fechaNacimiento;
    document.getElementById("estadoCivil").value = emp.estadoCivil;

    indiceEditando = index;

    document.getElementById("btnGuardar").textContent = "Actualizar";

}


// ===============================
// ELIMINAR
// ===============================

function eliminarEmpleado(index) {

    let empleados = JSON.parse(localStorage.getItem("empleados")) || [];
    empleados.splice(index, 1);

    localStorage.setItem("empleados", JSON.stringify(empleados));

    cargarEmpleados();
}


// ===============================
// CARGAR TABLA
// ===============================

function cargarEmpleados() {

    const tabla = document.getElementById("tablaEmpleados");
    tabla.innerHTML = "";

    let empleados = JSON.parse(localStorage.getItem("empleados")) || [];

    empleados.forEach((emp, index) => {

        tabla.innerHTML += `
            <tr>
                <td>${emp.nombre}</td>
                <td>${emp.apellidos}</td>
                <td>${emp.tipoDocumento} ${emp.numeroDocumento}</td>
                <td>${emp.fechaNacimiento}</td>
                <td>${emp.estadoCivil}</td>
                <td>
                    <button class="action-btn edit" onclick="editarEmpleado(${index})">
                        Editar
                    </button>
                    <button class="action-btn delete" onclick="eliminarEmpleado(${index})">
                        Eliminar
                    </button>
                </td>
            </tr>
        `;

    });
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

    window.location.replace("login.html");
}


function login() {

    let usuario = document.getElementById("usuario").value;
    let password = document.getElementById("password").value;

    if (usuario === "admin" && password === "1234") {

        localStorage.setItem("sesionActiva", "true");
        window.location.href = "./index.html";

    } else {
        document.getElementById("errorLogin").innerText = "Usuario o contraseña incorrectos";
    }
}
window.location.href = window.location.origin + "/Columbus-sistema/login.html";


