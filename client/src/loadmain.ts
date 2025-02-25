const script = document.createElement('script');
const scriptPath = `${__JS_SERVER_URL__}/src/main.tsx`;
script.setAttribute('src', scriptPath);
document.head.appendChild(script);
