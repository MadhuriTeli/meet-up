import { trpc } from "@/trpc"
import { Experience } from "@advanced-react/server/database/schema"
import { CommentsList } from "./CommentsList";
import { CommentCreateForm } from "./CommentCreateForm";

type CommentSectionProps = {
    experienceId: Experience['id'],
    commentsCount : number
}

export function CommentSection({ experienceId, commentsCount }: CommentSectionProps) {
    const commentsQuery = trpc.comments.byExperienceId.useQuery(
        { experienceId },
        {
        enabled: commentsCount>0
        }
    );
    

    if (commentsQuery.error) 
        return <div>Something went wrong...</div>

    return (
        <div className="space-y-4">
            <div className="font-semibold">Comments: {commentsCount}</div>
            <CommentCreateForm experienceId={experienceId} />
            <CommentsList isLoading={commentsQuery.isLoading} comments={commentsQuery.data ?? []} noCommentMessage={"No comments yet"} />
        </div>
    );
}