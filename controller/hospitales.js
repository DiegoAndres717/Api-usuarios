const { response } = require('express');
const hospital = require('../models/hospital');
const Hospital = require('../models/hospital');

const getHospitales = async (req, res = response) => {

    const hospitales = await Hospital.find()
                                    .populate('usuario', 'nombre img')

    res.json({
        ok: true,
        hospitales
    })
}

const updateHospital = async (req, res = response) => {

    const id = req.params.id;
    const uid = req.uid;
    try {
        const hospitalDB = await Hospital.findById( id );
        if ( !hospitalDB) {
            return res.status(404).json({
                ok: true,
                msg: 'Hospital no encontrado por id'
             });
        }
        const cambioHospital = {
            ...req.body,
            usuario: uid
        }

        const hospitalUpdate = await Hospital.findByIdAndUpdate( id, cambioHospital, { new: true})

        res.json({
            ok: true,
            hospital: hospitalUpdate
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }

}

const createHospital = async (req, res = response) => {

    const uid = req.uid;
    const hospital = new Hospital({ 
        usuario: uid,
        ...req.body
     });

    try {
        const hospitalDB = await hospital.save();
        
        res.json({
            ok: true,
            msg: 'crear hospitales',
            hospital: hospitalDB,
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
}

const deleteHospital = async (req, res = response) => {
    const id = req.params.id;

    try {
        const hospitalDB = await Hospital.findById( id );
        if ( !hospitalDB) {
            return res.status(404).json({
                ok: true,
                msg: 'Hospital no encontrado por id'
             });
        }

        await Hospital.findByIdAndDelete( id );

        res.json({
            ok: true,
            msg: 'Hospital eliminado'
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }
}


module.exports = {
    getHospitales,
    updateHospital,
    createHospital,
    deleteHospital
}
