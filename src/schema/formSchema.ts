import * as z from 'zod';


const formSchema = z.object({
  username: z.string().min(2, 'Min 2 chars').max(12, 'Max 12 chars'),
  password: z.string().min(2, 'Min 2 chars').max(12, 'Max 12 chars'),
});

type FormData = z.infer<typeof formSchema>;
 export default formSchema