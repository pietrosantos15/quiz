import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Audio } from 'expo-av';
import { useState, useEffect } from 'react';

type Question = {
  question: string;
  options: string[];
  correctAnswer: string;
};

type QuizScreenProps = {
  currentQuestion: Question;
  selectedOption: string | null;
  isOptionsDisabled: boolean;
  onOptionPress: (option: string) => void;
  onNextQuestion: () => void;
  onTimeOut: () => void; // ⬅️ Nova prop
};

export default function QuizScreen({
  currentQuestion,
  selectedOption,
  isOptionsDisabled,
  onOptionPress,
  onNextQuestion,
  onTimeOut, // ⬅️ Recebe a nova prop aqui
}: QuizScreenProps) {
  const [sound, setSound] = useState<Audio.Sound | null>(null);
  const [timeLeft, setTimeLeft] = useState(15);

  // Timer
  useEffect(() => {
    if (timeLeft === 0) {
      onTimeOut(); // ⬅️ Chama a função do pai quando o tempo acabar
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, onTimeOut]);

  // resetar o timer quando mudar de pergunta
  useEffect(() => {
    setTimeLeft(15);
  }, [currentQuestion]);

  async function playSound(isCorrect: boolean) {
    if (sound) {
      await sound.unloadAsync();
      setSound(null);
    }

    const { sound: newSound } = await Audio.Sound.createAsync(
      isCorrect
        ? require('../assets/sounds/acerto.mp3')
        : require('../assets/sounds/erro.mp3')
    );
    setSound(newSound);
    await newSound.playAsync();
  }

  const handleOptionPress = (option: string) => {
    const isCorrect = option === currentQuestion.correctAnswer;
    playSound(isCorrect);
    onOptionPress(option);
  };

  const getOptionStyle = (option: string) => {
    if (selectedOption) {
      const isCorrect = option === currentQuestion.correctAnswer;
      if (isCorrect) {
        return styles.correctOption;
      }
      if (option === selectedOption && !isCorrect) {
        return styles.incorrectOption;
      }
    }
    return {};
  };

  return (
    <View style={styles.container}>
      <Text style={styles.timerText}>⏱ {timeLeft}s</Text>

      <View style={styles.questionContainer}>
        <Text style={styles.questionText}>{currentQuestion.question}</Text>
      </View>

      <View style={styles.optionsContainer}>
        {currentQuestion.options.map((option) => (
          <TouchableOpacity
            key={option}
            style={[styles.option, getOptionStyle(option)]}
            onPress={() => handleOptionPress(option)}
            disabled={isOptionsDisabled || timeLeft === 0} // ⬅️ Desabilita as opções quando o tempo acabar
          >
            <Text style={styles.optionText}>{option}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {selectedOption && (
        <TouchableOpacity style={styles.nextButton} onPress={onNextQuestion}>
          <Text style={styles.nextButtonText}>Próxima Pergunta</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

// estilos
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1A1A2E',
    padding: 20,
    justifyContent: 'center',
  },
  timerText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFD700',
    textAlign: 'center',
    marginBottom: 16,
  },
  questionContainer: {
    backgroundColor: '#162447',
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 5,
  },
  questionText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
  },
  optionsContainer: {
    flex: 1,
    justifyContent: 'space-evenly',
  },
  option: {
    backgroundColor: '#1F4068',
    padding: 20,             // 🔽 menor
    borderRadius: 10,       // 🔽 menos arredondado
    borderWidth: 2,
    borderColor: '#1F4068',
    marginVertical: 4,      // 🔽 menor
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 2,
  },
  optionText: {
    fontSize: 16,           // 🔽 menor
    color: '#FFFFFF',
    textAlign: 'center',
    fontWeight: '500',
  },
  correctOption: {
    borderColor: '#4CAF50',
    backgroundColor: '#2E7D32',
  },
  incorrectOption: {
    borderColor: '#F44336',
    backgroundColor: '#B71C1C',
  },
  nextButton: {
    backgroundColor: '#3fd1e4ff',
    padding: 15,             // 🔽 menor
    borderRadius: 10,
    marginTop: 12,          // 🔽 menor
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
  },
  nextButtonText: {
    color: '#FFF',
    fontSize: 16,           // 🔽 menor
    fontWeight: 'bold',
    letterSpacing: 0.5,     // 🔽 menos espaçamento
  },
  gameOverText: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#F44336',
    textAlign: 'center',
    marginBottom: 20,
  },
  restartButton: {
    backgroundColor: '#3fd1e4ff',
    padding: 5,
    borderRadius: 8,
    alignItems: 'center',
  },
  restartButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
