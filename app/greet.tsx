'use client'   

import {useEffect, useState} from 'react'
import { invoke } from '@tauri-apps/api/tauri'
import Button from '@material-ui/core/Button';

async function connectToServer(){
    try {
        const response = await invoke('connect_to_server', {address: '127.0.0.1:8080'})
        console.log('Connected to server:', response)
    } catch (error) {
        console.error('Failed to connect:', error)
    }
}

//发送消息到服务器
async function sendMessage(){
    try {
        const response = await invoke('send_message', {message :'Hello from Next.js'})
        console.log('Server response:', response)
    } catch (error) {
        console.error('Failed to send message:', error)
    }
}

//接收服务器消息
async function receiveMessage(){
    try {
        const response = await invoke('receive_message')
        console.log('Received message:', response)
    } catch (error) {
        console.error('Failed to receive message:', error)
    }

}
        
export default function Greet() {
    const [greeting, setGreeting]  = useState('')

    useEffect(() => {
         invoke<string>('greet', { name:'Next.js'})
        .then(result =>setGreeting(result))
        .catch(console.error)

    }, [])

    return (
        <div>
            <Button variant="contained" onClick={sendMessage} color="primary">
                你好，世界
            </Button>
            {greeting}</div>)
    }