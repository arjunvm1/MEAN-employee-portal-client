import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {HttpClientModule} from '@angular/common/http'
import { ToastrModule } from 'ngx-toastr';
import { UpdateAdminComponent } from './update-admin/update-admin.component';
import { ChartComponent } from './chart/chart.component';
import { CalenderComponent } from './calender/calender.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatCardModule} from '@angular/material/card';
import {MatNativeDateModule} from '@angular/material/core';
import { HighchartsChartModule } from 'highcharts-angular';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    HomeComponent,
    UpdateAdminComponent,
    ChartComponent,
    CalenderComponent
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot(), // ToastrModule added
     HttpClientModule,
     MatDatepickerModule,
     MatCardModule,
     MatNativeDateModule,
     HighchartsChartModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
