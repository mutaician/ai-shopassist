import { useChat } from 'ai/react';
import { useState } from 'react';

function ChatAgent() {
  const [isOpen, setIsOpen] = useState(false); // State to control chat visibility

  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat({
    api: 'http://localhost:3001/api/chat', // Point to our backend endpoint
    // We can add initialMessages or other options later if needed
  });

  const toggleChat = () => setIsOpen(!isOpen);

  return (
    <div>
      {/* Chat Toggle Button (Fixed Position) */}
      <button
        onClick={toggleChat}
        className="fixed bottom-5 right-5 bg-blue-600 text-white rounded-full p-4 shadow-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 z-20"
        aria-label={isOpen ? 'Close chat' : 'Open chat'}
      >
        {/* Simple chat icon (can be replaced with SVG) */}
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12c0 4.556-3.03 8.25-6.75 8.25a9.753 9.753 0 0 1-4.597-.981l-4.03 1.107a.75.75 0 0 1-.927-.927l1.107-4.03A9.753 9.753 0 0 1 3 12c0-4.556 3.03-8.25 6.75-8.25S21 7.444 21 12Z" />
        </svg>
      </button>

      {/* Chat Window (Conditionally Rendered) */}
      {isOpen && (
        <div className="fixed bottom-20 right-5 w-80 h-96 bg-white rounded-lg shadow-xl flex flex-col z-10 border">
          {/* Header */}
          <div className="bg-gray-100 p-3 rounded-t-lg border-b flex justify-between items-center">
            <h3 className="font-semibold text-gray-800">AI Shop Assistant</h3>
            <button onClick={toggleChat} className="text-gray-500 hover:text-gray-700">&times;</button>
          </div>

          {/* Message List */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {messages.length === 0 && (
              <p className="text-center text-gray-500 text-sm">Ask me about our AI tools!</p>
            )}
            {messages.map(m => (
              <div key={m.id} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`px-3 py-2 rounded-lg max-w-[80%] ${m.role === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'}`}>
                  {/* Iterate over parts for rendering, focusing on text parts */}
                  {m.parts.map((part, index) => {
                    if (part.type === 'text') {
                      // Render text parts, potentially handling line breaks later if needed
                      return <span key={`${m.id}-part-${index}`}>{part.text}</span>;
                    }
                    // Add rendering for other part types (tool-invocation, etc.) here if needed in the future
                    return null;
                  })}
                  {/* Fallback to content if parts array is somehow empty or not present (shouldn't happen with Vercel AI SDK) */}
                  {(!m.parts || m.parts.length === 0) && m.content}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                 <div className="px-3 py-2 rounded-lg bg-gray-200 text-gray-500 italic">
                   Assistant is typing...
                 </div>
              </div>
            )}
          </div>

          {/* Input Form */}
          <form onSubmit={handleSubmit} className="p-3 border-t">
            <input
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
              value={input}
              placeholder="Ask something..."
              onChange={handleInputChange}
              disabled={isLoading}
            />
          </form>
        </div>
      )}
    </div>
  );
}

export default ChatAgent;
