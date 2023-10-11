export interface HistoricoModel {
    id: number;
    idContaPrincipal: number;
    idContaRelacionada: number;
    timestamp: string;
    tipo: string;
    valor: number;
}