#include <stdio.h>
#include <stdlib.h>
#include <stdbool.h>
#include <wchar.h>
#include <locale.h>
#include <unistd.h>
#include <string.h>

// Definição da altura e da largura do 'jogo'
#define WIDTH 25
#define HEIGHT 25

// Função que limpa a tela
void clearScreen() {
  const char * CLEAR_SCREEN_ANSI = "\e[1;1H\e[2J";
  write(STDOUT_FILENO, CLEAR_SCREEN_ANSI, 12);
}

// Função que exibe os 'indivíduos'
void printBoard(bool * board, int cycle) {
  wchar_t alive = 0x25A0; // Quadrado cheio
  wchar_t dead = 0x25A1; // Quadrado vazio
  for (int i = 0; i < HEIGHT; i++) {
    for (int j = 0; j < WIDTH; j++) {
      wprintf(L"%lc ", board[i * HEIGHT + j] ? alive : dead); // Imprime o estado do 'indivíduo' (Vivo ou Morto)
    }
    printf("\n");
  }
  printf("\nCycle: %d\n", cycle); // Exibe a contagem de ciclos na tela
}

// Função que calcula o próximo ciclo do 'jogo'
void doGameTick(bool * board, bool * temp) {

  // Itera todos os indivíduos
  for (int i = 0; i < HEIGHT; i++) {
    for (int j = 0; j < WIDTH; j++) {

      int neighbors = 0; // Contagem dos vizinhos

      // Itera todos os vizinhos
      for (int ni = -1; ni <= 1; ni++) {
        for (int nj = -1; nj <= 1; nj++) {
          if (board[(i + ni) * HEIGHT + j + nj]) {
            neighbors++;
          }
        }
      }

      // Subtrai 1 da contagem de vizinhos se o próprio indivíduo estiver vivo, porque ele foi incluido na iteração acima
      if (board[i * HEIGHT + j]) {
        neighbors--;
      }

      // printf("[%d][%d]\n", i, j);
      // printf("neighbors: %d\n\n", neighbors);

      // REGRAS DO JOGO

      if (board[i * HEIGHT + j] && neighbors < 2) {
        // Caso o indivíduo tenha menos de 2 vizinhos, ele morre de solidão
        temp[i * HEIGHT + j] = false;
      } else if (board[i * HEIGHT + j] && neighbors > 3) {
        // Caso o indivíduo tenha mais de 3 vizinhos, ele morre de superpopulação
        temp[i * HEIGHT + j] = false;
      } else if (!board[i * HEIGHT + j] && neighbors == 3) {
        // Caso o indivíduo esteja morto e tenha 3 vizinhos, ele nasce
        temp[i * HEIGHT + j] = true;
      } else {
        // Caso não se encaixe em nanhuma outra regra, a célula mantém o mesmo valor do ciclo anterior
        temp[i * HEIGHT + j] = board[i * HEIGHT + j];
      }
    }
  }

  memcpy(board, temp, sizeof(bool) * HEIGHT * WIDTH); // Com todas as células 'processadas', o novo estado é copiado para o estado principal
}

int main(int argc, char const * argv[]) {
  // Define o mapa de caracteres (Unicode)
  setlocale(LC_ALL, "en_US.UTF-8");

  // Cria os vetores que armazenarão os estados atual e próximo do 'jogo'
  bool * board = malloc(sizeof(bool) * HEIGHT * WIDTH);
  bool * temp = malloc(sizeof(bool) * HEIGHT * WIDTH);

  // Exemplo 'Glider'
  board[0 * HEIGHT + 1] = true;
  board[1 * HEIGHT + 2] = true;
  board[2 * HEIGHT + 0] = true;
  board[2 * HEIGHT + 1] = true;
  board[2 * HEIGHT + 2] = true;

  int cycle = 0; // Contagem dos ciclos

  do {
    clearScreen(); // Limpa a tela
    printBoard(board, cycle++); // Imprime o estado atual, incrementando o número de ciclos
    doGameTick(board, temp); // Calcula o próximo estado
    sleep(1); // Espera 1 segundo
  } while (cycle < 112); // Limite de ciclos

  return 0;
}

