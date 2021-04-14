import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js';
import { ITenLastOrdersDTO } from 'src/app/shared/Models/tenLastOrders';
import { AdminServiceService } from '../admin-service.service';
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
    lastTenOrders: ITenLastOrdersDTO[] = [];
  constructor(private adminService: AdminServiceService) {
  }

  ngOnInit(): void {
this.updateLastMonthEarnings();
this.getLastTenOrders();
  }
  updateLastMonthEarnings(): void{
      const date = new Date();
      const weeks = [];
      console.log(date);
      console.log('Oto miesiac ' + (date.getMonth() + 1).toString() + '.' + date.getDate().toString());
      for (let i = 0; i < 4; i++)
      {
        const a = (date.getMonth() + 1).toString() + '.' + this.daysToString(date.getDate());
        date.setDate(date.getDate() - 7);
        const b = (date.getMonth() + 1).toString() + '.' + this.daysToString(date.getDate());
        weeks.push(b + ' - ' + a);
      }
      console.log(weeks);
      console.log('oto dzien ' + date.getDate().toString());
      this.adminService.getLastMonthIncome().subscribe(response => {

        this.makeMainChart(response.reverse(), weeks.reverse());
      })
  }
  getLastTenOrders(): void{
      this.adminService.getTenLastOrders().subscribe((response) => {
          for (let i = 0; i < response.length; i++) {
            this.lastTenOrders[i] = response[i];
         }
          console.log(this.lastTenOrders);
      }, error => {
          console.log(error);
      });
      console.log(this.lastTenOrders);
  }
   makeMainChart(adminData: number[], labelNames){

    var canvas = document.getElementById('myChart') as HTMLCanvasElement;
    var ctx = canvas.getContext('2d');
    var myChart = new Chart(ctx, {
      type: 'bar',
      data: {
          labels: labelNames,
          datasets: [{
              label: 'Przychód z ostatniego miesiąca',
              data: adminData,
              backgroundColor: [
                  'rgba(255, 99, 132, 0.2)',
                  'rgba(54, 162, 235, 0.2)',
                  'rgba(255, 206, 86, 0.2)',
                  'rgba(75, 192, 192, 0.2)',
                  'rgba(153, 102, 255, 0.2)',
                  'rgba(255, 159, 64, 0.2)'
              ],
              borderColor: [
                  'rgba(255, 99, 132, 1)',
                  'rgba(54, 162, 235, 1)',
                  'rgba(255, 206, 86, 1)',
                  'rgba(75, 192, 192, 1)',
                  'rgba(153, 102, 255, 1)',
                  'rgba(255, 159, 64, 1)'
              ],
              borderWidth: 1
          }]
      },
      options: {
          scales: {
              yAxes: [{
                  ticks: {
                      beginAtZero: true
                  }
              }]
          }
      }
  });
  }
  private daysToString(x: number): string{
      if (x > 9){
        return x.toString();
      }
      else {
        return '0' + x.toString();
      }
  }
}
