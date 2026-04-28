export type DashboardColor = "red" | "orange" | "yellow" | "green" | "blue";

export interface Member {
  id: number;
  nickname: string;
  email: string;
  avatarColor: string;
}

export interface Invitation {
  id: number;
  email: string;
}

export const dashboardColors: { key: DashboardColor; className: string }[] = [
  { key: "red", className: "bg-profile-rose"},
  { key: "orange", className: "bg-profile-orange"},
  { key: "yellow", className: "bg-profile-yellow"},
  { key: "green", className: "bg-profile-green"},
  { key: "blue", className: "bg-profile-blue"},
];

export const initialMembers: Member[] = [
  {id: 1, nickname: "김땡땡", email: "kim@example.com", avatarColor: "bg-profile-blue"},
  {id: 2, nickname: "주땡땡", email: "joo@example.com", avatarColor: "bg-profile-red"},
  {id: 3, nickname: "이땡땡", email: "lee@example.com", avatarColor: "bg-profile-orange"},
  {id: 4, nickname: "한땡땡", email: "han@example.com", avatarColor: "bg-profile-blue"},
  {id: 5, nickname: "박땡땡", email: "park@example.com", avatarColor: "bg-profile-green"},
  {id: 6, nickname: "최땡땡", email: "choi@example.com", avatarColor: "bg-profile-yellow"},
  {id: 7, nickname: "서땡땡", email: "seo@example.com", avatarColor: "bg-profile-green"},
  {id: 8, nickname: "곽땡땡", email: "kauk@example.com", avatarColor: "bg-profile-red"},
  {id: 9, nickname: "노땡땡", email: "noh@example.com", avatarColor: "bg-profile-yellow"},
];

export const initialInvitations: Invitation[] = [
  {id: 1, email: "test@naver.com"},
  {id: 2, email: "hello@naver.com"},
  {id: 3, email: "world@naver.com"},
  {id: 4, email: "yeah@naver.com"},
  {id: 5, email: "pepsi@naver.com"},
  {id: 6, email: "good@naver.com"},
  {id: 7, email: "doctor@naver.com"},
  {id: 8, email: "pepper@naver.com"},
]