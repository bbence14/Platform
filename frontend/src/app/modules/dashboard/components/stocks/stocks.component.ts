import { Component, OnInit, ViewChild } from '@angular/core';
import { ChartDataSets, ChartOptions } from 'chart.js';
import * as pluginAnnotations from 'chartjs-plugin-annotation';
import * as moment from 'moment';
import { BaseChartDirective, Color, Label } from 'ng2-charts';
import { map } from 'rxjs/operators';
import { StocksService } from 'src/app/modules/dashboard/services/stocks.service';

@Component({
    selector: 'stocks-view',
    templateUrl: './stocks.component.html',
    styleUrls: ['./stocks.component.scss']
})
export class StocksComponent implements OnInit {
    constructor(public stocksService: StocksService) {}

    public lineChartData: ChartDataSets[] = [
        { data: [], label: 'Open Price' },
        { data: [], label: 'Close Price' },
        { data: [], label: 'Adjusted Price' }
    ];

    public lineChartLabels: Label[] = [];

    ngOnInit() {
        this.stocksService
            .getStocks('GE')
            .pipe(
                map(st => {
                    const initialConfig = {
                        chartData: <ChartDataSets[]>[
                            { data: [], label: 'Open Price', fill: false },
                            { data: [], label: 'Close Price', fill: false },
                            {
                                data: [],
                                label: 'Adjusted Price',
                                fill: false
                            }
                        ],
                        labels: <string[]>[]
                    };

                    return st.stocks.reduce((chartConfig, stock) => {
                        chartConfig.chartData[0].data.push(stock.openPrice);
                        chartConfig.chartData[1].data.push(stock.closePrice);
                        chartConfig.chartData[2].data.push(stock.adjPrice);

                        chartConfig.labels.push(
                            moment(stock.date).format('MMM Do YY')
                        );

                        return chartConfig;
                    }, initialConfig);
                })
            )
            .subscribe(chartConfig => {
                this.lineChartData = chartConfig.chartData;
                this.lineChartLabels = chartConfig.labels;
            });
    }


    public lineChartOptions: ChartOptions & { annotation: any } = {
        responsive: true,
        elements: {
            point: {
                radius: 0
            }
        },
        hover: {
            mode: 'nearest'
        },
        scales: {
            xAxes: [{}],
            yAxes: [
                {
                    id: 'y-axis-0',
                    position: 'left'
                },
                {
                    id: 'y-axis-1',
                    position: 'right',
                    gridLines: {
                        color: 'rgba(  8,106,165,1)'
                    },
                    ticks: {
                        fontColor: 'rgba(  8,106,165,1)'
                    }
                }
            ]
        },
        annotation: {
            annotations: [
                // {
                //     type: 'line',
                //     mode: 'vertical',
                //     scaleID: 'x-axis-0',
                //     value: 'March',
                //     borderColor: 'orange',
                //     borderWidth: 2,
                //     label: {
                //         enabled: true,
                //         fontColor: 'orange',
                //         content: 'LineAnno'
                //     }
                // }
            ]
        }
    };
    public lineChartColors: Color[] = [
        {
            borderColor: 'rgba(  0,171,119,1)',
            pointBackgroundColor: '#10a570',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: '#10a570'
        },
        {
            borderColor: 'rgba(77,83,96,1)',
            pointBackgroundColor: 'rgba(77,83,96,1)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(77,83,96,1)'
        },
        {
            borderColor: 'rgba(  8,106,165,1)',
            pointBackgroundColor: '#e11548',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: '#e11548'
        }
    ];
    public lineChartLegend = true;
    public lineChartType = 'line';
    public lineChartPlugins = [pluginAnnotations];

    @ViewChild(BaseChartDirective, { static: true }) chart: BaseChartDirective;

    // events
    public chartClicked({
        event,
        active
    }: {
        event: MouseEvent;
        active: {}[];
    }): void {
        // console.log(event, active);
    }

    public chartHovered({
        event,
        active
    }: {
        event: MouseEvent;
        active: {}[];
    }): void {
        // console.log(event, active);
    }
}
