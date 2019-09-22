import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';

// TODO fix this response?
interface StockResponse {
    id: number;
    dates: string;
    open_price: number;
    high_price: number;
    low_price: number;
    close_price: number;
    adj_price: number;
    volume_price: number;
    cahanges: -1 | 1 | 0;
}

export interface Stocks {
    name: string;
    stocks: Stock[];
}

export interface Stock {
    id: number;
    date: Date;
    openPrice: number;
    highPrice: number;
    lowPrice: number;
    closePrice: number;
    adjPrice: number;
    volumePrice: number;
    changes: -1 | 1 | 0;
}

@Injectable({ providedIn: 'root' })
export class StocksService {
    private stocksSubject: BehaviorSubject<Stocks>;

    private stocksObs: Observable<Stocks>;

    constructor(private http: HttpClient) {
        this.stocksSubject = new BehaviorSubject(null);
        this.stocksObs = this.stocksSubject.asObservable();
    }

    // TODO date range?
    public getStocks(name: string) {
        return this.http
            .get<StockResponse[]>(`${environment.apiUrl}/stocks/${name}/`)
            .pipe(
                map(res => {
                    const stocks = {
                        name: name,
                        stocks: res.map<Stock>(s => {
                            return {
                                adjPrice: s.adj_price,
                                changes: s.cahanges,
                                closePrice: s.close_price,
                                date: new Date(Date.parse(s.dates)),
                                highPrice: s.high_price,
                                id: s.id,
                                lowPrice: s.low_price,
                                openPrice: s.open_price,
                                volumePrice: s.volume_price
                            };
                        })
                    };

                    this.stocksSubject.next(stocks);
                    return stocks;
                })
            );
    }

    public get stocks() {
        return this.stocksObs;
    }

    public get stocksValue() {
        return this.stocksSubject.value;
    }
}
