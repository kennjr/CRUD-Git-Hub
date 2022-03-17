import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './components/about/about.component';
import { LoginComponent } from './components/login/login.component';
import { ProfileComponent } from './components/profile/profile.component';
import { RepoViewComponent } from './components/repo-view/repo-view.component';
// import { HeaderComponent } from './components/header/header.component';
import { ResultsComponent } from './components/results/results.component';
import { SignupComponent } from './components/signup/signup.component';
import { UserDetailsComponent } from './components/user-details/user-details.component';

const routes: Routes = [
  {path:"", component:ResultsComponent},
  {path:"about", component:AboutComponent},
  {path:"profile", component:ProfileComponent},
  {path:"login", component:LoginComponent},
  {path:"signup", component:SignupComponent},
  {path:"repo-view", component:RepoViewComponent},
  {path:"users/:api_url", component:UserDetailsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
