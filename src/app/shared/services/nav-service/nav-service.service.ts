import { Injectable } from "@angular/core";

@Injectable({ providedIn: 'root' })


export class NavService {
    navBarStatus: string;


    openMenu(): void {
        this.navBarStatus = 'opened';
    }

    closeMenu(): void {
        this.navBarStatus = 'closed';
    }
} 
