// use tauri::Manager;

use tauri_plugin_log::{Target, TargetKind};

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_log::Builder::default().build())
        .setup(|app| {
            // 打开调试工具
            // let main_window = app.get_webview_window("main").unwrap();
            // main_window.open_devtools();
            // let handle = app.handle();
            // tauri_plugin_log::Builder::new()
            //     .targets([
            //         Target::new(TargetKind::Stdout),
            //         Target::new(TargetKind::LogDir { file_name: None }),
            //         Target::new(TargetKind::Webview),
            //     ])
            //     .level(tauri_plugin_log::LevelFilter::Info)
            //     .build(&handle)
            //     .expect("failed to initialize log plugin");
            Ok(())
        })
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
