import { getDatabaseConnection } from "lib/getDatabaseConnection";
import md5 from "md5";
import { User } from "src/entity/User";

export class SignIn {
  username: string;
  password: string;
  errors = {
    username: [] as string[],
    password: [] as string[],
  };
  user: User;

  async validate() {
    if (this.username.trim() === "") {
      this.errors.username.push("用户名为空");
    }
    if (this.password.trim() === "") {
      this.errors.password.push("密码不能为空");
    }
    const connection = await getDatabaseConnection();
    const user = await connection.manager.findOne(User, {
      where: {
        username: this.username,
      },
    });    
    // 在找到user之后将其放在SignIn实体上
    this.user = user;
    if (user) {
      if (user.passwordDigest !== md5(this.password)) {
        this.errors.password.push("密码不正确！");
      }
    } else {
      this.errors.username.push("用户名不存在！");
    }
  }

  // 检测
  hasErrors() {
    return !!Object.values(this.errors).find((v) => v.length > 0);
  }
}
