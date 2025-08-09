import { Comment } from "@advanced-react/server/database/schema";
import { commentValidationSchema } from "../../../../../shared/schema/comment";
import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Card from "@/features/shared/components/ui/Card";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/features/shared/components/ui/Form";
import { Button } from "@/features/shared/components/ui/Button";
import { TextArea } from "@/features/shared/components/ui/TextArea";
import { trpc } from "@/trpc";
import { useToast } from "@/features/shared/hooks/useToast";


type CommentEditFormData = z.infer<typeof commentValidationSchema>

type CommentEditFormProps = {
    comment: Comment,
    setIsEditing: (value:boolean) => void;
}

export function CommentEditForm({ comment, setIsEditing }: CommentEditFormProps) {
    const { toast } = useToast();
    const utils = trpc.useUtils();

    const form = useForm<CommentEditFormData>({
            resolver: zodResolver(commentValidationSchema),
            defaultValues: {
                content: comment.content,
            },
    });
    
    const editMutation = trpc.comments.edit.useMutation({
        onSuccess: async ({ experienceId }) => {
            utils.comments.byExperienceId.invalidate({ experienceId }),
                setIsEditing(false);
            toast({
                title: "Comment edited Successfully"
                })
        },
        onError: (error) => {
            toast({
                title: "Failed to add comment",
                description: error.message,
                variant: "destructive"
            })
        }
    })

    const handleSubmit = form.handleSubmit((data) => {
        editMutation.mutate({
            id: comment.id,
            content: data.content,
        });
    });
    
    return <Form {...form}>
        <Card>
        <form onSubmit={handleSubmit} className="space-y-2">
            <FormField
                control={form.control}
                name="content"
                render={({ field }) => (
                    <FormItem>
                        <FormControl>
                            <TextArea {...field} placeholder="Add a commment..." rows={4} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
                />
                <div className="flex gap-4">
                    <Button type="submit" disabled={editMutation.isPending}>{editMutation.isPending ? 'Saving... ' : "Save"}</Button>
                    <Button variant="link" disabled={editMutation.isPending}  onClick ={()=> setIsEditing(false)}>Cancel</Button>
                </div>
            </form>
        </Card>
    </Form>
}