import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './Dto/useR.Dto';
import { Profile } from './entities/profile.entity';
import { UserUpdateDto } from './Dto/userUpdate.Dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    @InjectRepository(Profile)
    private readonly profileRepository: Repository<Profile>,
  ) {}

  finAll() {
    return this.userRepository.find({});
  }

  async findOne(id: string): Promise<User> {
    const users = await this.userRepository.findOne({
      where: { id },
      relations: ['profile'],
    });

    if (!users) {
      throw new NotFoundException(`User id ${id} not found`);
    }
    return users;
  }

  async createUser(data: CreateUserDto) {
    const newProfile = new Profile();
    newProfile.name = data.name;
    newProfile.lastname = data.lastname;
    newProfile.email = data.email;
    newProfile.age = data.age;

    const profileCreate = await this.profileRepository.save(newProfile);

    const new_user = new User();

    new_user.username = data.username;
    new_user.password = data.password;
    new_user.active = true;
    new_user.profile = profileCreate;

    const userCreate = await this.userRepository.save(new_user);
    if (!userCreate) {
      throw new NotFoundException(`User not created`);
    }
    return userCreate;
  }

  async deleteUser(id: string) {
    const user = await this.userRepository.findOne({
      where: { id },
      relations: ['profile'],
    });
    if (!user) {
      throw new NotFoundException(`User id ${id} not found`);
    }
    await this.userRepository.delete(user);
    await this.profileRepository.delete(user.profile.id);
    return { message: 'User deleted' };
  }

  async updateUser(id: string, data: UserUpdateDto): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException(`User id ${id} not found`);
    }
    user.password = data.password;
    await this.userRepository.save(user);
    return user;
  }
}
