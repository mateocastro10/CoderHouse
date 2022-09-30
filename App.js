class Alumno{
    constructor (nombre, matematica, lengua, ingles, promedio){
        this.nombre = nombre;
        this.matematica = matematica;
        this.lengua = lengua;
        this.ingles = ingles;
        this.promedio = promedio;
    }
}


const alumnoForm = document.getElementById('alumno-form'); //captura el formulario
let alumnos = []; //declara arreglo de alumnos
alumnoForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const form = new FormData(alumnoForm); //representa con FormData el formulario de HTML y lo pasa a lenguaje JS
    let nombre = form.get('nombre'); //asigna el nombre que ingresamos
    if (form){
        pideMaterias(nombre, alumnoForm, alumnos);
    }
    else{
        alert('NUNCA ENTRA')
    }
});
console.log(alumnos);

function calculaPromedio(notam, notai, notal){
    return (notam+notai+notal)/3
}

const pideMaterias = (nombre, alumnoForm, alumnos) => {
    console.log(nombre);
    const divmaterias = document.createElement("div");
    divmaterias.innerHTML = `
        <div class="card text-center mb-4">
                <form id="notas-form" class="card-body">
                    <div class="form-group">
                        <input type="number" id="matematica" name="matematica" placeholder="Nota en matematica" class="form-control" min="0" max="10" >
                        <input type="number" id="lengua" name="lengua" placeholder="Nota en lengua" class="form-control" min="0" max="10" >
                        <input type="number" id="ingles" name="ingles" placeholder="Nota en ingles" class="form-control" min="0" max="10" >
                        </input>
                    </div>
                    <input type="submit" value="Cargar notas" class="btn btn-primary btn-block">
                </form>
        </div>
    `;
    alumnoForm.appendChild(divmaterias);

    const notasForm = document.getElementById('notas-form');

    if(notasForm){
        notasForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const form = new FormData(notasForm);
            const notam = parseInt(form.get('matematica'));
            const notal = parseInt(form.get('lengua'));
            const notai = parseInt(form.get('ingles'));
            let promedio = calculaPromedio(notam, notai, notal)
            let alumno = new Alumno(nombre,notam, notai, notal, promedio);
            alumnos.push(alumno);
            guardarAlumnoStorage(alumnos);
            muestra(alumnos);
            document.getElementById('alumno-form').reset()
            alumnoForm.removeChild(divmaterias);
        });
    }
}




const muestra = (alumnos) => {
    const alumnosList = document.getElementById("alumnos-list");
    const divalumnos = document.createElement("div");

   alumnosList.innerHTML = '';

    alumnos.forEach( alumno => {
        divalumnos.innerHTML += `
        <div class="card text-center mb-4">
            <div class="card-body">
                <strong>Nombre</strong>: ${alumno.nombre} -
                <strong>Promedio</strong>: ${alumno.promedio}
                <button href="#" class="btn btn-danger" id="${alumno.nombre}" name="delete" value="${alumno.nombre}">Delete</button>
            </div>
        </div>
        `;
        alumnosList.appendChild(divalumnos);
    });

    document.getElementById('alumno-form').reset();


    divalumnos.addEventListener('click', (e) => {
        borrarAlumno(e.target.value);
    });
};

const borrarAlumno = (x) => {
alumnos.forEach((alumno, index) => {
    if (alumno.nombre === x) {
        alumnos.splice(index, 1);
    }
});
muestra(alumnos);
guardarAlumnoStorage(alumnos);
};

const guardarAlumnoStorage = (alumnos) => {
    localStorage.setItem('alumno', JSON.stringify(alumnos));
}

const getAlumnosStorage = () => {
    const alumnosStorage = JSON.parse(localStorage.getItem('alumno'));
    return alumnosStorage;
};

document.addEventListener('DOMContentLoaded', () => {
    if (localStorage.getItem('alumno')){
        alumnos = getAlumnosStorage()
        muestra(alumnos);
    }
})
