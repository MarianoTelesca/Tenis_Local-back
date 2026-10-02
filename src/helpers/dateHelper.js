exports.getCurrentDateTime = () => {
    const date = new Date();
    
    // El formato de MySQL para DateTime es: YYYY-MM-DD HH:MM:SS
    return date.toISOString().slice(0, 19).replace('T', ' '); 
};