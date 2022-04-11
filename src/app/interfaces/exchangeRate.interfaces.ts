export interface ExchangeRateSerie {
    name    : any,
    series  : any[]
}

export interface ExchangeRate {
    fecha: string;
    pc:    number;
    pv:    number;
}

export interface ExchangeRatePrecio {
    fecha   : string;
    valor   : number;
    simbolo?: string;
}

export interface Rate {
    name?    : string;
    values?  : RateValues;
}

export interface RateValues {
    pc?     : number;
    pv?     : number;
}



