import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, NgModule, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Chart } from 'chart.js/auto';

@Component({
  selector: 'app-admin-chart',
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-chart.component.html',
  styleUrl: './admin-chart.component.css'
})
export class AdminChartComponent implements AfterViewInit{
  @ViewChild('lineChartCanvas') lineChartCanvas!: ElementRef<HTMLCanvasElement>;
  private chart: Chart | undefined;

  // Filter states
  selectedFilter: string = 'All'; // Default to "Employers" as in the screenshot
  selectedTimeframe: string = 'Daily'; // Default to "Annually" as in the screenshot

  // Sample data for different filters and timeframes
  private dataMap: { [key: string]: { [key: string]: number[] } } = {
    All: {
      Daily: [100, 120, 110, 130, 150, 140, 130, 70, 90, 80, 110, 120],
      Weekly: [500, 600, 550, 650, 700, 680, 620, 300, 450, 400, 550, 600],
      Annually: [2000, 2500, 2200, 3000, 3500, 3200, 2800, 1348, 2000, 1800, 2500, 3000]
    },
    Employers: {
      Daily: [50, 60, 55, 65, 75, 70, 65, 35, 45, 40, 55, 60],
      Weekly: [250, 300, 275, 325, 350, 340, 310, 150, 225, 200, 275, 300],
      Annually: [1000, 1250, 1100, 1500, 1750, 1600, 1400, 674, 1000, 900, 1250, 1500]
    },
    JobSeekers: {
      Daily: [150, 180, 165, 195, 225, 210, 195, 105, 135, 120, 165, 180],
      Weekly: [750, 900, 825, 975, 1050, 1020, 930, 450, 675, 600, 825, 900],
      Annually: [3000, 3750, 3300, 4500, 5250, 4800, 4200, 2022, 3000, 2700, 3750, 4500]
    }
  };

  // Labels for different timeframes
  private labelsMap: { [key: string]: string[] } = {
    Daily: ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5', 'Day 6', 'Day 7', 'Day 8', 'Day 9', 'Day 10', 'Day 11', 'Day 12'],
    Weekly: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5', 'Week 6', 'Week 7', 'Week 8', 'Week 9', 'Week 10', 'Week 11', 'Week 12'],
    Annually: ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC']
  };

  // Y-axis max values for different timeframes
  private yAxisMaxMap: { [key: string]: number } = {
    Daily: 300,
    Weekly: 1500,
    Annually: 6000
  };

  ngAfterViewInit(): void {
    this.createChart();
  }

  createChart(): void {
    const ctx = this.lineChartCanvas.nativeElement.getContext('2d');
    if (!ctx) return;

    // Create a gradient for the fill
    const gradient = ctx.createLinearGradient(0, 0, 0, 400);
    gradient.addColorStop(0, '#000d1c');
    gradient.addColorStop(1, 'rgba(200, 200, 200, 0)');

    this.chart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: this.labelsMap[this.selectedTimeframe],
        datasets: [
          {
            label: 'Users',
            data: this.dataMap[this.selectedFilter][this.selectedTimeframe],
            fill: true,
            backgroundColor: gradient,
            borderColor: '#000d1c',
            pointBackgroundColor: '#ff4900',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: '#4B5EAA',
            tension: 0.4
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false
          },
          tooltip: {
            enabled: true,
            backgroundColor: '#000d1c',
            titleFont: { size: 14, weight: 'normal' },
            bodyFont: { size: 14 },
            titleColor: '#fff',
            bodyColor: '#fff',
            borderColor: '#4B5EAA',
            borderWidth: 1
          }
        },
        scales: {
          x: {
            grid: {
              display: true
            },
            ticks: {
              color: '#A0A0A0'
            }
          },
          y: {
            min: 0,
            max: this.yAxisMaxMap[this.selectedTimeframe],
            ticks: {
              stepSize: this.yAxisMaxMap[this.selectedTimeframe] / 5,
              color: '#A0A0A0',
              callback: (value) => {
                if (value === 0) return '0';
                return `${Number(value) / 1000}k`;
              }
            },
            grid: {
              display: false
            }
          }
        }
      }
    });
  }

  // Update chart when filter changes
  updateChart(): void {
    if (this.chart) {
      this.chart.data.labels = this.labelsMap[this.selectedTimeframe];
      this.chart.data.datasets[0].data = this.dataMap[this.selectedFilter][this.selectedTimeframe];
      this.chart.options.scales!['y']!.max = this.yAxisMaxMap[this.selectedTimeframe];
      (this.chart.options.scales!['y']!.ticks as any).stepSize = this.yAxisMaxMap[this.selectedTimeframe] / 5;
      this.chart.update();
    }
  }

  // Handle filter change
  onFilterChange(filter: string): void {
    this.selectedFilter = filter;
    this.updateChart();
  }

  // Handle timeframe change
  onTimeframeChange(timeframe: string): void {
    this.selectedTimeframe = timeframe;
    this.updateChart();
  }

  ngOnDestroy(): void {
    if (this.chart) {
      this.chart.destroy();
    }
  }
}
