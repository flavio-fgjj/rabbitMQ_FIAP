const amqp = require('amqplib/callback_api')

amqp.connect('amqp://localhost', function(err, connection) {
  if(err) {
    throw err
  }

  connection.createChannel(function(error, channel) {
    if(error) {
      throw error
    }

    let queue = 'Dados'

    channel.assertQueue(queue, {
      durable: false
    })

    console.log(` [*] Aguardando os dados da fila %s. Para sair aperte CTRL+C`, queue)

    channel.consume(queue, function(msg) {
      console.log(` [x] Recebido %s`, msg.content.toString())
    }, {
      noAck: true
    })
  })
})