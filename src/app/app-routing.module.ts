import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LeaderboardComponent } from './search/leaderboard/leaderboard.component';
import { StatisticsComponent } from './search/statistics/statistics.component';
import { UpcomingComponent } from './search//upcoming/upcoming.component';

const appRoutes: Routes = [
  { path: 'stats', component: StatisticsComponent },
  { path: 'upcoming', component: UpcomingComponent  },
  { path: 'leaderboard', component: LeaderboardComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      appRoutes,
      //{ enableTracing: true } // <-- debugging purposes only
    )
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {}