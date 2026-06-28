# std::flat_multiset&lt;Key,Compare,KeyContainer&gt;::begin, std::flat_multiset&lt;Key,Compare,KeyContainer&gt;::cbegin

```cpp
iterator begin() noexcept;  // (1) (desde C++23)
const_iterator begin() const noexcept;  // (2) (desde C++23)
const_iterator cbegin() const noexcept;  // (3) (desde C++23)
```

Retorna um iterator para o primeiro elemento do `flat_multiset`.

Se o `flat_multiset` estiver vazio, o iterator retornado será igual a end().

### Parâmetros

(nenhum)

### Valor de retorno

Iterator para o primeiro elemento.

### Complexidade

Constante.

### Notas

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

[ endcend](<#/doc/container/flat_multiset/end>) | retorna um iterator para o fim
(função membro pública)
[ begincbegin](<#/doc/iterator/begin>)(C++11)(C++14) | retorna um iterator para o início de um container ou array
(template de função)