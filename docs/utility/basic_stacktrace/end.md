# std::basic_stacktrace&lt;Allocator&gt;::end, std::basic_stacktrace&lt;Allocator&gt;::cend

```cpp
const_iterator end() const noexcept;  // (1) (desde C++23)
const_iterator cend() const noexcept;  // (2) (desde C++23)
```

  
Retorna o iterador apontando para depois da última entrada do `basic_stacktrace`. 

Este iterador atua como um marcador de posição; tentar desreferenciá-lo resulta em comportamento indefinido. 

### Parâmetros

(nenhum) 

### Valor de retorno

O iterador de fim. 

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
        auto empty_trace = std::stacktrace{};
     
        // Print stacktrace.
        std::for_each(trace.begin(), trace.end(),
                       { std::cout << f << '\n'; });
     
        if (empty_trace.begin() == empty_trace.end())
            std::cout << "stacktrace 'empty_trace' is indeed empty.\n";
    }
```

Saída possível: 
```
    0x0000000000402BA8 in ./prog.exe
    __libc_start_main in /lib/x86_64-linux-gnu/libc.so.6
    0x0000000000402A29 in ./prog.exe
    stacktrace 'empty_trace' is indeed empty.
```

### Veja também

[ begincbegin](<#/doc/utility/basic_stacktrace/begin>) | retorna um iterador para o início   
(função membro pública)  