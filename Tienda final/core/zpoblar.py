import sqlite3
from django.contrib.auth.models import User, Permission
from django.db import connection
from datetime import date, timedelta
from random import randint
from core.models import Categoria, Producto, Carrito, Perfil, Boleta, DetalleBoleta, Bodega

def eliminar_tabla(nombre_tabla):
    conexion = sqlite3.connect('db.sqlite3')
    cursor = conexion.cursor()
    cursor.execute(f"DELETE FROM {nombre_tabla}")
    conexion.commit()
    conexion.close()

def exec_sql(query):
    with connection.cursor() as cursor:
        cursor.execute(query)

def crear_usuario(username, tipo, nombre, apellido, correo, es_superusuario, 
    es_staff, rut, direccion, subscrito, imagen):

    try:
        print(f'Verificar si existe usuario {username}.')

        if User.objects.filter(username=username).exists():
            print(f'   Eliminar {username}')
            User.objects.get(username=username).delete()
            print(f'   Eliminado {username}')
        
        print(f'Iniciando creación de usuario {username}.')

        usuario = None
        if tipo == 'Superusuario':
            print('    Crear Superuser')
            usuario = User.objects.create_superuser(username=username, password='123')
        else:
            print('    Crear User')
            usuario = User.objects.create_user(username=username, password='123')

        if tipo == 'Administrador':
            print('    Es administrador')
            usuario.is_staff = es_staff
            
        usuario.first_name = nombre
        usuario.last_name = apellido
        usuario.email = correo
        usuario.save()

        if tipo == 'Administrador':
            print(f'    Dar permisos a core y apirest')
            permisos = Permission.objects.filter(content_type__app_label__in=['core', 'apirest'])
            usuario.user_permissions.set(permisos)
            usuario.save()
 
        print(f'    Crear perfil: RUT {rut}, Subscrito {subscrito}, Imagen {imagen}')
        Perfil.objects.create(
            usuario=usuario, 
            tipo_usuario=tipo,
            rut=rut,
            direccion=direccion,
            subscrito=subscrito,
            imagen=imagen)
        print("    Creado correctamente")
    except Exception as err:
        print(f"    Error: {err}")

def eliminar_tablas():
    eliminar_tabla('auth_user_groups')
    eliminar_tabla('auth_user_user_permissions')
    eliminar_tabla('auth_group_permissions')
    eliminar_tabla('auth_group')
    eliminar_tabla('auth_permission')
    eliminar_tabla('django_admin_log')
    eliminar_tabla('django_content_type')
    #eliminar_tabla('django_migrations')
    eliminar_tabla('django_session')
    eliminar_tabla('Bodega')
    eliminar_tabla('DetalleBoleta')
    eliminar_tabla('Boleta')
    eliminar_tabla('Perfil')
    eliminar_tabla('Carrito')
    eliminar_tabla('Producto')
    eliminar_tabla('Categoria')
    #eliminar_tabla('authtoken_token')
    eliminar_tabla('auth_user')

