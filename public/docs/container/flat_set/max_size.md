# std::flat_set&lt;Key,Compare,KeyContainer&gt;::max_size

```cpp
size_type max_size() const noexcept;  // (desde C++23)
```

  
Retorna o número máximo de elementos que o contêiner é capaz de armazenar devido a limitações de implementação do sistema ou da biblioteca, ou seja, [std::distance](<#/doc/iterator/distance>)(begin(), end()) para o maior contêiner. 

### Parâmetros

(nenhum) 

### Valor de retorno

Número máximo de elementos. 

### Complexidade

Constante. 

### Observações

Este valor tipicamente reflete o limite teórico no tamanho do contêiner, no máximo [std::numeric_limits](<#/doc/types/numeric_limits>)<difference_type>::max(). Em tempo de execução, o tamanho do contêiner pode ser limitado a um valor menor que `max_size()` pela quantidade de RAM disponível. 

### Exemplo

Execute este código
```cpp
    #include <iostream>
    #include <flat_set>
    #include <locale>
     
    int main()
    {
        std::flat_set<char> q;
        std::cout.imbue(std::locale("en_US.UTF-8"));
        std::cout << "Maximum size of a std::flat_set is " << q.max_size() << '\n';
    }
```

Saída possível: 
```
    Maximum size of a std::flat_set is 768,614,336,404,564,650
```

### Veja também

[ size](<#/doc/container/flat_set/size>) |  retorna o número de elementos   
(função membro pública)  