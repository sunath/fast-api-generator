import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HeaderComponent } from './header/header.component';
import {MatButtonModule} from "@angular/material/button"
import {MatIconModule} from "@angular/material/icon";
import {MatFormFieldModule} from "@angular/material/form-field"
import {MatInputModule} from "@angular/material/input"
import {MatSelectModule} from "@angular/material/select"
import {MatCheckboxModule} from "@angular/material/checkbox"
import { HeroComponent } from './hero/hero.component';
import { DatabaseConfigComponent } from './database-config/database-config.component';
import { StoreModule } from '@ngrx/store'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { dbConfigReducer } from './database-config/db-config.reducer';

import { HighlightModule, HIGHLIGHT_OPTIONS } from 'ngx-highlightjs';
import { DatabaseModelsComponent } from './database-models/database-models.component';
import { DatabaseModelComponent } from './database-models/database-model/database-model.component';
import {CdkAccordionModule} from '@angular/cdk/accordion';
import { ApiSchemasComponent } from './api-schemas/api-schemas.component';
import { ApiRoutersComponent } from './api-routers/api-routers.component';
import { ApiModelComponent } from './api-model/api-model.component';
import { FinalizeComponent } from './finalize/finalize.component';
import { CustomSchemaResultComponent } from './api-schemas/custom-schema-result/custom-schema-result.component';



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HeroComponent,
    DatabaseConfigComponent,
    DatabaseModelsComponent,
    DatabaseModelComponent,
    ApiSchemasComponent,
    ApiRoutersComponent,
    ApiModelComponent,
    FinalizeComponent,
    CustomSchemaResultComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NgbModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatCheckboxModule,
    ReactiveFormsModule,
    CdkAccordionModule,
    FormsModule,
    
    StoreModule.forRoot({dbConfig:dbConfigReducer}),
    HighlightModule
  ],
  providers: [
    {
      provide: HIGHLIGHT_OPTIONS,
      useValue: {
        coreLibraryLoader: () => import('highlight.js/lib/core'),
        themePath: 'assets/css/github.css',
        languages: {
          python: () => import('highlight.js/lib/languages/python')
        }
      }
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
