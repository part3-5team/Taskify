export interface Dashboard {
  id: number
  title: string
  color: string
  createdAt: string
  updatedAt: string
  createdByMe: boolean
  userId: number
}

export interface GetDashboardsResponse {
  cursorId: number | null
  totalCount: number
  dashboards: Dashboard[]
}

export interface CreateDashboardRequest {
  title: string
  color: string
}

export interface Inviter {
  nickname: string
  email: string
  id: number
}

export interface Invitee {
  nickname: string
  email: string
  id: number
}

export interface Invitation {
  id: number
  inviter: Inviter
  teamId: string
  dashboard: {
    title: string
    id: number
  }
  invitee: Invitee
  inviteAccepted: boolean
  createdAt: string
  updatedAt: string
}

export interface GetInvitationsResponse {
  totalCount: number
  invitations: Invitation[]
}

export interface Member {
  id: number
  userId: number
  email: string
  nickname: string
  profileImageUrl: string | null
  createdAt: string
  updatedAt: string
  isOwner: boolean
}

export interface GetMembersResponse {
  members: Member[]
  totalCount: number
}

export const dashboardColors = [
  {
    key: '#AE2E24',
    className: 'bg-profile-rose',
  },
  {
    key: '#9F4B00',
    className: 'bg-profile-orange',
  },
  {
    key: '#BD8C00',
    className: 'bg-profile-yellow',
  },
  {
    key: '#206E4E',
    className: 'bg-profile-green',
  },
  {
    key: '#1458BC',
    className: 'bg-profile-blue',
  },
]
