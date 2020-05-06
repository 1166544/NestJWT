import { ApiHideProperty } from '@nestjs/swagger';

export class LoginUserDto {
	@ApiHideProperty()
	readonly email: string;

	@ApiHideProperty()
	readonly password: string;
}
