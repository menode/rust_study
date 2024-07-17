use tauri::{
    plugin::{Builder, TauriPlugin},
    Manager, Runtime,
};

pub use models::*;

#[cfg(desktop)]
mod desktop;
#[cfg(mobile)]
mod mobile;

mod commands;
mod error;
mod models;

pub use error::{Error, Result};

#[cfg(desktop)]
use desktop::Api;
#[cfg(mobile)]
use mobile::Api;

/// Extensions to [`tauri::App`], [`tauri::AppHandle`] and [`tauri::Window`] to access the api APIs.
pub trait ApiExt<R: Runtime> {
    fn api(&self) -> &Api<R>;
}

impl<R: Runtime, T: Manager<R>> crate::ApiExt<R> for T {
    fn api(&self) -> &Api<R> {
        self.state::<Api<R>>().inner()
    }
}

/// Initializes the plugin.
pub fn init<R: Runtime>() -> TauriPlugin<R> {
    Builder::new("api")
        .invoke_handler(tauri::generate_handler![commands::ping])
        .setup(|app, api| {
            #[cfg(mobile)]
            let api = mobile::init(app, api)?;
            #[cfg(desktop)]
            let api = desktop::init(app, api)?;
            app.manage(api);
            Ok(())
        })
        .build()
}
