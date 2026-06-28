# std::unordered_map&lt;Key,T,Hash,KeyEqual,Allocator&gt;::max_size

```cpp
size_type max_size() const noexcept;  // (desde C++11)
```

  
Retorna o número máximo de elementos que o container é capaz de armazenar devido a limitações de implementação do sistema ou da biblioteca, ou seja, [std::distance](<#/doc/iterator/distance>)(begin(), end()) para o maior container. 

### Parâmetros

(nenhum) 

### Valor de retorno

Número máximo de elementos. 

### Complexidade

Constante. 

### Observações

Este valor tipicamente reflete o limite teórico no tamanho do container, no máximo [std::numeric_limits](<#/doc/types/numeric_limits>)<difference_type>::max(). Em tempo de execução, o tamanho do container pode ser limitado a um valor menor que `max_size()` pela quantidade de RAM disponível. 

### Exemplo

Execute este código
```cpp
    #include <iostream>
    #include <locale>
    #include <unordered_map>
    
    int main()
    {
        std::unordered_map<char, char> p;
        std::unordered_map<long, char> q;
    
        std::cout.imbue(std::locale("en_US.UTF-8"));
        std::cout << std::uppercase
                  << "p.max_size() = " << std::dec << p.max_size() << " = 0x"
                  << std::hex << p.max_size() << '\n'
                  << "q.max_size() = " << std::dec << q.max_size() << " = 0x"
                  << std::hex << q.max_size() << '\n';
    }
```

Saída possível: 
```
    p.max_size() = 1,152,921,504,606,846,975 = 0xFFF,FFF,FFF,FFF,FFF
    q.max_size() = 768,614,336,404,564,650 = 0xAAA,AAA,AAA,AAA,AAA
```

### Veja também

[ size](<#/doc/container/unordered_map/size>) | retorna o número de elementos   
(função membro pública)  