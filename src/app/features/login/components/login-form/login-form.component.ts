import { Component, OnChanges, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { CustomValidator } from 'src/app/custom-validators/custom-validator';


@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})


export class LoginFormComponent {
  type: string;
  form: FormGroup;
  innerText: string;
  isOpen: boolean;

  handleClick() {
    this.type === "password" ? this.type = "text" : this.type = "password";
    this.isOpen === false ? this.isOpen = true : this.isOpen = false;
  }
  loginButtonClick() {
    this.auth.login(this.form.value)
  }

  constructor(public auth: AuthService) {

  }

  ngOnInit(): void {
    this.form = this.createForm();
    this.innerText = "Username"
    this.type = "password"
    this.isOpen = false;
  }


  createForm() {
    return new FormGroup({
      email: new FormControl(null, { validators: [Validators.required, Validators.email,], updateOn: 'blur' }
      ),

      password: new FormControl(null, {
        validators: [
          Validators.required,
          CustomValidator.patternValidator(/\d/, { hasNumber: true, }),
          CustomValidator.patternValidator(/[A-Z]/, { hasCapitalCase: true }),
          CustomValidator.patternValidator(/[a-z]/, { hasSmallCase: true }),
          CustomValidator.patternValidator(
            /[ !@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/, { hasSpecialCharacters: true }),
          Validators.minLength(6),
          Validators.maxLength(20)

        ],
        updateOn: 'change'
      }),
    }, { updateOn: 'change' })
  }






}
