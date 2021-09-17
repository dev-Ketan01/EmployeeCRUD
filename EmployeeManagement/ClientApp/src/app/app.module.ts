import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { CounterComponent } from './counter/counter.component';
import { FetchDataComponent } from './fetch-data/fetch-data.component';
import { LoginComponent } from './login/login.component';
import { ServiceService } from './service.service';
import { EmployeeComponent } from './employee/employee.component';
import { ToastrModule } from 'ngx-toastr';
import { InterceptorService } from './shared/services/interceptor.service';
import { ModalModule, BsModalService } from 'ngx-bootstrap/modal';
import { SortDirective } from './shared/directive/sort.directive';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    CounterComponent,
    FetchDataComponent,
    LoginComponent,
    EmployeeComponent,
    SortDirective
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full' },
      { path: 'counter', component: CounterComponent },
      { path: 'fetch-data', component: FetchDataComponent },
      { path: 'login', component: LoginComponent },
      { path: 'employee', component: EmployeeComponent },
    ]),
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ModalModule.forRoot(),
    ToastrModule.forRoot()

    
  ],
  providers: [ServiceService,
    { provide: HTTP_INTERCEPTORS, useClass: InterceptorService, multi: true }

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
