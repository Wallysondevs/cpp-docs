# std::operator&lt;&lt;(std::stacktrace_entry)

Definido no cabeçalho `[<stacktrace>](<#/doc/header/stacktrace>)`

```c
std::ostream& operator<<( std::ostream& os, const std::stacktrace_entry& f );
```

Insere a descrição de f no fluxo de saída os. Equivalente a return os << [std::to_string](<#/doc/string/basic_string/to_string>)(f);.

### Parâmetros

- **os** — um fluxo de saída
- **f** — um `stacktrace_entry` cuja descrição deve ser inserida

### Valor de retorno

os

### Exceções

Pode lançar exceções definidas pela implementação.

### Exemplo

Execute este código
```
    #include <iostream>
    #include <stacktrace>
    
    int main()
    {
        for (const auto& f : std::stacktrace::current())
            std::cout << f << '\n';
    }
```

Saída possível:
```
    0x0000000000402AA7 in ./prog.exe
    __libc_start_main in /lib/x86_64-linux-gnu/libc.so.6
    0x00000000004029B9 in ./prog.exe
```

### Veja também

[ operator<<](<#/doc/utility/basic_stacktrace/operator_ltlt>)(C++23) | realiza a saída de fluxo de `basic_stracktrace`
(modelo de função)