import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './component/home/home.component';
import { MenuComponent } from './component/menu/menu.component';
import { SettingsComponent } from './component/settings/settings.component';
import { BoardComponent } from './component/board/board.component';
import { GameComponent } from './component/game/game.component';
import { PlayersComponent } from './component/players/players.component';
import { WinnerModalComponent } from './component/winner-modal/winner-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MenuComponent,
    SettingsComponent,
    BoardComponent,
    GameComponent,
    PlayersComponent,
    WinnerModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
