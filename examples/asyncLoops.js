const Channel = require('../index').Channel

const ch = new Channel()

// Sender function to send via the channel
const sender = async () => {
  for (let i = 0; i < 1000; i++) {
    // await key word can be placed in front of the below command
    // to sync the two async functions
    ch.send(i)
  }
}

// Receiver function to receive the channel messages
const receiver = async () => {
  for (let i = 0; i < 1000; i++) {
    console.log(await ch.receive())
  }
}

// Main function runs the above two async functions
const main = () => {
  receiver()
  sender()
}
main()
