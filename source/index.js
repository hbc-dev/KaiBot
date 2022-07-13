const Discord = require('discord.js');
const client = new Discord.Client();
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database("./data.sqlite");
const db2 = new sqlite3.Database("./objects.sqlite");
const { Client } = require('unb-api');
const cliente = new Client('No te voy a dar el token mamon');

let SQLCreate = "CREATE TABLE IF NOT EXISTS usuarios (iduser TEXT, bio TEXT, games TEXT, color TEXT)";
let SQLCreate2 = "CREATE TABLE IF NOT EXISTS objetos (iduser TEXT,cuponyokai INTEGER, money INTEGER, yokai INTEGER, cupondibujo INTEGER,moneda INTEGER)";

db.run(SQLCreate, function(err) {
	if (err) return console.error(err.message)
});

db2.run(SQLCreate2, function(err) {
	if (err) return console.error(err.message)
});


client.on('ready', () => {
	client.user.setPresence({
		status: "idle",
		activity: {
			name: `Cargando bases de datos...`
		}
	});
	console.log('Bot activo')
});


client.on('message', async message => {

	let prefix = 'k!'
	let baneados = ['573101639330693130']
	if (!message.guild) return;
	if (baneados.includes(message.author.id) && message.channel.id === '864980534627008533') {
		const castigo = new Discord.MessageEmbed()
			.setTitle('Sistema de castigos - Ban')
			.setDescription('¡Oh no! ¡Parece que estás baneado de la tienda!\nSi es que estas baneado, es porque incumpliste alguna norma, ¿no?')
			.setColor('RED')
			.setFooter('Sistema de castigos - Mensaje automático')
		message.author.send(castigo)
		return message.delete()
	}

	if (baneados.includes(message.author.id)) return;

	if (message.content.match(`<@!?${client.user.id}>`)) {
		const ayuda = new Discord.MessageEmbed()
			.setTitle('¿Perdido?')
			.setDescription('¡Hola! Soy el bot de soporte de Tiendakai. Puedes ver mis comandos a través de \`k!help\`')
			.setFooter('Servicios - Tiendakai')
			.setImage('https://cdn.discordapp.com/attachments/798289858497347627/872405779838300180/SI_3DS_YoKaiWatch_image1280w.png')
			.setColor('BLUE')
		message.channel.send(ayuda).then(x => {
			x.delete({ timeout: 15000 })
		});
	}

	if (!message.content.startsWith(prefix)) return;
	//esto hace q si no comienza con el prefix no siga nada`

	const args = message.content.slice(prefix.length).trim().split(/ +/g);
	const command = args.shift().toLowerCase();

	//COMANDO DE AYUDA
	if (command === 'help') {
		var id = '702481362904678521';
		let check = id.includes(message.author.id)

		//EMBED DE AYUDA GENERAL
		const ayuda = new Discord.MessageEmbed()
			.setTitle('Soporte KaiBOT')
			.setDescription('¡Hola! Soy KaiBOT, un bot de soporte de Tiendakai y estoy aquí para ayudarte en cualquier cosa.\nPara echar un vistazo a la tienda en general, puedes pulsar sobre <:Jiba_der:877645584595578960>\nAhora mismo contamos con **`' + message.guild.memberCount + '` miembros**')
			.addField('**Métodos de pago**', `**Chocobarritas | PayPal**`, true)
			.addField('**Versión**', `\`V.2\``, true)
			.addField('**Creador**', `167#0353`, true)
			.addField('**Perfiles**', `**Comming soon...**`, true)
			.addField('**Servidor**', `[Touch here](https://discord.gg/UZ3hz5U7pw)`, true)
			.addField('**Donación**', `[Touch here](https://www.paypal.me/pagos3217)`, true)
			.setColor('BLUE')
			.setFooter('Haga clic sobre Komasan para ver los comandos')
			.setImage('https://cdn.discordapp.com/attachments/864944123148107796/864947428259135548/icon.jpg')
			.setURL('https://discord.gg/ResEaen374')

		//EMBED DE COMANDOS
		const comandos = new Discord.MessageEmbed()
			.setTitle('Comandos KaiBOT')
			.setDescription('¡Bienvenido a la sección de comandos de KaiBOT! Aquí puedes consultar todos los comandos que ofrecemos.')
			.addField('Comandos - Tiendakai', `\`k!shop\` ➤ Con este comando puedes ver todos los precios de Tiendakai, ofertas y como comprar.\n\n\`k!pedido\` ➤ Con este comando puedes realizar un pedido.\n\n\`k!desc\` ➤ Con este comando puedes calcular el descuento de un producto. Uso correcto: \`k!desc [precio producto] [descuento]\`\n\n\`k!calcular\` ➤ Con este comando puedes realizar una cuenta simple. Puedes sumar con \`+\`, restar con \`-\`, multiplicar con \`x\`, dividir con \`:\` y potencias con \`^\`. Uso correcto: \`k!calcular [primero numero] [simbolo] [segundo numero]\``)
			.addField('Comandos - Perfiles', `\`k!perfil [(Opcional) @user]\` ➤ Con este comando puedes ver tu perfil y el de otros usuarios\n\n\`k!setbio [texto]\` ➤ Con este comando puedes añadir o actualizar tu biografía de tu perfil\n\n\`k!setcolor [(Opcional) color hexadecimal]\` ➤ Con este comando puedes cambiar el color de tu perfi`)
			.addField('Comandos - General', `\`k!help\` ➤ Con este comando puedes ver información del bot, una previsualización de la tienda y la lista de comandos.`)
			.setColor('BLUE')
			.setImage('https://cdn.discordapp.com/attachments/798289858497347627/872452098585940008/capitulo_12551.png')
			.setFooter('Haga clic sobre el Yokai Watch para volver al inicio')


		//EMBED DE TIENDA
		const tienda = new Discord.MessageEmbed()
			.setTitle('Tiendakai')
			.setDescription('¡Bienvenido a Tiendakai, la gran tienda yokai!\n¡Rebajas de apertura, disfruta de hasta un 50% en tus compras yokai! Usa el comando \`k!shop\` para ver una lista extensa de todos nuestros productos a la venta.\n\n**Métodos de pago --->** \`Chocobarritas | PayPal\`\n**Rebajas:** \`Del 20% hasta el 50%\`\n\n- Horarios -\n**De lunes a viernes** \`de 12:00AM a 1AM\`\n**Fin de semana** \`de 12:00AM a 17:30PM\`\n[Servidor](https://discord.gg/UZ3hz5U7pw) | [Donaciones](https://www.paypal.me/pagos3217) | **Contacto:** \`167#0353\`')
			.addField('Ofertas destacadas - \`Actualización cada semana\`', `\`Pack Samurai \`**(9000 :chocolate_bar: | 1'50€)**\nUn kit de yokais samurai, entre ellos Shogunyan. El kit cambia dependiendo de la versión del juego donde se compre.\n**Puedes comprar este pack solo una vez**\n\n\`Pack Tiendakai S+\` **(~~12000~~ 9000 :chocolate_bar: | 1'50€)**\nUn pack de 4 yokais de rango S a elección con 1 yokai de rango A aleatorio de regalo. **Puedes comprar este pack solo una vez** ||*pero puedes encontrar este mismo a su precio original en la tienda*||\n\n\`Pack Legendario\` **(~~18000~~ 12000 :chocolate_bar: | 2'50€)**\nUn kit de yokais legendarios que incluye a todos ellos. El kit cambia dependiendo de la versión del juego donde se compre. **Puedes comprar este pack solo una vez** ||*pero puedes encontrar este mismo a su precio original en la tienda*||\n\n**Haz el comando \`k!shop\` para ver todas nuestras ofertas.**`)
			.addField('Ofertas de tiempo limitado - \`Hasta fin de año\`', `\`Pack de Bienvenida\` **(5000 :chocolate_bar: | 1€)**\nUn kit en el que incluye un legendario aleatorio y 5 yokais de rango B. **Puedes comprar este pack solo una vez**\n\n\`Pack Veraniego\` **(4000 :chocolate_bar: | 0'80€)**\nUn kit conmemorativo del verano que incluye 3 yokai rango B a elección y 1 yokai rango A random. **Puedes comprar este pack cuantas veces quieras hasta la fecha de vencimiento de la oferta**\n\n\`Pack Tiendakai\` **(6000 :chocolate_bar: | 1'50€)**\nUn kit en el que incluye un yokai inusual garantizado y 5 yokais aleatorios con posibilidades de rango S o superior. **Puedes comprar este pack cuantas veces quieras hasta la fecha de vencimiento de la oferta**\n\n**Haz el comando \`k!shop\` para ver todas nuestras ofertas de tiempo limitado**`)
			.setURL('https://discord.gg/ResEaen374')
			.setColor('#95fab9')
			.setImage('https://cdn.discordapp.com/attachments/863514308343889930/865236626438094898/f5774baf855efd.png')
			.setFooter('Haga clic sobre el Yokai Watch para volver al inicio')


		//EMBED DE CREDITOS


		message.channel.send(ayuda).then(x => {
			x.react('<:Koma_izq:877645584524267530>')
			x.react('<:YokaiWatch:798632470429433946>')
			x.react('<:Jiba_der:877645584595578960>')

			x.awaitReactions((reaction, user) => {
				//COMANDOS
				if (user.id === client.user.id || message.author.id != user.id) return;
				if (reaction.emoji.id === '877645584524267530') {
					x.edit(comandos)
					reaction.users.remove(message.author)
				}
				//TIENDA
				if (reaction.emoji.id === '877645584595578960') {
					x.edit(tienda)
					reaction.users.remove(message.author)
				}
				//VUELTA AL HOME
				if (reaction.emoji.id === '798632470429433946') {
					x.edit(ayuda)
					reaction.users.remove(message.author)
				}
				//CREDITOS
			});
		});
	}

	if (command == 'shop') {
		//GENERAL
		const tienda = new Discord.MessageEmbed()
			.setTitle('Tiendakai')
			.setDescription('¡Bienvenido a Tiendakai, la gran tienda yokai!\n¡Rebajas de apertura, disfruta de hasta un 50% en tus compras yokai!\n\n**Métodos de pago --->** \`Chocobarritas | PayPal\`\n**Rebajas:** \`Del 20% hasta el 50%\`\n\n- Horarios -\n**De lunes a viernes** \`de 12:00AM a 1AM\`\n**Fin de semana** \`de 12:00AM a 17:30PM\`\n[Servidor](https://discord.gg/UZ3hz5U7pw) | [Donaciones](https://www.paypal.me/pagos3217) | **Contacto:** \`167#0353\`')
			.addField('Ofertas destacadas - \`Actualización cada semana\`', `\`Pack Samurai \`**(9000 :chocolate_bar: | 1'50€)**\nUn kit de yokais samurai, entre ellos Shogunyan. El kit cambia dependiendo de la versión del juego donde se compre.\n**Puedes comprar este pack solo una vez**\n\n\`Pack Tiendakai S+\` **(~~12000~~ 9000 :chocolate_bar: | 1'50€)**\nUn pack de 4 yokais de rango S a elección con 1 yokai de rango A aleatorio de regalo. **Puedes comprar este pack solo una vez** ||*pero puedes encontrar este mismo a su precio original en la tienda*||\n\n\`Pack Legendario\` **(~~18000~~ 12000 :chocolate_bar: | 2'50€)**\nUn kit de yokais legendarios que incluye a todos ellos. El kit cambia dependiendo de la versión del juego donde se compre. **Puedes comprar este pack solo una vez** ||*pero puedes encontrar este mismo a su precio original en la tienda*||\n\n**Haz el comando \`k!shop\` para ver todas nuestras ofertas.**`)
			.addField('Ofertas de tiempo limitado - \`Hasta el fin de año\`', `\`Pack de Bienvenida\` **(5000 :chocolate_bar: | 1€)**\nUn kit en el que incluye un legendario aleatorio y 5 yokais de rango B. **Puedes comprar este pack solo una vez**\n\n\`Pack Veraniego\` **(4000 :chocolate_bar: | 0'80€)**\nUn kit conmemorativo del verano que incluye 3 yokai rango B a elección y 1 yokai rango A random. **Puedes comprar este pack cuantas veces quieras hasta la fecha de vencimiento de la oferta**\n\n\`Pack Tiendakai\` **(6000 :chocolate_bar: | 1'50€)**\nUn kit en el que incluye un yokai inusual garantizado y 5 yokais aleatorios con posibilidades de rango S o superior. **Puedes comprar este pack cuantas veces quieras hasta la fecha de vencimiento de la oferta**`)
			.setURL('https://discord.gg/ResEaen374')
			.setColor('#95fab9')
			.setImage('https://cdn.discordapp.com/attachments/863514308343889930/865236626438094898/f5774baf855efd.png')
			.setFooter('Haga clic sobre alguna categoría para empezar a comprar')

		//YOKAI WATCH 2
		const yk2 = new Discord.MessageEmbed()
			.setTitle('Tiendakai - Yokai Watch 2')
			.setDescription('¡Bienvenido a Tiendakai! Estás en la sección de Yokai Watch 2. Si estás buscando algo, puedes consultar nuestros productos y precios abajo.\n¡Rebajas de apertura, disfruta de hasta un 50% en tus compras yokai!\n\n**Métodos de pago --->** \`Chocobarritas | PayPal\`\n**Rebajas:** \`Del 20% hasta el 50%\`\n\n- Horarios -\n**De lunes a viernes** \`de 12:00AM a 1AM\`\n**Fin de semana** \`de 12:00AM a 17:30PM\`')
			.addField('─────── · · ───────', `ㅤㅤㅤ-Tiendakai-\n─────── · · ───────`)
			.addField('Yokais Rango E - 300 :chocolate_bar: | 0,20€', `¡Compra yokais de rango E! Este es el rango más bajo de todos los yokais, por ende, es el de menor valor.\n**Nota:** ||*en esta sección no se incluyen los yokais inusuales*||`)
			.addField('Yokais Rango D - 500 :chocolate_bar: | 0,30€', `¡Compra yokais de rango D! Este es uno de los rangos más bajos de los yokais, pero hay muchos yokais utilizados en competitivo por sus técnicas únicas.\n**Nota:** ||*en esta sección no se incluyen los yokais inusuales*||`)
			.addField('Yokais Rango C - 650 :chocolate_bar: | 0,40€', `¡Compra yokais de rango C! Este es un rango intermedio entre los yokais. Estos suelen evolucionar como el caso de Cantigarra a Habilgarra o algunas técnicas en la escena competitiva.\n**Nota:** ||*en esta sección no se incluyen los yokais inusuales*||`)
			.addField('Yokais Rango B - 750 :chocolate_bar: | 0,50€', `¡Compra yokais de rango B! Este rango es algo más alto que los anteriores, puede ser un punto intermedio. Es caracterizado por haber yokais que pueden ser fusionados o yokais que pueden llegar a evolucionar.\n**Nota:** ||*en esta sección no se incluyen yokais inusuales*||`)
			.addField('Yokais Rango A - 900 :chocolate_bar: | 0,60€', `¡Compra yokais de rango A! Este rango es uno de los más altos. Desde escelentes tanques como Sombrillogro hasta atacantes como Ludorái.\n**Nota:** ||*en esta sección no se incluyen los yokais inusuales*||`)
			.addField('Yokais Rango S - 1100 :chocolate_bar: | 0,70€', `¡Compra yokais de rango S! Este rango es el más alto de todos los yokais, por ende, tienen mucho valor y poder. Se encuentran grandes yokais de la escena competitiva como Venocto.\n**Nota:** ||*en esta sección no se incluyen los yokais inusuales ni legendarios*||`)
			.addField('Yokais Inusuales - 1200 :chocolate_bar: | 0,60€', `¡Compra yokais inusuales de cualquier rango! Estos yokais se caracterizan por su rareza o gran apoyo/poder en la escena competitiva.`)
			.addField('Yokais Legendarios - 2000 :chocolate_bar: | 1€', `¡Compra yokais legendarios! Estos yokais unidos por un vínculo de yokais son tan poderosos... Yokais como Shogunyan, gran apoyo en la escena, disponibles aquí.`)
			.setFooter('Haz clic sobre el Yokai Watch para volver al menú')
			.setURL('https://discord.gg/ResEaen374')
			.setImage('https://media.discordapp.net/attachments/798289858497347627/871405672292569138/ykw2.png?width=1127&height=676')
			.setColor('FDFFB4')

		//YOKAI WATCH 3
		const yk3 = new Discord.MessageEmbed()
			.setTitle('Tiendakai - Yokai Watch 3')
			.setDescription('¡Bienvenido a Tiendakai! Estás en la sección de Yokai Watch 3. Si estás buscando algo, puedes consultar nuestros productos y precios abajo.\n¡Rebajas de apertura, disfruta de hasta un 50% en tus compras yokai!\n\n**Métodos de pago --->** \`Chocobarritas | PayPal\`\n**Rebajas:** \`Del 20% hasta el 50%\`\n\n- Horarios -\n**De lunes a viernes** \`de 12:00AM a 1AM\`\n**Fin de semana** \`de 12:00AM a 17:30PM\`')
			.addField('─────── · · ───────', `ㅤㅤㅤ-Tiendakai-\n─────── · · ───────`)
			.addField('Yokais Rango E - 300 :chocolate_bar: | 0,20€', `¡Compra yokais de rango E! Este es el rango más bajo de todos los yokais, por ende, es el de menor valor.\n**Nota:** ||*en esta sección no se incluyen los yokais inusuales*||`)
			.addField('Yokais Rango D - 500 :chocolate_bar: | 0,30€', `¡Compra yokais de rango D! Este es uno de los rangos más bajos de los yokais, pero hay muchos yokais utilizados en competitivo por sus técnicas únicas.\n**Nota:** ||*en esta sección no se incluyen los yokais inusuales*||`)
			.addField('Yokais Rango C - 650 :chocolate_bar: | 0,40€', `¡Compra yokais de rango C! Este es un rango intermedio entre los yokais. Estos suelen evolucionar como el caso de Cantigarra a Habilgarra o algunas técnicas en la escena competitiva.\n**Nota:** ||*en esta sección no se incluyen los yokais inusuales*||`)
			.addField('Yokais Rango B - 750 :chocolate_bar: | 0,50€', `¡Compra yokais de rango B! Este rango es algo más alto que los anteriores, puede ser un punto intermedio. Es caracterizado por haber yokais que pueden ser fusionados o yokais que pueden llegar a evolucionar.\n**Nota:** ||*en esta sección no se incluyen yokais inusuales*||`)
			.addField('Yokais Rango A - 900 :chocolate_bar: | 0,60€', `¡Compra yokais de rango A! Este rango es uno de los más altos. Desde escelentes tanques como Sombrillogro hasta atacantes como Ludorái.\n**Nota:** ||*en esta sección no se incluyen los yokais inusuales*||`)
			.addField('Yokais Rango S - 1100 :chocolate_bar: | 0,70€', `¡Compra yokais de rango S! Este rango es el más alto de todos los yokais, por ende, tienen mucho valor y poder. Se encuentran grandes yokais de la escena competitiva como Venocto.\n**Nota:** ||*en esta sección no se incluyen los yokais inusuales ni legendarios*||`)
			.addField('Yokais Inusuales - 1200 :chocolate_bar: | 0,60€', `¡Compra yokais inusuales de cualquier rango! Estos yokais se caracterizan por su rareza o gran apoyo/poder en la escena competitiva.`)
			.addField('Yokais Tesoro y Míticos - 1500 :chocolate_bar: | 0,80€', `¡Compra yokais tesoro y míticos! Cuestan un ojo de la cara pero tienen tanto poder...`)
			.addField('Yokais Legendarios - 2000 :chocolate_bar: | 1€', `¡Compra yokais legendarios! Estos yokais unidos por un vínculo de yokais son tan poderosos... Yokais como Shogunyan, gran apoyo en la escena, disponibles aquí.`)
			.setFooter('Haz clic sobre el Yokai Watch para volver al menú')
			.setURL('https://discord.gg/ResEaen374')
			.setImage('https://media.discordapp.net/attachments/798289858497347627/871405671164280842/ykw3.png?width=1127&height=676')
			.setColor('F8877F')

		//YOKAI WATCH BLASTERS
		const ykb = new Discord.MessageEmbed()
			.setTitle('Tiendakai - Yokai Watch Blasters')
			.setDescription('¡Bienvenido a Tiendakai! Estás en la sección de Yokai Watch Blasters. Si estás buscando algo, puedes consultar nuestros productos y precios abajo.\n¡Rebajas de apertura, disfruta de hasta un 50% en tus compras yokai!\n\n**Métodos de pago --->** \`Chocobarritas | PayPal\`\n**Rebajas:** \`Del 20% hasta el 50%\`\n\n- Horarios -\n**De lunes a viernes** \`de 12:00AM a 1AM\`\n**Fin de semana** \`de 12:00AM a 17:30PM\`')
			.addField('─────── · · ───────', `ㅤㅤㅤ-Tiendakai-\n─────── · · ───────`)
			.addField('Yokais Rango E - 300 :chocolate_bar: | 0,20€', `¡Compra yokais de rango E! Este es el rango más bajo de todos los yokais, por ende, es el de menor valor.\n**Nota:** ||*en esta sección no se incluyen los yokais inusuales*||`)
			.addField('Yokais Rango D - 500 :chocolate_bar: | 0,30€', `¡Compra yokais de rango D! Este es uno de los rangos más bajos de los yokais.\n**Nota:** ||*en esta sección no se incluyen los yokais inusuales*||`)
			.addField('Yokais Rango C - 650 a:chocolate_bar: | 0,40€', `¡Compra yokais de rango C! Este es un rango intermedio entre los yokais. Estos suelen evolucionar como el caso de Cantigarra a Habilgarra.\n**Nota:** ||*en esta sección no se incluyen los yokais inusuales*||`)
			.addField('Yokais Rango B - 750 :chocolate_bar: | 0,50€', `¡Compra yokais de rango B! Este rango es algo más alto que los anteriores, puede ser un punto intermedio. Es caracterizado por haber yokais que pueden ser fusionados o yokais que pueden llegar a evolucionar.\n**Nota:** ||*en esta sección no se incluyen yokais inusuales*||`)
			.addField('Yokais Rango A - 900 :chocolate_bar: | 0,60€', `¡Compra yokais de rango A! Este rango es uno de los más altos. Desde escelentes tanques como Sombrillogro hasta atacantes como Ludorái.\n**Nota:** ||*en esta sección no se incluyen los yokais inusuales*||`)
			.addField('Yokais Rango S - 1100 :chocolate_bar: | 0,70€', `¡Compra yokais de rango S! Este rango es el más alto de todos los yokais, por ende, tienen mucho valor y poder. \n**Nota:** ||*en esta sección no se incluyen los yokais inusuales ni legendarios*||`)
			.addField('Yokais Inusuales - 1200 :chocolate_bar: | 0,60€', `¡Compra yokais inusuales de cualquier rango! Estos yokais se caracterizan por su rareza o gran apoyo/poder en partida.`)
			.addField('Yokais Legendarios - 2000 :chocolate_bar: | 1€', `¡Compra yokais legendarios! Estos yokais unidos por un vínculo de yokais son tan poderosos... Yokais como Shogunyan, gran apoyo en medio de una partida, disponibles aquí.`)
			.addField('Gran Enma - 5000 :chocolate_bar: | 2€', `¡El Gran Enma! Tiene tanto poder que solo algunos pueden permitirselo...`)
			.setFooter('Haz clic sobre el Yokai Watch para volver al menú')
			.setURL('https://discord.gg/ResEaen374')
			.setImage('https://media.discordapp.net/attachments/798289858497347627/871405668333137990/ykwb.png?width=1127&height=676')
			.setColor('3CBEFC')

		//INFORMACIÓN
		const info = new Discord.MessageEmbed()
			.setTitle('Información')
			.setDescription('¡Bienvenido a Tiendakai, la tienda más grande de yokai! Vamos a enseñarte paso a paso como comprar en ella.')
			.addField('¿Cómo puedo comprar?', `¡Fácil! Antes que nada, revisa **tu dinero** con \`$bal\` o verifica que tengas dinero en tu cuenta de **[PayPal](https://www.paypal.com/es/home)**. Despúes, haz el comando \`k!shop\` y revisa con los botones **el juego** que quieres y **los precios del yokai** en cuestión. Dirigete a a la **[Tiendakai](https://discord.gg/ResEaen374)** y rellena con el comando \`k!pedido\` un lista de información.\n\nAhora **espera** a que alguno de los trabajadores para que atienda tu pedido y **paga antes de recoger los yokais**, si no se paga antes, **no podrás realizar tu compra**.`)
			.addField('Reglas del establecimiento', `*1.-No spam o flood, completamente baneable de la tienda*\n*2.-No dirigir insultos ni a clientes ni trabajadores*\n*3.-Se paciente, no metas prisa a los trabajadores*\n*4.-No hacer mal uso del canal*`)
			.addField('─────── · · ───────', `ㅤㅤㅤ-Tiendakai-\n─────── · · ───────`)
			.addField('Información general', '- Horarios -\n**De lunes a viernes** \`de 12:00AM a 1AM\`\n**Fin de semana** \`de 12:00AM a 17:30PM\`\n**Trabajadores:** <@702481362904678521> <@767838959576940585>')
			.setImage('https://media.discordapp.net/attachments/798289858497347627/871405673748000798/tienda.jpg?width=1127&height=676')
			.setColor('802C')

		message.channel.send(tienda).then(x => {
			x.react('❓')
			x.react('<:YokaiWatch:798632470429433946>')
			x.react('<:ykw2:866714146854797312>')
			x.react('<:ykw3:866714513146249246>')
			x.react('<:ykwb:866714480222404649>')

			x.awaitReactions((reaction, user) => {
				if (user.id === client.user.id || message.author.id != user.id) return;
				//YOKAI WATCH 2
				if (reaction.emoji.id === '866714146854797312')
					x.edit(yk2);
				reaction.users.remove(message.author)

				//YOKAI WATCH 3
				if (reaction.emoji.id === '866714513146249246')
					x.edit(yk3);
				reaction.users.remove(message.author)

				//YOKAI WATCH BLASTERS
				if (reaction.emoji.id === '866714480222404649')
					x.edit(ykb);
				reaction.users.remove(message.author)

				//VUELTA AL HOME
				if (reaction.emoji.id === '798632470429433946') {
					x.edit(tienda)
					reaction.users.remove(message.author)
				}

				//INFORMACIÓN
				if (reaction.emoji.name === '❓') {
					x.edit(info)
					reaction.users.remove(message.author)
				}
			})
		});
	}


	//COMANDO PARA CALCULAR
	if (command === 'calcular') {
		let signos = ['+', '-', 'x', ':', '^']
		let primero = args[0]
		let segundo = args[2]
		let signo = args[1]

		if (signo === 'x') {
			signo = '*'
		}
		if (signo === ':') {
			signo = '/'
		}
		if (signo === '^') {
			signo = '**'
		}

		if (isNaN(primero)) {
			return message.channel.send({
				embed: {
					color: 'RED',
					description: '¡Solo se admiten números! :one::two::three:'
				}
			});
		}
		if (!primero) {
			return message.channel.send({
				embed: {
					color: 'RED',
					description: '¡Coloca el primer número!'
				}
			});
		}
		if (!signos.some(x => message.content.includes(x))) return message.channel.send({
			embed: {
				color: 'RED',
				description: '¡Debes de colocar los signos! \`(+, -, :, x, ^)\`'
			}
		});

		if (!segundo) {
			return message.channel.send({
				embed: {
					color: 'RED',
					description: '¡Coloca el segundo número!'
				}
			});
		}

		try {
			const resultado = eval(primero + signo + segundo);

			const res = new Discord.MessageEmbed()
				.setTitle('¡Calculo concluido con exito!')
				.setColor('GREEN')
				.addField('Operación', '```js\n' + primero + ' ' + signo + ' ' + segundo + '```')
				.addField('Resultado', '```js\n' + resultado + '```')

			return message.channel.send(res);
		} catch (e) {
			const err = new Discord.MessageEmbed()
				.setDescription('¡Oh no! a ocurrido un error\n\n`' + e.message + '`')
				.setColor('YELLOW')
			return message.channel.send(err);
		}
	}

	if (command === 'pedido') {
		let filtro = msg => msg.author.id === message.author.id;
		const embed1 = new Discord.MessageEmbed()
			.setTitle('Sistema de pedidos - Pregunta 1')
			.setDescription('¿Cuál es el juego donde vas a pedir? **Juegos disponibles:** \`YKW2 | YKW3 | YKWB\`')
			.setColor('BLUE')
			.setFooter('Tienes 30 segundos para responder')

		const embed2 = new Discord.MessageEmbed()
			.setTitle('Sistema de pedidos - Pregunta 2')
			.setDescription('¿Cuáles son los yokais que pedirás? Recuerda que los yokais deben concordar con la elección que hiciste en la anterior pregunta.')
			.setColor('BLUE')
			.setFooter('Tienes 5 minutos para responder')

		const embed3 = new Discord.MessageEmbed()
			.setTitle('Sistema de pedidos - Pregunta 3')
			.setDescription('¿Cuál será el método de pago con el que vas a pagar? **Métodos de pago ---> ** \`Chocobarritas | PayPal\`')
			.setColor('BLUE')
			.setFooter('Tienes 30 segundos para responder')

		const final = new Discord.MessageEmbed()
			.setTitle('Sistema de pedidos - Completo')
			.setDescription('¡Acabas de realizar un pedido! Ahora espera a que algún vendedor vea el pedido y te avise.')
			.setColor('GREEN')
			.setFooter('Si le diste un uso incorrecto, no podrás volver a entrar a la tienda')

		const tiempo = new Discord.MessageEmbed()
			.setTitle('Sistema de pedidos - Error')
			.setDescription('¡Oh no! ¡Nos hemos topado con un error!')
			.addField('Error 501 - Tiempo', `Parece que has excedido el tiempo para poder responder a las preguntas. Si quiere proceder con el pedido, intentelo de nuevo.\n**Recuerde que el tiempo entre preguntas aparece en la parte de abajo**`)
			.setColor('RED')
			.setFooter('Sistema de pedidos - Error detectado')


		let pregunta1 = await message.channel.send(embed1)
		const array1 = await message.channel.awaitMessages(filtro, { max: 1, time: 30000 })
		if (array1.size < 1) return pregunta1.edit(tiempo)
		let resultado_array1 = await array1.first().content;
		pregunta1.delete()
		array1.first().delete()

		let pregunta2 = await message.channel.send(embed2)
		const array2 = await message.channel.awaitMessages(filtro, { max: 1, time: 300000 })
		if (array1.size < 1) return pregunta2.edit(tiempo)
		let resultado_array2 = await array2.first().content;
		pregunta2.delete()
		array2.first().delete()

		let pregunta3 = await message.channel.send(embed3)
		const array3 = await message.channel.awaitMessages(filtro, { max: 1, time: 30000 })
		if (array3.size < 1) return pregunta3.edit(tiempo)
		let resultado_array3 = await array3.first().content;
		pregunta3.edit(final)
		array3.first().delete()

		const pedido = new Discord.MessageEmbed()
			.setTitle('Sistema de pedidos - Nuevo pedido')
			.setDescription(`¡A llegado un nuevo pedido! Aquí dejo los datos del cliente:\n**Nombre del usuario:** \`${message.author.tag}\` | **ID del usuario:** \`${message.author.id}\``)
			.addField('Juego', `${resultado_array1}`)
			.addField('Yokais', `${resultado_array2}`)
			.addField('Método de pago', `${resultado_array3}`)
			.setFooter('Pedido entrante')
			.setColor('BLUE')

		client.channels.cache.get('872110861806882917').send(pedido)
	}

	if (command === 'desc') {
		var precio = args[0];
		var descuento = args[1];

		if (!precio) return message.channel.send('¡Debes añadir el precio del producto!')
		if (isNaN(precio)) return message.channel.send('¡El precio debe de ser un número!')
		if (!descuento) return message.channel.send('¡Debes añadir un descuento al producto!')
		if (isNaN(descuento)) return message.channel.send('¡El descuento debe de ser un número!')

		const resultado1 = descuento / 100 * precio
		const resultado = precio - resultado1

		const result = new Discord.MessageEmbed()
			.setTitle('¡Descuento calculado!')
			.setColor('GREEN')
			.addField('Resultado', '```js\n' + resultado + ' Chocobarritas```')
			.setFooter('El precio en pantalla es el precio sumado con el descuento')
		message.channel.send(result)
	}

	if (command === 'p') {
		let color = ''
		var hora = `<t:${Math.round(Date.now() / 1000)}:t>`
		console.log(hora)

		setInterval(function() {
			if (hora = '19:16') color = 'RED'
			if (hora = '19:17') color = 'GREEN'
			console.log(color)
		}, 10000)

		tiempo = new Discord.MessageEmbed()
			.setTitle('Pruebas - Tiempo')
			.addField('Timedstamp', `${Date.now()}`)
			.addField('Prueba final', `<t:${Math.round(Date.now() / 1000)}:t>`)
			.setColor(color)
		message.channel.send(tiempo)
	}

	if (command === 'setbio') {

		let fecha = `<t:${Math.round(Date.now() / 1000)}:F>`
		let userID = message.author.id
		let texto = args.join(' ')

		if (!texto) return message.channel.send('`❌` => ¡Debes escribir tu biografía!');

		let fetch = `SELECT * FROM usuarios WHERE iduser = ${userID}`

		db.get(fetch, (err, filas) => {
			if (err) return message.channel.send(`\`❌\` Error | **${err.message}**`)

			if (!filas) {
				let SQLInsert = `INSERT INTO usuarios(iduser, bio) VALUES(${userID}, '${texto}')`;

				db.run(SQLInsert, function(err) {
					if (err) return message.channel.send(`\`❌\` Error | **${err.message}**`)
					message.channel.send('`✅` => **Se acaba de crear tú biografía** | ' + fecha + '')
				});

				let sentencia1 = `SELECT * FROM usuarios WHERE iduser = ${userID}`

				db.get(sentencia1, (err, filas) => {
					if (err) return message.channel.send(`\`❌\` Error | **${err.message}**`)

					const embed = new Discord.MessageEmbed()
						.setTitle('Previsualización')
						.setDescription(`**ID** => ${filas.iduser}\n\n**Biografía** => ${filas.bio}`)
						.setColor('GREEN')
					message.channel.send(embed)
				});

			} else {
				let SQLUpdate = `UPDATE usuarios SET bio = '${texto}' WHERE iduser = ${userID}`

				db.run(SQLUpdate, function(err) {
					if (err) return message.channel.send(`\`❌\` Error | **${err.message}**`)
					message.channel.send('`✅` => **Se acaba de actualizar tu perfil** | ' + fecha + '')
				});

				let sentencia2 = `SELECT * FROM usuarios WHERE iduser = ${userID}`

				db.get(sentencia2, (err, filas) => {
					if (err) return message.channel.send(`\`❌\` Error | **${err.message}**`)

					const embed = new Discord.MessageEmbed()
						.setTitle('Previsualización')
						.setDescription(`**ID** => ${filas.iduser}\n\n**Biografía** => ${filas.bio}`)
						.setColor('GREEN')
					message.channel.send(embed)
				});
			}
		});
	}

	if (command === 'setcolor') {//AQUI XD
		let hexa = /^#([0-9A-F]{3}){1,2}$/i
		let fecha = `<t:${Math.round(Date.now() / 1000)}:F>`
		let userID = message.author.id
		let fetch = `SELECT * FROM usuarios WHERE iduser = ${userID}`
		let texto = args[0]
		var color = ``;

		if (!texto) {
			const colores = new Discord.MessageEmbed()
				.setTitle('Selección de colores - Perfil')
				.setDescription('Bienvenido a la sección de colores para perfiles de KaiBOT.\nPuedes elegir entre esta variedad de colores reaccionando a ellos. Si quieres un color personalizado, utiliza \`k!setcolor [color hexadecimal]\`. Puedes consultar los códigos hexadecimales en este enlace: [Click aquí](https://htmlcolorcodes.com/es/)\n\nRojo = 🔴\nAzul = 🔵\nNaranja = 🟠\nVerde = 🟢\nMarrón = 🟤\nColores random = 🔀\n\nNota: Si no has seleccionado ningún color, el color estará seleccionado como aleatorio.')
				.setColor('RANDOM')
				.setImage('https://cdn.discordapp.com/attachments/872101779121250304/877854839281954856/unknown.png')

			await message.channel.send(colores).then(async x => {
				x.react('🔴')
				x.react('🔵')
				x.react('🟠')
				x.react('🟢')
				x.react('🟤')
				x.react('🔀')

				var filter = (reaction, user) => {
					return ['🔴', '🔵', '🟠', '🟢', '🟤', '🔀'].includes(reaction.emoji.name) && user.id == message.author.id;
				};

				await x.awaitReactions(filter, { max: 1 }).then(collected => {
					var reaction = collected.first();

					if (reaction.emoji.name === '🔴') {
            reaction.users.remove(message.author)
            color = 'RED'
          }

					if (reaction.emoji.name === '🔵') {
            reaction.users.remove(message.author)
            color = 'BLUE'
            }

					if (reaction.emoji.name === '🟠') {
            reaction.users.remove(message.author)
            color = 'ORANGE'
          }
					if (reaction.emoji.name === '🟢') {
            reaction.users.remove(message.author)
            color = 'GREEN'
          }

					if (reaction.emoji.name === '🟤'){
            reaction.users.remove(message.author)
             color = 'BROWN'
          }

					if (reaction.emoji.name === '🔀') {
            reaction.users.remove(message.author)
            color = 'RANDOM'
            }

				});
			});
		} else {

			if (!hexa.test(texto)) return message.channel.send('\`❌\` Error | ¡Eso no es un color hexadecimal!')

			color = texto
		}

		db.get(fetch, function(err, filas) {
			if (err) return message.channel.send(`\`❌\` Error | **${err.message}**`)

			if (!filas) {

				let SQLInsert = `INSERT INTO usuarios(iduser, color) VALUES(${userID}, '${color}')`;

				db.run(SQLInsert, function(err) {
					if (err) return message.channel.send(`\`❌\` Error | **${err.message}**`)
					message.channel.send('`✅` => **Se acaba de seleccionar el color de tu perfil** | ' + fecha + '')
				});

			} else {

				let SQLUpdate = `UPDATE usuarios SET color = '${color}' WHERE iduser = ${userID}`

				db.run(SQLUpdate, function(err) {
					if (err) return message.channel.send(`\`❌\` Error | **${err.message}**`)
					message.channel.send('`✅` => **Se acaba de actualizar el color de tu perfil** | ' + fecha + '')
				});

			}

		});

	}

	if (command === 'perfil') {

		let usuario = (message.mentions.members && message.mentions.members.first()) || message.member
		let sentencia1 = `SELECT * FROM usuarios WHERE iduser = ${usuario.id}`
		let chico = usuario.roles.cache.has('833121444200054834')
		let chica = usuario.roles.cache.has('833121611838259200')
    let trapo = usuario.roles.cache.has('833154121309225000')
		let gen = ''
		var primage = ''
		let bal = await cliente.getUserBalance('833109071422292008', `${usuario.id}`)

		if (chico) {
			gen = '🚹 Chico'
			primage = 'https://cdn.discordapp.com/attachments/873961948281184309/877295400111988786/images.png'
		}

		if (chica) {
			gen = '🚺 Chica'
			primage = 'https://cdn.discordapp.com/attachments/873961948281184309/877295283166392350/2Q.png'
		}

		if (!chico && !chica) {
			gen = '❓ Indefinido'
			primage = 'https://cdn.discordapp.com/attachments/798289858497347627/877331920483123250/images.png'
		}

		if (chico && chica) {
			gen = '❓ Indefinido'
			primage = 'https://cdn.discordapp.com/attachments/798289858497347627/877331920483123250/images.png'
		}

    if (trapo || trapo && chica || trapo && chico) {
      gen = '❓ Indefinido'
			primage = 'https://cdn.discordapp.com/attachments/798289858497347627/877331920483123250/images.png'
    }


		db.get(sentencia1, (err, filas) => {
			if (err) return message.channel.send(`\`❌\` Error | **${err.message}**`)

			const embed = new Discord.MessageEmbed()
				.setTitle(`${message.guild.name} | Perfil`)
				.setAuthor(`Perfíl de ${usuario.user.username}`, usuario.user.displayAvatarURL({ dynamic: true }))
				.setFooter('Servicios - Perfiles')
				.setDescription(`${(filas && filas.bio) || `Sin descripción`}`)
				.addField('Género', `\`${gen}\``, true)
				.addField('Nombre', `${usuario.user.tag}`, true)
				.addField('Rango', `\`Rango E\``, true)
				.addField('Dinero en cartera', `${bal.cash} :chocolate_bar:`, true)
				.addField('Dinero en banco', `${bal.bank} :chocolate_bar:`, true)
				.addField('Dinero total | Ranking', `${bal.total} :chocolate_bar: | \`Puesto: ${!bal.rank ? 'Sin ranking' : bal.rank}\``, true)
				.setThumbnail(primage)
				.setColor((filas && filas.color) || 'RANDOM')

			message.channel.send(embed)
		});
	}

  if (command === 'logro') {
    let number = args[0]

    if (!text) {
      const ayuda = new Discord.MessageEmbed()
      .setTitle(message.guild.name+'- Logros')
      .setDescription('¡Bienvenido a la sección de logros de KaiBOT!\nLos logros son pequeños retos que te darán un logro en tu perfil y posibles recompensas como objetos canjeables o incluso chocobarritas.\n\nSi crees que cumples con los requisitos de algún logro, puedes usar \`k!logro [número del logro]\` y el bot verificará si cumples con los requisitos.')
      .addField()

      message.channel.send(ayuda)
    }
  }

  if (command === 'expendekai') {
      let sentencia1 = `SELECT * FROM objetos WHERE iduser = ${message.author.id}`

      db2.get(sentencia1, async function(err, filas) {
        if (err) message.channel.send(`\`❌\` Error | **${err.message}**`)

        if (!filas) {
          let SQLInsert = `INSERT INTO objetos(iduser, moneda) VALUES(${message.author.id}, '0')`;

				db2.run(SQLInsert, function(err) {
					if (err) return message.channel.send(`\`❌\` Error | **${err.message}**`)
        });

        return message.channel.send('¡No tienes monedas para tirar en la Expendekai!')
        } else {

        if (filas.moneda <= 0) return message.channel.send('No tienes monedas XD')

        }


              const expendekai = new Discord.MessageEmbed()
.setTitle('Expendekai')
.setDescription('¡Bienvenido a la Expendekai, donde pordrás conseguir montones de premios!\nPara girar la manivela yokai, es necesaria una moneda, la cual puedes conseguir haciendo logros.\n\n**Premios disponibles:** \`\`\`Cupones de descuento en yokai\nCupones de yokai gratis (de E hasta B)\nCupones de dinero\nCupones de descuento en dibujos\`\`\`')
.setColor('BLUE')
.setImage('https://cdn.discordapp.com/attachments/873961948281184309/878056946400391178/latest.png')
      await message.channel.send(expendekai).then(async x => {

        x.react('<:Wajimanyan:864534920441757707>')

				await x.awaitReactions((reaction, user) => {
          if (user.id === client.user.id || message.author.id != user.id) return;

          if (reaction.emoji.id === '864534920441757707') {
            x.reactions.removeAll()
            let SQLUpdate = `UPDATE objetos SET moneda = '${filas.moneda - 1}' WHERE iduser = ${message.author.id}`

            db2.run(SQLUpdate, function(err){
              if (err)  return message.channel.send(`\`❌\` Error | **${err.message}**`)
            });

            let recompensas = ['Cupón del 10% en yokai', 'Cupón de dinero', 'Cupón del 20% en dibujos', 'Cupón de yokai gratis']
            let azar = recompensas[Math.floor(Math.random() * recompensas.length)]

            const espera = new Discord.MessageEmbed()
            .setTitle('¡La Expendekai a dejado una bola!')
            .setDescription('Cu-cuesta un poco abrirla...')
            .setColor('BLUE')
            .setFooter('Moneda usada')
            .setImage('https://cdn.discordapp.com/attachments/798289858497347627/878084217291014194/unknown.png')
            x.edit(espera)


            setTimeout(function() {
             const result = new Discord.MessageEmbed()
            .setTitle('¡Has abierto la bola!')
            .setDescription(`¡WoW, hay objetos dentro! \n\n\`Objetos obtenidos: ${azar}\``)
            .setImage('https://cdn.discordapp.com/attachments/798289858497347627/878084816116019250/unknown.png')
            .setFooter('Bola abierta')
            .setColor('GREEN')

            x.edit(result)
            }, 5000)


            if (azar === 'Cupón del 10% en yokai') {
              if (!filas.cuponyokai) {
                let SQLUpdate1 = `UPDATE objetos SET cuponyokai = '1' WHERE iduser = ${message.author.id}`
                
                db2.run(SQLUpdate1, function(err){
                  if (err)  return message.channel.send(`\`❌\` Error | **${err.message}**`)
                });
              } else {
                let SQLUpdate2 = `UPDATE objetos SET cuponyokai = '${filas.cuponyokai + 1}' WHERE iduser = ${message.author.id}`
                
                db2.run(SQLUpdate2, function(err){
                  if (err)  return message.channel.send(`\`❌\` Error | **${err.message}**`)
                });
              }
            }

            if (azar === 'Cupón de dinero') {
              if (!filas.money) {
                let SQLUpdate3 = `UPDATE objetos SET money = '1' WHERE iduser = ${message.author.id}`
                
                db2.run(SQLUpdate3, function(err){
                  if (err)  return message.channel.send(`\`❌\` Error | **${err.message}**`)
                });
              } else {

                let SQLUpdate4 = `UPDATE objetos SET money = '${filas.money + 1}' WHERE iduser = ${message.author.id}`
                
                db2.run(SQLUpdate4, function(err){
                  if (err)  return message.channel.send(`\`❌\` Error | **${err.message}**`)
                });
              }
            }

                        if (azar === 'Cupón del 20% en dibujos') {
              if (!filas.cupondibujo) {
                let SQLUpdate3 = `UPDATE objetos SET cupondibujo = '1' WHERE iduser = ${message.author.id}`
                
                db2.run(SQLUpdate3, function(err){
                  if (err)  return message.channel.send(`\`❌\` Error | **${err.message}**`)
                });
              } else {

                let SQLUpdate4 = `UPDATE objetos SET cupondibujo = '${filas.cupondibujo + 1}' WHERE iduser = ${message.author.id}`
                
                db2.run(SQLUpdate4, function(err){
                  if (err)  return message.channel.send(`\`❌\` Error | **${err.message}**`)
                });
              }
            }

              if (azar === 'Cupón de yokai gratis') {
              if (!filas.yokai) {
                let SQLUpdate3 = `UPDATE objetos SET yokai = '1' WHERE iduser = ${message.author.id}`
                
                db2.run(SQLUpdate3, function(err){
                  if (err)  return message.channel.send(`\`❌\` Error | **${err.message}**`)
                });
              } else {

                let SQLUpdate4 = `UPDATE objetos SET yokai = '${filas.yokai + 1}' WHERE iduser = ${message.author.id}`
                
                db2.run(SQLUpdate4, function(err){
                  if (err)  return message.channel.send(`\`❌\` Error | **${err.message}**`)
                });
              }
            }

        }//cierre emoji id 
      });//cierre awaitReactions
    });//cierre .then
  })
}//cierre comando


if (command === 'getcoin') {
      let fecha = `<t:${Math.round(Date.now() / 1000)}:F>`
      let sentencia1 = `SELECT * FROM objetos WHERE iduser = ${message.author.id}`
      let sentencia2 = `SELECT * FROM objetos WHERE moneda`

      db2.get(sentencia1, function(err, filas) {
        if (err) message.channel.send(`${err.message}`)

        if (!filas) {

          let SQLInsert = `INSERT INTO objetos (iduser, moneda) VALUES(${message.author.id}, 1)`;

				db2.run(SQLInsert, function(err) {
					if (err) return message.channel.send(`\`❌\` Error | **${err.message}**`)

                    db2.get(sentencia1, function(err, filas) {
          message.channel.send('`✅` => **Se acaba de añadir el objeto \`Moneda\` a tu inventario. Cantidad => '+filas.moneda+'** | ' + fecha + '')
          });
				});

        } else {

          let SQLUpdate = `UPDATE objetos SET moneda = '${filas.moneda + 1}' WHERE iduser = ${message.author.id}`

				db2.run(SQLUpdate, function(err) {
					if (err) return message.channel.send(`\`❌\` Error | **${err.message}**`)


          db2.get(sentencia1, function(err, filas) {
          message.channel.send('`✅` => **Se acaba de añadir el objeto \`Moneda\` a tu inventario. Cantidad => '+filas.moneda+'** | ' + fecha + '')
          });
				});
       }
     });
    }


    if (command === 'inventario') {

let sentencia1 = `SELECT * FROM objetos WHERE iduser = ${message.author.id}`

db2.get(sentencia1, function(err, filas){
if (err) console.log(err.message)

message.channel.send(`**Cupones del 10% descuento en Tiendakai:** \`${(filas && filas.cuponyokai) || '0'}\`\n**Cupones de yokais gratis en Tiendakai:** \`${(filas && filas.yokai) || '0'}\`\n**Cupones del 20% descuento en la tienda de dibujos:** \`${(filas && filas.cupondibujo) || '0'}\`\n**Cupones de dinero:** \`${(filas && filas.money) || '0'}\`\n**Monedas:** \`${(filas && filas.moneda) || '0'}\``)

});

}

});
client.login('No voy a regalarles tokens xd')
const express = require(`express`), app = express();
app.get(`/`, async (req, res) => {
	return res.end(`Estoy despierto.`);
});
app.listen(8080);