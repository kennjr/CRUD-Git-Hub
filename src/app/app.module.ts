import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { AboutComponent } from './components/about/about.component';
import { ResultsComponent } from './components/results/results.component';
import { UserItemComponent } from './components/user-item/user-item.component';
import { RepoItemComponent } from './components/repo-item/repo-item.component';
import { UserPipe } from './pipes/user.pipe';
import { UserDetailsComponent } from './components/user-details/user-details.component';
import { UnderlineDirective } from './directives/underline.directive';
import { RepoPipe } from './pipes/repo.pipe';
import { ElapsedTimePipe } from './pipes/elapsed-time.pipe';
import { LoginComponent } from './components/login/login.component';
import { ProfileComponent } from './components/profile/profile.component';
import { SignupComponent } from './components/signup/signup.component';
import { RepoViewComponent } from './components/repo-view/repo-view.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    AboutComponent,
    ResultsComponent,
    UserItemComponent,
    RepoItemComponent,
    UserPipe,
    UserDetailsComponent,
    UnderlineDirective,
    RepoPipe,
    ElapsedTimePipe,
    LoginComponent,
    ProfileComponent,
    SignupComponent,
    RepoViewComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FontAwesomeModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
