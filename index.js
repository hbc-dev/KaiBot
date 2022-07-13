const Discord = require('discord.js');
const client = new Discord.Client({ intents: 32767 });
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database("./data.sqlite");
const db2 = new sqlite3.Database("./objects.sqlite");
const { Client } = require('unb-api');
const cliente = new Client('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcHBfaWQiOiI4NzcyOTg2NzQzNTc2MzYxNDUiLCJpYXQiOjE2MjkyMzQ3MDN9.YwxhxT1TfWLhwrmk0YCn_NmoNGD7WoYkChf51DRYd2U');

let SQLCreate = "CREATE TABLE IF NOT EXISTS usuarios (iduser TEXT, bio TEXT, games TEXT, color TEXT, image TEXT)";
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
			name: `Yo-Kai Cards - Verano 2022`
		}
	});
	console.log('Bot activo')
});


client.on('messageCreate', async message => {

	let prefix = 'k!'
	if (!message.guild) return;
	let baneados = ['848603824826220564']
	if (baneados.includes(message.author.id) && message.channel.id === '880455150232305684') {
		const castigo = new Discord.MessageEmbed()
			.setTitle('Sistema de castigos - Ban')
			.setDescription('¡Oh no! ¡Parece que estás baneado de la tienda!\nSi es que estas baneado, es porque incumpliste alguna norma, ¿no?')
			.setColor('RED')
			.setFooter('Sistema de castigos - Mensaje automático')
		message.author.send({embeds: [castigo]})
		message.delete()
	}

	if (baneados.includes(message.author.id)) return;

	if (message.content.match(`<@!?${client.user.id}>`)) {
		const ayuda = new Discord.MessageEmbed()
			.setTitle('¿Perdido?')
			.setDescription('¡Hola! Soy el bot de soporte de Tiendakai. Puedes ver mis comandos a través de \`k!help\`')
			.setFooter({text: 'Servicios - Tiendakai'})
			.setImage('https://cdn.discordapp.com/attachments/798289858497347627/872405779838300180/SI_3DS_YoKaiWatch_image1280w.png')
			.setColor('BLUE')
		message.channel.send({embeds: [ayuda]}).then(x => {
			setTimeout(function() {x.delete()}, 15000)
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
			.addField('**Perfiles**', `\`V.1\``, true)
			.addField('**Servidor**', `[Touch here](https://discord.gg/UZ3hz5U7pw)`, true)
			.addField('**Donación**', `[Touch here](https://www.paypal.me/pagos3217)`, true)
			.setColor('BLUE')
			.setFooter({text: 'Haga clic sobre Komasan para ver los comandos'})
			.setImage('https://cdn.discordapp.com/attachments/864944123148107796/864947428259135548/icon.jpg')
			.setURL('https://discord.gg/emK3mdkKcE')

		//EMBED DE COMANDOS
		const comandos = new Discord.MessageEmbed()
			.setTitle('Comandos KaiBOT')
			.setDescription('¡Bienvenido a la sección de comandos de KaiBOT! Aquí puedes consultar todos los comandos que ofrecemos.')
			.addField('Comandos - Tiendakai', `\`k!shop\` ➤ Servicio vencido.\n\n\`k!desc\` ➤ Con este comando puedes calcular el descuento de un algo. Uso correcto: \`k!desc [precio producto] [descuento]\``)
			.addField('Comandos - Perfiles', `\`k!perfil [(Opcional) @user]\` ➤ Con este comando puedes ver tu perfil y el de otros usuarios\n\n\`k!setbio [texto]\` ➤ Con este comando puedes añadir o actualizar tu biografía de tu perfil\n\n\`k!setcolor [(Opcional) color hexadecimal]\` ➤ Con este comando puedes cambiar el color de tu perfi\n\n\`k!setimage [URl de la imagen]\` ➤ Con este comando puedes cambiar tu foto de perfil`)
			.addField('Comandos - General', `\`k!help\` ➤ Con este comando puedes ver información del bot, una previsualización de la tienda y la lista de comandos.`)
			.setColor('BLUE')
			.setImage('https://cdn.discordapp.com/attachments/798289858497347627/872452098585940008/capitulo_12551.png')
			.setFooter({text: 'Haga clic sobre el Yokai Watch para volver al inicio'})


		//EMBED DE TIENDA
		const tienda = new Discord.MessageEmbed()
			.setTitle('Tiendakai')
			.setDescription('Servicio finalizado. Tiendakai vuelve reinventada este **Verano 2022**\n\n[Servidor](https://discord.gg/by4hy6Rm88) | [Donaciones](https://www.paypal.me/pagos3217) | **Contacto:** \`167#0353\`')
			.setColor('RED')


		//EMBED DE CREDITOS


		message.channel.send({embeds: [ayuda]}).then(x => {
			x.react('<:Koma_izq:877645584524267530>')
			x.react('<:YokaiWatch:798632470429433946>')
			x.react('<:Jiba_der:877645584595578960>')

			x.awaitReactions({filter: (reaction, user) => {
				//COMANDOS
				if (user.id === client.user.id || message.author.id != user.id) return;
				if (reaction.emoji.id === '877645584524267530') {
					x.edit({embeds: [comandos]})
					reaction.users.remove(message.author)
				}
				//TIENDA
				if (reaction.emoji.id === '877645584595578960') {
					x.edit({embeds: [tienda]})
					reaction.users.remove(message.author)
				}
				//VUELTA AL HOME
				if (reaction.emoji.id === '798632470429433946') {
					x.edit({embeds: [ayuda]})
					reaction.users.remove(message.author)
				}
				//CREDITOS
			}});
		});
	}

	if (command == 'shop') {
		//GENERAL
		const tienda = new Discord.MessageEmbed()
			.setTitle('Tiendakai')
			.setDescription('Servicio finalizado. Tiendakai vuelve reinventada este **Verano 2022**\n\n[Servidor](https://discord.gg/by4hy6Rm88) | [Donaciones](https://www.paypal.me/pagos3217) | **Contacto:** \`167#0353\`')
			.setColor('RED')

		message.channel.send({embeds: [tienda]})
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
			.setFooter({text: 'El precio en pantalla es el precio sumado con el descuento'})
		message.channel.send({embeds: [result]})
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
					message.channel.send({embeds: [embed]})
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
					message.channel.send({embeds: [embed]})
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

			await message.channel.send({embeds: [colores]}).then(async x => {
				x.react('🔴')
				x.react('🔵')
				x.react('🟠')
				x.react('🟢')
				x.react('🟤')
				x.react('🔀')

				var filter = (reaction, user) => {
					return ['🔴', '🔵', '🟠', '🟢', '🟤', '🔀'].includes(reaction.emoji.name) && user.id == message.author.id;
				};

				await x.awaitReactions({filter, max: 1}).then(collected => {
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
		let data = `SELECT * FROM usuarios WHERE iduser = ${usuario.id}`
		let inventary = `SELECT * FROM objetos WHERE iduser = ${usuario.id}`
		let chico = usuario.roles.cache.has('880455085828739092')
		let chica = usuario.roles.cache.has('880455086273351751')
    let trapo = usuario.roles.cache.has('880455087334506497')
		let e = usuario.roles.cache.has('833149557658353694')
		let d = usuario.roles.cache.has('833144476939583528')
		let c = usuario.roles.cache.has('833144475135770685')
		let b = usuario.roles.cache.has('833144463823208448')
		let a = usuario.roles.cache.has('833144453283446855')
		let s = usuario.roles.cache.has('833131238545424405')
		let rango = ''
		let gen = ''
		var primage = ''
		let bal = await cliente.getUserBalance('833109071422292008', `${usuario.id}`)


		db.get(data, async (err, filas) => {
			if (err) return message.channel.send(`\`❌\` Error | **${err.message}**`)

			if (s) rango = 'Rango S'
			if (a) rango = 'Rango A'
			if (b) rango = 'Rango B'
			if (c) rango = 'Rango C'
			if (d) rango = 'Rango D'
			if (e) rango = 'Rango E'

			if (chico) {
				gen = '🚹 Chico'

					primage = (filas && filas.image) || 'https://cdn.discordapp.com/attachments/873961948281184309/877295400111988786/images.png'
				}

			if (chica) {
				gen = '🚺 Chica'

				primage = (filas && filas.image) || 'https://cdn.discordapp.com/attachments/873961948281184309/877295283166392350/2Q.png'
		}

			if (!chico && !chica) {
				gen = '❓ Indefinido'

				primage = (filas && filas.image) ||'https://cdn.discordapp.com/attachments/798289858497347627/877331920483123250/images.png'
		}

			if (chico && chica) {
				gen = '❓ Indefinido'

					primage = (filas && filas.image) ||'https://cdn.discordapp.com/attachments/798289858497347627/877331920483123250/images.png'
			}

			if (trapo || trapo && chica || trapo && chico) {
				gen = '❓ Indefinido'

						primage = (filas && filas.image) ||'https://cdn.discordapp.com/attachments/798289858497347627/877331920483123250/images.png'
			}

			const perfil = new Discord.MessageEmbed()
				.setTitle(`${message.guild.name} | Perfil`)
				.setAuthor({name: `Perfil de ${usuario.user.username}`, iconURL: usuario.user.displayAvatarURL({ dynamic: true })})
				.setFooter({text: 'Servicios - Perfiles'})
				.setDescription(`${(filas && filas.bio) || `Sin descripción`}`)
				.addField('Género', `\`${gen}\``, true)
				.addField('Nombre', `${usuario.user.tag}`, true)
				.addField('Rango', `\`${rango}\``, true)
				.addField('Dinero en cartera', `${bal.cash} :chocolate_bar:`, true)
				.addField('Dinero en banco', `${bal.bank} :chocolate_bar:`, true)
				.addField('Dinero total | Ranking', `${bal.total} :chocolate_bar: | \`Puesto: ${!bal.rank ? 'Sin ranking' : bal.rank}\``, true)
				.setThumbnail(primage)
				.setColor((filas && filas.color) || 'RANDOM')

			await message.channel.send({embeds: [perfil]}).then(async x => {
				x.react('<:YokaiWatch:798632470429433946>')
				x.react('<:inventario:880833816564998204>')

				await x.awaitReactions({filter: (reaction, user) => {
				if (user.id === client.user.id || message.author.id != user.id) return;

					if (reaction.emoji.id === '880833816564998204') {

						db2.get(inventary, async (err, filas2) => {
							if (err) return message.channel.send(`\`❌\` Error | **${err.message}**`)
							reaction.users.remove(message.author)

							const inventario = new Discord.MessageEmbed()
							.setTitle(`${message.guild.name} | Inventario`)
							.setAuthor({name: `Perfil de ${usuario.user.username}`, iconURL: usuario.user.displayAvatarURL({ dynamic: true })})
							.setFooter({text:'Servicios - Perfiles'})
							.addField('Monedas de Expendekai', `\`${(filas2 && filas2.moneda) || '0'}\` <:moneda:880580517605572638>`, true)
							.addField('Cupones del 10% en Tiendakai', `\`${(filas2 && filas2.cuponyokai) || '0'}\` 🎟️`, true)
							.addField('Cupones de yokais gratis en Tiendakai', `\`${(filas2 && filas2.yokai) || '0'}\` 🎟️`, true)
							.addField('Cupones del 20% descuento en la tienda de dibujos', `\`${(filas2 && filas2.cupondibujo) || '0'}\` 🎟️`, true)
							.addField('Cupones de dinero', `\`${(filas2 && filas2.money) || '0'}\` 🎟️`, true)
							.addField('Código de amigo', `**En desarrollo**`, true)
							.setThumbnail(primage)
							.setColor((filas && filas.color) || 'RANDOM')

							await x.edit({embeds: [inventario]})
						});
					}

						if (reaction.emoji.id === '798632470429433946') {
							reaction.users.remove(message.author)
							 x.edit({embeds: [perfil]})
						}
				}});
			});
		});
	}

  if (command === 'logro') {
    let number = args[0]

    if (!text) {
      const ayuda = new Discord.MessageEmbed()
      .setTitle(message.guild.name+'- Logros')
      .setDescription('¡Bienvenido a la sección de logros de KaiBOT!\nLos logros son pequeños retos que te darán un logro en tu perfil y posibles recompensas como objetos canjeables o incluso chocobarritas.\n\nSi crees que cumples con los requisitos de algún logro, puedes usar \`k!logro [número del logro]\` y el bot verificará si cumples con los requisitos.')
      .addField()

      message.channel.send({embeds: [ayuda]})
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

        return message.channel.send('`❌` Error | ¡No tienes monedas para tirar en la Expendekai!')
        } else {

        if (filas.moneda <= 0) return message.channel.send('`❌` Error | ¡No tienes monedas para tirar en la Expendekai!')

        }


              const expendekai = new Discord.MessageEmbed()
.setTitle('Expendekai')
.setDescription('¡Bienvenido a la Expendekai, donde pordrás conseguir montones de premios!\nPara girar la manivela yokai, es necesaria una moneda, la cual puedes conseguir haciendo logros.\n\n**Premios disponibles:** \`\`\`Cupones de descuento en yokai\nCupones de yokai gratis (de E hasta B)\nCupones de dinero\nCupones de descuento en dibujos\`\`\`')
.setColor('BLUE')
.setImage('https://cdn.discordapp.com/attachments/873961948281184309/878056946400391178/latest.png')
      await message.channel.send({embeds: [expendekai]}).then(async x => {

        x.react('<:moneda:880580517605572638>')

				await x.awaitReactions((reaction, user) => {
          if (user.id === client.user.id || message.author.id != user.id) return;

          if (reaction.emoji.id === '880580517605572638') {
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
            x.edit({embeds: [espera]})


            setTimeout(function() {
             const result = new Discord.MessageEmbed()
            .setTitle('¡Has abierto la bola!')
            .setDescription(`¡WoW, hay objetos dentro! \n\n\`Objetos obtenidos: ${azar}\``)
            .setImage('https://cdn.discordapp.com/attachments/798289858497347627/878084816116019250/unknown.png')
            .setFooter('Bola abierta')
            .setColor('GREEN')

            x.edit({embeds: [result]})
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

if (command === 'setimage') {
    let text = args[0]

  if (!text) return message.channel.send(`\`❌\` Error 365| **¡Debes introducir un enlace!**`)
  if(!text.match(/https?:\/\/.*\.(?:png|jpg|jpeg|svg|webp|gif)/g)) return message.channel.send(`\`❌\` Error 324| **¡Debes introducir un enlace válido!**`)


    let SQLselect = `SELECT * FROM usuarios WHERE iduser = ${message.author.id}`
  const result = new Discord.MessageEmbed()
  .setTitle('Imagen seleccionada')
  .setImage(''+text+'')
  .setColor('GREEN')
  .setFooter({text: 'Configuración - Perfiles'})




    db.get(SQLselect, function(err, filas) {
        if (err) return message.channel.send(`\`❌\` Error | **${err.message}**`)
				message.delete()

        if (!filas) {//si no hay
            let SQLInsert = `INSERT INTO usuarios (iduser, image) VALUES(${message.author.id}, '${text}')`;

        db.run(SQLInsert, function(err) {
            if (err) return message.channel.send(`\`❌\` Error | **${err.message}**`)
      message.channel.send({embeds: [result]})
        });
  } else {//pero si hay
    let SQLupdate = `UPDATE usuarios SET image = '${text}' WHERE iduser = ${message.author.id}`

    db.run(SQLupdate, function(err){
      if (err) return message.channel.send(`\`❌\` Error | **${err.message}**`)
      message.channel.send({embeds: [result]})
    });
    }
    });
}

if (command === 'socios') {
    const home = new Discord.MessageEmbed()
    .setTitle('Socios de la comunidad')
    .setColor('BLUE')
    .setFooter({text: 'Servicios - Socios'})
    .setDescription('¡Bienvenido a la sección de socios! Aquí puedes visualizar a los socios de la comunidad.')
    .addField('Pokeyoka | Youtuber', `Primer socio de la comunidad. Haz click en el botón <:pokeyoka:882309801130995712> para ver su perfil`)
		.addField('Jibakai', `Segundo socio de la comunidad. Haz click en el botón <:Jibakai:945436945629188167> para ver su perfil`)
      message.channel.send({embeds: [home]}).then(x => {

        x.react('<:YokaiWatch:798632470429433946>')
        x.react('<:pokeyoka:882309801130995712>')
				x.react('<:Jibakai:945436945629188167>')

        x.awaitReactions({filter: (reaction, user) => {
          if (user.id === client.user.id || message.author.id != user.id) return;

          if (reaction.emoji.id === '882309801130995712') {
            const pokeyoka = new Discord.MessageEmbed()
            .setTitle('Pokeyoka | Youtuber')
            .setDescription('El canal de vuestro poketuver y yokaituber favorito, te encantará mi contenido.\n\nSuscríbete para disfrutar mas de mi contenido y pasar un buen rato.')
            .addField('Youtube <:youtube:882374727786717244>', `[Canal](https://www.youtube.com/channel/UC39CNQMrEL85Eyp9y-2OQqQ/featured)`, true)
            .addField('Streamloots <:streamloots:882374770170155008>', `[Click here](https://www.streamloots.com/pokeyoka)`, true)
            .setColor('BLUE')
            .setThumbnail('https://cdn.discordapp.com/attachments/798289858497347627/882306918037737492/pokeyoka_logo.png')
            .setImage('https://cdn.discordapp.com/attachments/880455126974869574/882295741270331462/unknown.png')
            .setFooter({text: 'Servicios - Socios'})
            .setURL('https://www.youtube.com/channel/UC39CNQMrEL85Eyp9y-2OQqQ/featured')
            x.edit({embeds: [pokeyoka]})
  					reaction.users.remove(message.author)
          }

					else if (reaction.emoji.id === '945436945629188167') {
						const jibakai = new Discord.MessageEmbed()
						.setTitle('Jibakai | Youtuber')
						.setDescription('El canal de vuestro PokéTuber y Yo-kaiTuber favorito, te encantará mi contenido.\n\nSuscríbete para disfrutar mas de mi contenido y pasar un buen rato.')
						.addField('Youtube <:youtube:882374727786717244>', `[Canal](https://www.youtube.com/channel/UCWrTo3BvL1Pd_e9WhDlGU9g/featured)`, true)
						.addField('Twitter <:Twitter:945439545518862386>', `[Click here](https://twitter.com/blaze_jordi)`, true)
						.setColor('BLUE')
						.setThumbnail('https://cdn.discordapp.com/attachments/945362316625608724/945436873428463686/descarga.png')
						.setImage('https://cdn.discordapp.com/attachments/945362316625608724/945437805155340368/Banner_canal_Jibakaii.jpg')
						.setFooter({text: 'Servicios - Socios'})
						.setURL('https://www.youtube.com/channel/UCWrTo3BvL1Pd_e9WhDlGU9g/featured')
						x.edit({embeds: [jibakai]})
						reaction.users.remove(message.author)
					}

          else if (reaction.emoji.id === '798632470429433946') {
            x.edit({embeds: [home]})
            reaction.users.remove(message.author)
          }

        }});
      });
    }
});
client.login('Nzc3NTAwOTQ5ODMyMDA3Njky.X7EWLw.V1ZA3xl3Jo1GFqvXhnv221IpGf4')
const express = require(`express`), app = express();
app.get(`/`, async (req, res) => {
	return res.end(`Estoy despierto.`);
});
app.listen(8080);
