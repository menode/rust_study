use paho_mqtt as mqtt;
use serde::Deserialize;
use std::sync::Arc;
use tokio::sync::Mutex;
use tokio::task;

#[derive(Debug, Deserialize)]
struct Config {
    mqtt: MqttConfig,
}

#[derive(Debug, Deserialize)]
struct MqttConfig {
    url: String,
    client_id: String,
}

pub struct MqttClient {
    client: Arc<Mutex<mqtt::AsyncClient>>,
}

impl MqttClient {
    pub async fn new(config_path: &str) -> Result<Self, mqtt::Error> {
        let config: Config = serde_yaml::from_reader(std::fs::File::open(config_path).unwrap()).unwrap();

        let create_opts = mqtt::CreateOptionsBuilder::new()
            .server_uri(config.mqtt.url)
            .client_id(config.mqtt.client_id)
            .finalize();

        let client = mqtt::AsyncClient::new(create_opts)?;
        let conn_opts = mqtt::ConnectOptionsBuilder::new().finalize();

        client.connect(conn_opts).await?;
        
        Ok(Self {
            client: Arc::new(Mutex::new(client)),
        })
    }

    pub async fn subscribe(&self, topic: &str, qos: i32) -> Result<(), mqtt::Error> {
        let client = self.client.lock().await;
        client.subscribe(topic, qos).await?;
        Ok(())
    }

    pub async fn publish(&self, topic: &str, message: &str) -> Result<(), mqtt::Error> {
        let client = self.client.lock().await;
        let msg = mqtt::Message::new(topic, message, mqtt::QOS_1);
        client.publish(msg).await?;
        Ok(())
    }
}
