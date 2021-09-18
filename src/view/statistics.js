import SmartView from './smart.js';

import { EVENT_TYPES, ChartTitle } from '../const.js';
import { sort, countDurationEvent } from '../utils/trip.js';
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
  // Функция для отрисовки графика по фин расходам
  const dataForMoneyChart = events.slice(0).sort(sort.money).
    filter((event) => event.money > 0);

  const moneyDataLabels = dataForMoneyChart.map((data) => data.type);
  const moneyData = dataForMoneyChart.map((data) => data.money);

  return createChartTemplate(moneyCtx, ChartTitle.MONEY, moneyDataLabels, moneyData);
};

const renderTypesChart = (typeCtx, events) => {
  // Функция для отрисовки графика по типам точек маршрута
  const dataForTypeChart = events.slice(0).sort(sort.typeCount).
    filter((event) => event.count > 0);
  const typeDataLabels = dataForTypeChart.map((data) => data.type);
  const typeData = dataForTypeChart.map((data) => data.count);

  return createChartTemplate(typeCtx, ChartTitle.TYPE, typeDataLabels, typeData);
};

const renderTimeSpendChart = (timeSpendCtx, events) => {
  // Функция для отрисовки графика по затраченному времени
  const timeForTypeChart = events.slice(0).sort(sort.time).
    filter((event) => event.time > 0);
  const timeDataLabels = timeForTypeChart.map((data) => data.type);
  const timeData = timeForTypeChart.map((data) => data.time);
  return createChartTemplate(timeSpendCtx, ChartTitle.TIME_SPAND, timeDataLabels, timeData);
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
    // Нужно отрисовать 3 графика
    if (this._moneyCart !== null || this._typesChart !== null || this._timeSpendChart !== null) {
      this._moneyCart = null;
      this._typesChart = null;
      this._timeSpendChart = null;
    }

    const moneyCtx = this.getElement().querySelector('#money');
    const typeCtx = this.getElement().querySelector('#type');
    const timeCtx = this.getElement().querySelector('#time-spend');

    this._moneyCart = renderMoneyChart(moneyCtx, this._data);
    this._typeChart = renderTypesChart(typeCtx, this._data);
    this._timeChart = renderTimeSpendChart(timeCtx, this._data);
  }
}
