const jsw = require('jsonwebtoken')


const generarJWT = ( uid ) => {

    return new Promise( ( resolve, reject) =>{
        const payload = {
            uid,
        };
        jsw.sign( payload, process.env.JWT_SECRET, {
            expiresIn: '24h'
        }, ( err, token ) =>{
            if( err ){
                console.log( err );
                reject( 'No se pudo generar el JWT' );
            }{
                resolve( token );
            }
        } );
    });
}

module.exports = {
    generarJWT,
}
