export const getAllUser = (req, res) => {
    res.status(200).json({
        mensagem: "Rota GET users funcionando" 
    })
}

export const crateNewEmailAndUser = (req, res) => {
    const { nome, email } = req.body
    const newUser = ({ 
        nome: nome,
        email: email
    })

    res.status(201).json(newUser)
}