class Channel {
    #data = []
    
    hasNext = () => {
        return this.#data.length > 0
    }
    send = (obj) => {
        let count;
        let message = null;
        //TODO: For loop can be condensed to single, private method
        for(count=0; count<this.#data.length; count++){
            let currMsg = this.#data[count]
            if (currMsg.needSend()) {
                message = currMsg
                message.setData(obj)
                message.setBools(false, true)
                break
            }
        }
        if(message==null){
            message = new Message(false, true)
            message.setData(obj)
            this.#data.push(message)
        }
        let response = message.operate()
        return response
    }
    receive = () => {
        let count;
        let message = null;
        for(count=0; count<this.#data.length; count++){
            let currMsg = this.#data[count]
            if (currMsg.needReceive()) {
                message = this.#data.splice(count, 1)[0]
                message.setBools(true, false)
                break
            }
        }
        if(message==null){
            message = new Message(true, false)
            this.#data.push(message)
        }
        let response = message.operate()
        return response
    }
}

class Message {
    #data

    #send_bool
    #receive_bool

    constructor(receive=false, send=false){
        this.#receive_bool = receive
        this.#send_bool = send
    }

    setData = (obj) => {
        this.#data = obj
    }
    getData = () => {
        this.#send_bool = true
        return this.#data
    }

    needSend = () => {
        if(this.#send_bool)
            return false;
        return true;
    }
    needReceive = () => {
        if(this.#receive_bool)
            return false;
        return true;
    }

    setBools = (receive=false, send=false) => {
        if(receive){
            this.#receive_bool = receive
        }
        if(send){
            this.#send_bool = send
        }
    }

    operate = async () => {
            while(true){
                if(this.#send_bool && this.#receive_bool){
                    return this.#data
                }
                await null
            }   
    }
}

exports.Channel = Channel