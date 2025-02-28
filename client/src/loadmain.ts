const script = document.createElement('script');
const scriptPath = '/src/main.tsx'; // TODO: load from localhost if dev mode is enabled
script.setAttribute('src', scriptPath);
document.head.appendChild(script);
