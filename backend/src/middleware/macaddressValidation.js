const macaddressValidation = (req, res, next) => {
    if (!req.body.macaddress){
        res.status(400).json("Error - Informe uma macaddress")
    }else{
        next()
    }
}

module.exports = macaddressValidation