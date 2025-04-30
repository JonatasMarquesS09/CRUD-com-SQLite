import {PrismaClient} from "@prisma/client"

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

export const crateNewEmailAndUser = async (req, res) => {
    const { name, email } = req.body
    
    try {
        const newUser = await prisma.user.create({
            data: {name, email}
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
    const  {name, email} = req.body

    try {
        const updateUser = await prisma.user.update({
            where: {id: parseInt(id)},
            data: {name, email}
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