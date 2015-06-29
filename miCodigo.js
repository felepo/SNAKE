var tablero;
var direccion;
var tiempo = 0;

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
[
	{
	    x: 100,
	    y: 100,
	    imagenURL: "snake.png",
	    imagenOK: false,
	    velocidad: 40
   }
];

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
	 snake[0].imagen = new Image();
    snake[0].imagen.src = snake[0].imagenURL;
    snake[0].imagen.onload = confirmarSnake;

	//--------Cargando comida del Snake
	/*comida.imagen = new Image();
	comida.imagen.src = comida.imagenURL;
	snake.imagen.onload = confirmarComida;*/

	//Al momento de presionar una tecla se dispara la función llamada teclado()
	//con el argumento keydown que son los datos que representa a la tecla oprimida
	//direccion = teclas.RIGHT;
	direccionSnake();
}

//Se obtienen los datos de la tecla presionada
function teclado(dir)
{
	//Se guarda en "codigo" el número que representa a la tecla oprimida
	//var codigo = datos.keyCode;
	//tiempo = tiempo + 1;

	//console.log(tiempo);

	var codigo = dir;

	if( codigo == teclas.UP )
	{
		
		for(var i = snake.length - 1; i > 0; i--)
		{
	   	snake[i].y = snake[i-1].y;
	      snake[i].x = snake[i-1].x;
      }

		snake[0].y -= snake[0].velocidad;

		if( snake[0].y < 0 )
		{
			snake[0].y = 500;
		}
	}

	if( codigo == teclas.DOWN )
	{
		for(var i = snake.length - 1; i > 0; i--)
		{
	   	snake[i].y = snake[i-1].y;
	   	snake[i].x = snake[i-1].x;
	   }

		snake[0].y += snake[0].velocidad;

		if( snake[0].y > 500 )
		{
			snake[0].y = 0;
		}
	}

	if( codigo == teclas.LEFT )
	{
		for(var i = snake.length - 1; i > 0; i--)
		{
	   	snake[i].x = snake[i-1].x;
	   	snake[i].y = snake[i-1].y;
      }

		snake[0].x -= snake[0].velocidad;
		
		if( snake[0].x < 0 )
		{
			snake[0].x = 500;
		}
	}

	if( codigo == teclas.RIGHT )
	{
		for(var i = snake.length - 1; i > 0; i--)
		{
	   	snake[i].x = snake[i-1].x;
	   	snake[i].y = snake[i-1].y;
      }

		snake[0].x += snake[0].velocidad;
		
		if( snake[0].x > 500 )
		{
			snake[0].x = 0;
		}
	}

	//Crecer el cuerpo con la tecla n
	if(codigo == 78)
	{
	    var previous = snake.length - 1;
	    
	    snake.push(
	    {
	    	x: snake[previous].x - 40,
	    	y: snake[previous].y,
       });
	}

	dibujar();
}


function direccionSnake()
{
	setInterval( 
		function()
		{
			document.addEventListener("keydown", 
				function(datos)
				{
					if( (datos.keyCode == teclas.UP) || (datos.keyCode == teclas.DOWN) || 
						 (datos.keyCode == teclas.LEFT) || (datos.keyCode == teclas.RIGHT) ||
						 (datos.keyCode == 78) )
					{
						direccion = datos.keyCode;
					}
				});

			teclado( direccion );
		}
		, 500 );
}

function moverSnake()
{   
     
/*

     setInterval( function()
    					{
    						teclado(direccion)

    					}, 1000);
*/
}


function dibujar()
{
	
	//Dibujamos primero el fondo negro
	if( fondo.imagenOK == true )
	{
		tablero.drawImage( fondo.imagen, 0, 0 );
	}

	//Luego seguimos con el snake
	/*if( snake.imagenOK == true )
	{
		tablero.drawImage( snake.imagen, snake.x, snake.y );
	}
	*/

	for(var i in snake)
	{
		if( snake[0].imagenOK == true )
	   {
			tablero.drawImage( snake[0].imagen, snake[i].x, snake[i].y );
		}
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
	snake[0].imagenOK = true;
	dibujar();
}

/*function confirmarComida()
{
	comida.imagenOK = true;
	dibujar();
}*/
