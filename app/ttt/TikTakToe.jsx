import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Vibration,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";

import React, { useState } from "react";
import X from "../../assets/Cross.png"; // Ensure this path is correct
import O from "../../assets/Circle.png"; // Ensure this path is correct
import blank from "../../assets/Blank.png"; // Ensure this path is correct

export default function TikTakToe() {
  const [board, setBoard] = useState(Array(9).fill(null)); // 3x3 board
  const [winner, setWinner] = useState("");
  const [currentPlayer, setCurrentPlayer] = useState("X");
  const [finished, setFinished] = useState(false);
  const images = {
    // X: require("././assets/Cross.png"),
    // O: require("././assets/Circle.png"),
    // blank: require("././assets/Blank.png"),
    X: X,
    O: O,
    blank: blank,
  };
  const Replay = () => {
    setBoard(Array(9).fill(null));
    setWinner("");
    setCurrentPlayer("X");
    setFinished(false);
  };
  const gamelogic = (index) => {
    if (board[index] || winner) return; // Prevent overwriting or further play after the game ends

    const newBoard = [...board];
    newBoard[index] = currentPlayer;
    Vibration.vibrate(400);
    setBoard(newBoard);

    const gameWinner = checkWin(newBoard);
    if (gameWinner) {
      setWinner(gameWinner);
      // Winner found
      setFinished(true);
      return;
    } else if (newBoard.every((cell) => cell)) {
      setWinner("Draw");
      setFinished(true); // All cells are filled, and no winner
      // All cells are filled, and no winner
    } else {
      setCurrentPlayer(currentPlayer === "X" ? "O" : "X"); // Switch turn
    }
  };

  const checkWin = (board) => {
    const wincombo = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (const [a, b, c] of wincombo) {
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return board[a]; // Return the winner ('X' or 'O')
      }
    }
    return null; // No winner
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tic Tac Toe Game</Text>

      {winner && (
        <Text style={styles.winnerText}>
          {winner === "Draw" ? "It's a Draw!" : `${winner} Wins!`}
        </Text>
      )}
      <View style={styles.board}>
        {board.map((value, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => gamelogic(index)}
            style={styles.game}
          >
            <Image
              source={value ? images[value] : images.blank}
              style={{ width: 80, height: 80 }}
            />
          </TouchableOpacity>
        ))}
      </View>

      {!winner && <Text style={styles.winnerText}>{currentPlayer}'s Turn</Text>}
      {finished && (
        <TouchableOpacity style={styles.addButton} onPress={Replay}>
          <Icon name="replay" size={30} color="red"></Icon>
          <Text style={styles.winnerText}>Play Again</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 20,
  },
  winnerText: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  board: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    flexWrap: "wrap",
  },
  game: {
    width: 100,
    height: 100,
    borderWidth: 1,
    borderColor: "black",
    justifyContent: "center",
    alignItems: "center",
  },
  addButton: {
    bottom: 10,
    padding: 15,
    alignItems: "center",
    borderRadius: 50,
  },
  // elevation: 5, // Adds shadow effect for Android
});
