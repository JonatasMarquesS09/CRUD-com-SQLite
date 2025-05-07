import {z} from "zod"

export const createProductSchema = z.object({
    name: z.string().min(3,"O nome deve ter pelo menos 3 chars"),
    description: z.string().optional(),
    price: z.number().positive({mensagem: "O preço so produto tem que ser maior que zero"}),
    stock: z.number().nonnegative({mensagem: "O preço não pode ser menor que zero"}),
    createdAt: z.string().datetime()
})

export const updateProductSchema = z.object({
    name: z.string().min(3,"O nome deve ter pelo menos 3 chars").optional(),
    description: z.string().optional(),
    price: z.number().positive({mensagem: "O preço so produto tem que ser maior que zero"}).optional,
    stock: z.number().nonnegative({mensagem: "O preço não pode ser menor que zero"}).optional(),
    createdAt: z.string().datetime().optional()
})