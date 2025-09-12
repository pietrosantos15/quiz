import { useState, useEffect } from 'react';
import QuizScreen from '../components/QuizScreen';
import ResultScreen from '../components/ResultScreen';
import { Text, TouchableOpacity, View } from 'react-native';
// ➡️ Importa as perguntas como um tipo
import questions from '../questions.json';

// ➡️ Define a interface de tipo para uma pergunta
type Question = {
  question: string;
  options: string[];
  correctAnswer: string;
};

// ➡️ Tipa a função de embaralhamento
function shuffleArray(array: any[]): any[] {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

export default function HomePage() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isOptionsDisabled, setIsOptionsDisabled] = useState(false);
  const [score, setScore] = useState(0);
  const [isQuizFinished, setIsQuizFinished] = useState(false);
  const [isLost, setIsLost] = useState(false);
  // ➡️ Tipa o estado do array de perguntas
  const [shuffledQuestions, setShuffledQuestions] = useState<Question[]>([]);

  useEffect(() => {
    // ➡️ Tipa o novo array de perguntas
    const newShuffledQuestions: Question[] = shuffleArray([...questions]);
    newShuffledQuestions.forEach((question: Question) => {
      // ➡️ Tipa o parâmetro 'question'
      question.options = shuffleArray([...question.options]);
    });
    setShuffledQuestions(newShuffledQuestions);
  }, []);

  const currentQuestion = shuffledQuestions[currentQuestionIndex];

  // ➡️ Agora 'currentQuestion' já tem o tipo 'Question' definido
  //    e o erro da propriedade 'correctAnswer' sumirá.
  const handleOptionPress = (option: string) => {
    if (currentQuestion && option === currentQuestion.correctAnswer) {
      setScore(score + 1);
    }
    setSelectedOption(option);
    setIsOptionsDisabled(true);
  };
  
  const handleNextQuestion = () => {
    if (currentQuestionIndex < shuffledQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedOption(null);
      setIsOptionsDisabled(false);
    } else {
      setIsQuizFinished(true);
    }
  };

  const handlePlayAgain = () => {
    setIsQuizFinished(false);
    setIsLost(false);
    setCurrentQuestionIndex(0);
    setSelectedOption(null);
    setIsOptionsDisabled(false);
    setScore(0);
    const newShuffledQuestions: Question[] = shuffleArray([...questions]);
    newShuffledQuestions.forEach((question: Question) => {
      question.options = shuffleArray([...question.options]);
    });
    setShuffledQuestions(newShuffledQuestions);
  };

  const handleTimeOut = () => {
    setIsLost(true);
  };
  
  if (shuffledQuestions.length === 0) {
    return <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}><Text>Carregando Quiz...</Text></View>;
  }

  if (isLost) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#1A1A2E' }}>
        <Text style={{ fontSize: 28, fontWeight: 'bold', color: '#FF4444', marginBottom: 30 }}>
          Você perdeu!
        </Text>
        <TouchableOpacity
          style={{
            backgroundColor: '#3fd1e4ff',
            padding: 16,
            borderRadius: 14,
          }}
          onPress={handlePlayAgain}
        >
          <Text style={{ color: '#FFF', fontSize: 18, fontWeight: 'bold' }}>Reiniciar Quiz</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return isQuizFinished ? (
    <ResultScreen
      score={score}
      totalQuestions={shuffledQuestions.length}
      onPlayAgain={handlePlayAgain}
    />
  ) : (
    <QuizScreen
      currentQuestion={currentQuestion}
      selectedOption={selectedOption}
      isOptionsDisabled={isOptionsDisabled}
      onOptionPress={handleOptionPress}
      onNextQuestion={handleNextQuestion}
      onTimeOut={handleTimeOut}
    />
  );
}