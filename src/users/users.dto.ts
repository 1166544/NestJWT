import { ApiHideProperty } from '@nestjs/swagger';

/**
 * create user dto
 *
 * @export
 * @class CreateUserDto
 */
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
