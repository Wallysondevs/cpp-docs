# std::flat_multiset&lt;Key,Compare,KeyContainer&gt;::end, std::flat_multiset&lt;Key,Compare,KeyContainer&gt;::cend

```cpp
iterator end() noexcept;  // (1) (desde C++23)
const_iterator end() const noexcept;  // (2) (desde C++23)
const_iterator cend() const noexcept;  // (3) (desde C++23)
```

Retorna um iterator para o elemento que segue o último elemento do `flat_multiset`.

Este elemento atua como um marcador de posição; tentar acessá-lo resulta em comportamento indefinido.

### Parâmetros

(nenhum)

### Valor de retorno

Iterator para o elemento que segue o último elemento.

### Complexidade

Constante.

### Observações

Como tanto `iterator` quanto `const_iterator` são iterators constantes (e podem, de fato, ser do mesmo tipo), não é possível modificar os elementos do container através de um iterator retornado por qualquer uma dessas funções membro.

### Exemplo

Execute este código
```cpp
    #include <algorithm>
    #include <flat_set>
    #include <iostream>
    
    int main()
    {
        std::flat_multiset<int> set{3, 1, 4, 1, 5, 9, 2, 6, 5};
        std::for_each(set.cbegin(), set.cend(), 
        {
            std::cout << x << ' ';
        });
        std::cout << '\n';
    }
```

Saída:
```
    1 1 2 3 4 5 5 6 9
```

### Veja também

[ begincbegin](<#/doc/container/flat_multiset/begin>) | retorna um iterator para o início
(função membro pública)
[ endcend](<#/doc/iterator/end>)(C++11)(C++14) | retorna um iterator para o fim de um container ou array
(modelo de função)