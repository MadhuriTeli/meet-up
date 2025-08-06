import Spinner from "@/features/shared/components/ui/Spinner";
import { CommentForList } from "../types";
import { CommentCard } from "./CommentCard";

type CommentsListProps = {
    comments: CommentForList[],
    isLoading: boolean,
    noCommentMessage: string
}


export function CommentsList({ comments, isLoading, noCommentMessage = 'No comments yet' }: CommentsListProps) {
    return (<>
        <div className="space-y-4">
            {
                comments.map((comment) =>
                    <CommentCard key={comment.id} comment={comment} />
                )
            }
            {
                isLoading && (
                    <div className="flex justify-center">
                        <Spinner />
                    </div>)
            }
            {
                !isLoading && comments.length === 0 && (
                    <div className="flex justify-center">{noCommentMessage}</div>
                )
            }
        </div>
    </>);
}