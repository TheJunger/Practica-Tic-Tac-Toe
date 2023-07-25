# Tic Tac Toe (Ta Te Ti) - Readme

## Descripción

Tic Tac Toe (Ta Te Ti) es una versión virtual del clásico juego de tres en línea. 
<br>
El objetivo del juego es ser el primer jugador en colocar tres de sus símbolos consecutivos en línea, ya sea horizontal, vertical o diagonalmente. 
<br>
Este proyecto ha sido desarrollado utilizando tecnologías web como HTML, CSS y JavaScript.

## Características

- <b>Interfaz de usuario interactiva:</b> Los jugadores pueden hacer clic en las casillas para colocar su símbolo (cruz o círculo).
- <b>Juego contra la CPU:</b> El juego tiene una lógica de inteligencia artificial que permite jugar contra la CPU en el modo de un solo jugador.
- <b>Almacenamiento local:</b> Utiliza IndexedDB para guardar y mantener un registro de las victorias del jugador y de la CPU.
- <b>Diseño elegante y responsive:</b> La interfaz se adapta a diferentes tamaños de pantalla para una experiencia de usuario óptima.

## Instrucciones de uso

1. Para comenzar una partida, simplemente haz clic en una de las casillas disponibles en el tablero de juego.
2. El jugador y la CPU se turnarán para colocar sus símbolos en el tablero.
3. El juego continuará hasta que un jugador forme una línea de tres símbolos o hasta que se llene todo el tablero, en cuyo caso se declarará empate.
4. Para reiniciar el juego, haz clic en el botón <b>"Play Again"</b> que aparecerá cuando haya un ganador o se produzca un empate.

## Tecnologías utilizadas

- <b>HTML5:</b> Para la estructura del juego.
- <b>CSS3:</b> Para el diseño y estilo de la interfaz de usuario.
- <b>JavaScript:</b> Para la lógica del juego y la interactividad con el usuario.
- <b>IndexedDB:</b> Para almacenar localmente las victorias del jugador y de la CPU.

## ¿Cómo funciona la CPU?

La CPU utiliza una estrategia básica de inteligencia artificial para tomar decisiones durante el juego. En cada turno, la CPU selecciona aleatoriamente una de las casillas disponibles. Si no encuentra una casilla disponible, intentará nuevamente hasta que se complete el tablero o se encuentre una casilla libre.
