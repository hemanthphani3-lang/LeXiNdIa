import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Link, useParams, useNavigate, useLocation } from 'react-router';
import { ArrowLeft, Award, CheckCircle, XCircle, Clock, BarChart, RefreshCw } from 'lucide-react';
import { getQuizSetByRotation, quizSets } from '../utils/quizData';

export default function Quiz() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [quiz, setQuiz] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [timeLeft, setTimeLeft] = useState(600); // 10 minutes in seconds

  // Determine if we're in citizen portal
  const isCitizenPortal = location.pathname.startsWith('/citizen');
  const backPath = isCitizenPortal ? '/citizen' : '/';

  useEffect(() => {
    try {
      const quizSet = getQuizSetByRotation();
      if (quizSet) {
        setQuiz(quizSet);
      } else {
        // Fallback to first set
        setQuiz(quizSets[0]);
      }
    } catch (err) {
      console.error('Quiz initialization error:', err);
      // Absolute fallback
      setQuiz(quizSets[0]);
    }
  }, []);

  // Timer countdown
  useEffect(() => {
    if (!showResults && quiz) {
      const timer = setInterval(() => {
        setTimeLeft((prevTime) => {
          if (prevTime <= 1) {
            clearInterval(timer);
            // Auto-submit when time runs out
            setShowResults(true);
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [showResults, quiz]);

  // Format time as MM:SS
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleAnswerSelect = (questionIndex, answerIndex) => {
    setSelectedAnswers({
      ...selectedAnswers,
      [questionIndex]: answerIndex
    });
  };

  const handleNext = () => {
    if (quiz && currentQuestion < quiz.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleSubmit = () => {
    setShowResults(true);
  };

  const calculateScore = () => {
    if (!quiz || !quiz.questions) return { correct: 0, total: 0, percentage: 0 };
    
    let correct = 0;
    quiz.questions.forEach((question, index) => {
      if (selectedAnswers[index] === question.correctAnswer) {
        correct++;
      }
    });
    return {
      correct,
      total: quiz.questions.length,
      percentage: Math.round((correct / quiz.questions.length) * 100)
    };
  };

  const handleRetakeQuiz = () => {
    // Load a new quiz set
    const newQuizSet = getQuizSetByRotation();
    setQuiz(newQuizSet);
    setShowResults(false);
    setCurrentQuestion(0);
    setSelectedAnswers({});
    setTimeLeft(600);
  };

  if (!quiz || !quiz.questions || quiz.questions.length === 0) {
    return (
      <div className="min-h-screen bg-[#F8F9FA] ashoka-pattern flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#FF9933] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-[#64748B]">Loading quiz...</p>
        </div>
      </div>
    );
  }

  const score = calculateScore();
  const currentQ = quiz.questions && quiz.questions[currentQuestion] ? quiz.questions[currentQuestion] : {
    question: "Question data is currently unavailable.",
    options: ["Error", "Error", "Error", "Error"],
    correctAnswer: 0,
    explanation: "There was an error loading this specific question set."
  };
  const passingScore = 60;

  if (showResults) {
    return (
      <div className="min-h-screen bg-[#F8F9FA] ashoka-pattern flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-3xl glass-white rounded-2xl p-8 md:p-12 shadow-2xl text-center"
        >
          {/* Score Animation */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2, type: 'spring' }}
            className={`w-32 h-32 mx-auto rounded-full flex items-center justify-center mb-6 ${
              score.percentage >= passingScore
                ? 'bg-gradient-to-br from-[#138808] to-[#1ea712]'
                : 'bg-gradient-to-br from-[#FF9933] to-[#E87F1F]'
            }`}
          >
            {score.percentage >= passingScore ? (
              <CheckCircle className="w-16 h-16 text-white" />
            ) : (
              <XCircle className="w-16 h-16 text-white" />
            )}
          </motion.div>

          <h1 
            className="text-4xl text-[#0A1F44] mb-3"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            {score.percentage >= passingScore ? 'Congratulations!' : 'Keep Learning!'}
          </h1>
          
          <p className="text-lg text-[#64748B] mb-2">
            {score.percentage >= passingScore 
              ? 'You have successfully completed the quiz!'
              : 'You need more practice. Review the topics and try again.'}
          </p>

          {/* Score Details */}
          <div className="grid grid-cols-3 gap-6 mb-8">
            <div className="p-6 bg-[#F8FAFC] rounded-xl">
              <div className="text-3xl text-[#0A1F44] mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
                {score.percentage}%
              </div>
              <div className="text-sm text-[#64748B]">Score</div>
            </div>
            <div className="p-6 bg-[#F8FAFC] rounded-xl">
              <div className="text-3xl text-[#138808] mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
                {score.correct}
              </div>
              <div className="text-sm text-[#64748B]">Correct</div>
            </div>
            <div className="p-6 bg-[#F8FAFC] rounded-xl">
              <div className="text-3xl text-[#FF9933] mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
                {score.total - score.correct}
              </div>
              <div className="text-sm text-[#64748B]">Incorrect</div>
            </div>
          </div>

          {/* Review Answers with Explanations */}
          <div className="mb-8 text-left max-h-[500px] overflow-y-auto">
            <h3 className="text-xl text-[#0A1F44] mb-4 sticky top-0 bg-white py-2" style={{ fontFamily: "'Playfair Display', serif" }}>
              Review Your Answers
            </h3>
            <div className="space-y-4 pr-2">
              {quiz.questions.map((question, index) => {
                const isCorrect = selectedAnswers[index] === question.correctAnswer;
                const userAnswered = selectedAnswers[index] !== undefined;
                
                return (
                  <div key={index} className={`p-4 rounded-lg border-2 ${
                    isCorrect ? 'border-[#138808]/20 bg-[#138808]/5' : 'border-[#FF9933]/20 bg-[#FF9933]/5'
                  }`}>
                    <div className="flex items-start gap-3">
                      {isCorrect ? (
                        <CheckCircle className="w-5 h-5 text-[#138808] flex-shrink-0 mt-1" />
                      ) : (
                        <XCircle className="w-5 h-5 text-[#FF9933] flex-shrink-0 mt-1" />
                      )}
                      <div className="flex-1">
                        <p className="text-[#0A1F44] mb-3 font-semibold">
                          Q{index + 1}. {question.question}
                        </p>
                        
                        {userAnswered && (
                          <div className="mb-2 space-y-1">
                            <p className="text-sm text-[#64748B]">
                              <span className="font-semibold">Your answer:</span>{' '}
                              <span className={isCorrect ? 'text-[#138808] font-medium' : 'text-[#FF9933] font-medium'}>
                                {question.options[selectedAnswers[index]]}
                              </span>
                            </p>
                            {!isCorrect && (
                              <p className="text-sm text-[#64748B]">
                                <span className="font-semibold">Correct answer:</span>{' '}
                                <span className="text-[#138808] font-medium">
                                  {question.options[question.correctAnswer]}
                                </span>
                              </p>
                            )}
                          </div>
                        )}
                        
                        {/* Explanation Box */}
                        <div className="mt-3 p-3 bg-white/50 rounded-lg border border-[#0A1F44]/10">
                          <p className="text-xs text-[#64748B] font-semibold mb-1">
                            📖 Explanation:
                          </p>
                          <p className="text-sm text-[#0A1F44] leading-relaxed">
                            {question.explanation}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}</div>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to={backPath}
              className="px-8 py-3 bg-[#F8FAFC] text-[#0A1F44] rounded-lg hover:bg-[#F1F3F9] transition-all text-center"
            >
              Back to Dashboard
            </Link>
            <button
              onClick={handleRetakeQuiz}
              className="px-8 py-3 bg-gradient-to-r from-[#0A1F44] to-[#1A3A6B] text-white rounded-lg hover:shadow-lg transition-all hover-lift flex items-center justify-center gap-2"
            >
              <RefreshCw className="w-5 h-5" />
              Try New Quiz Set
            </button>
          </div>

          <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-sm text-blue-800">
              <strong>💡 Tip:</strong> Each time you retake the quiz, you'll get a different set of questions. Keep practicing to master all aspects of the Indian Constitution!
            </p>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8F9FA] ashoka-pattern">
      {/* Header */}
      <header className="bg-white border-b border-[#0A1F44]/10 sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link 
              to={backPath}
              className="flex items-center gap-2 text-[#64748B] hover:text-[#0A1F44] transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              Exit Quiz
            </Link>
            
            <div className="flex items-center gap-2 text-[#64748B]">
              <Clock className="w-5 h-5" />
              <span>{formatTime(timeLeft)}</span>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Quiz Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#FF9933] to-[#0A1F44] flex items-center justify-center">
              <Award className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 
                className="text-3xl md:text-4xl text-[#0A1F44]"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                {quiz.title}
              </h1>
            </div>
          </div>
          <p className="text-lg text-[#64748B]">{quiz.description}</p>
        </motion.div>

        {/* Progress Bar */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between text-sm text-[#64748B] mb-2">
            <span>Question {currentQuestion + 1} of {quiz.questions.length}</span>
            <span>{Math.round(((currentQuestion + 1) / quiz.questions.length) * 100)}% Complete</span>
          </div>
          <div className="w-full bg-[#F1F3F9] rounded-full h-2">
            <motion.div 
              className="bg-gradient-to-r from-[#FF9933] to-[#FFB366] h-2 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${((currentQuestion + 1) / quiz.questions.length) * 100}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </motion.div>

        {/* Question Card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentQuestion}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
            className="glass-white rounded-2xl p-8 md:p-12 shadow-2xl mb-8"
          >
            <div className="flex items-start gap-4 mb-8">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#FF9933] to-[#FFB366] flex items-center justify-center flex-shrink-0">
                <span className="text-white text-lg" style={{ fontFamily: "'Playfair Display', serif" }}>
                  {currentQuestion + 1}
                </span>
              </div>
              <h2 className="text-xl md:text-2xl text-[#0A1F44] flex-1" style={{ fontFamily: "'Playfair Display', serif" }}>
                {currentQ.question}
              </h2>
            </div>

            <div className="space-y-4">
              {currentQ.options.map((option, index) => (
                <motion.button
                  key={index}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  onClick={() => handleAnswerSelect(currentQuestion, index)}
                  className={`w-full p-5 text-left rounded-xl border-2 transition-all ${
                    selectedAnswers[currentQuestion] === index
                      ? 'border-[#FF9933] bg-[#FF9933]/5 shadow-md'
                      : 'border-[#0A1F44]/10 hover:border-[#FF9933]/50 bg-white'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                      selectedAnswers[currentQuestion] === index
                        ? 'border-[#FF9933] bg-[#FF9933]'
                        : 'border-[#0A1F44]/30'
                    }`}>
                      {selectedAnswers[currentQuestion] === index && (
                        <div className="w-3 h-3 bg-white rounded-full"></div>
                      )}
                    </div>
                    <span className="text-[#0A1F44] flex-1">{option}</span>
                  </div>
                </motion.button>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation */}
        <div className="flex items-center justify-between">
          <button
            onClick={handlePrevious}
            disabled={currentQuestion === 0}
            className={`px-8 py-3 rounded-lg transition-all ${
              currentQuestion === 0
                ? 'bg-[#F1F3F9] text-[#64748B] cursor-not-allowed'
                : 'bg-white border border-[#0A1F44]/10 text-[#0A1F44] hover:bg-[#F8FAFC]'
            }`}
          >
            Previous
          </button>

          {currentQuestion === quiz.questions.length - 1 ? (
            <button
              onClick={handleSubmit}
              disabled={Object.keys(selectedAnswers).length !== quiz.questions.length}
              className={`px-8 py-3 rounded-lg transition-all hover-lift ${
                Object.keys(selectedAnswers).length === quiz.questions.length
                  ? 'bg-[#0A1F44] text-white hover:bg-[#1A3A6B]'
                  : 'bg-[#F1F3F9] text-[#64748B] cursor-not-allowed'
              }`}
            >
              Submit Quiz
            </button>
          ) : (
            <button
              onClick={handleNext}
              disabled={selectedAnswers[currentQuestion] === undefined}
              className={`px-8 py-3 rounded-lg transition-all hover-lift ${
                selectedAnswers[currentQuestion] !== undefined
                  ? 'bg-[#0A1F44] text-white hover:bg-[#1A3A6B]'
                  : 'bg-[#F1F3F9] text-[#64748B] cursor-not-allowed'
              }`}
            >
              Next
            </button>
          )}
        </div>
      </div>
    </div>
  );
}