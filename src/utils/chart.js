import Chart from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { ChartTitle } from '../const.js';
import { separationDurationEvent } from './trip.js';

const BAR_HEIGHT = 55;

const formatVal = (titleText, val) => {
  if (titleText === ChartTitle.MONEY) {
    return `€ ${val}`;
  }

  if (titleText === ChartTitle.TYPE) {
    return `${val}x`;
  }
  if (titleText ===ChartTitle.TIME_SPAND) {
    return `${separationDurationEvent(val)}`;
  }
};

export const createChartTemplate = (ctx, title, dataLabels, data) => {
  ctx.height = BAR_HEIGHT * 5;
  return new Chart(ctx, {
    plugins: [ChartDataLabels],
    type: 'horizontalBar',
    data: {
      labels: dataLabels,
      datasets: [{
        data: data,
        backgroundColor: '#ffffff',
        hoverBackgroundColor: '#ffffff',
        anchor: 'start',
      }],
    },
    options: {
      plugins: {
        datalabels: {
          font: {
            size: 13,
          },
          color: '#000000',
          anchor: 'end',
          align: 'start',
          formatter: (val) => formatVal(title, val),
        },
      },
      title: {
        display: true,
        text: title,
        fontColor: '#000000',
        fontSize: 23,
        position: 'left',
      },
      scales: {
        yAxes: [{
          ticks: {
            fontColor: '#000000',
            padding: 5,
            fontSize: 13,
          },
          gridLines: {
            display: false,
            drawBorder: false,
          },
          dataset: {
            barThickness: 44,
          },
        }],
        xAxes: [{
          ticks: {
            display: false,
            beginAtZero: true,
          },
          gridLines: {
            display: false,
            drawBorder: false,
          },
          dataset: {
            minBarLength: 50,
          },
        }],
      },
      legend: {
        display: false,
      },
      tooltips: {
        enabled: false,
      },
    },
  });
};
