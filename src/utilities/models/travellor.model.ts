import { FormFieldDto, OptionsDto } from "./common.model";


export interface TravelerInformationFormDto {
  travelerId:FormFieldDto<string>;
  nICNumber: FormFieldDto<string>;
  password: FormFieldDto<string>;
  firstName: FormFieldDto<string>;
  lastName: FormFieldDto<string>;
  email: FormFieldDto<string>;
  isActive: FormFieldDto<boolean>;
  contactHome: FormFieldDto<string>;
  contactMobile: FormFieldDto<string>;
  address: FormFieldDto<string>;
  roleType: FormFieldDto<OptionsDto>;
  createdDate: FormFieldDto<string>;
  totalReservationCount:FormFieldDto<number>;
}

export interface LoginDto{
  email:string;
  password:string;
}
export interface LoginResponseDto{
  isSuccess:boolean;
  message:string;
  statusCode:number;

}


