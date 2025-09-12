import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

type ResultScreenProps = {
    score: number
    totalQuestions: number
    onPlayAgain: () => void
}

export default function ResultScreen({ score, totalQuestions, onPlayAgain} : ResultScreenProps) {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Fim de jogo!</Text>
            <Text style={styles.scoreText}>
                Você acertou {score} de {totalQuestions} perguntas!
            </Text>

            <TouchableOpacity style={styles .button} onPress={onPlayAgain}>
                <Text style={styles .buttonText}>Jogar Novamente</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#1A1A2E', // ⬅️ Cor de fundo escura
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#FFD700', // ⬅️ Cor dourada para o título
    },
    scoreText: {
        fontSize: 24,
        marginBottom: 40,
        color: '#FFFFFF', // ⬅️ Cor branca para o texto da pontuação
    },
    button: {
        backgroundColor: '#3fd1e4ff', // ⬅️ Cor do botão principal do tema escuro
        paddingVertical: 15,
        paddingHorizontal: 30,
        borderRadius: 12,
        shadowColor: '#000', // ⬅️ Adiciona sombra
        shadowOpacity: 0.3,
        shadowRadius: 6,
        elevation: 4,
    },
    buttonText: {
        color: '#FFFFFF', // ⬅️ Cor branca para o texto do botão
        fontSize: 18,
        fontWeight: 'bold',
    },
});