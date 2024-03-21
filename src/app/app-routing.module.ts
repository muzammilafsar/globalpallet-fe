import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { appRoutes } from './app.constants';
import { AppComponent } from './app.component';
import { HomepageComponent } from './homepage/homepage.component';
import { MenuComponent } from './menu/menu.component';
import { AuthGuardService } from './auth-guard.service';
import { RoutingHelperComponent } from './routing-helper/routing-helper.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { ContactComponent } from './contact/contact.component';
import { OrderConfirmationComponent } from './order-confirmation/order-confirmation.component';
import { MyOrdersComponent } from './my-orders/my-orders.component';
import { MyAddressComponent } from './my-address/my-address.component';
import { CancelRequestComponent } from './cancel-request/cancel-request.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { TermsComponent } from './terms/terms.component';
import { ShopGuard } from './shop.guard';
import { OffersComponent } from './offers/offers.component';
import { PrivacypolicyComponent } from './privacypolicy/privacypolicy.component';
import { PartyordersComponent } from './partyorders/partyorders.component';
import { WhyUSComponent } from './whyus/whyus.component';
import { FAQComponent } from './faq/faq.component';
import { DownloadAppComponent } from './download-app/download-app.component';


const routes: Routes = [
  {
    path: appRoutes.root,
    component: AppComponent,
    children: [
      {
        path: '',
        component: RoutingHelperComponent,
        children: [
            {
                path: '',
                component: HomepageComponent
            },
            {
                path: appRoutes.menu,
                component: MenuComponent
            },
            {
                path: appRoutes.myorders,
                component: MyOrdersComponent,
                canActivate: [AuthGuardService]
            },
            {
                path: appRoutes.checkout,
                component: CheckoutComponent,
                canActivate: [AuthGuardService, ShopGuard]
            },
            {
                path: appRoutes.orderSuccess,
                component: OrderConfirmationComponent
            },
            {
              path: appRoutes.aboutUs,
              component: AboutUsComponent
            },
            {
              path: appRoutes.whyus,
              component: WhyUSComponent
            },
            {
              path: appRoutes.privacypolicy,
              component: PrivacypolicyComponent
            },
            {
              path: appRoutes.partyorders,
              component: PartyordersComponent
            },
            {
              path: appRoutes.offers,
              component: OffersComponent
            },
            {
              path: appRoutes.terms,
              component: TermsComponent
            },
            {
              path: appRoutes.faq,
              component: FAQComponent
            },
            {
              path: appRoutes.app,
              component: DownloadAppComponent
            },
            {
              path: appRoutes.contactUs,
              component: ContactComponent
            },
            {
                path: appRoutes.orderCancel,
                component: CancelRequestComponent
            }
        ]
      },
      {
        path: appRoutes.myaddress,
        children: [
          {
            path: '',
            component: MyAddressComponent,
            canActivate: [AuthGuardService]
          },
          {
            path: 'edit/:id',
            component: MyAddressComponent,
            canActivate: [AuthGuardService]
          }
        ],
      }
    ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],   
  // , { useHash: true }
  exports: [RouterModule]
})
export class AppRoutingModule { }
