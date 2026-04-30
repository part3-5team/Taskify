export interface CommentAuthor {
  id: number
  nickname: string
  profileImageUrl: string | null
}

export interface CommentData {
  id: number
  content: string
  createdAt: string
  updatedAt: string
  cardId: number
  author: CommentAuthor
}

export interface CommentListResponse {
  cursorId: number | null
  comments: CommentData[]
}
