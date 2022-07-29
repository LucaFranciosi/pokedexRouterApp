import { Component, OnInit, } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { CustomValidator } from 'src/app/custom-validators/custom-validator';

@Component({
  selector: 'app-registration-form',
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.scss']
})
export class RegistrationFormComponent implements OnInit {
  type: string;
  form: FormGroup;
  innerText: string;
  isOpen: boolean;




  constructor(public auth: AuthService) { }

  ngOnInit(): void {
    this.form = this.createForm();
    this.type = "password"
    this.isOpen = false;
  }

  handleClick() {
    this.type === "password" ? this.type = "text" : this.type = "password";
    this.isOpen === false ? this.isOpen = true : this.isOpen = false;
  }

  regButtonClick(event: SubmitEvent) { this.auth.register(this.form.value) }



  createForm() {

    return new FormGroup({

      firstName: new FormControl(null, {
        validators: [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(20),
          CustomValidator.patternValidator(/\b([A-ZÀ-ÿ][-,a-z. ']+[ ]*)+/, { hasValidity: true })
        ],
        updateOn: 'blur',

      }
      ),
      lastName: new FormControl(null, {
        validators: [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(20),
          CustomValidator.patternValidator(/\b([A-ZÀ-ÿ][-,a-z. ']+[ ]*)+/, { hasValidity: true })
        ], updateOn: 'blur'
      }),

      email: new FormControl(null, {
        validators: [
          Validators.email,
          Validators.required,
        ], updateOn: 'blur',
      }),

      password: new FormControl(null, {
        validators: [
          Validators.required,
          CustomValidator.patternValidator(/\d/, { hasNumber: true }),
          CustomValidator.patternValidator(/[A-Z]/, { hasCapitalCase: true }),
          CustomValidator.patternValidator(/[a-z]/, { hasSmallCase: true }),
          CustomValidator.patternValidator(
            /[ !@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/, { hasSpecialCharacters: true }),
          Validators.minLength(6),
          Validators.maxLength(20),
        ], updateOn: 'blur',
      }),
    })
  }





}
