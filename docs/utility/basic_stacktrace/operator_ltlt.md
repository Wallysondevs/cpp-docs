# std::operator&lt;&lt;(std::basic_stacktrace)

Definido no cabeçalho `[<stacktrace>](<#/doc/header/stacktrace>)`

```c
template< class Allocator >
std::ostream& operator<<( std::ostream& os, const std::basic_stacktrace<Allocator>& st );
```

Insere a descrição de `st` no stream de saída `os`. Equivalente a return os << [std::to_string](<#/doc/string/basic_string/to_string>)(st);.

### Parâmetros

- **os** — um stream de saída
- **st** — um `basic_stacktrace` cuja descrição deve ser inserida

### Valor de retorno

`os`.

### Exceções

Pode lançar exceções definidas pela implementação.

### Exemplo

Execute este código
```
    #include <stacktrace>
    #include <iostream>
    
    int main()
    {
        std::cout << "The stacktrace obtained in the main function:\n";
        std::cout << std::stacktrace::current() << '\n';
        []{
            std::cout << "The stacktrace obtained in a nested lambda:\n";
            std::cout << std::stacktrace::current() << '\n';
        }();
    }
```

Saída possível:
```
    The stacktrace obtained in the main function:
     0# 0x0000000000402E7B in ./prog.exe
     1# __libc_start_main in /lib/x86_64-linux-gnu/libc.so.6
     2# 0x0000000000402CD9 in ./prog.exe
    
    The stacktrace obtained in a nested lambda:
     0# 0x0000000000402DDA in ./prog.exe
     1# 0x0000000000402EB2 in ./prog.exe
     2# __libc_start_main in /lib/x86_64-linux-gnu/libc.so.6
     3# 0x0000000000402CD9 in ./prog.exe
```

### Veja também

[ operator<<](<#/doc/utility/stacktrace_entry/operator_ltlt>)(C++23) | realiza a saída de stream de `stacktrace_entry`
(modelo de função)