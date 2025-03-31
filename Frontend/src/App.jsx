import { useState, useEffect } from "react";
import "prismjs/themes/prism-tomorrow.css";
import Editor from "react-simple-code-editor";
import prism from "prismjs";
import Markdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";
import axios from "axios";
import "./App.css";

function App() {
  const defaultCode =
    `function sum() {
  return a + b;
}`;

  const defaultReview = `
## 👋 Welcome to CodeOptima! 🚀  
&nbsp;  

### 🌟 How It Works:  
&nbsp;  
📝 **Write your code** in the left panel.  
&nbsp;  
⚡ **Click "Review"** to analyze your code.  
&nbsp;  
📊 **Get instant feedback** with best practices, optimizations, and improvements.  
&nbsp;  

### 🔥 Features:  
&nbsp;  
✅ Helps you write **cleaner, more efficient code**.  
&nbsp;  
✅ Supports **multiple programming languages** (JavaScript, Python, C++, Java, and more!).  
&nbsp;  

🚀 **Start coding and let AI help you improve! Happy Coding 😊**  
&nbsp;  
`;

  const [code, setCode] = useState(defaultCode);
  const [review, setReview] = useState(defaultReview);

  useEffect(() => {
    prism.highlightAll();
  }, []);

  async function reviewCode() {
    try {
      console.log("API URL:", import.meta.env.VITE_API_URL);
      const response = await axios.post(import.meta.env.VITE_API_URL, { code });
      setReview(response.data);
    } catch (error) {
      setReview("❌ Error fetching review. Please try again later.");
    }
  }

  function resetCode() {
    setCode(defaultCode);
    setReview(defaultReview);
  }

  return (
    <>
      <header className="header">
        CodeOptima 🚀
      </header>
      <main>
        <div className="left">
          <div className="code">
            <Editor
              value={code}
              onValueChange={(newCode) => setCode(newCode)}
              highlight={(code) => prism.highlight(code, prism.languages.javascript, "javascript")}
              padding={10}
              className="editor"
            />
          </div>
          <div className="buttons">
            <button onClick={reviewCode} className="review">Review</button>
            <button onClick={resetCode} className="reset">Reset</button>
          </div>
        </div>
        <div className="right">
          <Markdown rehypePlugins={[rehypeHighlight]}>{review}</Markdown>
        </div>
      </main>
    </>
  );
}

export default App;
