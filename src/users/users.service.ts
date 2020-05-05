import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './users.entity';
import { CreateUserDto } from './users.dto';

@Injectable()
export class UsersService {
	constructor(
		@InjectRepository(User)
		private readonly userRepository: Repository<any>
	) {
		// hole
	}

	public async findAll(): Promise<any> {
		return await this.userRepository.find();
	}

	public async findByEmail(userEmail: string): Promise<any> {
		return await this.userRepository.findOne({ email: userEmail });
	}

	public async findById(id: number): Promise<any> {
		return await this.userRepository.findOneOrFail(id);
	}

	public async create(user: CreateUserDto): Promise<any> {
		return await this.userRepository.save(user);
	}

	public async update(id: number, newValue: CreateUserDto): Promise<any> {
		const user = await this.userRepository.findOneOrFail(id);
		if (!user.id) {
			// tslint:disable-next-line:no-console
			console.error("user doesn't exist");
		}
		await this.userRepository.update(id, newValue);
		return await this.userRepository.findOne(id);
	}

	public async delete(id: number): Promise<any> {
		return await this.userRepository.delete(id);
	}

	public async register(userDto: CreateUserDto): Promise<any> {
		const { email } = userDto;
		let user = await this.userRepository.findOne({ where: { email } });
		if (user) {
			throw new HttpException(
				'User already exists',
				HttpStatus.BAD_REQUEST
			);
		}
		user = await this.userRepository.create(userDto);
		return await this.userRepository.save(user);
	}
}
