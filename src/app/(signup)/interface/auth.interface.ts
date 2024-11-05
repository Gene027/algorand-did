export interface LoginDto {
  did: string;
}

export interface UserIdDto {
  userId: string;
}

export interface SignUpDto {
  email: string;
  name: string;
  dateOfBirth: string;
  gender: string;
  digitalId: string;
  address: string;
  walletMnemonic: string;
  walletAddress: string;
  appId: number;
  did: string;
}
