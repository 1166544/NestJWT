import { ApiHideProperty } from '@nestjs/swagger';

export class CreateUserDto {
    @ApiHideProperty()
    readonly id: number;

    @ApiHideProperty()
    readonly firstName: string;

    @ApiHideProperty()
    readonly lastName: string;

    @ApiHideProperty()
    readonly email: string;

    @ApiHideProperty()
    readonly password: string;
}