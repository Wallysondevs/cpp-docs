# std::span&lt;T,Extent&gt;::empty

```cpp
constexpr bool empty() const noexcept;  // (desde C++20)
```

  
Verifica se o span está vazio. 

### Parâmetros

(nenhum) 

### Valor de retorno

true se o span estiver vazio (ou seja, size() == 0); false caso contrário. 

### Exemplo

Execute este código
```cpp 
    #include <iomanip>
    #include <iostream>
    #<span>
     
    int main()
    {
        std::span<const char> span{"ABCDEF"};
     
        while (!span.empty())
        {
            std::cout << std::quoted(span.data()) << '\n';
            span = span.last(span.size() - 1);
        }
    }
```

Saída: 
```
    "ABCDEF"
    "BCDEF"
    "CDEF"
    "DEF"
    "EF"
    "F"
    ""
```

### Veja também

[ size](<#/doc/container/span/size>)(C++20) |  retorna o número de elementos na sequência   
(função membro pública)  