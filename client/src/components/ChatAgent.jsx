import { useChat } from '@ai-sdk/react';
import PropTypes from 'prop-types'; // Import PropTypes
import ReactMarkdown from 'react-markdown'; // Import ReactMarkdown
import { useState } from 'react'; // Import useState
import RecommendationCardLoader from './RecommendationCardLoader'; // Import the loader

function ChatAgent({ isOpen, toggleChat }) { // Accept props
  // State to hold the ID of the last recommended product
  const [lastRecommendedProductId, setLastRecommendedProductId] = useState(null);

  // Get status instead of isLoading (deprecated)
  const { messages, input, handleInputChange, handleSubmit, status } = useChat({
    api: 'http://localhost:3001/api/chat', // Point to our backend endpoint
    onToolCall: ({ toolCall }) => {
      if (toolCall.toolName === "recommendProduct") {
        console.log("onToolCall: Setting recommended product ID:", toolCall.args.productId);
        // Store the ID when the tool is called
        setLastRecommendedProductId(toolCall.args.productId);
        return "Handled by the UI";
      }
      // If other tools are called, maybe clear the recommendation?
      // setLastRecommendedProductId(null);
    },
    // We can add initialMessages or other options later if needed
  });

  // Wrap original handleInputChange to reset recommendation state
  const handleInputChangeWithReset = (e) => {
    setLastRecommendedProductId(null); // Clear recommendation when user types
    handleInputChange(e); // Call original handler
  };

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
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {messages.length === 0 && (
              <p className="text-center text-gray-500 text-sm">Ask me about our AI tools!</p>
            )}
            {/* Render messages */}
            {messages.map(m => (
              <div key={m.id} className={`flex flex-col ${m.role === 'user' ? 'items-end' : 'items-start'}`}>
                <div className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'} w-full`}>
                  <div className={`px-3 py-2 rounded-lg max-w-[80%] ${m.role === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'} ${m.role === 'assistant' ? 'prose prose-sm' : ''}`}>
                    {/* Render message content using ReactMarkdown */}
                    {/* Note: We are not iterating parts here anymore for simplicity, relying on m.content */}
                    <ReactMarkdown>{m.content}</ReactMarkdown>
                  </div>
                </div>
                {/* Recommendation card rendering is moved outside the loop */}
              </div>
            ))}

            {/* Conditionally render RecommendationCardLoader AFTER the loop */}
            {lastRecommendedProductId && messages.length > 0 && messages[messages.length - 1].role === 'assistant' && (
              <div className="flex justify-start w-full"> {/* Ensure it aligns left */}
                 <RecommendationCardLoader productId={lastRecommendedProductId} />
              </div>
            )}

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
                onChange={handleInputChangeWithReset} // Use the wrapped handler
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
