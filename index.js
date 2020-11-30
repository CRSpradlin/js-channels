import Channel from './channel.js'

let ch = new Channel()

let sender = async () => {
    for(let i=0; i<1000; i++){
        ch.send(i)
    }
}

let receiver = async () => {
    for(let i=0; i<1000; i++){
        console.log(await ch.receive());
    }
}

let main = () => {
    receiver()
    sender()
    console.log("Finished Transmission")
}
main()