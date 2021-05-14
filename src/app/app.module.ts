import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { NgbModule, NgbTypeaheadModule } from '@ng-bootstrap/ng-bootstrap';
import { SearchComponent } from './search/search.component';
import { LeaderboardComponent } from './search/leaderboard/leaderboard.component';
import { StatisticsComponent } from './search/statistics/statistics.component';
import { UpcomingComponent } from './search//upcoming/upcoming.component';
import { HttpClientModule } from '@angular/common/http';
import { PastmatchesComponent } from './search/pastmatches/pastmatches.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    SearchComponent,
    StatisticsComponent,
    LeaderboardComponent,
    UpcomingComponent,
    PastmatchesComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgbModule,
    NgbTypeaheadModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
