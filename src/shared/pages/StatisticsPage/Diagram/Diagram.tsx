import React from 'react';
import styles from './diagram.css';
import { Bar } from 'react-chartjs-2';
import type { ChartOptions } from 'chart.js';
import Chart from 'chart.js/auto';
import { CategoryScale } from 'chart.js';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../store/reducer';
import { getDayFromNow, getDaysArray } from '../../../../utils/getDaysArray';


export function Diagram() {
  const currentWeek = useSelector<RootState, { date: number, work: number }[]>(s => s.statisticData.currentWeek)
  const weeksAgo = useSelector<RootState, number>(s => s.weeksAgo)

  const [from, to] = [(weeksAgo + 1) * 7, weeksAgo * 7 - 1];

  const data = currentWeek.filter((d) => d.date > getDayFromNow(from).getTime() && d.date <= getDayFromNow(to).getTime()).map((el) => el.work)

  Chart.register(CategoryScale);

  const chartData = {
    labels: getDaysArray(weeksAgo * 7),
    datasets: [
      {
        backgroundColor: '#EA8A79',
        hoverBackgroundColor: '#DC3E22',
        data: data,
      },
    ],
  };

  const chartOptions: ChartOptions<'bar'> = {
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: function (context) {
            let label = context.dataset.label || '';
            let t = context.parsed.y

            if (label) {
              label += ': ';
            }

            if (t !== null) {
              if (typeof (t) === 'number') {
                if (t > 60) {
                  label = `${Math.floor(t / 60)} часа ${t % 60} мин`;
                } else {
                  label = `${t} мин`
                }
              }

            }
            return label
          }
        }
      }
    },

    scales: {
      y: {
        position: 'right',
        ticks: {
          callback: function (value, index, ticks) {
            if (typeof (value) === 'number') {
              if (value > 60) {
                return `${Math.floor(value / 60)} часа ${value % 60} мин`
              } else {
                return `${value} мин`
              }
            }
          },
          color: '#333333', padding: 32, font: { family: 'SF UI Display', size: 12, weight: '400' }
        },
        border: { display: false }
      },

      x: { grid: { display: false }, ticks: { color: '#999999', font: { family: 'SF UI Display', size: 24, weight: '400' } } },
    },
    backgroundColor: '#EA8A79',
  };



  return (
    <div className={styles.diagram} >
      <Bar data={chartData} options={chartOptions} />
    </div >
  );
}
