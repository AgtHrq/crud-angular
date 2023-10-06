export interface User {
    id?: number
    cpf: string
    nome: string
    rendaAnual: number | null
    rg: string
    bloqueado?: boolean
}