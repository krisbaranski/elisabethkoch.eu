import { NgModule } from '@angular/core';
import { ServerModule } from '@angular/platform-server';
import { AppModule } from './app.module';
import { AppComponent } from './app.component';

@NgModule({
  imports: [
    AppModule, // ✅ Import main app module
    ServerModule,
  ],
  bootstrap: [AppComponent],
})
export class AppServerModule {}
