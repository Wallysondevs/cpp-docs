# std::back_insert_iterator

Definido no cabeçalho `[<iterator>](<#/doc/header/iterator>)`

```c
template< class Container >
class back_insert_iterator
: public std::iterator<std::output_iterator_tag, void, void, void, void>
template< class Container >
class back_insert_iterator;
```

`std::back_insert_iterator` é um [LegacyOutputIterator](<#/doc/named_req/OutputIterator>) que anexa elementos a um container para o qual foi construído. A função membro `push_back()` do container é chamada sempre que o iterator (seja desreferenciado ou não) recebe uma atribuição. Incrementar o `std::back_insert_iterator` é uma no-op (operação nula).

### Tipos membros

Tipo membro | Definição
---|---
`iterator_category` | [std::output_iterator_tag](<#/doc/iterator/iterator_tags>)
`value_type` | void
`difference_type` | | void | (até C++20)
[std::ptrdiff_t](<#/doc/types/ptrdiff_t>) | (desde C++20)
`pointer` | void
`reference` | void
`container_type` | `Container`
Os tipos membros `iterator_category`, `value_type`, `difference_type`, `pointer` e `reference` devem ser obtidos herdando de [std::iterator](<#/doc/iterator/iterator>)<[std::output_iterator_tag](<#/doc/iterator/iterator_tags>), void, void, void, void>. | (até C++17)

### Funções membro

[ (construtor)](<#/doc/iterator/back_insert_iterator/back_insert_iterator>) | constrói um novo `back_insert_iterator`
(função membro pública)
[ operator=](<#/>) | insere um objeto no container associado
(função membro pública)
[ operator*](<#/doc/iterator/back_insert_iterator/operator_star_>) | no-op
(função membro pública)
[ operator++operator++(int)](<#/>) | no-op
(função membro pública)

### Objetos membro

Nome do membro | Definição
---|---
`container` (protegido) | um ponteiro do tipo `Container*`

### Exemplo

Execute este código
```cpp
    #include <algorithm>
    #include <iostream>
    #include <iterator>
    #include <vector>
     
    int main()
    {
        std::vector<int> v;
     
        std::generate_n(
            std::back_insert_iterator<std::vector<int>>(v),
                // Or use std::back_inserter helper
                // Or use std::back_insert_iterator(v) C++17's syntax
            10,
            n = 0 mutable { return ++n; }
        );
     
        for (int n : v)
            std::cout << n << ' ';
        std::cout << '\n';
    }
```

Saída:
```
    1 2 3 4 5 6 7 8 9 10
```

### Veja também

[ back_inserter](<#/doc/iterator/back_inserter>) | cria um **std::back_insert_iterator** de tipo inferido a partir do argumento
(modelo de função)
[ front_insert_iterator](<#/doc/iterator/front_insert_iterator>) | adaptador de iterator para inserção no início de um container
(modelo de classe)
[ insert_iterator](<#/doc/iterator/insert_iterator>) | adaptador de iterator para inserção em um container
(modelo de classe)