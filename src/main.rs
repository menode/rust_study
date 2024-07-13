// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use std::{io::{self, Read, Write}, net::TcpStream, sync::{Arc, Mutex}};

struct TcpClient {
  stream: Arc<Mutex<TcpStream>>
}
//定义一个tcp客户端结构体

impl TcpClient {
  fn new(address: &str) -> io::Result<Self> {
    let stream  = TcpStream::connect(address)?;
    Ok(Self {
      stream: Arc::new(Mutex::new(stream))
    })
  }

  fn send(&self, message: &str) -> io::Result<()> {
    let mut stream = self.stream.lock().unwrap();
    stream.write_all(message.as_bytes()).unwrap();
    Ok(())
  }

  
  fn receive(&self) -> io::Result<String> {
    let mut buffer = [0; 512];
    let mut stream = self.stream.lock().unwrap();
    let size = stream.read(&mut buffer).unwrap();
    Ok(String::from_utf8_lossy(&buffer[..size]).to_string())
  
  }
}

#[tauri::command]
fn connect_to_server(address: String) -> Result<String, String> {
  TcpClient::new(&address).map_err(|e| e.to_string())?;
  Ok(format!("Connected to server at {}", address))
}

#[tauri::command]
fn send_message(client: tauri::State<TcpClient>, message: String) -> Result<String, String> {
  client.send(&message).map_err(|e| e.to_string())?;
  Ok(format!("Sent message: {}", message))
}

#[tauri::command]
fn receive_message(client: tauri::State<TcpClient>) -> Result<String, String> {
  let response = client.receive().map_err(|e| e.to_string())?;
  Ok(response)
}

#[tauri::command]
fn greet(name: &str) -> String {
    format!("hello, {}", name)
}


fn main() {
  tauri::Builder::default()
    .manage(TcpClient::new("127.0.0.1:8080").unwrap())
    .invoke_handler(tauri::generate_handler![greet,connect_to_server,send_message,receive_message])
    .run(tauri::generate_context!())
    .expect("error while running tauri application");
}
