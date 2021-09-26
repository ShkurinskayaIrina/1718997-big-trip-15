import SmartView from './smart.js';

import { EVENT_TYPES, ChartType } from '../const.js';
import { SortingByStatsType, countDurationEvent } from '../utils/trip.js';
import { createChartTemplate } from '../utils/chart.js';

const countMoneyByEventType = (events, type) =>
  events.filter((event) => event.type === type.toLowerCase()).
    reduce((sum, { basePrice }) => sum + basePrice, 0);

const countByEventType = (events, type) =>
  events.filter((event) => event.type === type.toLowerCase()).
    reduce((sum) => sum + 1, 0);

const countTimeByEventType = (events, type) =>
  events.filter((event) => event.type === type.toLowerCase()).
    reduce((sum, { dateFrom, dateTo }) => sum + countDurationEvent(dateFrom, dateTo), 0);

const countDataForChart = (events) => {
  const dataForChart = new Array;
  EVENT_TYPES.forEach((type) => dataForChart.push({
    'type': type.toUpperCase(),
    'money': countMoneyByEventType(events, type),
    'count': countByEventType(events, type),
    'time': countTimeByEventType(events, type),
  }));
  return dataForChart;
};

const renderMoneyChart = (moneyCtx, events) => {
  const dataForMoneyChart = events.slice(0).sort(SortingByStatsType.MONEY).
    filter((event) => event.money > 0);

  const moneyDataLabels = dataForMoneyChart.map((data) => data.type);
  const moneyData = dataForMoneyChart.map((data) => data.money);

  return createChartTemplate(moneyCtx, ChartType.MONEY, moneyDataLabels, moneyData);
};

const renderTypesChart = (typeCtx, events) => {
  const dataForTypeChart = events.slice(0).sort(SortingByStatsType.TYPE).
    filter((event) => event.count > 0);
  const typeDataLabels = dataForTypeChart.map((data) => data.type);
  const typeData = dataForTypeChart.map((data) => data.count);

  return createChartTemplate(typeCtx, ChartType.TYPE, typeDataLabels, typeData);
};

const renderTimeSpendChart = (timeSpendCtx, events) => {
  const timeForTypeChart = events.slice(0).sort(SortingByStatsType['TIME-SPAND']).
    filter((event) => event.time > 0);
  const timeDataLabels = timeForTypeChart.map((data) => data.type);
  const timeData = timeForTypeChart.map((data) => data.time);
  return createChartTemplate(timeSpendCtx, ChartType.TIME_SPAND, timeDataLabels, timeData);
};

const createStatisticsTemplate = () => `<section class="statistics">
  <h2 class="visually-hidden">Trip statistics</h2>

    <div class="statistics__item">
      <canvas class="statistics__chart" id="money" width="900"></canvas>
    </div>

    <div class="statistics__item">
      <canvas class="statistics__chart" id="type" width="900"></canvas>
    </div>

    <div class="statistics__item">
      <canvas class="statistics__chart" id="time-spend" width="900"></canvas>
    </div>
  </section>`;

export default class Statistics extends SmartView {
  constructor (events) {
    super();
    this._data = countDataForChart(events);
    this._moneyCart = null;
    this._typesChart = null;
    this._timeSpendChart = null;
    this._setCharts();
  }

  removeElement() {
    super.removeElement();
    if (this._moneyCart !== null || this._typesChart !== null || this._timeSpendChart !== null) {
      this._moneyCart = null;
      this._typesChart = null;
      this._timeSpendChart = null;
    }
  }

  getTemplate() {
    return createStatisticsTemplate(this._data);
  }

  restoreHandlers() {
    this._setCharts();
  }

  _setCharts() {
    if (this._moneyCart !== null || this._typesChart !== null || this._timeSpendChart !== null) {
      this._moneyCart = null;
      this._typesChart = null;
      this._timeSpendChart = null;
    }

    const moneyCtxElement = this.getElement().querySelector('#money');
    const typeCtxElement = this.getElement().querySelector('#type');
    const timeCtxElement = this.getElement().querySelector('#time-spend');

    this._moneyCart = renderMoneyChart(moneyCtxElement, this._data);
    this._typeChart = renderTypesChart(typeCtxElement, this._data);
    this._timeChart = renderTimeSpendChart(timeCtxElement, this._data);
  }
}
