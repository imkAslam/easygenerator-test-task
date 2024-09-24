import * as bcrypt from 'bcrypt';

export class Utils {
  /**
   *this method encode the password using bcrypt library
   * @param password user password provided as string
   * @returns
   */
  public static async hashPassword(password: string): Promise<string> {
    const saltOrRounds = 10;
    const hash = await bcrypt.hash(password, saltOrRounds);
    return hash;
  }

  /**
   *this method match the password using bcrypt library
   * @param password user password provided as string
   * @param userPassword encrypted password stored in database
   * @returns
   */
  public static async comparePassword(password: string, userPassword: string) {
    if (!password || !userPassword) {
      console.error(
        `Invalid arguments for comparePassword: password is "${password}", userPassword is "${userPassword}"`,
      );
      return false;
    }
    const compare = bcrypt.compareSync(password, userPassword);
    return compare;
  }

  /**
   * Generates a random 6-digit OTP (One-Time Password).
   *
   * @returns The generated OTP as a string.
   */
  public static generateOTP(): string {
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    return otp;
  }
}
