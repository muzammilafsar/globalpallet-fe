import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MatTabsModule, MatSelectModule, MatToolbarModule, MatIconModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { CategoryThumbnailComponent } from './category-thumbnail/category-thumbnail.component';
import { CustomerTestimonialComponent } from './customer-testimonial/customer-testimonial.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { ImageCarouselComponent } from './image-carousel/image-carousel.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { WhatwedoComponent } from './whatwedo/whatwedo.component';
import { HomepageComponent } from './homepage/homepage.component';
import { MenuComponent } from './menu/menu.component';
import { AppRoutingModule } from './app-routing.module';
import { RoutingHelperComponent } from './routing-helper/routing-helper.component';
import { LoginSignupComponent } from './login-signup/login-signup.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '../../node_modules/@angular/common/http';
import { ProductFilterPipe } from './product-filter.pipe';
import { CheckoutComponent } from './checkout/checkout.component';
import { ContactComponent } from './contact/contact.component';
import { OrderConfirmationComponent } from './order-confirmation/order-confirmation.component';
import { MyOrdersComponent } from './my-orders/my-orders.component';
import { MyAddressComponent } from './my-address/my-address.component';
import { LoaderComponent } from './loader/loader.component';
import { DotLoaderComponent } from './dot-loader/dot-loader.component';
import { CancelRequestComponent } from './cancel-request/cancel-request.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { TermsComponent } from './terms/terms.component';
import { ShopService } from './shop.service';
import { ApiService } from './api.service';
import { CartService } from './cart.service';
import { LoginService } from './login.service';
import { NotAvailableComponent } from './not-available/not-available.component';
import { MaterialModule } from './material.module';
import { SearchPipe } from './search.pipe';
import { OffersComponent } from './offers/offers.component';
import { AddressCardComponent } from './address-card/address-card.component';
import { PrivacypolicyComponent } from './privacypolicy/privacypolicy.component';
import { PartyordersComponent } from './partyorders/partyorders.component';
import { WhyUSComponent } from './whyus/whyus.component';
import { OcassionaloffComponent } from './ocassionaloff/ocassionaloff.component';
import { FAQComponent } from './faq/faq.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { DownloadAppComponent } from './download-app/download-app.component';
import { ExploreComponent } from './explore/explore.component';
import { ExplorePipe } from './explore.pipe';

@NgModule({
  declarations: [
    AppComponent,
    CategoryThumbnailComponent,
    CustomerTestimonialComponent,
    FooterComponent,
    HeaderComponent,
    ImageCarouselComponent,
    SidenavComponent,
    WhatwedoComponent,
    HomepageComponent,
    MenuComponent,
    RoutingHelperComponent,
    LoginSignupComponent,
    ProductFilterPipe,
    CheckoutComponent,
    ContactComponent,
    OrderConfirmationComponent,
    MyOrdersComponent,
    MyAddressComponent,
    LoaderComponent,
    DotLoaderComponent,
    CancelRequestComponent,
    AboutUsComponent,
    TermsComponent,
    NotAvailableComponent,
    SearchPipe,
    OffersComponent,
    AddressCardComponent,
    PrivacypolicyComponent,
    PartyordersComponent,
    WhyUSComponent,
    OcassionaloffComponent,
    FAQComponent,
    DownloadAppComponent,
    ExploreComponent,
    ExplorePipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatTabsModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    MaterialModule,
    NgbModule,
    SlickCarouselModule
  ],
  providers: [ShopService, ApiService, CartService, LoginService],
  bootstrap: [AppComponent]
})
export class AppModule { }
