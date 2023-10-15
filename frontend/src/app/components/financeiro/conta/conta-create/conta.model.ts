export interface Conta {
    id?: number
    numAgencia: string
    numConta: string
    saldo: number 
    bloqueado?: boolean
    idUsuario?: number
}