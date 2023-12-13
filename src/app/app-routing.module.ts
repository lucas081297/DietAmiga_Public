import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { QuestionsComponent } from './questions/questions.component';
import { CafemanhaComponent } from './cafemanha/cafemanha.component';
import { CadastroComponent } from './cadastro/cadastro.component';
import { PerfilComponent } from './perfil/perfil.component';
import { AlmocoComponent} from './almoco/almoco.component';
import { JantaComponent} from './janta/janta.component';
import { LanchetardeComponent} from './lanchetarde/lanchetarde.component';
import { HomeComponent } from './home/home.component';
import { authGuardGuard } from './guards/auth-guard.guard';

const routes: Routes = [
  {path: '', component: LoginComponent},
  {path:'cadastro', component: CadastroComponent},
  {path:'perfil', component: PerfilComponent,canActivate: [authGuardGuard]},
  {path: 'questions', component: QuestionsComponent,canActivate: [authGuardGuard]},
  {path: 'cafemanha', component: CafemanhaComponent,canActivate: [authGuardGuard]},
  {path: 'almoco', component: AlmocoComponent,canActivate: [authGuardGuard]},
  {path: 'lanchetarde', component: LanchetardeComponent,canActivate: [authGuardGuard]},
  {path: 'janta', component: JantaComponent,canActivate: [authGuardGuard]},
  {path: 'home', component: HomeComponent,canActivate: [authGuardGuard]},
  {path: '**', redirectTo:''  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
