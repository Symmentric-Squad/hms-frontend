// app-routing.module.ts (NgModule based)
import { RouterModule, Routes, ExtraOptions } from '@angular/router';
import { routes } from './app.routes';
import { NgModule } from '@angular/core';

const routerOptions: ExtraOptions = {
  anchorScrolling: 'enabled',
  // Recommended: Scroll to top before scrolling to anchor
  scrollPositionRestoration: 'enabled'
};

@NgModule({
  imports: [RouterModule.forRoot(routes, routerOptions)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
