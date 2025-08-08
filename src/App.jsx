import { useState } from 'react'
import './App.css'
import axios from 'axios'

function App() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function generateAnswer() {
    if (!question.trim()) return;
    
    setIsLoading(true);
    setAnswer("Loading your answer...");
    
    try {
      const response = await axios({
        url: "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=your-googleapi-key",
        method: "post",
        data: {
          contents: [{
            parts: [{ text: question }]
          }]
        }
      });
      
      setAnswer(response["data"]["candidates"][0]["content"]["parts"][0]["text"]);
    } catch (error) {
      setAnswer("Sorry, I couldn't process your request. Please try again.");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="app-container">
      <div className="chat-container">
        <header>
          <h1>Danish's Chat AI</h1>
          <p className="subtitle">Ask me anything and I'll do my best to help!</p>
        </header>
        
        <div className="input-area">
          <textarea 
            value={question} 
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Type your question here..."
            disabled={isLoading}
          />
          <button 
            onClick={generateAnswer}
            disabled={isLoading || !question.trim()}
            className={isLoading ? 'loading' : ''}
          >
            {isLoading ? (
              <span className="button-loading">
                <span className="spinner"></span>
                Generating...
              </span>
            ) : 'Get Answer'}
          </button>
        </div>
        
        <div className="answer-container">
          <h2>Response:</h2>
          <div className="answer-content">
            {answer ? answer : "Your answer will appear here..."}
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
