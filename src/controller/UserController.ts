import { NextFunction, Request, Response } from 'express';
import { DeepPartial } from 'typeorm';
import { User } from '../entity/account/User';
import { UserPaginationResponse, UserRepository } from '../repository/UserRepository';

export class UserController {
    constructor() {
    }

    private userRepository = new UserRepository();

    async getById(request: Request, response: Response, next: NextFunction): Promise<User> {
        const id = request.params.structureId;
        return await this.userRepository.findOne(id);
    }

    async getByTerm(request: Request, response: Response, next: NextFunction): Promise<UserPaginationResponse> {
        const term = request.query.term as string;
        const page = Number(request.query.page);
        return await this.userRepository.findByTerm(term, page);
    }

    create(request: Request, response: Response, next: NextFunction): User {
        const validatedData = UserController.validateUserCreateData(request.body);
        return this.userRepository.create(validatedData);
    }

    private static validateUserCreateData(data: Record<string, unknown>): DeepPartial<User> {
        return {
            username: data.username as string,
            password: data.password as string
        };
    }

}
