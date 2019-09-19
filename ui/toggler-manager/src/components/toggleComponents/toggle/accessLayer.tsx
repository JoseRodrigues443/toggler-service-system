export class ReceiverAccessLayer {

    /**
     * RabbitMQ access layer of toggler
     */
    public readonly amqp = require('amqplib/callback_api');

    /**
     * Channel  of receiver access layer
     */
    public channel: any = null;

    constructor(queue: string) {
        this.openConnection(queue);
    }

    /**
     * Opens connection
     * @param access 
     */
    public openConnection(queue: string, access: string = 'amqp://localhost') {
        this.amqp.connect(access, (error0: any, connection: any) => {
            if (error0) {
                throw error0;
            }
            this.createChannel(connection, queue);
        });
    }
    /**
     * Creates channel
     * @param connection
     */
    public createChannel(connection: any, queue: string) {
        connection.createChannel((error1: any, channel: any) => {
            if (error1) {
                throw error1;
            }
            this.channel = channel;
            var exchange = 'logs';

            channel.assertExchange(exchange, 'fanout', {
                durable: false
            });

            channel.assertQueue(queue, {
                exclusive: true
            }, (error2: any, q: any) => {
                if (error2) {
                    throw error2;
                }
                console.log(" [*] Waiting for messages in %s.", q.queue);
                channel.bindQueue(q.queue, exchange, '');

                channel.consume(q.queue, function (msg: any) {
                    if (msg.content) {
                        console.log(" [x] %s", msg.content.toString());
                    }
                }, {
                    noAck: true
                });
            });
        });
    }
}