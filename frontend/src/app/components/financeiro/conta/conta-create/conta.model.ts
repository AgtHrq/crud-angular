export interface Conta {
    id?: number
    idUsuario: number
    numAgencia: string
    numConta: string
    bloqueado?: boolean
    saldo?: number
}