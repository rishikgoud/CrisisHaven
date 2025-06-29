import fetch from 'node-fetch';

const HUGGINGFACE_API_URL = 'https://api-inference.huggingface.co/models/j-hartmann/emotion-english-distilroberta-base';
const HUGGINGFACE_API_KEY = process.env.HF_API_KEY || process.env.HUGGINGFACE_API_KEY || '';

export const analyzeSentiment = async (req, res) => {
  const { text } = req.body;
  
  if (!text || text.trim().length === 0) {
    return res.status(400).json({ success: false, error: 'Text is required' });
  }

  if (!HUGGINGFACE_API_KEY) {
    console.error('HuggingFace API key not found');
    return res.status(500).json({ 
      success: false, 
      error: 'Sentiment analysis service not configured' 
    });
  }

  try {
    console.log('🔍 Analyzing sentiment for text:', text.substring(0, 50) + '...');
    console.log('🔑 Using API key:', HUGGINGFACE_API_KEY.substring(0, 10) + '...');

    const response = await fetch(HUGGINGFACE_API_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${HUGGINGFACE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ inputs: text })
    });

    console.log('📡 HuggingFace API response status:', response.status);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('❌ HuggingFace API error:', response.status, errorText);
      
      if (response.status === 401) {
        return res.status(500).json({ 
          success: false, 
          error: 'Invalid API key. Please check your HuggingFace API key.' 
        });
      } else if (response.status === 503) {
        return res.status(500).json({ 
          success: false, 
          error: 'Model is loading. Please try again in a few seconds.' 
        });
      } else {
        return res.status(500).json({ 
          success: false, 
          error: `HuggingFace API error: ${response.status} - ${errorText}` 
        });
      }
    }

    const data = await response.json();
    console.log('📊 HuggingFace API response data:', data);

    // Handle different response formats
    let emotions = data;
    if (Array.isArray(data) && data.length > 0) {
      if (Array.isArray(data[0])) {
        // Format: [[{label: 'joy', score: 0.8}, ...]]
        emotions = data[0];
      } else {
        // Format: [{label: 'joy', score: 0.8}, ...]
        emotions = data;
      }
    }

    // Validate emotions data
    if (!Array.isArray(emotions) || emotions.length === 0) {
      console.error('❌ Invalid emotions data format:', emotions);
      return res.status(500).json({ 
        success: false, 
        error: 'Invalid response format from sentiment analysis service' 
      });
    }

    // Sort emotions by score (highest first)
    emotions.sort((a, b) => b.score - a.score);

    console.log('✅ Sentiment analysis successful:', emotions);

    return res.json({ 
      success: true, 
      emotions: emotions,
      topEmotion: emotions[0]
    });

  } catch (err) {
    console.error('❌ Sentiment analysis failed:', err);
    return res.status(500).json({ 
      success: false, 
      error: `Sentiment analysis failed: ${err.message}` 
    });
  }
}; 