def poblar_bd(test_user_email=''):
    eliminar_tablas()

    crear_usuario(
        username='hcavill',
        tipo='Cliente', 
        nombre='Henry', 
        apellido='Cavill', 
        correo=test_user_email if test_user_email else 'hcavill@justice.com', 
        es_superusuario=False, 
        es_staff=False, 
        rut='25.747.200-0',	
        direccion='123 Main Street, Los Angeles, \nCalifornia 90001 \nEstados Unidos', 
        subscrito=True, 
        imagen='perfiles/hcavill.jpg')

    crear_usuario(
        username='nnimri',
        tipo='Cliente', 
        nombre='Najwa', 
        apellido='Nimri', 
        correo=test_user_email if test_user_email else 'nnimri@casade.com', 
        es_superusuario=False, 
        es_staff=False, 
        rut='12.202.357-5', 
        direccion='Albert Street, New York, \nNew York 10001 \nEstados Unidos', 
        subscrito=True, 
        imagen='perfiles/nnimri.jpg')

    crear_usuario(
        username='rwilliams',
        tipo='Cliente', 
        nombre='Robin', 
        apellido='Williams', 
        correo=test_user_email if test_user_email else 'rwilliams@diem.com', 
        es_superusuario=False, 
        es_staff=False, 
        rut='11.991.600-3', 
        direccion='105 Apple Park Way, \nCupertino, CA 95014 \nEstados Unidos', 
        subscrito=False, 
        imagen='perfiles/rwilliams.jpg')

    crear_usuario(
        username='ceastwood',
        tipo='Cliente', 
        nombre='Clint', 
        apellido='Eastwood', 
        correo=test_user_email if test_user_email else 'ceastwood@west.com', 
        es_superusuario=False, 
        es_staff=False, 
        rut='16.469.725-8', 
        direccion='350 5th Ave, \nNew York, NY 10118 \nEstados Unidos', 
        subscrito=False, 
        imagen='perfiles/ceastwood.jpg')

    crear_usuario(
        username='hbonham',
        tipo='Administrador', 
        nombre='Helena', 
        apellido='Bonham Carter', 
        correo=test_user_email if test_user_email else 'hbonham@kedabra.com', 
        es_superusuario=False, 
        es_staff=True, 
        rut='19.441.980-5', 
        direccion='10 Pine Road, Miami, \nFlorida 33101 \nEstados Unidos', 
        subscrito=False, 
        imagen='perfiles/hbonham.jpg')
    
    crear_usuario(
        username='jdepp',
        tipo='Administrador', 
        nombre='Johnny', 
        apellido='Depp', 
        correo=test_user_email if test_user_email else 'johdepp@sauvage.com', 
        es_superusuario=False, 
        es_staff=True, 
        rut='21.708.052-5', 
        direccion='1600 Pennsylvania Avenue NW, \nWashington, D.C. \nEstados Unidos', 
        subscrito=False, 
        imagen='perfiles/jdepp.jpg')

    crear_usuario(
        username='super',
        tipo='Superusuario',
        nombre='Guppy',
        apellido='Goldberg',
        correo=test_user_email if test_user_email else 'gupgoldberg@rita.com',
        es_superusuario=True,
        es_staff=True,
        rut='13.029.317-4',
        direccion='15 Oak Street, Los Angeles, \nCalifornia 90001 \nEstados Unidos',
        subscrito=False,
        imagen='perfiles/ggoldberg.jpg')
        
    
    categorias_data = [
        { 'id': 1, 'nombre': 'Acción'},
        { 'id': 2, 'nombre': 'Aventura'},
        { 'id': 3, 'nombre': 'Estrategia'},
        { 'id': 4, 'nombre': 'RPG'},
    ]

    print('Crear categorías')
    for categoria in categorias_data:
        Categoria.objects.create(**categoria)
    print('Categorías creadas correctamente')

    productos_data = [
        # Categoría "Acción" (8 juegos)
        {
            'id': 1,
            'categoria': Categoria.objects.get(id=1),
            'nombre': 'Grand Theft Auto V',
            'descripcion': 'Grand Theft Auto V sigue las historias interconectadas de tres criminales en la ciudad ficticia de Los Santos, ofreciendo una mezcla de misiones principales y actividades secundarias en un vasto mundo abierto. La jugabilidad incluye robos, combates, conducción, y una gran variedad de actividades mientras se explora una representación satírica de la vida moderna.',
            'precio': 27000,
            'descuento_subscriptor': 5,
            'descuento_oferta': 15,
            'imagen': 'productos/000001.jpg'
        },
        {
            'id': 2,
            'categoria': Categoria.objects.get(id=1),
            'nombre': 'Red Dead Redemption 2',
            'descripcion': 'Red Dead Redemption 2 es un juego de acción y aventura ambientado en el Salvaje Oeste estadounidense a fines del siglo XIX. El jugador controla a Arthur Morgan, un forajido y miembro de la banda de Van der Linde, mientras atraviesa un mundo abierto vasto y detallado. La historia se centra en el honor, la moralidad y la supervivencia en un período de cambio drástico en la historia de Estados Unidos.',
            'precio': 38000,
            'descuento_subscriptor': 5,
            'descuento_oferta': 10,
            'imagen': 'productos/000002.j'
        },
        {
            'id': 3,
            'categoria': Categoria.objects.get(id=1),
            'nombre': 'Call of Duty: Modern Warfare',
            'descripcion': 'Call of Duty: Modern Warfare es un shooter en primera persona que se centra en operaciones militares modernas. El juego presenta una campaña intensa y cinematográfica que sigue a un equipo de operadores especiales en misiones globales para detener una amenaza terrorista. Además, ofrece un robusto modo multijugador competitivo y cooperativo, con armamento moderno y mecánicas de juego tácticas.',
            'precio': 47000,
            'descuento_subscriptor': 5,
            'descuento_oferta': 0,
            'imagen': 'productos/000003.jpg'
        },
        {
            'id': 4,
            'categoria': Categoria.objects.get(id=1),
            'nombre': 'Warhammer 40K Boltgun',
            'descripcion': 'Warhammer 40,000: Boltgun es un shooter en primera persona que combina la acción frenética de los juegos retro con el universo oscuro y futurista de Warhammer 40K, donde los jugadores asumen el rol de un Marine Espacial enfrentándose a hordas de enemigos con un arsenal de armas poderosas. La jugabilidad se centra en el combate rápido y estratégico en un entorno de ciencia ficción gótica.',
            'precio': 10000,
            'descuento_subscriptor': 5,
            'descuento_oferta': 5,
            'imagen': 'productos/000004.jpg'
        },
        {
            'id': 4,
            'categoria': Categoria.objects.get(id=1),
            'nombre': 'Warhammer 40K Boltgun',
            'descripcion': 'Warhammer 40,000: Boltgun es un shooter en primera persona que combina la acción frenética de los juegos retro con el universo oscuro y futurista de Warhammer 40K, donde los jugadores asumen el rol de un Marine Espacial enfrentándose a hordas de enemigos con un arsenal de armas poderosas. La jugabilidad se centra en el combate rápido y estratégico en un entorno de ciencia ficción gótica.',
            'precio': 10000,
            'descuento_subscriptor': 5,
            'descuento_oferta': 5,
            'imagen': 'productos/000004.jpg'
        },
        {
            'id': 6,
            'categoria': Categoria.objects.get(id=1),
            'nombre': 'God of War',
            'descripcion': 'God of War reinventa la serie al llevar a Kratos, un antiguo dios de la guerra, a tierras nórdicas junto a su hijo Atreus. La historia sigue su viaje para esparcir las cenizas de la difunta madre de Atreus en la cima de una montaña. Con un combate brutal y uso estratégico de habilidades místicas, el juego explora temas de redención y paternidad en un mundo mitológico impresionante.',
            'precio': 35000,
            'descuento_subscriptor': 5,
            'descuento_oferta': 10,
            'imagen': 'productos/000006.jpg'
        },
        {
            'id': 7,
            'categoria': Categoria.objects.get(id=1),
            'nombre': 'Horizon Zero Dawn',
            'descripcion': 'Horizon Zero Dawn: Juego de acción y aventura en un mundo post-apocalíptico dominado por máquinas animales. Controlas a Aloy, una cazadora que busca descubrir su pasado y los secretos de las antiguas tecnologías mientras explora un vasto mundo abierto lleno de ruinas y paisajes impresionantes.',
            'precio': 69990,
            'descuento_subscriptor': 5,
            'descuento_oferta': 0,
            'imagen': 'productos/000007.jpg'
        },
        {
            'id': 8,
            'categoria': Categoria.objects.get(id=1),
            'nombre': 'Far Cry 6',
            'descripcion': 'Far Cry 6: Juego de acción en primera persona ambientado en Yara, una isla ficticia del Caribe controlada por un dictador. Los jugadores asumen el papel de Dani Rojas, un guerrillero que lidera una rebelión para liberar a Yara.',
            'precio': 49990,
            'descuento_subscriptor': 5,
            'descuento_oferta': 15,
            'imagen': 'productos/000008.jpg'
        },
        # Categoría "Aventura" (4 juegos)
        {
            'id': 9,
            'categoria': Categoria.objects.get(id=2),
            'nombre': 'The Legend of Zelda: Breath of the Wild',
            'descripcion': 'The Legend of Zelda: Breath of the Wild es un videojuego de acción-aventura desarrollado y publicado por Nintendo para las consolas Nintendo Switch y Wii U. El juego es la decimonovena entrega de la serie The Legend of Zelda y fue lanzado mundialmente en marzo de 2017. Breath of the Wild es un juego de mundo abierto que permite a los jugadores explorar libremente el reino de Hyrule.',
            'precio': 59990,
            'descuento_subscriptor': 5,
            'descuento_oferta': 0,
            'imagen': 'productos/000009.jpg'
        },
        {
            'id': 10,
            'categoria': Categoria.objects.get(id=2),
            'nombre': 'Super Mario Odyssey',
            'descripcion': 'Super Mario Odyssey es un juego de plataformas y aventuras donde Mario emprende un viaje a través de diferentes reinos para rescatar a la Princesa Peach de Bowser. Con la ayuda de Cappy, un sombrero con habilidades especiales, Mario puede poseer diversos objetos y enemigos para resolver acertijos y superar obstáculos mientras explora mundos vibrantes y creativos.',
            'precio': 19990,
            'descuento_subscriptor': 5,
            'descuento_oferta': 20,
            'imagen': 'productos/000010.jpg'
        },
        {
            'id': 11,
            'categoria': Categoria.objects.get(id=2),
            'nombre': 'Assassin\'s Creed Valhalla',
            'descripcion': 'Assassin\'s Creed Valhalla es un videojuego de acción-aventura desarrollado por Ubisoft Montreal y publicado por Ubisoft. Es la duodécima entrega principal de la serie Assassin\'s Creed y la sucesora de Assassin\'s Creed Odyssey de 2018. El juego se lanzó en noviembre de 2020 para Microsoft Windows, PlayStation 4, PlayStation 5, Xbox One, Xbox Series X/S y Stadia.',
            'precio': 59990,
            'descuento_subscriptor': 5,
            'descuento_oferta': 10,
            'imagen': 'productos/000011.jpg'
        },
        {
            'id': 12,
            'categoria': Categoria.objects.get(id=2),
            'nombre': 'Star Wars Jedi: Fallen Order',
            'descripcion': 'Star Wars Jedi: Fallen Order es una emocionante aventura de acción en tercera persona ambientada en el universo de Star Wars. Ponte en la piel de Cal Kestis, un padawan que sobrevivió a la Orden 66 y debe completar su entrenamiento, desarrollar nuevas y poderosas habilidades con la Fuerza y dominar el arte del sable láser mientras te mantienes un paso por delante del Imperio y sus mortíferos Inquisidores.',
            'precio': 39990,
            'descuento_subscriptor': 5,
            'descuento_oferta': 15,
            'imagen': 'productos/000012.jpg'
        },
        # Categoría "Estrategia" (4 juegos)
        {
            'id': 13,
            'categoria': Categoria.objects.get(id=3),
            'nombre': 'Civilization VI',
            'descripcion': 'Civilization VI es un juego de estrategia por turnos en el que los jugadores intentan construir un imperio que resista el paso del tiempo. Explora un nuevo mundo, investiga tecnologías, conquista a tus enemigos y enfréntate a los líderes más famosos de la historia mientras intentas construir la civilización más grande jamás conocida.',
            'precio': 39990,
            'descuento_subscriptor': 5,
            'descuento_oferta': 5,
            'imagen': 'productos/000013.jpg'
        },
        {
            'id': 14,
            'categoria': Categoria.objects.get(id=3),
            'nombre': 'Sid Meiers Civilization V',
            'descripcion': 'Sid Meiers Civilization VI es la sexta entrega de la aclamada serie de estrategia por turnos. En el juego, los jugadores lideran una civilización desde sus primeros días hasta la era espacial, gestionando recursos, expandiendo territorios, investigando tecnologías y culturas, y compitiendo por la victoria en diversas condiciones de juego.',
            'precio': 44000,
            'descuento_subscriptor': 5,
            'descuento_oferta': 15,
            'imagen': 'productos/000014.jpg'
        },
        {
            'id': 15,
            'categoria': Categoria.objects.get(id=3),
            'nombre': 'Total War: Warhammer III',
            'descripcion': 'Total War: Warhammer III es un juego de estrategia en tiempo real y por turnos ambientado en el mundo de fantasía de Warhammer. El juego presenta cuatro razas jugables: Kislev, Cathay, Khorne y Nurgle, cada una con sus propias unidades, mecánicas y objetivos de campaña. Los jugadores pueden liderar a sus ejércitos en batallas masivas en tiempo real y gestionar sus imperios en un mapa de campaña por turnos.',
            'precio': 59990,
            'descuento_subscriptor': 5,
            'descuento_oferta': 0,
            'imagen': 'productos/000015.jpg'
        },
        {
            'id': 16,
            'categoria': Categoria.objects.get(id=3),
            'nombre': 'Age of Empires IV',
            'descripcion': 'Age of Empires IV es un juego de estrategia en tiempo real desarrollado por Relic Entertainment y publicado por Xbox Game Studios. El juego es la cuarta entrega principal de la serie Age of Empires y fue lanzado en octubre de 2021. El juego presenta ocho civilizaciones jugables, cada una con sus propias unidades, tecnologías y edificios únicos.',
            'precio': 59990,
            'descuento_subscriptor': 5,
            'descuento_oferta': 10,
            'imagen': 'productos/000016.jpg'
        },
        # Categoría "RPG" (4 juegos)
        {
            'id': 17,
            'categoria': Categoria.objects.get(id=4),
            'nombre': 'The Witcher 3: Wild Hunt',
            'descripcion': 'The Witcher 3: Wild Hunt es un juego de rol de acción de mundo abierto desarrollado y publicado por CD Projekt Red. El juego sigue a Geralt de Rivia, un cazador de monstruos profesional conocido como brujo, mientras busca a su hija adoptiva, Ciri, quien está siendo perseguida por la Cacería Salvaje, una fuerza espectral que busca usar sus poderes para sus propios fines.',
            'precio': 29990,
            'descuento_subscriptor': 5,
            'descuento_oferta': 10,
            'imagen': 'productos/000017.jpg'
        },
        {
            'id': 18,
            'categoria': Categoria.objects.get(id=4),
            'nombre': 'The Elder Scrolls V: Skyrim',
            'descripcion': 'Un juego de rol de mundo abierto donde los jugadores exploran la región de Skyrim, completan misiones, desarrollan habilidades y pueden elegir su propio camino como guerrero, mago o ladrón en un mundo lleno de dragones y secretos antiguos.',
            'precio': 26990,
            'descuento_subscriptor': 5,
            'descuento_oferta': 5,
            'imagen': 'productos/000018.jpg'
        },
        {
            'id': 19,
            'categoria': Categoria.objects.get(id=4),
            'nombre': 'Dragon Age: Inquisition',
            'descripcion': 'En este juego de rol de BioWare, los jugadores asumen el papel del Inquisidor, liderando una organización para enfrentar una amenaza catastrófica en el mundo de Thedas. La exploración, la toma de decisiones y el combate estratégico son fundamentales mientras se lucha por la estabilidad y el poder.',
            'precio': 34900,
            'descuento_subscriptor': 5,
            'descuento_oferta': 15,
            'imagen': 'productos/000019.jpg'
        },
        {
            'id': 20,
            'categoria': Categoria.objects.get(id=4),
            'nombre': 'Middle-earth: Shadow of War',
            'descripcion': 'Ambientado en el universo de El Señor de los Anillos de Tolkien, los jugadores controlan a Talion, un guardián en busca de venganza contra las fuerzas de Sauron. El juego combina combate fluido, exploración de mundo abierto y la capacidad de forjar alianzas con criaturas y personajes icónicos de la saga.',
            'precio': 38000,
            'descuento_subscriptor': 5,
            'descuento_oferta': 0,
            'imagen': 'productos/000020.jpg'
        }
    ]

    print('Crear productos')
    for producto in productos_data:
        Producto.objects.create(**producto)
    print('Productos creados correctamente')

    print('Crear carritos')
    for rut in ['25.747.200-0', '11.991.600-3']:
        cliente = Perfil.objects.get(rut=rut)
        for cantidad_productos in range(1, 11):
            producto = Producto.objects.get(pk=randint(1, 10))
            if cliente.subscrito:
                descuento_subscriptor = producto.descuento_subscriptor
            else:
                descuento_subscriptor = 0
            descuento_oferta = producto.descuento_oferta
            descuento_total = descuento_subscriptor + descuento_oferta
            descuentos = int(round(producto.precio * descuento_total / 100))
            precio_a_pagar = producto.precio - descuentos
            Carrito.objects.create(
                cliente=cliente,
                producto=producto,
                precio=producto.precio,
                descuento_subscriptor=descuento_subscriptor,
                descuento_oferta=descuento_oferta,
                descuento_total=descuento_total,
                descuentos=descuentos,
                precio_a_pagar=precio_a_pagar
            )
    print('Carritos creados correctamente')

    print('Crear boletas')
    nro_boleta = 0
    perfiles_cliente = Perfil.objects.filter(tipo_usuario='Cliente')
    for cliente in perfiles_cliente:
        estado_index = -1
        for cant_boletas in range(1, randint(6, 21)):
            nro_boleta += 1
            estado_index += 1
            if estado_index > 3:
                estado_index = 0
            estado = Boleta.ESTADO_CHOICES[estado_index][1]
            fecha_venta = date(2023, randint(1, 5), randint(1, 28))
            fecha_despacho = fecha_venta + timedelta(days=randint(0, 3))
            fecha_entrega = fecha_despacho + timedelta(days=randint(0, 3))
            if estado == 'Anulado':
                fecha_despacho = None
                fecha_entrega = None
            elif estado == 'Vendido':
                fecha_despacho = None
                fecha_entrega = None
            elif estado == 'Despachado':
                fecha_entrega = None
            boleta = Boleta.objects.create(
                nro_boleta=nro_boleta, 
                cliente=cliente,
                monto_sin_iva=0,
                iva=0,
                total_a_pagar=0,
                fecha_venta=fecha_venta,
                fecha_despacho=fecha_despacho,
                fecha_entrega=fecha_entrega,
                estado=estado)
            detalle_boleta = []
            total_a_pagar = 0
            for cant_productos in range(1, randint(4, 6)):
                producto_id = randint(1, 10)
                producto = Producto.objects.get(id=producto_id)
                precio = producto.precio
                descuento_subscriptor = 0
                if cliente.subscrito:
                    descuento_subscriptor = producto.descuento_subscriptor
                descuento_oferta = producto.descuento_oferta
                descuento_total = descuento_subscriptor + descuento_oferta
                descuentos = int(round(precio * descuento_total / 100))
                precio_a_pagar = precio - descuentos
                bodega = Bodega.objects.create(producto=producto)
                DetalleBoleta.objects.create(
                    boleta=boleta,
                    bodega=bodega,
                    precio=precio,
                    descuento_subscriptor=descuento_subscriptor,
                    descuento_oferta=descuento_oferta,
                    descuento_total=descuento_total,
                    descuentos=descuentos,
                    precio_a_pagar=precio_a_pagar)
                total_a_pagar += precio_a_pagar
            monto_sin_iva = int(round(total_a_pagar / 1.19))
            iva = total_a_pagar - monto_sin_iva
            boleta.monto_sin_iva = monto_sin_iva
            boleta.iva = iva
            boleta.total_a_pagar = total_a_pagar
            boleta.fecha_venta = fecha_venta
            boleta.fecha_despacho = fecha_despacho
            boleta.fecha_entrega = fecha_entrega
            boleta.estado = estado
            boleta.save()
            print(f'    Creada boleta Nro={nro_boleta} Cliente={cliente.usuario.first_name} {cliente.usuario.last_name}')
    print('Boletas creadas correctamente')

    print('Agregar productos a bodega')
    for producto_id in range(1, 11):
        producto = Producto.objects.get(id=producto_id)
        cantidad = 0
        for cantidad in range(1, randint(2, 31)):
            Bodega.objects.create(producto=producto)
        print(f'    Agregados {cantidad} "{producto.nombre}" a la bodega')
    print('Productos agregados a bodega')

