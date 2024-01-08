import { CommonModule, NgIf } from '@angular/common';
import { SidebarComponent } from '../sidebar/sidebar.component';

import { RouterModule } from '@angular/router';

export const WRAPPER_DEPS = [NgIf, SidebarComponent, RouterModule, CommonModule];
