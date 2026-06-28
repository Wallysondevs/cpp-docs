# std::set&lt;Key,Compare,Allocator&gt;::end, std::set&lt;Key,Compare,Allocator&gt;::cend

```cpp
iterator end(); |  (1)  |  (noexcept desde C++11)
const_iterator end() const; |  (2)  |  (noexcept desde C++11)
const_iterator cend() const noexcept;  // (3) (desde C++11)
```

  
Retorna um iterator para o elemento que segue o último elemento do `set`. 

Este elemento atua como um marcador de posição; tentar acessá-lo resulta em comportamento indefinido. 

### Parâmetros

(nenhum) 

### Valor de retorno

Iterator para o elemento que segue o último elemento. 

### Complexidade

Constante. 

### Observações

Como tanto `iterator` quanto `const_iterator` são iterators constantes (e podem, de fato, ser do mesmo tipo), não é possível modificar os elementos do container através de um iterator retornado por qualquer uma dessas funções membro. 

libc++ faz o backport de `cend()` para o modo C++98.

### Exemplo

Execute este código
```
    #include <algorithm>
    #include <iostream>
    #include <set>
     
    int main()
    {
        std::set<int> set{3, 1, 4, 1, 5, 9, 2, 6, 5};
        std::for_each(set.cbegin(), set.cend(), 
        {
            std::cout << x << ' ';
        });
        std::cout << '\n';
    }
```

Saída: 
```
    1 2 3 4 5 6 9
```

### Veja também

[ begincbegin](<#/doc/container/set/begin>)(desde C++11) | retorna um iterator para o início   
(função membro pública)  
[ endcend](<#/doc/iterator/end>)(desde C++11)(desde C++14) | retorna um iterator para o fim de um container ou array   
(modelo de função)