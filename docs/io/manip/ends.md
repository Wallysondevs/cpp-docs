# std::ends

Definido no cabeçalho `[<ostream>](<#/doc/header/ostream>)`

```c
template< class CharT, class Traits >
std::basic_ostream<CharT, Traits>& ends( std::basic_ostream<CharT, Traits>& os );
```

Insere um caractere nulo na sequência de saída `os` como se chamasse `os.put(CharT())`.

Este é um manipulador de E/S (entrada/saída) somente de saída, ele pode ser chamado com uma expressão como `out << std::ends` para qualquer `out` do tipo [std::basic_ostream](<#/doc/io/basic_ostream>).

### Notas

Este manipulador é tipicamente usado com [std::ostrstream](<#/doc/io/ostrstream>), quando o buffer de saída associado precisa ser terminado em nulo para ser processado como uma string C.

Ao contrário de [std::endl](<#/doc/io/manip/endl>), este manipulador não descarrega (flush) o stream.

### Parâmetros

- **os** — referência para stream de saída

### Valor de retorno

`os` (referência para o stream após a inserção do caractere nulo).

### Exemplo

Execute este código
```cpp
    #include <cstdio>
    #include <strstream>
     
    int main()
    {
        std::ostrstream oss;
        oss << "Sample text: " << 42 << std::ends;
        std::printf("%s\n", oss.str());
        oss.freeze(false); // enable memory deallocation
    }
```

Saída:
```
    Sample text: 42
```

### Veja também

[ ostrstream](<#/doc/io/ostrstream>)(obsoleto em C++98)(removido em C++26) | implementa operações de saída de array de caracteres
---|---
(classe) |