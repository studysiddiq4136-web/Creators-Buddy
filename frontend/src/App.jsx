import React, { useState, useEffect } from 'react';
import NeuralBackground from './components/NeuralBackground';
import GeneratorCard from './components/GeneratorCard';
import ResultCard from './components/ResultCard';
import HashtagGenerator from './components/HashtagGenerator';

function App() {
  const [tags, setTags] = useState([]);
  const [topic, setTopic] = useState('');
  const [platform, setPlatform] = useState('LinkedIn');
  const [length, setLength] = useState('Short');
  const [language, setLanguage] = useState('English');
  const [generatedPost, setGeneratedPost] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Fetch tags from backend
    fetch('http://localhost:8000/tags')
      .then(res => res.json())
      .then(data => {
        if (data.tags && data.tags.length > 0) {
          setTags(data.tags);
          setTopic(data.tags[0]);
        }
      })
      .catch(err => console.error("Failed to fetch tags:", err));
  }, []);

  const handleGenerate = async () => {
    if (!topic) {
      alert("Please select a topic or tone first.");
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch('http://localhost:8000/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          topic,
          length,
          language,
          platform
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.detail || "Server error while generating post");
      }

      const data = await response.json();
      if (data.post) {
        setGeneratedPost(data.post);
      }
    } catch (error) {
      console.error("Error generating post:", error);
      alert(`Failed to generate post: ${error.message || "Please check that your backend server is running."}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative py-10 px-4 sm:px-6 lg:px-8 font-sans text-slate-100 selection:bg-indigo-600 selection:text-white">
      <NeuralBackground />

      <div className="relative z-10 max-w-4xl mx-auto space-y-6">
        {/* 1 to 6: Generator Form */}
        <GeneratorCard
          onGenerate={handleGenerate}
          isLoading={isLoading}
          topic={topic}
          setTopic={setTopic}
          platform={platform}
          setPlatform={setPlatform}
          length={length}
          setLength={setLength}
          language={language}
          setLanguage={setLanguage}
          tags={tags}
        />

        {/* 7: Generated Post Preview */}
        {generatedPost && (
          <ResultCard
            content={generatedPost}
            platform={platform}
            onRegenerate={handleGenerate}
            isRegenerating={isLoading}
          />
        )}

        {/* 8 to 11: AI Hashtag Generator Section */}
        {generatedPost && (
          <HashtagGenerator
            postContent={generatedPost}
            platform={platform}
            topic={topic}
          />
        )}
      </div>
    </div>
  );
}

export default App;
