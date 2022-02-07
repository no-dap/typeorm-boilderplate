import { Repository } from 'typeorm';
import { User } from '../entity/account/User';

export interface UserPaginationResponse {
  data: User[];
  totalPage: number;
}

export class UserRepository extends Repository<User> {
  async findByTerm(term?: string, page?: number): Promise<UserPaginationResponse> {
    // Profile 테이블 조인
    let queryBuilder = this.createQueryBuilder("user")
      .innerJoin("user.profile", "profile")
      .take(10);  // page size 10
    if (term) {
      // User.username, Profile.email, Profile.nickname 에서 검색
      queryBuilder = queryBuilder.where(
        "user.username ILIKE :term OR profile.email ILIKE :term OR profile.nickname ILIKE :term",
        {term: `%${term}%`}
      );
    }
    if (page) {
      // 페이지 수만큼 건너뛴 부분부터 가져옴
      queryBuilder = queryBuilder.skip(10 * Number(page - 1));
    }
    const [data, count] = await queryBuilder.getManyAndCount();
    return { data, totalPage: Math.ceil(count / 10) };
  }
}
