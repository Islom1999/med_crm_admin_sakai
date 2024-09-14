import { Component } from '@angular/core';
import { debounceTime, Subscription } from 'rxjs';
import { LayoutService } from 'src/app/layout/service/app.layout.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  barData: any;
  barOptions: any;
  barDataMonth: any;
  barOptionsMonth: any;

  pieData: any;
  pieOptions: any;

  subscription: Subscription;
  constructor(private layoutService: LayoutService) {
    this.subscription = this.layoutService.configUpdate$
      .pipe(debounceTime(25))
      .subscribe((config) => {
        this.initCharts();
      });
  }

  ngOnInit() {
    this.initCharts();
  }

  initCharts() {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

    this.barData = {
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
      datasets: [
        {
          label: 'My First dataset',
          backgroundColor: documentStyle.getPropertyValue('--primary-500'),
          borderColor: documentStyle.getPropertyValue('--primary-500'),
          data: [65, 59, 45, 73, 56, 55, 40]
        },
        {
          label: 'My Second dataset',
          backgroundColor: documentStyle.getPropertyValue('--primary-200'),
          borderColor: documentStyle.getPropertyValue('--primary-200'),
          data: [28, 48, 40, 19, 67, 27, 50]
        }
      ]
    };

    this.barOptions = {
      plugins: {
        legend: {
          labels: {
            fontColor: textColor
          }
        }
      },
      scales: {
        x: {
          ticks: {
            color: textColorSecondary,
            font: {
              weight: 500
            }
          },
          grid: {
            display: false,
            drawBorder: false
          }
        },
        y: {
          ticks: {
            color: textColorSecondary
          },
          grid: {
            color: surfaceBorder,
            drawBorder: false
          }
        },
      }
    }



    this.barDataMonth = {
      labels: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31'],
      datasets: [
        {
          label: 'to\'lovlar',
          backgroundColor: documentStyle.getPropertyValue('--primary-500'),
          borderColor: documentStyle.getPropertyValue('--primary-500'),
          data: [65, 59, 45, 73, 56, 55, 40]
        }
      ]
    };

    this.barOptionsMonth = {
      plugins: {
        legend: {
          labels: {
            fontColor: textColor
          }
        }
      },
      scales: {
        x: {
          ticks: {
            color: textColorSecondary,
            font: {
              weight: 500
            }
          },
          grid: {
            display: false,
            drawBorder: false
          }
        },
        y: {
          ticks: {
            color: textColorSecondary
          },
          grid: {
            color: surfaceBorder,
            drawBorder: false
          }
        },
      }
    }


    this.pieData = {
      labels: ['A', 'B', 'C'],
      datasets: [
        {
          data: [540, 325, 702],
          backgroundColor: [
            documentStyle.getPropertyValue('--indigo-500'),
            documentStyle.getPropertyValue('--purple-500'),
            documentStyle.getPropertyValue('--teal-500')
          ],
          hoverBackgroundColor: [
            documentStyle.getPropertyValue('--indigo-400'),
            documentStyle.getPropertyValue('--purple-400'),
            documentStyle.getPropertyValue('--teal-400')
          ]
        }]
    };

    this.pieOptions = {
      plugins: {
        legend: {
          labels: {
            usePointStyle: true,
            color: textColor
          }
        }
      }
    };
  }
}
