import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';

import { MyApp } from './app.component';

import { IntroPage } from '../pages/intro/intro';
import { LoadingPage } from '../pages/loading/loading';
import { LoginPage } from '../pages/login/login';
import { TabsPage } from '../pages/tabs/tabs';
import { HoyPage } from '../pages/hoy/hoy';
import { HoyDetallePage } from '../pages/hoy-detalle/hoy-detalle';
import { HoyMedicamentoPage } from '../pages/hoy-medicamento/hoy-medicamento';
import { HoyMedicamentoCrearPage } from '../pages/hoy-medicamento-crear/hoy-medicamento-crear';
import { ProgresoPage } from '../pages/progreso/progreso';
import { ProgresoDetallePage } from '../pages/progreso-detalle/progreso-detalle';
import { InformePage } from '../pages/informe/informe';
import { InformeEnvioPage } from '../pages/informe-envio/informe-envio';
import { MedicoPage } from '../pages/medico/medico';
import { MedicoDetallePage } from '../pages/medico-detalle/medico-detalle';
import { MedicoCrearPage } from '../pages/medico-crear/medico-crear';
import { MedicoCitaPage } from '../pages/medico-cita/medico-cita';
import { MedicoCitaCrearPage } from '../pages/medico-cita-crear/medico-cita-crear';
import { ModalConsejoTomaPage } from '../pages/modal-consejo-toma/modal-consejo-toma';
import { ModalDuracionFechaPage } from '../pages/modal-duracion-fecha/modal-duracion-fecha';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HeaderColor } from '@ionic-native/header-color';
import { CallNumber } from '@ionic-native/call-number';
import { SQLite } from '@ionic-native/sqlite';

import { LoadingProvider } from '../providers/loading/loading';
import { ToastProvider } from '../providers/toast/toast';
import { DatabaseProvider } from '../providers/database/database';
import { StorageProvider } from '../providers/storage/storage';

import { IonicStorageModule } from '@ionic/storage';

@NgModule({
    declarations: [
        MyApp,
        IntroPage,
        LoadingPage,
        LoginPage,
        TabsPage,
        HoyPage,
        HoyDetallePage,
        HoyMedicamentoPage,
        HoyMedicamentoCrearPage,
        ProgresoPage,
        ProgresoDetallePage,
        InformePage,
        InformeEnvioPage,
        MedicoPage,
        MedicoDetallePage,
        MedicoCrearPage,
        MedicoCitaPage,
        MedicoCitaCrearPage,
        ModalConsejoTomaPage,
        ModalDuracionFechaPage
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        IonicModule.forRoot(MyApp, { tabsHideOnSubPages: true, platforms: { ios: { backButtonText: 'Atrás' } } }),
        IonicStorageModule.forRoot()
    ],
    bootstrap: [IonicApp],
    entryComponents: [
        MyApp,
        IntroPage,
        LoadingPage,
        LoginPage,
        TabsPage,
        HoyPage,
        HoyDetallePage,
        HoyMedicamentoPage,
        HoyMedicamentoCrearPage,
        ProgresoPage,
        ProgresoDetallePage,
        InformePage,
        InformeEnvioPage,
        MedicoPage,
        MedicoDetallePage,
        MedicoCrearPage,
        MedicoCitaPage,
        MedicoCitaCrearPage,
        ModalConsejoTomaPage,
        ModalDuracionFechaPage
    ],
    providers: [
        StatusBar,
        SplashScreen,
        HeaderColor,
        CallNumber,
        SQLite,
        { provide: ErrorHandler, useClass: IonicErrorHandler },
        LoadingProvider,
        ToastProvider,
        DatabaseProvider,
        StorageProvider
    ]
})
export class AppModule { }
