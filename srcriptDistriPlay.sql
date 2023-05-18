CREATE TABLE "videojuego" (
	"id" serial NOT NULL UNIQUE,
	"nombre" varchar NOT NULL,
	"costo" integer NOT NULL,
	"imagen" varchar NOT NULL,
	"idioma" varchar NOT NULL,
	"productor" varchar NOT NULL,
	"genero" varchar NOT NULL,
	"clasificacion" varchar NOT NULL,
	"plataforma" varchar NOT NULL,
	CONSTRAINT "videojuego_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);

CREATE TABLE "compra" (
	"id" serial NOT NULL UNIQUE,
	"fecha" DATE NOT NULL,
	"estatus" varchar NOT NULL,
	"usuario" varchar NOT NULL,
	CONSTRAINT "compra_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);

CREATE TABLE "compra_videojuego" (
	"compra_videojuego" serial NOT NULL UNIQUE,
	"compra" integer NOT NULL,
	"juego" integer NOT NULL,
	CONSTRAINT "compra_videjuego_pk" PRIMARY KEY ("compra_videojuego")
) WITH (
  OIDS=FALSE
);

CREATE TABLE "usuario" (
	"usuario" varchar NOT NULL UNIQUE,
	"contraseña" varchar NOT NULL,
	CONSTRAINT "usuario_pk" PRIMARY KEY ("usuario")
) WITH (
  OIDS=FALSE
);

CREATE TABLE "cliente" (
	"cedula" varchar NOT NULL UNIQUE,
	"nombres" varchar NOT NULL,
	"apellidos" varchar NOT NULL,
	"usuario" varchar NOT NULL,
	"correo" varchar NOT NULL,
	"telefono" varchar NOT NULL,
	"pais" varchar NOT NULL,
	CONSTRAINT "cliente_pk" PRIMARY KEY ("cedula")
) WITH (
  OIDS=FALSE
);


ALTER TABLE "compra" ADD CONSTRAINT "usuario_compra_fk" FOREIGN KEY ("usuario") REFERENCES "usuario"("usuario");

ALTER TABLE "compra_videojuego" ADD CONSTRAINT "compra_fk" FOREIGN KEY ("compra") REFERENCES "compra"("id");
ALTER TABLE "compra_videojuego" ADD CONSTRAINT "juego_fk" FOREIGN KEY ("juego") REFERENCES "videojuego"("id");

ALTER TABLE "cliente" ADD CONSTRAINT "usuario_cliente_fk" FOREIGN KEY ("usuario") REFERENCES "usuario"("usuario");


INSERT INTO usuario VALUES
	 ('FelipeVel','admin'),
	 ('RubianoDaniel','admin'),
	 ('OlayaEsteban','admin'),
	 ('YaraCristhian','admin');

INSERT INTO cliente VALUES
	 ('12345','Felipe','Velandia','FelipeVel','felvel@gmail.com','12345','Colombia'),
	 ('23456','Daniel','Rubiano','RubianoDaniel','danrub@gmail.com','12345','EEUU'),
	 ('34567','Esteban','Olaya','OlayaEsteban','estola@gmail.com','12345','Inglaterra'),
	 ('45678','Cristhian','Yara','YaraCristhian','chryara@gmail.com','12345','Alemania');

INSERT INTO videojuego (nombre,costo,imagen,idioma,productor,genero,clasificacion,plataforma) VALUES
	 ('The Legend Of Zelda: Breath Of The Wild',190000,'https://www.elheraldo.co/sites/default/files/articulo/2017/12/08/botw-share_icon.jpg','Español, Inglés','Nintendo','Aventura','Todos','Nintendo Switch'),
	 ('Grand Theft Auto V',110000,'https://image.api.playstation.com/vulcan/ap/rnd/202202/2811/x9SuHZAiRn0uJXB1IKteIgcw.png','Español, Inglés','Rockstar Games','Acción','Maduro','PlayStation'),
	 ('Grand Theft Auto V',110000,'https://image.api.playstation.com/vulcan/ap/rnd/202202/2811/x9SuHZAiRn0uJXB1IKteIgcw.png','Español, Inglés','Rockstar Games','Acción','Maduro','Xbox'),
	 ('Grand Theft Auto V',110000,'https://image.api.playstation.com/vulcan/ap/rnd/202202/2811/x9SuHZAiRn0uJXB1IKteIgcw.png','Español, Inglés','Rockstar Games','Acción','Maduro','PC'),
	 ('The Elder Scrolls V: Skyrim',80000,'https://static.wikia.nocookie.net/elderscrolls/images/c/c5/Skyrim_Cover.png/revision/latest?cb=20160812173034','Español, Inglés','Bethesda','RPG','Maduro','PlayStation'),
	 ('The Elder Scrolls V: Skyrim',80000,'https://static.wikia.nocookie.net/elderscrolls/images/c/c5/Skyrim_Cover.png/revision/latest?cb=20160812173034','Español, Inglés','Bethesda','RPG','Maduro','Xbox'),
	 ('The Elder Scrolls V: Skyrim',80000,'https://static.wikia.nocookie.net/elderscrolls/images/c/c5/Skyrim_Cover.png/revision/latest?cb=20160812173034','Español, Inglés','Bethesda','RPG','Maduro','PC'),
	 ('Red Dead Redemption 2',90000,'https://image.api.playstation.com/cdn/UP1004/CUSA03041_00/Hpl5MtwQgOVF9vJqlfui6SDB5Jl4oBSq.png','Español, Inglés','Rockstar Games','Acción','Maduro','PlayStation'),
	 ('Red Dead Redemption 2',90000,'https://image.api.playstation.com/cdn/UP1004/CUSA03041_00/Hpl5MtwQgOVF9vJqlfui6SDB5Jl4oBSq.png','Español, Inglés','Rockstar Games','Acción','Maduro','Xbox'),
	 ('Red Dead Redemption 2',90000,'https://image.api.playstation.com/cdn/UP1004/CUSA03041_00/Hpl5MtwQgOVF9vJqlfui6SDB5Jl4oBSq.png','Español, Inglés','Rockstar Games','Acción','Maduro','PC');
INSERT INTO videojuego (nombre,costo,imagen,idioma,productor,genero,clasificacion,plataforma) VALUES
	 ('Minecraft',40000,'https://image.api.playstation.com/vulcan/img/cfn/11307uYG0CXzRuA9aryByTHYrQLFz-HVQ3VVl7aAysxK15HMpqjkAIcC_R5vdfZt52hAXQNHoYhSuoSq_46_MT_tDBcLu49I.png','Español, Inglés','Mojang','Sandbox','Todos','PlayStation'),
	 ('Minecraft',40000,'https://image.api.playstation.com/vulcan/img/cfn/11307uYG0CXzRuA9aryByTHYrQLFz-HVQ3VVl7aAysxK15HMpqjkAIcC_R5vdfZt52hAXQNHoYhSuoSq_46_MT_tDBcLu49I.png','Español, Inglés','Mojang','Sandbox','Todos','Xbox'),
	 ('Minecraft',40000,'https://image.api.playstation.com/vulcan/img/cfn/11307uYG0CXzRuA9aryByTHYrQLFz-HVQ3VVl7aAysxK15HMpqjkAIcC_R5vdfZt52hAXQNHoYhSuoSq_46_MT_tDBcLu49I.png','Español, Inglés','Mojang','Sandbox','Todos','PC'),
	 ('The Last Of Us',100000,'https://www.semana.com/resizer/eA9u4q1SEA5LHOiGFnylGQtNiOA=/arc-anglerfish-arc2-prod-semana/public/NZKBIQZAFFH7FPZGOILFPZJZGY.jpg','Español, Inglés','Naughty Dog','Acción','Maduro','PlayStation'),
	 ('The Witcher 3: Wild Hunt',60000,'https://media.vandal.net/t200/89975/the-witcher-3-wild-hunt-20231210553239_1.jpg','Español, Inglés','CD Projekt','RPG','Maduro','PlayStation'),
	 ('The Witcher 3: Wild Hunt',60000,'https://media.vandal.net/t200/89975/the-witcher-3-wild-hunt-20231210553239_1.jpg','Español, Inglés','CD Projekt','RPG','Maduro','Xbox'),
	 ('The Witcher 3: Wild Hunt',60000,'https://media.vandal.net/t200/89975/the-witcher-3-wild-hunt-20231210553239_1.jpg','Español, Inglés','CD Projekt','RPG','Maduro','PC'),
	 ('Final Fantasy VII',50000,'https://m.media-amazon.com/images/M/MV5BMGMxZDliYTktZTRmYy00MDc5LTk1YjMtMGY4NTM4ZDYzYmY2XkEyXkFqcGdeQXVyNzUzNTQ2MjQ@._V1_.jpg','Español, Inglés','Square Enix','RPG','Adolescentes','PlayStation'),
	 ('Halo Reach',30000,'https://assets-prd.ignimgs.com/2022/01/04/haloreach-1641338856260.jpg','Español, Inglés','Bungie','Shooter','Maduro','Xbox'),
	 ('Halo Reach',30000,'https://assets-prd.ignimgs.com/2022/01/04/haloreach-1641338856260.jpg','Español, Inglés','Bungie','Shooter','Maduro','PC');
INSERT INTO videojuego (nombre,costo,imagen,idioma,productor,genero,clasificacion,plataforma) VALUES
	 ('Portal 2',25000,'https://assets-prd.ignimgs.com/2021/12/08/portal2-1638924084230.jpg','Español, Inglés','Valve Corporation','Puzzle','Todos +10','PC'),
	 ('God Of War',70000,'https://cdn1.epicgames.com/offer/3ddd6a590da64e3686042d108968a6b2/EGS_GodofWar_SantaMonicaStudio_S2_1200x1600-fbdf3cbc2980749091d52751ffabb7b7_1200x1600-fbdf3cbc2980749091d52751ffabb7b7','Español, Inglés','Santa Monica','Acción','Maduro','PlayStation'),
	 ('God Of War',70000,'https://cdn1.epicgames.com/offer/3ddd6a590da64e3686042d108968a6b2/EGS_GodofWar_SantaMonicaStudio_S2_1200x1600-fbdf3cbc2980749091d52751ffabb7b7_1200x1600-fbdf3cbc2980749091d52751ffabb7b7','Español, Inglés','Santa Monica','Acción','Maduro','PC'),
	 ('BioShock Infinite',45000,'https://upload.wikimedia.org/wikipedia/en/a/a3/Official_cover_art_for_Bioshock_Infinite.jpg','Español, Inglés','2K Games','Shooter','Maduro','PlayStation'),
	 ('BioShock Infinite',45000,'https://upload.wikimedia.org/wikipedia/en/a/a3/Official_cover_art_for_Bioshock_Infinite.jpg','Español, Inglés','2K Games','Shooter','Maduro','Xbox'),
	 ('BioShock Infinite',45000,'https://upload.wikimedia.org/wikipedia/en/a/a3/Official_cover_art_for_Bioshock_Infinite.jpg','Español, Inglés','2K Games','Shooter','Maduro','PC'),
	 ('Resident Evil 4',60000,'https://img.youtube.com/vi/7RPSBeRIP6Y/maxresdefault.jpg','Español, Inglés','Capcom','Horror','Maduro','PlayStation'),
	 ('Resident Evil 4',60000,'https://img.youtube.com/vi/7RPSBeRIP6Y/maxresdefault.jpg','Español, Inglés','Capcom','Horror','Maduro','Xbox'),
	 ('Resident Evil 4',60000,'https://img.youtube.com/vi/7RPSBeRIP6Y/maxresdefault.jpg','Español, Inglés','Capcom','Horror','Maduro','PC'),
	 ('Fallout 4',35000,'https://image.api.playstation.com/vulcan/ap/rnd/202009/2500/4GZyUQ1bHTjICP6GCRG7f65n.png','Español, Inglés','Bethesda','Shooter','Maduro','PlayStation');
INSERT INTO videojuego (nombre,costo,imagen,idioma,productor,genero,clasificacion,plataforma) VALUES
	 ('Fallout 4',35000,'https://image.api.playstation.com/vulcan/ap/rnd/202009/2500/4GZyUQ1bHTjICP6GCRG7f65n.png','Español, Inglés','Bethesda','Shooter','Maduro','Xbox'),
	 ('Fallout 4',35000,'https://image.api.playstation.com/vulcan/ap/rnd/202009/2500/4GZyUQ1bHTjICP6GCRG7f65n.png','Español, Inglés','Bethesda','Shooter','Maduro','PC');

