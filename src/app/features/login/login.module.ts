import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { SharedModule } from "src/app/shared/shared.module";
import { LoginFormComponent } from "./components/login-form/login-form.component";
import { LoginComponent } from "./login.component";
import { HttpClientModule } from '@angular/common/http';



@NgModule({
    declarations: [
        LoginComponent,
        LoginFormComponent,
    ],
    imports: [
        CommonModule,
        SharedModule,
        ReactiveFormsModule,
        HttpClientModule,

    ],
    exports: [LoginComponent, LoginFormComponent],
    providers: [],
})
export class LoginModule { }
