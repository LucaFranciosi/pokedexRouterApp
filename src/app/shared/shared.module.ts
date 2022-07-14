import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BannerComponent } from './components/banner/banner.component';
import { MainComponent } from './components/main/main.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HeaderComponent } from './components/header/header.component';
import { InputSearchComponent } from './components/input-search/input-search.component';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { CardComponent } from './components/card/card.component';
import { CarouselComponent } from './components/carousel/carousel.component';
import { ModalComponent } from './components/modal/modal.component';
import { FilteredListPipe } from './pipes/filtered-list-pipe.pipe';
import { ToolTipComponent } from './components/tool-tip/tool-tip.component';
import { AccordionIconComponent } from './components/accordion-icon/accordion-icon.component';
import { MiniatureComponent } from './miniature/miniature.component';
import { FilterComponentComponent } from './components/filter-component/filter-component.component';
import { AccordionComponent } from './components/accordion-component/accordion.component';
import { VarDirective } from './directives/ng-var.directive';
import { AccordionIconDirective } from './directives/accordion-icon.directive';

@NgModule({
  declarations: [
    //Layout Components
    MainComponent,
    BannerComponent,
    NavbarComponent,
    HeaderComponent,

    // Home page Components
    InputSearchComponent,
    SpinnerComponent,
    CardComponent,
    CarouselComponent,
    ModalComponent,
    MiniatureComponent,
    AccordionComponent,

    //Custom Pipes
    FilteredListPipe,

    //Components
    ToolTipComponent,
    AccordionIconComponent,
    FilterComponentComponent,


    //Directives
    VarDirective,
      AccordionIconDirective,


  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,

  ],


  exports: [
    //Layout Components
    MainComponent,
    BannerComponent,
    NavbarComponent,
    HeaderComponent,

    // Home page Components
    InputSearchComponent,
    SpinnerComponent,
    CardComponent,
    CarouselComponent,
    ModalComponent,
    MiniatureComponent,
    AccordionComponent,


    //Custom Pipes
    FilteredListPipe,

    //Components
    ToolTipComponent,
    AccordionIconComponent,
    FilterComponentComponent,


    //Directives
    VarDirective,
    AccordionIconDirective,


    /* as you create a shared component, export the declaration here
    and include this model inside the componentsTemplate that will use shared cmpnts. */]
})
export class SharedModule { }
