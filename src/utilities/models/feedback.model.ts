export interface FeedbackDto {
    _id: string;
    description: string;
    email: string;
    rating: number;
    adminResponse?: 'Like' | 'Dislike' | null; // Admin response can be 'Like', 'Dislike', or not responded (null)
  }
  