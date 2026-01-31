-- Fix 1: Drop and recreate profiles SELECT policy to only allow users to view their own profile
DROP POLICY IF EXISTS "Users can view own profile" ON public.profiles;
CREATE POLICY "Users can view own profile" 
ON public.profiles 
FOR SELECT 
USING (auth.uid() = user_id);

-- Fix 2: Drop overly permissive chat_messages SELECT policy and create proper one
DROP POLICY IF EXISTS "Anyone can view messages from their conversation" ON public.chat_messages;

-- Create proper policy: users can only view messages from conversations they own
CREATE POLICY "Users can view messages from their conversations" 
ON public.chat_messages 
FOR SELECT 
USING (
  EXISTS (
    SELECT 1 FROM public.chat_conversations 
    WHERE chat_conversations.id = chat_messages.conversation_id 
    AND (
      chat_conversations.user_id = auth.uid()
      OR (chat_conversations.user_id IS NULL AND chat_conversations.session_id IS NOT NULL)
    )
  )
);