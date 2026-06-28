# std::insert_iterator

Definido no cabeçalho `[<iterator>](<#/doc/header/iterator>)`

```c
template< class Container >
class insert_iterator : public std::iterator<std::output_iterator_tag,
void, void, void, void>
template< class Container >
class insert_iterator;
```

`std::insert_iterator` é um [LegacyOutputIterator](<#/doc/named_req/OutputIterator>) que insere elementos em um container para o qual foi construído, na posição apontada pelo iterator fornecido. A função membro `insert()` do container é chamada sempre que o iterator (seja desreferenciado ou não) recebe uma atribuição. Incrementar o `std::insert_iterator` é uma no-op.

### Tipos membro

Tipo membro | Definição
---|---
`iterator_category` | [std::output_iterator_tag](<#/doc/iterator/iterator_tags>)
`value_type` | void
`difference_type` | | void | (até C++20)
[std::ptrdiff_t](<#/doc/types/ptrdiff_t>) | (desde C++20)
`pointer` | void
`reference` | void
`container_type` | `Container`
Os tipos membro `iterator_category`, `value_type`, `difference_type`, `pointer` e `reference` são exigidos para serem obtidos por herança de [std::iterator](<#/doc/iterator/iterator>)<[std::output_iterator_tag](<#/doc/iterator/iterator_tags>), void, void, void, void>. | (até C++17)

### Funções membro

[ (construtor)](<#/doc/iterator/insert_iterator/insert_iterator>) | constrói um novo `insert_iterator`
(função membro pública)
[ operator=](<#/>) | insere um objeto no container associado
(função membro pública)
[ operator*](<#/doc/iterator/insert_iterator/operator_star_>) | no-op
(função membro pública)
[ operator++operator++(int)](<#/>) | no-op
(função membro pública)

### Objetos membro

Nome do membro | Definição
---|---
`container` (objeto membro protegido) | um ponteiro do tipo `Container*`
`iter` (objeto membro protegido) | um iterator do tipo `Container::iterator`(até C++20) `ranges::iterator_t<Container>`(desde C++20)

### Exemplo

Execute este código
```cpp
    #include <algorithm>
    #include <iostream>
    #include <iterator>
    #include <list>
    #include <vector>
    
    int main()
    {
        std::vector<int> v{1, 2, 3, 4, 5};
        std::list<int> l{-1, -2, -3};
        std::copy(v.begin(), v.end(), // may be simplified with std::inserter
                  std::insert_iterator<std::list<int>>(l, std::next(l.begin()))); 
        for (int n : l)
            std::cout << n << ' ';
        std::cout << '\n';
    }
```

Saída:
```
    -1 1 2 3 4 5 -2 -3
```

### Veja também

[ inserter](<#/doc/iterator/inserter>) | cria um **std::insert_iterator** de tipo inferido a partir do argumento
(modelo de função)
[ back_insert_iterator](<#/doc/iterator/back_insert_iterator>) | adaptador de iterator para inserção no final de um container
(modelo de classe)
[ front_insert_iterator](<#/doc/iterator/front_insert_iterator>) | adaptador de iterator para inserção no início de um container
(modelo de classe)