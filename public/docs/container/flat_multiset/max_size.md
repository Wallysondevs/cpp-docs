# std::flat_multiset&lt;Key,Compare,KeyContainer&gt;::max_size

```cpp
size_type max_size() const noexcept;  // (desde C++23)
```

  
Retorna o número máximo de elementos que o container é capaz de armazenar devido a limitações de implementação do sistema ou da biblioteca, ou seja, [std::distance](<#/doc/iterator/distance>)(begin(), end()) para o maior container. 

### Parâmetros

(nenhum) 

### Valor de retorno

Número máximo de elementos. 

### Complexidade

Constante. 

### Notas

Este valor tipicamente reflete o limite teórico no tamanho do container, no máximo [std::numeric_limits](<#/doc/types/numeric_limits>)<difference_type>::max(). Em tempo de execução, o tamanho do container pode ser limitado a um valor menor que `max_size()` pela quantidade de RAM disponível. 

### Exemplo

Execute este código
```cpp
    #include <iostream>
    #include <flat_set>
    #include <locale>
     
    int main()
    {
        std::flat_multiset<char> q;
        std::cout.imbue(std::locale("en_US.UTF-8"));
        std::cout << "Maximum size of a std::flat_multiset is " << q.max_size() << '\n';
    }
```

Saída possível: 
```
    Maximum size of a std::flat_multiset is 768,614,336,404,564,650
```

### Veja também

[ size](<#/doc/container/flat_multiset/size>) | retorna o número de elementos   
(função membro pública)  