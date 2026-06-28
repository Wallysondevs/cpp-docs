# std::front_insert_iterator

Definido no cabeçalho `[<iterator>](<#/doc/header/iterator>)`

```c
template< class Container >
class front_insert_iterator
: public std::iterator<std::output_iterator_tag, void, void, void, void>
template< class Container >
class front_insert_iterator;
```

`std::front_insert_iterator` é um [LegacyOutputIterator](<#/doc/named_req/OutputIterator>) que adiciona elementos no início de um container para o qual foi construído. A função membro `push_front()` do container é chamada sempre que o iterator (seja desreferenciado ou não) recebe uma atribuição. Incrementar o `std::front_insert_iterator` é uma operação nula (no-op).

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
Os tipos membro `iterator_category`, `value_type`, `difference_type`, `pointer` e `reference` devem ser obtidos por herança de [std::iterator](<#/doc/iterator/iterator>)<[std::output_iterator_tag](<#/doc/iterator/iterator_tags>), void, void, void, void>. | (até C++17)

### Funções membro

[ (construtor)](<#/doc/iterator/front_insert_iterator/front_insert_iterator>) | constrói um novo `front_insert_iterator`
(função membro pública)
[ operator=](<#/>) | insere um objeto no container associado
(função membro pública)
[ operator*](<#/doc/iterator/front_insert_iterator/operator_star_>) | operação nula
(função membro pública)
[ operator++operator++(int)](<#/>) | operação nula
(função membro pública)

### Objetos membro

Nome do membro | Definição
---|---
`container` (protegido) | um ponteiro do tipo Container*

### Exemplo

Execute este código
```cpp
    #include <algorithm>
    #include <deque>
    #include <iostream>
    #include <iterator>
    #include <vector>
    
    namespace stb
    {
        void println(auto, auto const& d)
        {
            std::ranges::copy(d, std::ostream_iterator<int>(std::cout, " "));
            std::cout << '\n';
        }
    }
    
    int main()
    {
        std::vector<int> v{1, 2, 3, 4, 5};
        std::deque<int> d;
    
        std::copy(v.begin(), v.end(),
                  std::front_insert_iterator<std::deque<int>>(d));
                  // or std::front_inserter(d)
    
        stb::println("{}", d);
    }
```

Saída:
```
    5 4 3 2 1
```

### Veja também

[ front_inserter](<#/doc/iterator/front_inserter>) | cria um **std::front_insert_iterator** de tipo inferido a partir do argumento
(modelo de função)
[ back_insert_iterator](<#/doc/iterator/back_insert_iterator>) | adaptador de iterator para inserção no final de um container
(modelo de classe)
[ insert_iterator](<#/doc/iterator/insert_iterator>) | adaptador de iterator para inserção em um container
(modelo de classe)