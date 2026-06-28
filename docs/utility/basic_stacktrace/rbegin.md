# std::basic_stacktrace&lt;Allocator&gt;::rbegin, std::basic_stacktrace&lt;Allocator&gt;::crbegin

```cpp
const_reverse_iterator rbegin() const noexcept;  // (1) (desde C++23)
const_reverse_iterator crbegin() const noexcept;  // (2) (desde C++23)
```

  
Retorna um iterador reverso para a primeira entrada do `basic_stacktrace` invertido. Ele corresponde à última entrada do `basic_stacktrace` original. Se o `basic_stacktrace` estiver vazio, o iterador retornado é igual a rend(). 

### Parâmetros

(nenhum) 

### Valor de retorno

Iterador reverso para a primeira entrada. 

### Complexidade

Constante. 

### Exemplo

Execute este código
```
    #include <algorithm>
    #include <iostream>
    #include <stacktrace>
     
    int main()
    {
        auto trace       = std::stacktrace::current();
        auto empty_trace = std::stacktrace{};
     
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

[ rendcrend](<#/doc/utility/basic_stacktrace/rend>) |  retorna um iterador reverso para o fim   
(função membro pública)  