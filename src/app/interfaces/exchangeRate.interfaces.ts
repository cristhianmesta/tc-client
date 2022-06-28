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
    service : string;
    fecha   : string;
    valor   : number;
    rates?  : RateValues;
    simbolo?: string;
}

export interface Rate {
    name?    : string;
    values?  : RateValues;
}

export interface RateValues {
    max?     : number;
    min?     : number;
    avg?     : number;
}



