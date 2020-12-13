# Channels in Javascript
Really rough implementation of golang's channels but in javascript!

## TL;DR
Channels allow you to have inter-process communication between multiple async funtions. Channels are also a good way to synchronize processes. 

### Example
Code within examples folder
```
import Channel from './channel.js'

let ch = new Channel()

// Sender function to send via the channel
let sender = async () => {
    for(let i=0; i<1000; i++){
        // await key word can be placed in front of the below command
        // to sync the two async functions
        ch.send(i)
    }
}

// Receiver function to receive the channel messages
let receiver = async () => {
    for(let i=0; i<1000; i++){
        console.log(await ch.receive())
    }
}

// Main function runs the above two async functions
let main = () => {
    receiver()
    sender()
}
main()
```
