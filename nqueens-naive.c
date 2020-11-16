#include <stdio.h>
int n;

void swap (int *x, int *y)
{
    int temp;
    temp = *x;
    *x = *y;
    *y = temp;
}

void print(int v[])
{
    int size = n;
    if (v != 0) {
    for (int i = 0; i < size; i++) {
        printf("%4d", v[i] + 1 );
    }
    printf("\n");
  }
}

int testBoard(int board[]) {
  // linhas
  for (int i = 0; i < n; i++) {
    for (int i2 = i + 1; i2 < n; i2++) {
      if ( board[i] == board[i2]) {
        return 0;
      }
    }

    // diagonais \.
    for (int i = 0; i < n; i++) {

      int count = 1;

      for (int j = i - 1; j >= 0; j--) {
        if (board[i - count] == board[i] - count) {
          return 0;
        }
        count++;
      }

      count = 1;

      for (int j = i + 1; j < n; j++) {
        if (board[i + count] == board[i] + count) {
          return 0;
        }
        count++;
      }

    }

    // diagonais /
    for (int i = 0; i < n; i++) {

      int count = 1;

      for (int j = i - 1; j >= 0; j--) {
        if (board[i - count] == board[i] + count) {
          return 0;
        }
        count++;
      }

      count = 1;

      for (int j = i + 1; j < n; j++) {
        if (board[i + count] == board[i] - count) {
          return 0;
        }
        count++;
      }

    }

  }

  return 1;
}

void permute(int v[], int n)
{
    int i;
    if (n == 1) {
        if (testBoard(v) == 1) {
          printf("Solução:");
          print(v);
        }
	}
    else {
        for (i = 0; i < n; i++) {
            permute(v, n-1);
            if (n % 2 == 1) {
                swap(&v[0], &v[n-1]);
	    }
            else {
                swap(&v[i], &v[n-1]);
            }
	}
    }
}
 
int main()
{
   printf("Tamanho do tabuleiro: ");
   scanf("%d", &n);

   int numbers[n];

   for (int i = 0 ; i < n; i++)
       numbers[i] = i;

   permute(numbers, n);
   return 0;
}
