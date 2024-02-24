const obtenerNumeroDesdeURL = (url) => {
    
    const regex = /\/(\d+)\/$/;
    
    const match = url.match(regex);
    
    if (match && match[1]) {
        
        return match[1];
    } else {
        
        return null;
    }
}

module.exports = { obtenerNumeroDesdeURL }