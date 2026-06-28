# std::basic_stacktrace&lt;Allocator&gt;::begin, std::basic_stacktrace&lt;Allocator&gt;::cbegin

```cpp
const_iterator begin() const noexcept;  // (1) (desde C++23)
const_iterator cbegin() const noexcept;  // (2) (desde C++23)
```

  
Retorna um iterator para a primeira entrada do `basic_stacktrace`. 

Se o `basic_stacktrace` estiver vazio, o iterator retornado é igual a end(). 

### Parâmetros

(nenhum) 

### Valor de retorno

Iterator para a primeira entrada. 

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

### Ver também

[ endcend](<#/doc/utility/basic_stacktrace/end>) |  retorna um iterator para o fim   
(função membro pública)  