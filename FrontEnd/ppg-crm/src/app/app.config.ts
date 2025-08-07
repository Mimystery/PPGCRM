import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZoneChangeDetection, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { uk_UA, provideNzI18n } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import uk from '@angular/common/locales/uk';
import { FormsModule } from '@angular/forms';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient } from '@angular/common/http';
import { NZ_ICONS } from 'ng-zorro-antd/icon';
import { BellOutline, MessageOutline, UserOutline, MailOutline, PlusOutline, HomeOutline, ProjectOutline, 
  GroupOutline, TeamOutline, BarChartOutline, SolutionOutline, ContainerOutline } from '@ant-design/icons-angular/icons';


registerLocaleData(uk);

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideClientHydration(withEventReplay()),
    provideNzI18n(uk_UA),
    importProvidersFrom(FormsModule),
    provideAnimationsAsync(),
    provideClientHydration(),
    provideHttpClient(),
    { provide: NZ_ICONS, useValue: [BellOutline,MessageOutline, UserOutline, MailOutline, PlusOutline, HomeOutline, ProjectOutline, 
      GroupOutline, TeamOutline, BarChartOutline, SolutionOutline, ContainerOutline] }
  ]
};
