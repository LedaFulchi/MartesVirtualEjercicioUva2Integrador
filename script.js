document.addEventListener('DOMContentLoaded', function() {
    const lightModeBtn = document.getElementById('lightModeBtn');
    const darkModeBtn = document.getElementById('darkModeBtn');
    const body = document.body;
    const header = document.querySelector('header');
    
    // EXCLUIMOS 'a' (enlaces) y 'th' de textElements para manejarlos por separado
    const textElements = document.querySelectorAll('h1, h2, h3, h4, h5, h6, p, td, label, li, span, strong'); // 'th' fue removido
    
    // Seleccionamos todos los enlaces
    const allLinks = document.querySelectorAll('a'); 

    // Seleccionamos todos los th (encabezados de tabla)
    const tableHeaders = document.querySelectorAll('th'); // Nueva constante para th

    const navLinks = document.querySelectorAll('.nav-pills .nav-link');
    
    const mainContainers = document.querySelectorAll('.contenedor-principal, .caja-contenedor, .columna-derecha, .contenedor-inferior, .sobremi, .additional-info, .tabla-materias'); // Agregado .tabla-materias aquí para el fondo

    const elementsWithShadow = document.querySelectorAll('.titulo-home, .titulo-avisos, .home-presentacion, table, .titulo-sobremi, .sobremi, .profile-image, .titulo-materias2025, .caja-contenedor, .contenedor-inferior, .titulo-diseñoweb, .uva, .titulo-contacto');

    // Función para aplicar el modo oscuro
    function applyDarkMode() {
        body.style.backgroundColor = 'black';
        header.style.backgroundColor = 'black';
        
        textElements.forEach(element => {
            element.style.color = 'white';
        });

        allLinks.forEach(link => {
            link.style.color = '#87CEEB'; // Un celeste claro para los enlaces en modo oscuro
        });

        tableHeaders.forEach(th => { // Los th en modo oscuro también serán blancos
            th.style.color = 'white';
        });

        navLinks.forEach(link => {
            if (link.classList.contains('active')) {
                link.style.backgroundColor = 'white';
                link.style.color = 'black';
            } else {
                link.style.backgroundColor = ''; 
                link.style.color = 'white';
            }
        });
        
        mainContainers.forEach(container => {
            container.style.backgroundColor = '#333'; 
            container.style.color = 'white'; 
        });

        elementsWithShadow.forEach(element => {
            const computedStyle = getComputedStyle(element);
            const boxShadowValue = computedStyle.boxShadow;
            if (boxShadowValue && boxShadowValue !== 'none') {
                const shadowParts = boxShadowValue.split(' ');
                const hasColor = shadowParts.length > 3;
                const newShadow = hasColor
                    ? `${shadowParts[0]} ${shadowParts[1]} ${shadowParts[2]} ${shadowParts.slice(3, -1).join(' ')} white`
                    : `${shadowParts[0]} ${shadowParts[1]} ${shadowParts[2]} white`;
                element.style.boxShadow = newShadow;
            }
        });
        localStorage.setItem('theme', 'dark');
    }

    // Función para aplicar el modo claro
    function applyLightMode() {
        body.style.backgroundColor = 'rgb(255, 255, 255)';
        header.style.backgroundColor = 'rgb(28, 51, 63)';
        
        textElements.forEach(element => {
            element.style.color = 'black';
        });

        allLinks.forEach(link => {
            link.style.color = ''; 
        });

        //  hace que los th sean blancos en modo claro
        tableHeaders.forEach(th => {
            th.style.color = 'white'; // Aseguro texto blanco para los th en modo claro
        });

        navLinks.forEach(link => {
            if (link.classList.contains('active')) {
                link.style.backgroundColor = 'black';
                link.style.color = 'white';
            } else {
                link.style.backgroundColor = '';
                link.style.color = 'white';
            }
        });

        mainContainers.forEach(container => {
            container.style.backgroundColor = ''; 
            container.style.color = ''; 
        });

        elementsWithShadow.forEach(element => {
            const computedStyle = getComputedStyle(element);
            const boxShadowValue = computedStyle.boxShadow;
            if (boxShadowValue && boxShadowValue.includes('white')) {
                const shadowParts = boxShadowValue.split(' ');
                const newShadow = `${shadowParts[0]} ${shadowParts[1]} ${shadowParts[2]} ${shadowParts.slice(3, -1).join(' ')} rgb(0, 40, 60)`;
                element.style.boxShadow = newShadow;
            }
        });
        localStorage.setItem('theme', 'light');
    }

    // Comprobar el tema guardado al cargar la página
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        applyDarkMode();
    } else {
        applyLightMode();
    }

    // Event listeners para los botones de dark y light
    lightModeBtn.addEventListener('click', applyLightMode);
    darkModeBtn.addEventListener('click', applyDarkMode);
});

//  función validarContacto() 
function validarContacto() {
    const nombreApellidoInput = document.getElementById('nombreApellido');
    const nombreApellido = nombreApellidoInput.value.trim();
    const correoElectronicoInput = document.getElementById('correoElectronico');
    const correoElectronico = correoElectronicoInput.value.trim();
    const telefonoInput = document.getElementById('telefono');
    const telefono = telefonoInput.value.trim();
    const asuntoInput = document.getElementById('asunto');
    const asunto = asuntoInput.value.trim();
    const mensajeInput = document.getElementById('mensaje');
    const mensaje = mensajeInput.value.trim();
    const errorMessages = [];

    if (nombreApellido === '') {
        errorMessages.push('Por favor, ingrese su Nombre y Apellido.');
    } else if (!/\S/.test(nombreApellido)) {
        errorMessages.push('Por favor, ingrese algún carácter en Nombre y Apellido.');
    }

    if (correoElectronico === '') {
        errorMessages.push('Por favor, ingrese su Correo Electrónico.');
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correoElectronico)) {
        errorMessages.push('Por favor, ingrese un Correo Electrónico válido.');
    }

    if (telefono === '') {
        errorMessages.push('Por favor, ingrese su Teléfono.');
    } else if (!/^\d{7,}$/.test(telefono)) {
        errorMessages.push('Por favor, ingrese un Teléfono válido (mínimo 7 dígitos numéricos).');
    }

    if (asunto === '') {
        errorMessages.push('Por favor, ingrese el Asunto.');
    } else if (!/\S/.test(asunto)) {
        errorMessages.push('Por favor, ingrese algún carácter en el Asunto.');
    }

    if (mensaje === '') {
        errorMessages.push('Por favor, ingrese su Mensaje.');
    } else if (!/\S/.test(mensaje)) {
        errorMessages.push('Por favor, ingrese algún carácter en el Mensaje.');
    }

    if (errorMessages.length > 0) {
        alert('Por favor, corrija los siguientes errores:\n\n' + errorMessages.join('\n'));
        return false;
    } else {
        alert(`Gracias por contactarme ${nombreApellido}. En breve le estaré respondiendo al mail ${correoElectronico} o a su ${telefono}`);

        document.getElementById('nombreApellido').value = '';
        document.getElementById('correoElectronico').value = '';
        document.getElementById('telefono').value = '';
        document.getElementById('asunto').value = '';
        document.getElementById('mensaje').value = '';

        return false;
    }
}
