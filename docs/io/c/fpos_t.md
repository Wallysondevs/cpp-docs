# std::fpos_t

Definido no cabeçalho `[<cstdio>](<#/doc/header/cstdio>)`

```c
typedef /* implementation-defined */ fpos_t;
```

`std::fpos_t` é um tipo de objeto completo não-array, que pode ser usado para armazenar (por [std::fgetpos](<#/doc/io/c/fgetpos>)) e restaurar (por [std::fsetpos](<#/doc/io/c/fsetpos>)) a posição e o estado do analisador multibyte (se houver) para um stream C.

O estado do analisador multibyte de um stream C orientado a caracteres largos é representado por um objeto [std::mbstate_t](<#/doc/string/multibyte/mbstate_t>), cujo valor é armazenado como parte do valor de um objeto `std::fpos_t` por [std::fgetpos](<#/doc/io/c/fgetpos>).

### Veja também

[ fgetpos](<#/doc/io/c/fgetpos>) | obtém o indicador de posição do arquivo
(função)
[ fsetpos](<#/doc/io/c/fsetpos>) | move o indicador de posição do arquivo para um local específico em um arquivo
(função)
[ mbstate_t](<#/doc/string/multibyte/mbstate_t>) | informações de estado de conversão necessárias para iterar strings de caracteres multibyte
(classe)
[ fpos](<#/doc/io/fpos>) | representa a posição absoluta em um stream ou um arquivo
(modelo de classe)
[documentação C](<#/>) para fpos_t