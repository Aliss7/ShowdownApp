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
import { VenuesComponent } from './search/venues/venues.component';
import { RivalstatComponent } from './search/rivalstat/rivalstat.component';
import { PlayersComponent } from './search/players/players.component';
import { NextfourComponent } from './search/nextfour/nextfour.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    SearchComponent,
    StatisticsComponent,
    LeaderboardComponent,
    UpcomingComponent,
    PastmatchesComponent,
    VenuesComponent,
    RivalstatComponent,
    PlayersComponent,
    NextfourComponent

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
