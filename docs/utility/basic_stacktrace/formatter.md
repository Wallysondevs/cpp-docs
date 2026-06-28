# std::formatter&lt;std::basic_stacktrace&gt;

Definido no cabeçalho `[<stacktrace>](<#/doc/header/stacktrace>)`

```c
template< class Allocator >
struct formatter<std::basic_stacktrace<Allocator>>;
```

A especialização de template de [std::formatter](<#/doc/utility/format/formatter>) para std::basic_stacktrace<Allocator> permite aos usuários converter um objeto stacktrace para string usando [funções de formatação](<#/doc/utility/format>) como [std::format](<#/doc/utility/format/format>).

Nenhum especificador de formato é permitido.

Um objeto stacktrace s é formatado como se fosse pela cópia de [`std::to_string`](<#/doc/utility/basic_stacktrace/to_string>)(s) para a saída.

### Exemplo

Execute este código
```
    #include <format>
    #include <iostream>
    #include <stacktrace>
     
    int main()
    {
        auto trace = std::stacktrace::current();
        std::cout << std::format("{}\n", trace);
    }
```

Saída possível:
```
     0# 0x0000000000402D97 in ./prog.exe
     1# __libc_start_main in /lib/x86_64-linux-gnu/libc.so.6
     2# 0x0000000000402CA9 in ./prog.exe
```

### Veja também

[ formatter](<#/doc/utility/format/formatter>)(C++20) | define regras de formatação para um dado tipo
(modelo de classe)
[ print](<#/doc/io/print>)(C++23) | imprime para [stdout](<#/doc/io/c/std_streams>) ou um stream de arquivo usando representação [formatada](<#/doc/utility/format>) dos argumentos
(modelo de função)