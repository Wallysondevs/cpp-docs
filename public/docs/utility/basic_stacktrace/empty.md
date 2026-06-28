# std::basic_stacktrace&lt;Allocator&gt;::empty

```cpp
bool empty() const noexcept;  // (desde C++23)
```

  
Verifica se o stacktrace não possui entradas de stacktrace.

### Parâmetros

(nenhum)

### Valor de retorno

true se o stacktrace estiver vazio, false caso contrário.

### Complexidade

Constante.

### Exemplo

Execute este código
```cpp
    #include <stacktrace>
    #include <iostream>
     
    int main()
    {
        std::cout << std::boolalpha;
        std::stacktrace bktr;
        std::cout << "Initially, bktr.empty(): " << bktr.empty() << '\n';
     
        bktr = std::stacktrace::current();
        std::cout << "After getting entries, bktr.empty(): " << bktr.empty() << '\n';
    }
```

Saída possível:
```
    Initially, bktr.empty(): true
    After getting entries, bktr.empty(): false
```

### Veja também

[ size](<#/doc/utility/basic_stacktrace/size>) | retorna o número de entradas do stacktrace   
(função membro pública)  