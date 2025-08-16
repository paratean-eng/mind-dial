import React from 'react';
import { Badge } from '@/components/ui/badge';

interface ChatMessageProps {
  message: {
    id: string;
    type: 'user' | 'bot';
    content: string;
    timestamp: Date;
    response?: string;
    status?: string;
    step?: string;
    logs?: string;
  };
}

export const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const isUser = message.type === 'user';

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-6 animate-fade-in`}>
      <div className={`max-w-[80%] ${isUser ? 'order-2' : 'order-1'}`}>
        <div
          className={`
            px-4 py-3 rounded-2xl shadow-sm border transition-all duration-300
            ${isUser 
              ? 'bg-user-message text-user-message-foreground border-user-message/20' 
              : 'bg-bot-message text-bot-message-foreground border-message-border'
            }
          `}
        >
          <p className="text-sm leading-relaxed">{message.content}</p>
        </div>

        {/* Bot response details */}
        {!isUser && message.response && (
          <div className="mt-3 space-y-3">
            <div className="bg-chat-container border border-message-border rounded-lg p-4 shadow-sm">
              <h4 className="font-medium text-foreground mb-2">Response:</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">{message.response}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {message.status && (
                <div className="bg-chat-container border border-message-border rounded-lg p-3">
                  <h5 className="font-medium text-xs uppercase tracking-wide text-muted-foreground mb-1">Status</h5>
                  <Badge variant="secondary" className="text-xs">{message.status}</Badge>
                </div>
              )}

              {message.step && (
                <div className="bg-chat-container border border-message-border rounded-lg p-3">
                  <h5 className="font-medium text-xs uppercase tracking-wide text-muted-foreground mb-1">Step</h5>
                  <p className="text-sm text-foreground">{message.step}</p>
                </div>
              )}
            </div>

            {message.logs && (
              <div className="bg-chat-container border border-message-border rounded-lg p-3">
                <h5 className="font-medium text-xs uppercase tracking-wide text-muted-foreground mb-2">Logs</h5>
                <p className="text-xs font-mono text-muted-foreground bg-muted/50 rounded p-2">
                  {new Date(message.logs).toLocaleString()}
                </p>
              </div>
            )}
          </div>
        )}

        <div className={`text-xs text-muted-foreground mt-2 ${isUser ? 'text-right' : 'text-left'}`}>
          {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </div>
      </div>
    </div>
  );
};