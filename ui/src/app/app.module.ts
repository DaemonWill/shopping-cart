import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { CartModalComponent } from './components/cart-modal/cart-modal.component';
import { ItemModalComponent } from './components/item-modal/item-modal.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { ItemCardComponent } from './components/item-card/item-card.component';
import { ShoppingCartApiService } from './services/shopping-cart-api.service';
import { StorageService } from './services/storage.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    AppComponent,
    CartModalComponent,
    ItemModalComponent,
    HeaderComponent,
    FooterComponent,
    ItemCardComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    NgbModule
  ],
  providers: [ShoppingCartApiService, StorageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
