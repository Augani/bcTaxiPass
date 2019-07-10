import axios from 'axios';
import socketIOClient from "socket.io-client";
export const gotoAnotherPage = (page, props,params)=>{
    props.navigation.navigate(page,params);
}


export const makePostRequest = (url, data=null)=>{
    return new Promise((resolve, reject)=>{
        axios.post(url,data).then(r=>{
            resolve(r);
        }).catch(e=>{
            reject(e);
        })
    })
}

export const makeGetRequest = (url,data=null)=>{
    return new Promise((resolve, reject)=>{
        axios.get(url,data).then(r=>{
            resolve(r);
        }).catch(e=>{
            reject(e);
        })
    })
}

export const connectToSocket = ()=>{
    const socket = socketIOClient('https://ridebookingserver.herokuapp.com/', {
        transports: ['websocket']
      })
  
      socket.on('connect', (sock) => {
          console.log(sock);
        console.log("socket connected")
        socket.emit('YOUR EVENT TO SERVER', {})
        socket.on('EVENT YOU WANNA LISTEN', (r) => {
        })
      })
  
      socket.on('connect_error', (err) => {
        console.log(err)
      })
  
      socket.on('disconnect', () => {
        console.log("Disconnected Socket!")
      })

}




