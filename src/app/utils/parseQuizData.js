// Temporary parser helper - this file can be removed later
// This helps parse the quiz data from the markdown file

export function parseQuizMarkdown(text) {
  const sets = [];
  const setRegex = /set (\d+):([\s\S]*?)(?=set \d+:|$)/gi;
  
  let match;
  while ((match = setRegex.exec(text)) !== null) {
    const setNumber = parseInt(match[1]);
    const setContent = match[2];
    
    const questions = [];
    // Split by question numbers (1., 2., etc.)
    const questionMatches = setContent.split(/\n\d+\.\s+/);
    
    for (let i = 1; i < questionMatches.length; i++) {
      const qContent = questionMatches[i];
      
      // Extract question text
      const questionMatch = qContent.match(/^(.*?)\n/);
      if (!questionMatch) continue;
      
      const questionText = questionMatch[1].trim();
      
      // Extract options
      const optionMatches = qContent.match(/[A-D]\)(.*?)(?=\n)/g);
      if (!optionMatches || optionMatches.length !== 4) continue;
      
      const options = optionMatches.map(opt => opt.replace(/^[A-D]\)\s*/, '').trim());
      
      // Extract correct answer
      const correctAnswerMatch = qContent.match(/Correct Answer:\s*([A-D])\)/);
      if (!correctAnswerMatch) continue;
      
      const correctAnswerLetter = correctAnswerMatch[1];
      const correctAnswer = correctAnswerLetter.charCodeAt(0) - 'A'.charCodeAt(0);
      
      // Extract explanation
      const explanationMatch = qContent.match(/Explanation:\s*(.*?)(?=\n\n|\n\d+\.|\r\n\r\n|$)/s);
      const explanation = explanationMatch ? explanationMatch[1].trim() : '';
      
      questions.push({
        id: i,
        question: questionText,
        options,
        correctAnswer,
        explanation
      });
    }
    
    if (questions.length === 15) {
      sets.push({
        id: setNumber,
        title: `Constitutional Quiz Set ${setNumber}`,
        description: `Advanced questions on Indian Constitution - Set ${setNumber}`,
        questions
      });
    }
  }
  
  return sets;
}
