var tablero;
var direccion;

var teclas =
{
	UP: 38,
	DOWN: 40,
	LEFT: 37,
	RIGHT: 39
};

var fondo = 
{
	imagenURL: "fondo.png",
	imagenOK: false
};

var snake =
{
	x: 100,
	y: 100,
	imagenURL: "snake.png",
	imagenOK: false,
	velocidad: 50
};

/*var comida =
{
	x: 0,
	y: 0,
	imagenURL: "comida.png",
	imagenOK: false
};*/


function inicio()
{
	var canvas = document.getElementById("campoJuego");
	tablero = canvas.getContext("2d");
	
	//---------Cargando el fondo negro-------------
	fondo.imagen = new Image();
	fondo.imagen.src = fondo.imagenURL;
	fondo.imagen.onload = confirmarFondo;

	//---------Cargando el snake-------------------
	snake.imagen = new Image();
	snake.imagen.src = snake.imagenURL;
	snake.imagen.onload = confirmarSnake;

	//--------Cargando comida del Snake
	/*comida.imagen = new Image();
	comida.imagen.src = comida.imagenURL;
	snake.imagen.onload = confirmarComida;*/

	//Al momento de presionar una tecla se dispara la función llamada teclado()
	//con el argumento keydown que son los datos que representa a la tecla oprimida
	direccion = teclas.LEFT;
	moverSnake();
}

//Se obtienen los datos de la tecla presionada
function teclado(datos)
{
	//Se guarda en "codigo" el número que representa a la tecla oprimida
	var codigo = datos.keyCode;

	if( codigo == teclas.UP )
	{
		snake.y -= snake.velocidad;
	}
	if( codigo == teclas.DOWN )
	{
		snake.y += snake.velocidad;
	}
	if( codigo == teclas.LEFT )
	{
		snake.x -= snake.velocidad;
	}
	if( codigo == teclas.RIGHT )
	{
		snake.x += snake.velocidad;
	}

	dibujar();
}


function moverSnake()
{
	var x = 1;
	do
	{
		
		document.addEventListener( "keydown", teclado );
		console.log(direccion);
		teclado(direccion);
		x++;

	} while ( x <= 10 );
}

function dibujar()
{
	
	//Dibujamos primero el fondo negro
	if( fondo.imagenOK == true )
	{
		tablero.drawImage( fondo.imagen, 0, 0 );
	}

	//Luego seguimos con el snake
	if( snake.imagenOK == true )
	{
		tablero.drawImage( snake.imagen, snake.x, snake.y );
	}

	/*
	if( comida.imagenOK == true )
	{
		tablero.drawImage( comida.imagen, comida.x,  comida.y );
	}*/
}

function confirmarFondo()
{
	fondo.imagenOK = true;
	dibujar();
}

function confirmarSnake()
{
	snake.imagenOK = true;
	dibujar();
}

/*function confirmarComida()
{
	comida.imagenOK = true;
	dibujar();
}*/