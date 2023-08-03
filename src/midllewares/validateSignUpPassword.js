
export default function validateSignUpPassword (req, res, next){
    //body: {name: "João", email: "joao@driven.com.br", password: "driven", confirmPassword: "driven"}
    const {password, confirmPassword} = req.body;
    if(password !== confirmPassword){
        return res.status(422).send('Confirmação de senha não corresponde a senha!')
    }
    next()
}