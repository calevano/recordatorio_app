import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';

import { MyApp } from './app.component';
// Pages
import { IntroPage } from '../pages/intro/intro';
import { LoadingPage } from '../pages/loading/loading';
import { LoginPage } from '../pages/login/login';
import { TabsPage } from '../pages/tabs/tabs';
import { HoyPage } from '../pages/hoy/hoy';
import { HoyDetallePage } from '../pages/hoy-detalle/hoy-detalle';
import { HoyMedicamentoPage } from '../pages/hoy-medicamento/hoy-medicamento';
import { HoyMedicamentoCrearPage } from '../pages/hoy-medicamento-crear/hoy-medicamento-crear';
import { MedicinaPage } from '../pages/medicina/medicina';
import { MedicinaCrearPage } from '../pages/medicina-crear/medicina-crear';
import { MedicinaEditarPage } from '../pages/medicina-editar/medicina-editar';
import { ProgresoPage } from '../pages/progreso/progreso';
import { ProgresoDetallePage } from '../pages/progreso-detalle/progreso-detalle';
import { InformePage } from '../pages/informe/informe';
import { InformeEnvioPage } from '../pages/informe-envio/informe-envio';
import { MedicoPage } from '../pages/medico/medico';
import { MedicoDetallePage } from '../pages/medico-detalle/medico-detalle';
import { MedicoCrearPage } from '../pages/medico-crear/medico-crear';
import { MedicoEditarPage } from '../pages/medico-editar/medico-editar';
import { MedicoCitaCrearPage } from '../pages/medico-cita-crear/medico-cita-crear';
import { MedicoCitaEditarPage } from '../pages/medico-cita-editar/medico-cita-editar';
import { ModalConsejoTomaPage } from '../pages/modal-consejo-toma/modal-consejo-toma';
import { ModalDuracionFechaPage } from '../pages/modal-duracion-fecha/modal-duracion-fecha';
// Providers
import { LoadingProvider } from '../providers/loading/loading';
import { ToastProvider } from '../providers/toast/toast';
import { DatabaseProvider } from '../providers/database/database';
import { StorageProvider } from '../providers/storage/storage';
import { LocalNotificationProvider } from '../providers/local-notification/local-notification';
// Pipes
import { KeyValuePipe } from '../pipes/key-value/key-value';
import { MomentPipe } from '../pipes/moment/moment';
import { MesTextPipe } from '../pipes/mes-text/mes-text';
// Plugins
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HeaderColor } from '@ionic-native/header-color';
import { CallNumber } from '@ionic-native/call-number';
import { SQLite } from '@ionic-native/sqlite';
import { WheelSelector } from '@ionic-native/wheel-selector';
import { LocalNotifications } from '@ionic-native/local-notifications';
import { Network } from '@ionic-native/network';
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
        MedicinaPage,
        MedicinaCrearPage,
        MedicinaEditarPage,
        ProgresoPage,
        ProgresoDetallePage,
        InformePage,
        InformeEnvioPage,
        MedicoPage,
        MedicoDetallePage,
        MedicoCrearPage,
        MedicoEditarPage,
        MedicoCitaCrearPage,
        MedicoCitaEditarPage,
        ModalConsejoTomaPage,
        ModalDuracionFechaPage,
        KeyValuePipe,
        MomentPipe,
        MesTextPipe,
    ],
    // tabsHideOnSubPages: true, 
    imports: [
        BrowserModule,
        HttpClientModule,
        IonicModule.forRoot(MyApp, { platforms: { ios: { backButtonText: 'Atrás' } } }),
        IonicStorageModule.forRoot({
            name: '_mydbrecordatorio',
            driverOrder: ['indexeddb', 'sqlite', 'websql']
        }),
        ReactiveFormsModule
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
        MedicinaPage,
        MedicinaCrearPage,
        MedicinaEditarPage,
        ProgresoPage,
        ProgresoDetallePage,
        InformePage,
        InformeEnvioPage,
        MedicoPage,
        MedicoDetallePage,
        MedicoCrearPage,
        MedicoEditarPage,
        MedicoCitaCrearPage,
        MedicoCitaEditarPage,
        ModalConsejoTomaPage,
        ModalDuracionFechaPage
    ],
    providers: [
        StatusBar,
        SplashScreen,
        HeaderColor,
        CallNumber,
        SQLite,
        WheelSelector,
        LocalNotifications,
        Network,
        { provide: ErrorHandler, useClass: IonicErrorHandler },
        LoadingProvider,
        ToastProvider,
        DatabaseProvider,
        StorageProvider,
        LocalNotificationProvider
    ]
})
export class AppModule { }
