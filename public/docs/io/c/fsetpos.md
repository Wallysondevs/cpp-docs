# std::fsetpos

Definido no cabeçalho `[<cstdio>](<#/doc/header/cstdio>)`

```c
int fsetpos( std::FILE* stream, const std::fpos_t* pos );
```

Define o indicador de posição do arquivo e o estado de análise multibyte (se houver) para o stream de arquivo C `stream` de acordo com o valor apontado por `pos`.

Além de estabelecer um novo estado de análise e posição, uma chamada a esta função desfaz os efeitos de [std::ungetc](<#/doc/io/c/ungetc>) e limpa o estado de fim de arquivo, se estiver definido.

Se ocorrer um erro de leitura ou escrita, o indicador de erro ([std::ferror](<#/doc/io/c/ferror>)) para o stream é definido.

### Parâmetros

- **stream** — stream de arquivo a ser modificado
- **pos** — ponteiro para um objeto fpos_t obtido de [std::fgetpos](<#/doc/io/c/fgetpos>) chamado em um stream associado ao mesmo arquivo

### Valor de retorno

`0` em caso de sucesso, valor diferente de zero caso contrário. Além disso, define [errno](<#/doc/error/errno>) em caso de falha.

### Observações

Após buscar uma posição que não seja o fim em um stream largo (wide stream), a próxima chamada a qualquer função de saída pode tornar o restante do arquivo indefinido, por exemplo, ao gerar uma sequência multibyte de um comprimento diferente.

### Exemplo

Execute este código
```cpp
    #include <cstdio>
    #include <cstdlib>
     
    int main()
    {
        // Prepare an array of floating-point values.
        const int SIZE = 5;
        double A[SIZE] = {1., 2., 3., 4., 5.};
        // Write array to a file.
        std::FILE * fp = std::fopen("test.bin", "wb");
        std::fwrite(A, sizeof(double), SIZE, fp);
        std::fclose(fp);
     
        // Read the values into array B.
        double B[SIZE];
        fp = std::fopen("test.bin", "rb");
        std::fpos_t pos;
        if (std::fgetpos(fp, &pos) != 0)      // current position: start of file
        {
           std::perror("fgetpos()");
           std::fprintf(stderr, "fgetpos() failed in file %s at line # %d\n",
                        __FILE__, __LINE__-3);
           std::exit(EXIT_FAILURE);
        }
     
        int ret_code = std::fread(B, sizeof(double), 1, fp);      // read one value
        // current position: after reading one value
        std::printf("%.1f; read count = %d\n", B[0], ret_code);   // print one value and ret_code
     
        if (std::fsetpos(fp, &pos) != 0)   // reset current position to start of file
        {
           if (std::ferror(fp))
           {
              std::perror("fsetpos()");
              std::fprintf(stderr, "fsetpos() failed in file %s at line # %d\n",
                           __FILE__, __LINE__-5);
              std::exit(EXIT_FAILURE);
           }
        }
     
        ret_code = std::fread(B, sizeof(double), 1, fp);         // re-read first value
        std::printf("%.1f; read count = %d\n", B[0], ret_code);  // print one value and ret_code
        std::fclose(fp);
     
        return EXIT_SUCCESS; 
    }
```

Saída:
```
    1.0; read count = 1
    1.0; read count = 1
```

### Veja também

[ fgetpos](<#/doc/io/c/fgetpos>) | obtém o indicador de posição do arquivo
(função)
[ ftell](<#/doc/io/c/ftell>) | retorna o indicador de posição atual do arquivo
(função)
[ fseek](<#/doc/io/c/fseek>) | move o indicador de posição do arquivo para um local específico em um arquivo
(função)
[Documentação C](<#/>) para fsetpos