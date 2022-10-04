const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

class EmprestimoController {
    async getEmprestimos(req, res) {
        try {
            await prisma.$connect()
            const allEmprestimos = await prisma.emprestimos.findMany()
            return res.status(200).json({ allEmprestimos })
        } catch (e) {
            return res.status(404).json(e)
        } finally {
            return async () => {
                await prisma.$disconnect()
            }
        }
    }
    async postEmprestimos(req, res) {
        try {
            await prisma.$connect()

            const { idCliente, idProduto,   } = req.body
            console.log(idCliente, idProduto, typeof(dataPrevDevolucao))
            const emprestimo = await prisma.emprestimos.create({
                data: {
                    idCliente: idCliente,
                    idProduto: idProduto,
                    dataEmprestimo: new Date(),
                    dataPrevDevolucao: new Date(dataPrevDevolucao),
                    dataDevolucao: new Date('11/11/1111'),
                },
            })
            return res.status(201).json(emprestimo)
        } catch (e) {
            return res.status(500).json(e)
        } finally {
            return async () => {
                await prisma.$disconnect()
            }
        }
    }
}
module.exports = new EmprestimoController()
