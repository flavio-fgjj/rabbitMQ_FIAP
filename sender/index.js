const amqp = require('amqplib/callback_api')

amqp.connect('amqp://localhost', function(err, connect) {
  if(err) {
    throw err
  }

  connect.createChannel(function(errCC, channel) {
    if(errCC) {
        throw errCC
    }

    let queue = 'Dados'
    let msg = `
        {
            idcliente:"1050",
            nomecliente:"José Antônio",
            email:"jose@terra.com.br"
        }
    `

    channel.assertQueue(queue, {
        durable: false
    })

    channel.sendToQueue(queue, Buffer.from(msg))

    console.log(`[x] Enviado %s`, msg)
  })

  setTimeout(() => {
    connect.close()
    process.exit(0)
  }, 500)
})