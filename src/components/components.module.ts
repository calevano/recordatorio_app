import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { IonicModule } from "ionic-angular";
import { HeaderBorderFooterComponent } from './header-border-footer/header-border-footer';

@NgModule({
	declarations: [
		HeaderBorderFooterComponent
	],
	imports: [
		BrowserModule,
		CommonModule,
		IonicModule
	],
	exports: [
		HeaderBorderFooterComponent
	],
	schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ComponentsModule { }
