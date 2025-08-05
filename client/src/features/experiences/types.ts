import {
  Experience,
  User,
} from "@advanced-react/server/database/schema";

type ExperienceWithCommentCount = Experience & {
  commentsCount: number;
};
type ExperienceWithUser = Experience & {
    user: User
};

export type ExperienceForList = ExperienceWithUser & ExperienceWithCommentCount;


