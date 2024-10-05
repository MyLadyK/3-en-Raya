//  reiniciar partida
    //  casillas clicables
    //  aparezca X o O
    //  primer jugador O, segundo jugador X
    //  cambio jugador
    //  evitar que las casillas se puedan volver a clickar
    //  determinar si alguien gana
    //  fin de la partida
    //  mostrar ganador
    // Declarar contador de jugadas, si es mayor o igual a 5 verificar victoria
    // Declarar array de jugador 1 y 2 para guardar casillas jugadas
    // comparar de cada array de jugador si tiene una combinación ganadora de la variable combinacionesGanadoras 


window.addEventListener('DOMContentLoaded', function () {

    let casillas = [...document.getElementsByClassName('casilla')];
    const btnReiniciar = document.getElementById('reiniciar');
    const mensaje = document.getElementById('mensaje');
    const combinacionesGanadoras = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];

    let turno = 'O';  // Comienza jugador O
    let jugadas = 0;  // Contador de jugadas
    let jugador1 = [];  // Casillas del jugador O
    let jugador2 = [];  // Casillas del jugador X
    let juegoTerminado = false;  // Controla si el juego terminó

    function iniciar() {
        casillas.forEach((casilla, indice) => {
            casilla.innerHTML = '';
            casilla.addEventListener('click', () => agregarSimbolo(indice), { once: true });
        });
        mensaje.innerHTML = '';
        turno = 'O';
        jugadas = 0;
        jugador1 = [];
        jugador2 = [];
        juegoTerminado = false;
    }

    function agregarSimbolo(indice) {
        if (juegoTerminado) return;

        casillas[indice].innerHTML = turno;
        if (turno === 'O') {
            jugador1.push(indice);
        } else {
            jugador2.push(indice);
        }
        jugadas++;

        if (jugadas >= 5 && verificarVictoria()) {
            mensaje.innerHTML = `¡Ganador: Jugador ${turno}!`;
            juegoTerminado = true;
            return;
        } else if (jugadas === 9) {
            mensaje.innerHTML = "¡Empate!";
            juegoTerminado = true;
            return;
        }

        cambiarTurno();
    }

    function cambiarTurno() {
        turno = turno === 'O' ? 'X' : 'O';
    }

    function verificarVictoria() {
        let jugadorActual = turno === 'O' ? jugador1 : jugador2;

        return combinacionesGanadoras.some(combinacion => 
            combinacion.every(casilla => jugadorActual.includes(casilla))
        );
    }

    btnReiniciar.addEventListener('click', iniciar);

    iniciar();
});
