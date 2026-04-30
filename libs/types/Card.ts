export interface CardDetail {
  id: number
  title: string
  description: string
  tags: string[]
  dueDate: string | null
  assignee: {
    profileImageUrl: string | null
    nickname: string
    id: number
  }
  imageUrl: string | null
  teamId: string
  columnId: number
  createdAt: string
  updatedAt: string
}
