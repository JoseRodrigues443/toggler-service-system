import * as amqp from "amqplib/callback_api";



/**
 * Receiver access layer
 * 
 * **WARNING:**
 * - amqp only works on a NodeJS ENV (network dependencies that does not exist in the browser)
 *      - This is useful in server side rendering were the NodeJS env is available
 * - as an alternative, stomp is used as a layer to access in the browser
 */
export class ReceiverAccessLayer {

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
        amqp.connect(access, (error0: any, connection: any) => {
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

                channel.consume(q.queue, (msg: any) => {
                    this.handleMessage(msg);
                }, {
                    noAck: true
                });
            });
        });
    }


    /**
     * Handles message
     * @param msg 
     * @returns message 
     */
    public handleMessage(msg: any): any {
        if (msg.content) {
            console.log(" [x] %s", msg.content.toString());
        }
    }
}