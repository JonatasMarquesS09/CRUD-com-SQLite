// requisição -> middleware -> rota(controllers) -> resposta

// function middleware(req, res, next){

//     //1. Fazer algo com a requisição
//     // -> Validar as informações
//     // -> verificar se o usr tem conta
//     //2. Modificar a resposta
//     // -> dar uma resposta ao cliente
//     //3. Chamar o next() para passar para 
//     // o próximo middleware(agente)
//     // Ou encerra com res.send()v

// }

export function validate (schema){
    return (req, res, next) => {
        try{
            const validatedData = schema.parse(req.body)

            req.body = validatedData

            next()
        }catch (error){
            return res.status(400).json({
                mensagem: "Erro de validação",
                erros: error.errors.map(e => ({
                    path: e.path.join('.'),
                    message: e.message
                }))
            })
        }       
    }
} 