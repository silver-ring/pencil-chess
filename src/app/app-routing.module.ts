import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {PlayerComponent} from "./player/player.component";

const routes: Routes = [{
  path: 'player',
  component: PlayerComponent,
}, {
  path: 'mainpage',
  component: HomeComponent,
}, {
  path: '',
  pathMatch: "full",
  redirectTo: 'mainpage'
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
