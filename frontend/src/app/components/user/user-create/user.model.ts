export interface User {
    id?: number
    nome: string
    cpf: string
    rg: string
    rendaAnual: number | null
    bloqueado?: boolean
}