import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Components
import { HomeComponent } from './component/home/home.component';
import { SettingsComponent } from './component/settings/settings.component';
import { GameComponent } from './component/game/game.component';

const routes: Routes = [
  { path: '', redirectTo: '/game', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'settings', component:SettingsComponent },
  { path: 'game', component: GameComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
