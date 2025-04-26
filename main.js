// Webアプリケーション用の設定
const store = {
    get: (key) => {
        return JSON.parse(localStorage.getItem(key)) || {};
    },
    set: (key, value) => {
        localStorage.setItem(key, JSON.stringify(value));
    }
};

// 設定の保存
window.addEventListener('message', (event) => {
    if (event.data.type === 'save-settings') {
        store.set('settings', event.data.settings);
    }
});

// 設定の読み込み
window.addEventListener('message', (event) => {
    if (event.data.type === 'load-settings') {
        const settings = store.get('settings');
        window.postMessage({ type: 'settings-loaded', settings }, '*');
    }
});

// 初期化
document.addEventListener('DOMContentLoaded', () => {
    // Webアプリケーションの初期化処理
    console.log('Web application initialized');
}); 