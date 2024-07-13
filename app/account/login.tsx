'use client'   

import {useEffect, useState} from 'react'
import { invoke } from '@tauri-apps/api/tauri'
import { on } from 'events'
import { useRouter } from 'next/router'
import { resolve } from 'path'
import Link from 'next/link'
import { useForm } from 'react-hook-form'

import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup'


//建立一个连接到服务器的函数
async function connectToServer(){
    try {
        const response = await invoke('connect_to_server', {address: '127.0.0.1:8080'})
        console.log('Connected to server:', response)
    } catch (error) {
        console.error('Failed to connect:', error)
    }
}

//发送消息到服务器
async function sendMessage(message: string = 'Hello from Next.js'){
    try {
        const response = await invoke('send_message', {message })
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
        
export default function Login() {
    const router = useRouter()
    const validationSchema = Yup.object().shape({
        username: Yup.string().required('Username is required'),
        password: Yup.string().required('Password is required')
    });
    const formOptions = { resolver: yupResolver(validationSchema) }
    // const formOptions = { username: '', password: '' }
    const { register, handleSubmit, formState } = useForm(formOptions);
    const { errors } = formState;

    function onSubmit({ username, password }: { username: string, password: string }) {
        
        console.log('username:', username)
        console.log('password:', password)
    }

    return (
        
            <div className="card">
                <h4 className="card-header">Login</h4>
                <div className="card-body">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="mb-3">
                            <label className="form-label">Username</label>
                            <input id='username' type="text" {...register('username')} className={`form-control ${errors.username ? 'is-invalid' : ''}`} />
                            <div className="invalid-feedback">{errors.username?.message}</div>
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Password</label>
                            <input id='password' type="password" {...register('password')} className={`form-control ${errors.password ? 'is-invalid' : ''}`} />
                            <div className="invalid-feedback">{errors.password?.message}</div>
                        </div>
                        <button disabled={formState.isSubmitting} className="btn btn-primary">
                            {formState.isSubmitting && <span className="spinner-border spinner-border-sm me-1"></span>}
                            Login
                        </button>
                        <Link href="/account/register" className="btn btn-link">Register</Link>
                    </form>
                </div>
            </div>
        
    )
    }

