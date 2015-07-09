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
	    x: 120,
	    y: 120,
	    imagenURL: "snake.png",
	    imagenOK: false,
	    velocidad: 40
   }
];

var comida =
{
	x: 0,
	y: 0,
	imagenURL: "comida.png",
	imagenOK: false
};

//-----------------------------INICIO DE LA FUNCION INICIAL-----------------------------
function inicio()
{
	var canvas = document.getElementById("campoJuego");
	tablero = canvas.getContext("2d");
	
	//Cargando el fondo negro
	fondo.imagen = new Image();
	fondo.imagen.src = fondo.imagenURL;
	fondo.imagen.onload = confirmarFondo;

	//Cargando el snake
	snake[0].imagen = new Image();
   snake[0].imagen.src = snake[0].imagenURL;
   snake[0].imagen.onload = confirmarSnake;

	//Cargando comida del Snake
	comida.imagen = new Image();
	comida.imagen.src = comida.imagenURL;
	comida.imagen.onload = confirmarComida;

	//direccion = teclas.RIGHT;
	direccionSnake();
	direccionComida();
}
//-------------------------------FIN DE LA FUNCION INICIAL------------------------------


//-----------------------------INICIO DE LA FUNCION TECLADO-----------------------------
function teclado(dir)
{
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
			snake[0].y = 440;
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

		if( snake[0].y > 440 )
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
			snake[0].x = 440;
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
		
		if( snake[0].x > 440 )
		{
			snake[0].x = 0;
		}
	}

	//Crecer el cuerpo al coincidir su posicion con la de la comida
	if( (snake[0].x == comida.x) && (snake[0].y == comida.y) )
	{
	    var previous = snake.length - 1;
	    
	    snake.push(
	    {
	    	x: snake[previous].x,
	    	y: snake[previous].y,
       });

       direccionComida();
	}

	for( var x in snake )
	{
		
		if( x != 0 && x != 1 )
		{
			if( (snake[0].x == snake[x].x) && (snake[0].y == snake[x].y) )
			{
				alert( "JUEGO TERMINADO" );
			}
		}
	}

	dibujar();
}
//-------------------------------FIN DE LA FUNCION INICIAL------------------------------


//-----------------------INICIO DE LA FUNCION DIRECCION SNAKE---------------------------
function direccionSnake()
{
	setInterval( 
		function()
		{
			document.addEventListener("keydown", 
				function(datos)
				{
					//Filtramos el codigo de la tecla para que sea una tecla valida
					if( (datos.keyCode == teclas.UP) || (datos.keyCode == teclas.DOWN) || 
						 (datos.keyCode == teclas.LEFT) || (datos.keyCode == teclas.RIGHT) )
					{
						//Luego de filtrar teclas validas, filtramos movimientos validos
						if( datos.keyCode == teclas.UP )
						{
							if( direccion != teclas.DOWN )
							{
								direccion = datos.keyCode;
							}
						}

						if( datos.keyCode == teclas.DOWN )
						{
							if( direccion != teclas.UP )
							{
								direccion = datos.keyCode;
							}
						}

						if( datos.keyCode == teclas.LEFT )
						{
							if( direccion != teclas.RIGHT )
							{
								direccion = datos.keyCode;
							}
						}

						if( datos.keyCode == teclas.RIGHT )
						{
							if( direccion != teclas.LEFT )
							{
								direccion = datos.keyCode;
							}
						}
					}
				});

			teclado( direccion );
		}
		, 200 );
}
//--------------------------FIN DE LA FUNCION DIRECCION SNAKE---------------------------

//------------------------INICIO DE LA FUNCION DIRECCION COMIDA-------------------------
function direccionComida()
{
	comida.x = obtenerPosicion();
	comida.y = obtenerPosicion();

	var i = 0;

	//Con esto se evita colocar la comida en una posicion donde el snake este ocupando
	while( i < snake.length )
	{
		if( (comida.x == snake[i].x) && (comida.y == snake[i].y) )
		{
			comida.x = obtenerPosicion();
			comida.y = obtenerPosicion();
			i = 0;
		}
		else
		{
			i++;
		}
	}

	dibujar();
}
//--------------------------FIN DE LA FUNCION DIRECCION COMIDA--------------------------

//Funcion para crear numeros aleatorios para el posicionamiento
function obtenerPosicion()
{
	var posibilidades = 11;
	var ran = Math.random() * posibilidades;
	ran = Math.round( ran );

	var posicion = ran * 40;

	return posicion;
}

//------------------------------INICIO DE LA FUNCION DIBUJAR----------------------------
function dibujar()
{
	
	//Dibujamos primero el fondo negro
	if( fondo.imagenOK == true )
	{
		tablero.drawImage( fondo.imagen, 0, 0 );
	}

	//Luego seguimos con el snake
	for(var i in snake)
	{
		if( snake[0].imagenOK == true )
	   {
			tablero.drawImage( snake[0].imagen, snake[i].x, snake[i].y );
		}
	}

	// Despues con la comida
	if( comida.imagenOK == true )
	{
		tablero.drawImage( comida.imagen, comida.x,  comida.y );
	}
}
//--------------------------------FIN DE LA FUNCION DIBUJAR-----------------------------


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

function confirmarComida()
{
	comida.imagenOK = true;
	dibujar();
}