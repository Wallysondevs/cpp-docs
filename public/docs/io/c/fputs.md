# std::fputs

Definido no cabeçalho `[<cstdio>](<#/doc/header/cstdio>)`

```c
int fputs( const char* str, std::FILE* stream );
```

Escreve cada caractere da string terminada em nulo `str` para o stream de saída `stream`, como se executasse repetidamente [std::fputc](<#/doc/io/c/fputc>).

O caractere nulo terminador de `str` não é escrito.

### Parâmetros

- **str** — string de caracteres terminada em nulo a ser escrita
- **stream** — stream de saída

### Valor de retorno

Em caso de sucesso, retorna um valor não negativo

Em caso de falha, retorna [EOF](<#/doc/io/c>) e define o indicador de _erro_ (veja [std::ferror](<#/doc/io/c/ferror>)) no `stream`.

### Observações

A função relacionada [std::puts](<#/doc/io/c/puts>) anexa um caractere de nova linha à saída, enquanto `std::fputs` escreve a string sem modificações.

Diferentes implementações retornam diferentes números não negativos: algumas retornam o último caractere escrito, algumas retornam o número de caracteres escritos (ou [INT_MAX](<#/doc/types/climits>) se a string for mais longa que isso), algumas simplesmente retornam uma constante não negativa, como zero.

### Exemplo

Execute este código
```
    #include <cstdio>
    
    int main(void)
    {
        int rc = std::fputs("Hello World", stdout);
    
        if (rc == EOF)
            std::perror("fputs()"); // POSIX requires that errno is set
    }
```

Saída:
```
    Hello World
```

### Veja também

[ printffprintfsprintfsnprintf](<#/doc/io/c/printf>)(C++11) | imprime saída formatada para [stdout](<#/doc/io/c/std_streams>), um stream de arquivo ou um buffer
(função)
[ puts](<#/doc/io/c/puts>) | escreve uma string de caracteres para [stdout](<#/doc/io/c/std_streams>)
(função)
[ fputws](<#/doc/io/c/fputws>) | escreve uma wide string para um stream de arquivo
(função)
[ fgets](<#/doc/io/c/fgets>) | obtém uma string de caracteres de um stream de arquivo
(função)
[documentação C](<#/>) para fputs