import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MotorbikeListComponent } from './Feature/Motobike/motobike-list/motorbike-list.component';
import { MotorbikeDetailComponent } from './Feature/Motobike/motorbike-detail/motorbike-detail.component';
import { LoginComponent } from './Feature/auth/login/login.component';
import { MainComponent } from './Core/Component/main/main.component';
import { OwnerAuthGuard } from './Feature/auth/guard/owner.auth.guard';
import { AppointmentsListComponent } from './Feature/Appointments/appointments-list/appointments-list.component';
import { HomepageComponent } from './Core/homepage/homepage.component';
import { HomePageListComponent } from './Feature/Home/home-page-list/home-page-list.component';
import { RegisterComponent } from './Feature/auth/register/register.component';
import { MotorbikeRentalComponent } from './Feature/Home/motorbike-rental/motorbike-rental.component';

import { AddMotorbikeComponent } from './Feature/Motobike/add-motorbike/add-motorbike.component';
import { MotorbikeHomeDetailComponent } from './Feature/Home/motorbike-detail/motorbike-detail.component';
import { StatisticRevenueComponent } from './Feature/Statistics/statistic-revenue/statistic-revenue.component';
import { StatisticMotorbikeComponent } from './Feature/Statistics/statistic-motorbike/statistic-motorbike.component';
import { AppointmentHistoryComponent } from './Feature/Home/appointment-history/appointment-history.component';
import { VisitorGuard } from './Feature/auth/guard/visitor.guard';
import { ConfirmPaymentComponent } from './Feature/Home/confirm-payment/confirm-payment.component';


const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  {
    path: 'owner',
    component: MainComponent,
    children: [
      { path: 'motorbike', component: MotorbikeListComponent },
      { path: 'motorbike/detail/:id', component: MotorbikeDetailComponent },
      { path: 'motorbike/add', component: AddMotorbikeComponent },
      { path: 'appointments', component: AppointmentsListComponent },

      { path: 'statistic/revenue', component: StatisticRevenueComponent },
      { path: 'statistic/motorbike', component: StatisticMotorbikeComponent },

    ],
    canActivate: [OwnerAuthGuard],
  },
  {
    path: '',
    component: HomepageComponent,
    children: [
    { path: '', component: HomePageListComponent },
    { path: 'motorbike/:id', component: MotorbikeHomeDetailComponent },

    { path: 'motorbike-rental/:id', component: MotorbikeRentalComponent, canActivate: [VisitorGuard] },
    { path: 'appointment-history', component: AppointmentHistoryComponent, canActivate: [VisitorGuard] },
    { path: 'confirm-payment/:id', component: ConfirmPaymentComponent, canActivate: [VisitorGuard] },

    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
