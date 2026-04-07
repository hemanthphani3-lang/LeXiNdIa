import { useState } from 'react';
import { motion } from 'motion/react';
import DashboardLayout from '../../../components/DashboardLayout';
import {
  LayoutDashboard, BookOpen, Calendar, FileText, Users,
  Settings, CheckCircle, Plus, Trash2, Edit2, X, ChevronRight, ArrowLeft
} from 'lucide-react';
import { quizSets } from '../../../utils/quizData';

export default function QuizCreator() {
  const [sets, setSets] = useState(quizSets);
  const [selectedSet, setSelectedSet] = useState(null);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [editingQuestion, setEditingQuestion] = useState(null);

  // For creating new set
  const [newSet, setNewSet] = useState({
    title: '',
    description: '',
    questions: Array(15).fill(null).map((_, idx) => ({
      id: idx + 1,
      question: '',
      options: ['', '', '', ''],
      correctAnswer: 0,
      explanation: ''
    }))
  });

  const navigationItems = [
    { label: 'Dashboard', icon: LayoutDashboard, path: '/educator' },
    { label: 'Schedule Sessions', icon: Calendar, path: '/educator/sessions' },
    { label: 'Commentary', icon: FileText, path: '/educator/articles' },
    { label: 'Quiz Creator', icon: CheckCircle, path: '/educator/quiz', active: true },
    { label: 'Student Interaction', icon: Users, path: '/educator/students' },
    { label: 'Settings', icon: Settings, path: '/educator/settings' },
  ];

  const handleSetClick = (set) => {
    setSelectedSet(set);
    setShowCreateForm(false);
  };

  const handleBackToSets = () => {
    setSelectedSet(null);
    setShowCreateForm(false);
  };

  const handleCreateNewSet = () => {
    setShowCreateForm(true);
    setSelectedSet(null);
    setNewSet({
      title: '',
      description: '',
      questions: Array(15).fill(null).map((_, idx) => ({
        id: idx + 1,
        question: '',
        options: ['', '', '', ''],
        correctAnswer: 0,
        explanation: ''
      }))
    });
  };

  const handleNewSetQuestionChange = (questionIndex, field, value) => {
    setNewSet(prev => {
      const updatedQuestions = [...prev.questions];
      if (field === 'option') {
        updatedQuestions[questionIndex].options[value.index] = value.text;
      } else {
        updatedQuestions[questionIndex][field] = value;
      }
      return { ...prev, questions: updatedQuestions };
    });
  };

  const handleSaveNewSet = () => {
    // Validate all questions are filled
    const hasEmptyQuestions = newSet.questions.some(q =>
      !q.question || q.options.some(opt => !opt) || !q.explanation
    );

    if (!newSet.title || hasEmptyQuestions) {
      alert('Please fill in all fields including title, questions, options, and explanations for all 15 questions.');
      return;
    }

    const newSetData = {
      id: sets.length + 1,
      title: newSet.title,
      description: newSet.description,
      questions: newSet.questions
    };

    setSets(prev => [...prev, newSetData]);
    setShowCreateForm(false);
    alert('New quiz set created successfully!');
  };

  const handleEditQuestion = (setId, question) => {
    setEditingQuestion({ setId, ...question });
  };

  const handleUpdateQuestion = () => {
    setSets(prev => prev.map(set => {
      if (set.id === editingQuestion.setId) {
        return {
          ...set,
          questions: set.questions.map(q =>
            q.id === editingQuestion.id ? { ...editingQuestion } : q
          )
        };
      }
      return set;
    }));
    setEditingQuestion(null);
    // Update the selected set if it's currently being viewed
    if (selectedSet && selectedSet.id === editingQuestion.setId) {
      setSelectedSet(prev => ({
        ...prev,
        questions: prev.questions.map(q =>
          q.id === editingQuestion.id ? { ...editingQuestion } : q
        )
      }));
    }
    alert('Question updated successfully!');
  };

  const handleDeleteQuestion = (setId, questionId) => {
    if (!window.confirm('Are you sure you want to delete this question?')) return;

    setSets(prev => prev.map(set => {
      if (set.id === setId) {
        return {
          ...set,
          questions: set.questions.filter(q => q.id !== questionId)
        };
      }
      return set;
    }));

    // Update the selected set if it's currently being viewed
    if (selectedSet && selectedSet.id === setId) {
      setSelectedSet(prev => ({
        ...prev,
        questions: prev.questions.filter(q => q.id !== questionId)
      }));
    }
    alert('Question deleted successfully!');
  };

  const handleDeleteSet = (setId) => {
    if (!window.confirm('Are you sure you want to delete this entire set?')) return;

    setSets(prev => prev.filter(set => set.id !== setId));
    if (selectedSet && selectedSet.id === setId) {
      setSelectedSet(null);
    }
    alert('Quiz set deleted successfully!');
  };

  return (
    <DashboardLayout navigationItems={navigationItems} title="Quiz Creator" role="Educator">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          {(selectedSet || showCreateForm) && (
            <button
              onClick={handleBackToSets}
              className="flex items-center gap-2 text-[#FF9933] hover:text-[#E87F1F] mb-3 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              Back to Sets
            </button>
          )}
          <h2 className="text-3xl text-[#0A1F44] mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
            {showCreateForm ? 'Create New Quiz Set' : selectedSet ? `Set ${selectedSet.id}: ${selectedSet.title}` : 'Quiz Sets Management'}
          </h2>
          <p className="text-[#64748B]">
            {showCreateForm ? 'Create a new quiz set with 15 MCQ questions' : selectedSet ? selectedSet.description : 'Manage quiz sets and questions for student assessments'}
          </p>
        </div>
        {!selectedSet && !showCreateForm && (
          <button
            onClick={handleCreateNewSet}
            className="px-6 py-3 bg-gradient-to-r from-[#FF9933] to-[#FFB366] text-white rounded-lg hover:shadow-lg transition-all hover-lift flex items-center gap-2"
          >
            <Plus className="w-5 h-5" />
            Create New Set
          </button>
        )}
      </div>

      {/* Show Sets List */}
      {!selectedSet && !showCreateForm && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sets.map((set, index) => (
            <motion.div
              key={set.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="glass-white rounded-xl p-6 card-elevated hover:shadow-xl transition-all cursor-pointer group"
            >
              <div className="flex items-start justify-between mb-4">
                <div
                  className="flex-1"
                  onClick={() => handleSetClick(set)}
                >
                  <div className="text-4xl text-[#FF9933] mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
                    Set {set.id}
                  </div>
                  <h3 className="text-xl text-[#0A1F44] mb-2 group-hover:text-[#FF9933] transition-colors" style={{ fontFamily: "'Playfair Display', serif" }}>
                    {set.title}
                  </h3>
                  <p className="text-[#64748B] text-sm mb-3">{set.description}</p>
                  <div className="flex items-center gap-2">
                    <span className="px-3 py-1 rounded-full text-xs bg-[#138808]/10 text-[#138808]">
                      {set.questions.length} Questions
                    </span>
                  </div>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDeleteSet(set.id);
                  }}
                  className="p-2 hover:bg-red-50 rounded-lg transition-colors"
                  title="Delete Set"
                >
                  <Trash2 className="w-5 h-5 text-red-600" />
                </button>
              </div>
              <div
                onClick={() => handleSetClick(set)}
                className="flex items-center gap-2 text-[#FF9933] group-hover:gap-3 transition-all"
              >
                <span className="text-sm">View Questions</span>
                <ChevronRight className="w-4 h-4" />
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Show Selected Set Questions */}
      {selectedSet && !editingQuestion && (
        <div className="space-y-4">
          {selectedSet.questions.map((question, index) => (
            <motion.div
              key={question.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="glass-white rounded-xl p-6 card-elevated"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="text-[#FF9933] font-medium mb-2">Question {question.id}</div>
                  <h4 className="text-lg text-[#0A1F44] mb-4">{question.question}</h4>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
                    {question.options.map((option, optIdx) => (
                      <div
                        key={optIdx}
                        className={`p-3 rounded-lg border-2 ${
                          question.correctAnswer === optIdx
                            ? 'border-[#138808] bg-[#138808]/5'
                            : 'border-[#0A1F44]/10 bg-[#F8FAFC]'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-[#0A1F44]">
                            {String.fromCharCode(65 + optIdx)}.
                          </span>
                          <span className="text-[#0A1F44]">{option}</span>
                          {question.correctAnswer === optIdx && (
                            <CheckCircle className="w-4 h-4 text-[#138808] ml-auto" />
                          )}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="p-4 bg-blue-50 border-l-4 border-blue-500 rounded">
                    <div className="text-sm font-medium text-blue-900 mb-1">Explanation:</div>
                    <div className="text-sm text-blue-800">{question.explanation}</div>
                  </div>
                </div>

                <div className="flex items-center gap-2 ml-4">
                  <button
                    onClick={() => handleEditQuestion(selectedSet.id, question)}
                    className="p-2 hover:bg-[#F8FAFC] rounded-lg transition-colors"
                    title="Edit Question"
                  >
                    <Edit2 className="w-5 h-5 text-[#0A1F44]" />
                  </button>
                  <button
                    onClick={() => handleDeleteQuestion(selectedSet.id, question.id)}
                    className="p-2 hover:bg-red-50 rounded-lg transition-colors"
                    title="Delete Question"
                  >
                    <Trash2 className="w-5 h-5 text-red-600" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Edit Question Form */}
      {editingQuestion && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-white rounded-xl p-6 card-elevated"
        >
          <h3 className="text-xl text-[#0A1F44] mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
            Edit Question {editingQuestion.id}
          </h3>

          <div className="space-y-6">
            <div>
              <label className="block text-sm text-[#0A1F44] mb-2 font-medium">Question *</label>
              <textarea
                value={editingQuestion.question}
                onChange={(e) => setEditingQuestion(prev => ({ ...prev, question: e.target.value }))}
                rows={3}
                className="w-full px-4 py-3 border border-[#0A1F44]/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF9933] bg-white resize-none"
              />
            </div>

            <div>
              <label className="block text-sm text-[#0A1F44] mb-3 font-medium">Options *</label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {editingQuestion.options.map((option, idx) => (
                  <div key={idx}>
                    <label className="block text-xs text-[#64748B] mb-2">
                      Option {String.fromCharCode(65 + idx)}
                    </label>
                    <input
                      type="text"
                      value={option}
                      onChange={(e) => {
                        const newOptions = [...editingQuestion.options];
                        newOptions[idx] = e.target.value;
                        setEditingQuestion(prev => ({ ...prev, options: newOptions }));
                      }}
                      className="w-full px-4 py-3 border border-[#0A1F44]/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF9933] bg-white"
                    />
                  </div>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm text-[#0A1F44] mb-2 font-medium">Correct Answer *</label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {['A', 'B', 'C', 'D'].map((letter, idx) => (
                  <button
                    key={idx}
                    onClick={() => setEditingQuestion(prev => ({ ...prev, correctAnswer: idx }))}
                    className={`px-4 py-3 rounded-lg border-2 transition-all ${
                      editingQuestion.correctAnswer === idx
                        ? 'border-[#138808] bg-[#138808] text-white'
                        : 'border-[#0A1F44]/10 hover:border-[#FF9933]'
                    }`}
                  >
                    {letter}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm text-[#0A1F44] mb-2 font-medium">Explanation *</label>
              <textarea
                value={editingQuestion.explanation}
                onChange={(e) => setEditingQuestion(prev => ({ ...prev, explanation: e.target.value }))}
                rows={3}
                className="w-full px-4 py-3 border border-[#0A1F44]/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF9933] bg-white resize-none"
              />
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t border-[#0A1F44]/10">
              <button
                onClick={() => setEditingQuestion(null)}
                className="px-6 py-3 border border-[#0A1F44]/20 text-[#0A1F44] rounded-lg hover:bg-[#F8FAFC] transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdateQuestion}
                className="px-6 py-3 bg-gradient-to-r from-[#0A1F44] to-[#1A3A6B] text-white rounded-lg hover:shadow-lg transition-all hover-lift"
              >
                Save Changes
              </button>
            </div>
          </div>
        </motion.div>
      )}

      {/* Create New Set Form */}
      {showCreateForm && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          {/* Set Info */}
          <div className="glass-white rounded-xl p-6 card-elevated">
            <h3 className="text-xl text-[#0A1F44] mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
              Set Information
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-[#0A1F44] mb-2 font-medium">Set Title *</label>
                <input
                  type="text"
                  value={newSet.title}
                  onChange={(e) => setNewSet(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="e.g., Constitution Basics"
                  className="w-full px-4 py-3 border border-[#0A1F44]/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF9933] bg-white"
                />
              </div>
              <div>
                <label className="block text-sm text-[#0A1F44] mb-2 font-medium">Description *</label>
                <textarea
                  value={newSet.description}
                  onChange={(e) => setNewSet(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Brief description of the quiz set"
                  rows={2}
                  className="w-full px-4 py-3 border border-[#0A1F44]/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF9933] bg-white resize-none"
                />
              </div>
            </div>
          </div>

          {/* 15 Questions */}
          {newSet.questions.map((question, qIdx) => (
            <div key={qIdx} className="glass-white rounded-xl p-6 card-elevated">
              <div className="text-[#FF9933] font-medium mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
                Question {qIdx + 1} of 15
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm text-[#0A1F44] mb-2 font-medium">Question *</label>
                  <textarea
                    value={question.question}
                    onChange={(e) => handleNewSetQuestionChange(qIdx, 'question', e.target.value)}
                    placeholder="Enter your question here..."
                    rows={3}
                    className="w-full px-4 py-3 border border-[#0A1F44]/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF9933] bg-white resize-none"
                  />
                </div>

                <div>
                  <label className="block text-sm text-[#0A1F44] mb-3 font-medium">Options *</label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {question.options.map((option, optIdx) => (
                      <div key={optIdx}>
                        <label className="block text-xs text-[#64748B] mb-2">
                          Option {String.fromCharCode(65 + optIdx)}
                        </label>
                        <input
                          type="text"
                          value={option}
                          onChange={(e) => handleNewSetQuestionChange(qIdx, 'option', { index: optIdx, text: e.target.value })}
                          placeholder={`Option ${String.fromCharCode(65 + optIdx)}`}
                          className="w-full px-4 py-3 border border-[#0A1F44]/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF9933] bg-white"
                        />
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm text-[#0A1F44] mb-2 font-medium">Correct Answer *</label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {['A', 'B', 'C', 'D'].map((letter, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleNewSetQuestionChange(qIdx, 'correctAnswer', idx)}
                        className={`px-4 py-3 rounded-lg border-2 transition-all ${
                          question.correctAnswer === idx
                            ? 'border-[#138808] bg-[#138808] text-white'
                            : 'border-[#0A1F44]/10 hover:border-[#FF9933]'
                        }`}
                      >
                        {letter}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm text-[#0A1F44] mb-2 font-medium">Explanation *</label>
                  <textarea
                    value={question.explanation}
                    onChange={(e) => handleNewSetQuestionChange(qIdx, 'explanation', e.target.value)}
                    placeholder="Provide an explanation for the correct answer..."
                    rows={3}
                    className="w-full px-4 py-3 border border-[#0A1F44]/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF9933] bg-white resize-none"
                  />
                </div>
              </div>
            </div>
          ))}

          {/* Save Button */}
          <div className="glass-white rounded-xl p-6 card-elevated flex justify-end gap-3">
            <button
              onClick={() => setShowCreateForm(false)}
              className="px-6 py-3 border border-[#0A1F44]/20 text-[#0A1F44] rounded-lg hover:bg-[#F8FAFC] transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSaveNewSet}
              className="px-6 py-3 bg-gradient-to-r from-[#138808] to-[#1ea712] text-white rounded-lg hover:shadow-lg transition-all hover-lift"
            >
              Save Quiz Set
            </button>
          </div>
        </motion.div>
      )}
    </DashboardLayout>
  );
}