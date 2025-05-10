import { useChat } from '@ai-sdk/react';
import PropTypes from 'prop-types'; // Import PropTypes
import ReactMarkdown from 'react-markdown'; // Import ReactMarkdown
import RecommendationCardLoader from './RecommendationCardLoader'; // Import the loader

function ChatAgent({ isOpen, toggleChat }) { // Accept props

  // Get status instead of isLoading (deprecated)
  const { messages, input, handleInputChange, handleSubmit, status } = useChat({
    api: 'http://localhost:3001/api/chat', // Point to our backend endpoint
    // We can add initialMessages or other options later if needed
  });

  return (
    <>

      {/* Chat Window (Conditionally Rendered using prop) */}
      {isOpen && (
         // Resize window: Use fractional width and viewport height
        <div className="fixed top-20 right-4 w-1/3 h-[75vh] bg-white rounded-lg shadow-xl flex flex-col z-10 border"> {/* Changed w-96 to w-1/3, h-[500px] to h-[75vh] */}
          {/* Header */}
          <div className="bg-gray-100 p-3 rounded-t-lg border-b flex justify-between items-center">
            <h3 className="font-semibold text-gray-800">AI Shop Assistant</h3>
            {/* Increase size of close button further */}
            <button onClick={toggleChat} className="text-gray-500 hover:text-gray-700 text-4xl font-bold leading-none px-1">&times;</button>
          </div>

          {/* Message List */}
          {console.log(messages)}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {messages.length === 0 && (
              <p className="text-center text-gray-500 text-sm">Ask me about our AI tools!</p>
            )}
            {messages.map(m => (
              <div key={m.id} className={`flex flex-col ${m.role === 'user' ? 'items-end' : 'items-start'}`}>
                {/* Render the text part of the message */}
                <div className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'} w-full`}>
                  <div className={`px-3 py-2 rounded-lg max-w-[80%] ${m.role === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'} ${m.role === 'assistant' ? 'prose prose-sm' : ''}`}>
                    <ReactMarkdown>{m.content}</ReactMarkdown>
                  </div>
                </div>

                {/* Render Recommendation Cards based on toolInvocations */}
                {m.role === 'assistant' && m.toolInvocations?.map(invocation => {
                  if (invocation.toolName === 'recommendProduct') {
                    return (
                      <div key={invocation.toolCallId} className="mt-2 mb-1"> {/* Add some margin */}
                        <RecommendationCardLoader productId={invocation.args.productId} />
                      </div>
                    );
                  }
                  return null; // Render nothing for other tool calls
                })}
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
            <div className="flex items-center space-x-2">
              <input
                className="flex-1 border rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500 disabled:bg-gray-100"
                value={input}
                placeholder="Ask something..."
                onChange={handleInputChange} // Revert to original handler
                disabled={status === 'submitted' || status === 'streaming'} // Disable input based on status
              />
              <button
                type="submit"
                className="bg-blue-600 text-white rounded p-2 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={status === 'submitted' || status === 'streaming' || input.trim() === ''} // Also disable if input is empty
                aria-label="Send message"
              >
                {/* Send Icon (Paper Plane) */}
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" />
                </svg>
              </button>
            </div>
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
