import {PrismaClient} from "@prisma/client"

const prisma = new PrismaClient

export const getAllProducts = async (req, res,) => {
    try{
        const product = await prisma.products.findMany()

        res.status(200).json(product)
    }catch (error) {
        res.status(500).json({
            mensagem: "Erro ao buscar todos os produtos",
            error: error.message
        })
    }
}

export const getProductId = async (req, res) => {
    const id = req.params.id
    
    try{
        const findProduct = await prisma.products.findUnique({

            where: {id: Number(id)}

        })

        res.status(200).json(findProduct)
    }catch (error) {
        res.status(500).json({
            mensagem: "Erro ao buscar produto pelo id",
            error: error.message
        })
    }
}

export const createNewProduct = async (req, res) => {
    const {name, description, price, stock, createdAt} = req.body

    try{
        const newProduct = await prisma.products.create({
            data: {name, description, price, stock, createdAt}
        })

        res.status(200).json(newProduct)
    }catch (error) {
        res.status(500).json({
            mensagem: "Erro ao criar novo produto",
            error: error.message
        })
    }
}

export const updateProduct = async (req, res) => {
    const id = req.params.id
    const {name, description, price, stock,createdAt} = req.body

    try{
        const putProduct = await prisma.products.update({
            where: {id: Number(id)},
            data: {name, description, price, stock, createdAt}
        })

        res.status(200).json(putProduct)
    }catch (error) {
        res.status(400).json({
            mensagem: "Erro ao atualizar o produto pelo id",
            error: error.message
        })
    } 
}

export const deleteProduct = async (req, res) => {
    const id = req.params

    try{
        const deleteProduct = await prisma.products.delete({
            
            where: {id: Number(id)}

        })

        res.status(200).json(deleteProduct)
    }catch (error) {
        res.status(400).json({
            mensagem: "Erro ao deletar o produro pelo id",
            error: error.message
        })
    }
}