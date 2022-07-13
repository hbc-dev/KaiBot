//LOGROS V.1

//FUERA
const dbl = new sqlite3.Database("./data/logros.sqlite")

let SQLogros = "CREATE TABLE IF NOT EXISTS logros (iduser TEXT, uno TEXT, dos TEXT, tres TEXT, cuatro TEXT, cinco TEXT, seis TEXT)";

dbl.run(SQLogros, function(err) {
    if (err) return console.error(err.message)
});
//


if (command === 'logros') {

  const logro_conseguido = new Discord.MessageEmbed()
  .setTitle('¡Ups, ya tienes ese logro!')
  .setDescription('Parece que ya tienes el logro #'+args[0]+', prueba a ver los demás logros disponibles')
  .setColor('BLUE')
  .setFooter('Servicios - Logros')

  const fount = new Discord.MessageEmbed()
  .setColor('RED')
  .setFooter('Servicios - Logros')
  .setTitle('¡Vaya, nos hemos topado con un error!')
  .setDescription('Parece que `'+args[0]+'` no es un logro, vuelve a mirar la lista de logros')

  let logro_numero = args[0]
  let user = message.member
  let numeros = ['1', '2', '3', '4', '5', '6']
  let s = user.roles.cache.has('881307049391165462')
  let a = user.roles.cache.has('881307082270322689')
  let b = user.roles.cache.has('881307088473694251')
  let c = user.roles.cache.has('881307093234253864')
  let d = user.roles.cache.has('881307096451285074')
  let e = user.roles.cache.has('881307099005603900')
  let bal = await cliente.getUserBalance('833109071422292008', `${user.user.id}`)

  let SQLget = `SELECT * FROM logros WHERE iduser = ${user.user.id}`
  let SQLget2 = `SELECT * FROM objetos WHERE iduser = ${user.user.id}`

  db3.get(SQLget2, function(err, filas) {
    if (err) return message.channel.send('`❌` ¡Nos hemos topado con un error! | `'+err.message+'`')
    if (!filas) {

      let SQLInsert2 = `INSERT INTO objetos (iduser, cuponyokai, money, yokai, cupondibujo, moneda) VALUES(${user.user.id}, 0, 0, 0, 0, 0)`

      db3.run(SQLInsert2, function(err) {
        if (err) return message.channel.send('`❌` ¡Nos hemos topado con un error! | `'+err.message+'`')
      });
    }
  });

  dbl.get(SQLget, function(err, filas) {
    if (err) return message.channel.send('`❌` ¡Nos hemos topado con un error! | `'+err.message+'`')
    if (!filas) {

      let SQLInsert = `INSERT INTO logros (iduser, uno, dos, tres, cuatro, cinco, seis) VALUES(${user.user.id}, false, false, false, false, false, false)`

      dbl.run(SQLInsert, function(err) {
        if (err) return message.channel.send('`❌` ¡Nos hemos topado con un error! | `'+err.message+'`')
      });
    }
  });


  if (!logro_numero) {
    const embed = new Discord.MessageEmbed()
    .setTitle('Logros <:logro:881300059570987068>')
    .setDescription('¡Bienvenido a la sección de logros del bot! Te voy mostrar los premios que puedes obtener en cada logro.\n\nPara obtener un logro, haz el comando `k!Logro [Número de logro]`')
    .addField('#1 <:logro:881300059570987068> | Empieza la aventura', '*Para poder obtener este rol debes haber obtenido el rango `E`*\n```js\n Recompensas\nx1 Moneda```')
    .addField('#2 <:logro:881300059570987068> | ¡Subida a rango D!', '*Para poder obtener este rol debes haber obtenido el rango `D`*\n```js\nRecompensas\nx1 Moneda```')
    .addField('#3 <:logro:881300059570987068> | ¡Subida a rango C!', '*Para poder obtener este rol debes haber obtenido el rango `C`*\n```js\nRecompensas\nx1 Moneda```')
    .addField('#4 <:logro:881300059570987068> | ¡Subida a rango B!', '*Para poder obtener este rol debes haber obtenido el rango `B`*\n```js\nRecompensas\nx2 Monedas\nx3000 🍫```')
    .addField('#5 <:logro:881300059570987068> | ¡Subida a rango A!', '*Para poder obtener este rol debes haber obtenido el rango `A`*\n```js\nRecompensas\nx5 Monedas\nx8000 🍫\nx1 Cupón Yokai gratis Tiendakai```')
    .addField('#6 <:logro:881300059570987068> | ¡Subida a rango S!', '*Para poder obtener este rol debes haber obtenido el rango `S`*\n```js\nRecompensas\nx10 Monedas\nx15000 🍫\nx3 Cupones Yokai gratis Tiendakai```')
    .setColor('BLUE')
    return message.channel.send(embed)
  }

  if (!numeros.includes(logro_numero)) return message.channel.send(fount)

  if (logro_numero == '1') {//LOGRO 1
    var recompensas = 'x1 Moneda'
    var nombre_logro = 'Empieza la aventura'

    const logro = new Discord.MessageEmbed()
    .setTitle('Logro #'+args[0]+' | ¡Nuevo logro!')
    .setDescription('¡Has desbloqueado el logro `'+nombre_logro+'`! Estas son tus recompensas crack:')
    .addField('Recompensas', '```js\n'+recompensas+'```')
    .setFooter('Servicios - Logros')
    .setColor('GREEN')
//COMPROBACION SI TIENE O NO
    dbl.get(SQLget, function(err, filas) {
      if (err) return message.channel.send('`❌` ¡Nos hemos topado con un error! | `'+err.message+'`')

      if (filas && filas.uno == 'Empieza la aventura') {
        return message.channel.send(logro_conseguido)
      } else {

        if (!e) return message.channel.send('No puedes obtener el logro aún, te falta el rol `RANGO E`')
//DAMOS EL LOGRO Y OBJETOS AL USUARIO
        let SQLUpdate = `UPDATE logros SET uno = 'Empieza la aventura' WHERE iduser = ${user.user.id}`

        db3.get(SQLget2, function(err, filas) {
          if (err) return message.channel.send('`❌` ¡Nos hemos topado con un error! | `'+err.message+'`')

          let SQLUpdate2 = `UPDATE objetos SET moneda = ${filas.moneda + 1} WHERE iduser = ${user.user.id}`

          db3.run(SQLUpdate2, function(err) {
            if (err) return message.channel.send('`❌` ¡Nos hemos topado con un error! | `'+err.message+'`')
          });
        });

        dbl.run(SQLUpdate, function(err) {
          if (err) return message.channel.send('`❌` ¡Nos hemos topado con un error! | `'+err.message+'`')
          return message.channel.send(logro)
        });
      }
    });
  }

  if (logro_numero == '2') {//LOGRO 2
    var recompensas = 'x1 Moneda'
    var nombre_logro = '¡Subida a rango D!'

    const logro = new Discord.MessageEmbed()
    .setTitle('Logro #'+args[0]+' | ¡Nuevo logro!')
    .setDescription('¡Has desbloqueado el logro `'+nombre_logro+'`! Estas son tus recompensas crack:')
    .addField('Recompensas', '```js\n'+recompensas+'```')
    .setFooter('Servicios - Logros')
    .setColor('GREEN')
//COMPROBACION SI TIENE O NO
    dbl.get(SQLget, function(err, filas) {
      if (err) return message.channel.send('`❌` ¡Nos hemos topado con un error! | `'+err.message+'`')

      if (filas && filas.dos == '¡Subida a rango D!') {
        return message.channel.send(logro_conseguido)
      } else {

        if (!d) return message.channel.send('No puedes obtener el logro aún, te falta el rol `RANGO D`')
//DAMOS EL LOGRO Y OBJETOS AL USUARIO
        let SQLUpdate = `UPDATE logros SET dos = '¡Subida a rango D!' WHERE iduser = ${user.user.id}`

        db3.get(SQLget2, function(err, filas) {
          if (err) return message.channel.send('`❌` ¡Nos hemos topado con un error! | `'+err.message+'`')

          let SQLUpdate2 = `UPDATE objetos SET moneda = ${filas.moneda + 1} WHERE iduser = ${user.user.id}`

          db3.run(SQLUpdate2, function(err) {
            if (err) return message.channel.send('`❌` ¡Nos hemos topado con un error! | `'+err.message+'`')
          });
        });

        dbl.run(SQLUpdate, function(err) {
          if (err) return message.channel.send('`❌` ¡Nos hemos topado con un error! | `'+err.message+'`')
          return message.channel.send(logro)
        });
      }
    });
  }

  if (logro_numero == '3') {//LOGRO 3
    var recompensas = 'x1 Moneda'
    var nombre_logro = '¡Subida a rango C!'

    const logro = new Discord.MessageEmbed()
    .setTitle('Logro #'+args[0]+' | ¡Nuevo logro!')
    .setDescription('¡Has desbloqueado el logro `'+nombre_logro+'`! Estas son tus recompensas crack:')
    .addField('Recompensas', '```js\n'+recompensas+'```')
    .setFooter('Servicios - Logros')
    .setColor('GREEN')
//COMPROBACION SI TIENE O NO
    dbl.get(SQLget, function(err, filas) {
      if (err) return message.channel.send('`❌` ¡Nos hemos topado con un error! | `'+err.message+'`')

      if (filas && filas.tres == '¡Subida a rango C!') {
        return message.channel.send(logro_conseguido)
      } else {

        if (!c) return message.channel.send('No puedes obtener el logro aún, te falta el rol `RANGO C`')
//DAMOS EL LOGRO Y OBJETOS AL USUARIO
        let SQLUpdate = `UPDATE logros SET tres = '¡Subida a rango C!' WHERE iduser = ${user.user.id}`

        db3.get(SQLget2, function(err, filas) {
          if (err) return message.channel.send('`❌` ¡Nos hemos topado con un error! | `'+err.message+'`')

          let SQLUpdate2 = `UPDATE objetos SET moneda = ${filas.moneda + 1} WHERE iduser = ${user.user.id}`

          db3.run(SQLUpdate2, function(err) {
            if (err) return message.channel.send('`❌` ¡Nos hemos topado con un error! | `'+err.message+'`')
          });
        });

        dbl.run(SQLUpdate, function(err) {
          if (err) return message.channel.send('`❌` ¡Nos hemos topado con un error! | `'+err.message+'`')
          return message.channel.send(logro)
        });
      }
    });
  }

  if (logro_numero == '4') {//LOGRO 4
    var recompensas = 'x2 Moneda\n3000 🍫'
    var nombre_logro = '¡Subida a rango B!'

    const logro = new Discord.MessageEmbed()
    .setTitle('Logro #'+args[0]+' | ¡Nuevo logro!')
    .setDescription('¡Has desbloqueado el logro `'+nombre_logro+'`! Estas son tus recompensas crack:')
    .addField('Recompensas', '```js\n'+recompensas+'```')
    .setFooter('Servicios - Logros')
    .setColor('GREEN')
//COMPROBACION SI TIENE O NO
    dbl.get(SQLget, function(err, filas) {
      if (err) return message.channel.send('`❌` ¡Nos hemos topado con un error! | `'+err.message+'`')

      if (filas && filas.cuatro == '¡Subida a rango B!') {
        return message.channel.send(logro_conseguido)
      } else {

        if (!b) return message.channel.send('No puedes obtener el logro aún, te falta el rol `RANGO B`')
//DAMOS EL LOGRO Y OBJETOS AL USUARIO
        let SQLUpdate = `UPDATE logros SET cuatro = '¡Subida a rango B!' WHERE iduser = ${user.user.id}`

        db3.get(SQLget2, function(err, filas) {
          if (err) return message.channel.send('`❌` ¡Nos hemos topado con un error! | `'+err.message+'`')

          let SQLUpdate2 = `UPDATE objetos SET moneda = ${filas.moneda + 2} WHERE iduser = ${user.user.id}`

          db3.run(SQLUpdate2, async function(err) {
            if (err) return message.channel.send('`❌` ¡Nos hemos topado con un error! | `'+err.message+'`')

            await cliente.setUserBalance('833109071422292008', user.user.id, {bank: `${bal.bank + 3000}` })
          });
        });

        dbl.run(SQLUpdate, function(err) {
          if (err) return message.channel.send('`❌` ¡Nos hemos topado con un error! | `'+err.message+'`')
          return message.channel.send(logro)
        });
      }
    });
  }

  if (logro_numero == '5') {//LOGRO 5
    var recompensas = 'x5 Moneda\nx1 Cupón de Yokai gratis\n8000 🍫'
    var nombre_logro = '¡Subida a rango A!'

    const logro = new Discord.MessageEmbed()
    .setTitle('Logro #'+args[0]+' | ¡Nuevo logro!')
    .setDescription('¡Has desbloqueado el logro `'+nombre_logro+'`! Estas son tus recompensas crack:')
    .addField('Recompensas', '```js\n'+recompensas+'```')
    .setFooter('Servicios - Logros')
    .setColor('GREEN')
//COMPROBACION SI TIENE O NO
    dbl.get(SQLget, function(err, filas) {
      if (err) return message.channel.send('`❌` ¡Nos hemos topado con un error! | `'+err.message+'`')

      if (filas && filas.cinco == '¡Subida a rango A!') {
        return message.channel.send(logro_conseguido)
      } else {

        if (!a) return message.channel.send('No puedes obtener el logro aún, te falta el rol `RANGO A`')
//DAMOS EL LOGRO Y OBJETOS AL USUARIO
        let SQLUpdate = `UPDATE logros SET cinco = '¡Subida a rango A!' WHERE iduser = ${user.user.id}`

        db3.get(SQLget2, function(err, filas) {
          if (err) return message.channel.send('`❌` ¡Nos hemos topado con un error! | `'+err.message+'`')

          let SQLUpdate2 = `UPDATE objetos SET moneda = ${filas.moneda + 5}, yokai = ${filas.yokai + 1} WHERE objetos.iduser = ${user.user.id}`

          db3.run(SQLUpdate2, async function(err) {
            if (err) return message.channel.send('`❌` ¡Nos hemos topado con un error! | `'+err.message+'`')

            await cliente.setUserBalance('833109071422292008', user.user.id, {bank: `${bal.bank + 8000}` })
          });
        });

        dbl.run(SQLUpdate, function(err) {
          if (err) return message.channel.send('`❌` ¡Nos hemos topado con un error! | `'+err.message+'`')
          return message.channel.send(logro)
        });
      }
    });
  }

  if (logro_numero == '6') {//LOGRO 6
    var recompensas = 'x10 Moneda\nx3 Cupón Yokai gratis\n15.000 🍫'
    var nombre_logro = '¡Subida a rango S!'

    const logro = new Discord.MessageEmbed()
    .setTitle('Logro #'+args[0]+' | ¡Nuevo logro!')
    .setDescription('¡Has desbloqueado el logro `'+nombre_logro+'`! Estas son tus recompensas crack:')
    .addField('Recompensas', '```js\n'+recompensas+'```')
    .setFooter('Servicios - Logros')
    .setColor('GREEN')
//COMPROBACION SI TIENE O NO
    dbl.get(SQLget, function(err, filas) {
      if (err) return message.channel.send('`❌` ¡Nos hemos topado con un error! | `'+err.message+'`')

      if (filas && filas.seis == '¡Subida a rango S!') {
        return message.channel.send(logro_conseguido)
      } else {

        if (!s) return message.channel.send('No puedes obtener el logro aún, te falta el rol `RANGO S`')
//DAMOS EL LOGRO Y OBJETOS AL USUARIO
        let SQLUpdate = `UPDATE logros SET seis = '¡Subida a rango S!' WHERE iduser = ${user.user.id}`

        db3.get(SQLget2, function(err, filas) {
          if (err) return message.channel.send('`❌` ¡Nos hemos topado con un error! | `'+err.message+'`')

          let SQLUpdate2 = `UPDATE objetos SET moneda = ${filas.moneda + 10}, yokai = ${filas.yokai + 3} WHERE objetos.iduser = ${user.user.id}`

          db3.run(SQLUpdate2, async function(err) {
            if (err) return message.channel.send('`❌` ¡Nos hemos topado con un error! | `'+err.message+'`')

            await cliente.setUserBalance('833109071422292008', user.user.id, {bank: `${bal.bank + 15000}` })
          });
        });

        dbl.run(SQLUpdate, function(err) {
          if (err) return message.channel.send('`❌` ¡Nos hemos topado con un error! | `'+err.message+'`')
          return message.channel.send(logro)
        });
      }
    });
  }
}
/////////////////////////////////////
