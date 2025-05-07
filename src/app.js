import express from "express"
import userRoutes from "./routes/userRoutes.js"
import productRoutes from "./routes/productRoutes.js"

const app = express()

// Permite que o express entenda o json no corpo de requisição 
app.use(express.json())

// Define a endpoint (prefixo) /users para as rotas de usuário
app.use("/users", userRoutes)

// Define a endpoint (prefixo) /products para as rotas de produtos
app.use("/products", productRoutes)
export default app
