# std::puts

Definido no cabeçalho `[<cstdio>](<#/doc/header/cstdio>)`

```c
int puts( const char *str );
```

Escreve cada caractere da string terminada em nulo `str` e um caractere de nova linha adicional '\n' para o fluxo de saída [stdout](<#/doc/io/c/std_streams>), como se executasse repetidamente [std::fputc](<#/doc/io/c/fputc>).

O caractere nulo terminador de `str` não é escrito.

### Parâmetros

- **str** — string de caracteres a ser escrita

### Valor de retorno

Em caso de sucesso, retorna um valor não negativo

Em caso de falha, retorna [EOF](<#/doc/io/c>) e define o indicador de _erro_ (veja [std::ferror](<#/doc/io/c/ferror>)) em `stdout`.

### Observações

A função `std::puts` anexa o caractere de nova linha à saída, enquanto a função [std::fputs](<#/doc/io/c/fputs>) não o faz.

Diferentes implementações retornam diferentes números não negativos: algumas retornam o último caractere escrito, algumas retornam o número de caracteres escritos (ou [INT_MAX](<#/doc/types/climits>) se a string for mais longa que isso), algumas simplesmente retornam uma constante não negativa.

Uma causa típica de falha para `std::puts` é a falta de espaço no sistema de arquivos, quando `stdout` é redirecionado para um arquivo.

### Exemplo

Execute este código
```cpp
    #include <cstdio>
    
    int main()
    {
        int rc = std::puts("Hello World");
    
        if (rc == EOF)
            std::perror("puts()"); // POSIX requires that errno is set
    }
```

Saída:
```
    Hello World
```

### Veja também

[ fputs](<#/doc/io/c/fputs>) | escreve uma string de caracteres para um fluxo de arquivo
(função)
[ printffprintfsprintfsnprintf](<#/doc/io/c/printf>)(desde C++11) | imprime saída formatada para [stdout](<#/doc/io/c/std_streams>), um fluxo de arquivo ou um buffer
(função)
[Documentação C](<#/>) para puts