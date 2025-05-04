import { useChat } from '@ai-sdk/react';
// Remove useState import
import PropTypes from 'prop-types'; // Import PropTypes

function ChatAgent({ isOpen, toggleChat }) { // Accept props
  // Internal state removed

  // Get status instead of isLoading (deprecated)
  const { messages, input, handleInputChange, handleSubmit, status } = useChat({
    api: 'http://localhost:3001/api/chat', // Point to our backend endpoint
    // We can add initialMessages or other options later if needed
  });


  return (
    <>

      {/* Chat Window (Conditionally Rendered using prop) */}
      {isOpen && (
         // Change to fixed positioning and adjust top offset below sticky header
        <div className="fixed top-20 right-4 w-96 h-[500px] bg-white rounded-lg shadow-xl flex flex-col z-10 border"> {/* Changed absolute to fixed */}
          {/* Header */}
          <div className="bg-gray-100 p-3 rounded-t-lg border-b flex justify-between items-center">
            <h3 className="font-semibold text-gray-800">AI Shop Assistant</h3>
            {/* Increase size of close button further */}
            <button onClick={toggleChat} className="text-gray-500 hover:text-gray-700 text-4xl font-bold leading-none px-1">&times;</button> 
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
            {/* Check status for loading indicator */}
            {(status === 'submitted' || status === 'streaming') && (
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
              disabled={status === 'submitted' || status === 'streaming'} // Disable input based on status
            />
          </form>
        </div>
      )}
    </> // Close the fragment
  );
}

// Add prop validation
ChatAgent.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  toggleChat: PropTypes.func.isRequired,
};

export default ChatAgent;
