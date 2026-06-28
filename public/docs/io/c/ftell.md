# std::ftell

Definido no cabeçalho `[<cstdio>](<#/doc/header/cstdio>)`

```c
long ftell( std::FILE* stream );
```

Retorna o valor atual do indicador de posição do arquivo para o stream de arquivo `stream`.

Se o stream estiver aberto em modo binário, o valor obtido por esta função é o número de bytes desde o início do arquivo.

Se o stream estiver aberto em modo texto, o valor retornado por esta função é não especificado e só é significativo como entrada para [std::fseek](<#/doc/io/c/fseek>).

### Parâmetros

- **stream** — stream de arquivo a ser examinado

### Valor de retorno

Indicador de posição do arquivo em caso de sucesso ou -1L se ocorrer falha. Também define [errno](<#/doc/error/errno>) em caso de falha.

### Notas

No Windows, [`_ftelli64`](<https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/ftell-ftelli64>) pode ser usado para trabalhar com arquivos maiores que 2 GiB.

### Exemplo

Demonstra `std::ftell()` com verificação de erros. Escreve e depois lê alguns valores de ponto flutuante (FP) de/para um arquivo.

Execute este código
```
    #include <cstdio>
    #include <cstdlib>
    #include <iostream>
     
    // Se a condição não for atendida, encerra o programa com mensagem de erro.
    void check(bool condition, const char* func, int line)
    {
        if (condition)
            return;
        std::perror(func);
        std::cerr << func << " failed in file " << __FILE__ << " at line # " << line - 1
                  << '\n';
        std::exit(EXIT_FAILURE);
    }
     
    int main()
    {
        // Prepara um array de valores FP.
        constexpr int SIZE {5};
        double A[SIZE] = {1.1, 2.2, 3.3, 4.4, 5.5};
     
        // Escreve o array em um arquivo.
        const char* fname = "/tmp/test.bin";
        FILE* file = std::fopen(fname, "wb");
        check(file != NULL, "fopen()", __LINE__);
     
        const int write_count = std::fwrite(A, sizeof(double), SIZE, file);
        check(write_count == SIZE, "fwrite()", __LINE__);
     
        std::fclose(file);
     
        // Lê os valores FP para o array B.
        double B[SIZE];
        file = std::fopen(fname, "rb");
        check(file != NULL, "fopen()", __LINE__);
     
        long pos = std::ftell(file); // indicador de posição no início do arquivo
        check(pos != -1L, "ftell()", __LINE__);
        std::cout << "pos: " << pos << '\n';
     
        const int read_count = std::fread(B, sizeof(double), 1, file); // lê um valor FP
        check(read_count == 1, "fread()", __LINE__);
     
        pos = std::ftell(file); // indicador de posição após ler um valor FP
        check(pos != -1L, "ftell()", __LINE__);
        std::cout << "pos: " << pos << '\n';
        std::cout << "B[0]: " << B[0] << '\n'; // imprime um valor FP
     
        return EXIT_SUCCESS;
    }
```

Saída possível:
```
    pos: 0
    pos: 8
    B[0]: 1.1
```

### Veja também

[ fgetpos](<#/doc/io/c/fgetpos>) | obtém o indicador de posição do arquivo
(função)
[ fseek](<#/doc/io/c/fseek>) | move o indicador de posição do arquivo para um local específico em um arquivo
(função)
[ fsetpos](<#/doc/io/c/fsetpos>) | move o indicador de posição do arquivo para um local específico em um arquivo
(função)
[ tellg](<#/doc/io/basic_istream/tellg>) | retorna o indicador de posição de entrada
(função membro pública de `std::basic_istream<CharT,Traits>`)
[ tellp](<#/doc/io/basic_ostream/tellp>) | retorna o indicador de posição de saída
(função membro pública de `std::basic_ostream<CharT,Traits>`)
[Documentação C](<#/>) para ftell