export interface Conta {
    id?: number
    idUsuario: number
    numAgencia: string
    numConta: string
    saldo: number
    bloqueado?: boolean
}