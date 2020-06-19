#include <stdio.h>

#include <stdlib.h>

int n;
int total = 0;

void print(int v[]) {
  for (int i = 0; i < n; i++) {
    printf("%4d", v[i] + 1);
  }
  printf("\n");

}

int isSafe(int board[], int index, int value) {

  for (int i = 0; i < index; i++) {
    if (board[i] == value) {
      return 0;
    }
  }

  int count = 1;

  for (int i = 0; i >= 0; count++) {
    i = index - count;
    if (i >= 0 && (board[i] == value - count || board[i] == value + count)) {
      return 0;
    }
  }

  return 1;
}

int solve(int board[], int column) {

  if (column == n) {
    printf("Solução %d:", ++total);
    print(board);
    return 1;
  }

  for (int i = 0; i < n; i++) {
    if (isSafe(board, column, i) == 1) {
      board[column] = i;
      if (solve(board, column + 1) == 0) {
        board[column] = -1;
      }
    }
  }

  if (board[column] == -1) {
    return 0;
  }

  return 1;
}

int main() {
  printf("Tamanho do tabuleiro: ");
  scanf("%d", & n);

  int board[n];

  for (int i = 0; i < n; i++) {
    board[i] = -1;
  }

  solve(board, 0);

  return 0;
} 
