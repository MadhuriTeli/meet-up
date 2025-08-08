import { Experience } from "@advanced-react/server/database/schema";
import { commentValidationSchema } from "../../../../../shared/schema/comment";
import z from "zod";
import {  useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/features/shared/components/ui/Form";
import { trpc } from "@/trpc";
import {zodResolver} from '@hookform/resolvers/zod'
import { Button } from "@/features/shared/components/ui/Button";
import { TextArea } from "@/features/shared/components/ui/TextArea";

type CommentCreateFormData = z.infer<typeof commentValidationSchema>

type CommentCreateFormProps = {
    experienceId: Experience["id"];
}

export function CommentCreateForm({ experienceId }: CommentCreateFormProps) {
    const form = useForm<CommentCreateFormData>({
        resolver: zodResolver(commentValidationSchema),
        defaultValues: {
            content: "",
        },
    });

    const addCommentMutation = trpc.comments.add.useMutation();

    const handleSubmit = form.handleSubmit((data) => {
        addCommentMutation.mutate({
            content: data.content,
            experienceId,
        });
    });

    return (
        <Form {...form}>
            <form onSubmit={handleSubmit} className="space-y-4">
                <FormField
                    control={form.control}
                    name="content"
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <TextArea {...field} placeholder="Add a commment..." />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit" disabled={addCommentMutation.isPending}>Add Comment</Button>
            </form>
        </Form>
    )
}
