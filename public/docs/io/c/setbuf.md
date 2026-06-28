# std::setbuf

Definido no cabeçalho `[<cstdio>](<#/doc/header/cstdio>)`

```c
void setbuf( std::FILE* stream, char* buffer );
```

Define o buffer interno a ser usado para operações de E/S realizadas no stream C stream.

Se buffer não for nulo, equivalente a [std::setvbuf](<#/doc/io/c/setvbuf>)(stream, buffer, [_IOFBF](<#/doc/io/c>), [BUFSIZ](<#/doc/io/c>)).

Se buffer for nulo, equivalente a [std::setvbuf](<#/doc/io/c/setvbuf>)(stream, nullptr, [_IONBF](<#/doc/io/c>), 0), o que desativa o buffering.

### Parâmetros

- **stream** — o stream de arquivo para o qual definir o buffer
- **buffer** — ponteiro para um buffer para o stream usar. Se um ponteiro nulo for fornecido, o buffering é desativado. Se não for nulo, deve ser capaz de armazenar pelo menos `BUFSIZ` caracteres

### Valor de retorno

(nenhum)

### Notas

Se [BUFSIZ](<#/doc/io/c>) não for o tamanho de buffer apropriado, [std::setvbuf](<#/doc/io/c/setvbuf>) pode ser usado para alterá-lo.

[std::setvbuf](<#/doc/io/c/setvbuf>) também deve ser usado para detectar erros, já que `std::setbuf` não indica sucesso ou falha.

Esta função só pode ser usada depois que o stream for associado a um arquivo aberto, mas antes de qualquer outra operação (além de uma chamada falha para `std::setbuf`/[std::setvbuf](<#/doc/io/c/setvbuf>)).

Um erro comum é definir o buffer de [stdin](<#/doc/io/c/std_streams>) ou [stdout](<#/doc/io/c/std_streams>) para um array cuja vida útil termina antes que o programa seja encerrado:
```cpp
    int main()
    {
        char buf[BUFSIZ];
        std::setbuf(stdin, buf);
    } // vida útil de buf termina, comportamento indefinido
```

### Exemplo

`std::setbuf` pode ser usado para desativar o buffering em streams que exigem saída imediata.

Execute este código
```cpp
    #include <chrono>
    #include <cstdio>
    #include <thread>
    
    int main()
    {
        using namespace std::chrono_literals;
    
        std::setbuf(stdout, nullptr); // unbuffered stdout
        std::putchar('a'); // aparece imediatamente em stream sem buffer
        std::this_thread::sleep_for(1s);
        std::putchar('b');
    }
```

Saída:
```
    ab
```

### Veja também

[ setvbuf](<#/doc/io/c/setvbuf>) | define o buffer e seu tamanho para um stream de arquivo
(função)
[Documentação C](<#/>) para setbuf