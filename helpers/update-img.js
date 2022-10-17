const Usuario = require('../models/usuario');
const Medico = require('../models/medico');
const Hospital = require('../models/hospital');
const fs = require('fs');

const deleteImagen = ( path ) =>{
            if (fs.existsSync( path )) {
                //borrar imagen anterior 
                fs.unlinkSync( path )
            }
}
let pathViejo = '';
const updateImg = async (tipo, id, nombreArchivo) => {

    switch ( tipo ) {
        case 'medicos':
            const medico = await Medico.findById( id );
            if ( !medico) {
                console.log('no es un medico id')
                return false;
            }
            pathViejo = `./uploads/medicos/${ medico.img }`;
            deleteImagen( pathViejo );

            medico.img = nombreArchivo;
            await medico.save();
            return true;
            break;
        case 'hospitales':
            const hospital = await Hospital.findById( id );
            if ( !hospital) {
                console.log('no es un hospital id')
                return false;
            }
            pathViejo = `./uploads hospitales/${ hospital.img }`;
            deleteImagen( pathViejo );

         hospital.img = nombreArchivo;
            await hospital.save();
            return true;
            break;
        case 'usuarios':
            const usuario = await Usuario.findById( id );
            if ( !usuario) {
                console.log('no es un usuario id')
                return false;
            }
            pathViejo = `./uploads/usuarios/${ usuario.img }`;
            deleteImagen( pathViejo );

            usuario.img = nombreArchivo;
            await usuario.save();
            return true;
            break;
    
        default:
            break;
    }

}

module.exports = {
    updateImg,
}
