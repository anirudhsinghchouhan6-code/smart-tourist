-- Fix chat_conversations INSERT policy - require either authenticated user or valid session
DROP POLICY IF EXISTS "Anyone can create conversations" ON public.chat_conversations;
CREATE POLICY "Users can create conversations" 
ON public.chat_conversations 
FOR INSERT 
WITH CHECK (
  -- Authenticated users must set their user_id
  (auth.uid() IS NOT NULL AND user_id = auth.uid())
  OR 
  -- Anonymous users must have a session_id and null user_id
  (auth.uid() IS NULL AND user_id IS NULL AND session_id IS NOT NULL AND length(session_id) > 10)
);

-- Fix chat_messages INSERT policy - require conversation ownership
DROP POLICY IF EXISTS "Anyone can create messages" ON public.chat_messages;
CREATE POLICY "Users can create messages in their conversations" 
ON public.chat_messages 
FOR INSERT 
WITH CHECK (
  EXISTS (
    SELECT 1 FROM public.chat_conversations 
    WHERE chat_conversations.id = conversation_id 
    AND (
      -- Authenticated user owns the conversation
      chat_conversations.user_id = auth.uid()
      OR 
      -- Anonymous conversation (user_id is null) - allow if session exists
      (chat_conversations.user_id IS NULL AND chat_conversations.session_id IS NOT NULL)
    )
  )
);

-- Also update the chat_messages SELECT policy we created earlier to be more precise
DROP POLICY IF EXISTS "Users can view messages from their conversations" ON public.chat_messages;
CREATE POLICY "Users can view messages from their conversations" 
ON public.chat_messages 
FOR SELECT 
USING (
  EXISTS (
    SELECT 1 FROM public.chat_conversations 
    WHERE chat_conversations.id = chat_messages.conversation_id 
    AND (
      chat_conversations.user_id = auth.uid()
      OR (chat_conversations.user_id IS NULL AND auth.uid() IS NULL)
    )
  )
);