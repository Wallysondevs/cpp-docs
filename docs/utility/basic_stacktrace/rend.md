# std::basic_stacktrace&lt;Allocator&gt;::rend, std::basic_stacktrace&lt;Allocator&gt;::crend

```cpp
const_reverse_iterator rend() const noexcept;  // (1) (desde C++23)
const_reverse_iterator crend() const noexcept;  // (2) (desde C++23)
```

Retorna um reverse iterator apontando para depois da última entrada do `basic_stacktrace` invertido. Ele corresponde ao iterator que precede a primeira entrada do `basic_stacktrace` original. Este iterator atua como um placeholder; tentar desreferenciá-lo resulta em comportamento indefinido.

### Parâmetros

(nenhum)

### Valor de retorno

O iterator final do `basic_stacktrace` invertido.

### Complexidade

Constante.

### Exemplo

Execute este código
```cpp
    #include <algorithm>
    #include <iostream>
    #include <stacktrace>
    
    int main()
    {
        auto trace       = std::stacktrace::current();
        auto empty_trace = { return std::stacktrace{}; }(); // Corrected lambda syntax for empty_trace
    
        // Print stacktrace.
        std::for_each(trace.rbegin(), trace.rend(),
                       { std::cout << f << '\n'; });
    
        if (empty_trace.rbegin() == empty_trace.rend())
            std::cout << "stacktrace 'empty_trace' is indeed empty.\n";
    }
```

Saída possível:
```
    0x0000000000402A29 in ./prog.exe
    __libc_start_main in /lib/x86_64-linux-gnu/libc.so.6
    0x0000000000402BA5 in ./prog.exe
    stacktrace 'empty_trace' is indeed empty.
```

### Veja também

[ rbegincrbegin](<#/doc/utility/basic_stacktrace/rbegin>) | retorna um reverse iterator para o início
(função membro pública)
---