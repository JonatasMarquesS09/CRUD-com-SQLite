import {PrismaClient} from "@prisma/client"
import {comparePassword, generateToken, hashPassword} from "../utils/auth.js"

const prisma = new PrismaClient()

export const getAllUser = async (req, res) => {
    try {
        const user = await prisma.user.findMany()
    
        res.status(200).json(user)
    }catch (error) {
        res.status(500).json({
            mensagem: "Erro ao buscar todos os usuários",
            error: error.message
        })
    }
    
}

export const getUserid = async (req, res) => {
    const id = req.params.id
    
    try {
       const findUser = await prisma.user.findUnique({

        where: { id: Number(id) }

       })

       res.status(200).json(findUser)
    }catch (error) {
        res.status(500).json({
            mensagem: "Erro ao buscar usuário por id",
            error: error.message
        })
    }
}

export const crateNewEmailAndUser = async (req, res) => {
    const { name, email, password } = req.body
    
    try {
        const newUser = await prisma.user.create({
            data: {name, email, password}
        })
    
        res.status(201).json(newUser)
    }catch (error) {
        res.status(500).json({
            mensagem: "Error ao criar o novo usuário",
            erro: error.message
        })
    }
}

export const updateUser = async (req, res) => {
    const id = req.params.id
    const  {name, email, password} = req.body

    try {
        const updateUser = await prisma.user.update({
            where: {id: parseInt(id)},
            data: {name, email, password}
        })

        res.status(200).json(updateUser)
    }catch (error) {
        res.status(400).json({
            mensagem: "Erro ao atualizar usuário",
            erro: error.message
        })
    }
}

export const deleteUser = async (req, res) => {
    const id = req.params.id
   
   try {
    const deleteUser = await prisma.user.delete({

        where: { id: Number(id) }
    })

    res.status(200).json(deleteUser)
   }catch (error) {
    res.status(400).json({
        mensagem: "Erro ao deletar usuário",
        erro: error.message
    })
   }
   
}

export const registerUser = async (req, res) => {
    const {name, email, password} = req.body

    try{
        // Criar a senha do usuário hasheada
        const hashedPassword = await hashPassword(password)

        // Criar usuário no banco de dados
        const newRegistedUser = await prisma.user.create({
            data: {
                name: name, 
                email: email,
                password: hashedPassword
            }
        })

        // Gerar um token JWT
        const token = generateToken(newRegistedUser)

        res.status(201).json({
            name: newRegistedUser.name,
            email: newRegistedUser.email,
            token: token
        })
    }catch (error){
        res.status(400).json({
            error:  "Erro ao criar o usuário",
            detalhes: error.message
        })
    }
}

export const login = async (req, res) => {
    const {email, password} = req.body

    try{
        // 01. Buscar o usuário pelo email
        const user = await prisma.user.findUnique({
            
            where: {email: email}
        })

        if(!user){
            return res.status(401).json({
                mensagem: "Crendencias Inválidas!"
            })
        }

        // 02. Comparar a senha fornecida com hash armazenada
        const passwordMatch = await comparePassword(
            password, user.password
        )

        if(!passwordMatch){
            return res.status(401).json({
                mensagem: "Crendencias Inválidas!"
            })
        }

        // 03. Gerar o tokrn jwt
        const token = generateToken(user)

        // 04. Envia como resposta o usuário eo token
        res.json({
            usuario: {name: user.name, email: user.email},
            token: token
        })
    }catch (error) {
        res.status(500).json({
            message: "Erro ao fazer login",
            error: error.message
        })
    }
}