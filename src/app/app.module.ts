import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { FormsModule} from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

//  NgRx
import { StoreModule, Store } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';

import { EffectsModule } from '@ngrx/effects';
import { containerReducer } from './containers/state/container.reducer';
import { reducer } from './state/app.reducer';

import { AppComponent } from './app.component';
import { ComboLockComponent } from './challenges/combo-lock/combo-lock.component';
import { TumblerComponent } from './challenges/tumbler/tumbler.component';
import { SequenceComponent } from './challenges/sequence/sequence.component';
import { MaterialModule } from './shared/material.module';
import { DynamicDialogComponent } from './dynamic-dialog/dynamic-dialog.component';
import { ContainerComponent } from './containers/components/room/room.component';
import { ContainerEffects } from './containers/state/container.effects';
import { AppEffects } from './state/app.effects';
import { ContentsComponent } from './containers/components/contents/contents.component';
import { BreakoutService } from './services/breakout.service';
import { HttpClientModule } from '@angular/common/http';
import { PropellerComponent } from './shared/eye-candy/propeller/propeller.component';
import { SubContentsComponent } from './containers/components/sub-contents/sub-contents.component';


@NgModule({
  declarations: [
    AppComponent,
    ComboLockComponent,
    TumblerComponent,
    DynamicDialogComponent,
    ContainerComponent,
    ContentsComponent,
    SequenceComponent,
    PropellerComponent,
    SubContentsComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    MaterialModule,
    HttpClientModule,
    StoreDevtoolsModule.instrument({
    name: 'Breakout',
    logOnly: environment.production,
    }),
    EffectsModule.forRoot([AppEffects, ContainerEffects]),
    StoreModule.forRoot({'Breakout': reducer}),
    StoreModule.forFeature('containers', containerReducer),
    !environment.production ? StoreDevtoolsModule.instrument() : []
  ],
  providers: [BreakoutService],
  bootstrap: [AppComponent],
  entryComponents: [DynamicDialogComponent, ComboLockComponent]
})
export class AppModule {
  constructor(store: Store<any>) {
    store.select(s => s).subscribe(console.log.bind(console));
  }
}

