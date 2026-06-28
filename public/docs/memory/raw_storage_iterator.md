# std::raw_storage_iterator

Definido no cabeçalho `[<memory>](<#/doc/header/memory>)`

```c
template< class OutputIt, class T >
class raw_storage_iterator
: public std::iterator<std::output_iterator_tag, void, void, void, void>;
template< class OutputIt, class T >
class raw_storage_iterator;
(obsoleto em C++17)
(removido em C++20)
```

O output iterator `std::raw_storage_iterator` possibilita que algoritmos padrão armazenem resultados em memória não inicializada. Sempre que o algoritmo escreve um objeto do tipo `T` no iterador desreferenciado, o objeto é construído por cópia no local do armazenamento não inicializado apontado pelo iterador. O parâmetro de template `OutputIt` é qualquer tipo que atenda aos requisitos de [LegacyOutputIterator](<#/doc/named_req/OutputIterator>) e tenha o operator* definido para retornar um objeto, para o qual o operator& retorna um objeto do tipo `T*`. Geralmente, o tipo `T*` é usado como `OutputIt`.

### Requisitos de tipo

-`OutputIt` deve atender aos requisitos de [LegacyOutputIterator](<#/doc/named_req/OutputIterator>).
---

### Funções membro

[ (construtor)](<#/doc/memory/raw_storage_iterator/raw_storage_iterator>) | cria um novo `raw_storage_iterator`
(função membro pública)
[ operator=](<#/>) | constrói um objeto no local apontado no buffer
(função membro pública)
[ operator*](<#/doc/memory/raw_storage_iterator/operator_star_>) | desreferencia o iterador
(função membro pública)
[ operator++operator++(int)](<#/doc/memory/raw_storage_iterator/operator_arith>) | avança o iterador
(função membro pública)
[ base](<#/doc/memory/raw_storage_iterator/base>)(desde C++17) | fornece acesso ao iterador encapsulado
(função membro pública)

### Tipos membro

Tipo membro | Definição
---|---
`iterator_category` | [std::output_iterator_tag](<#/doc/iterator/iterator_tags>)
`value_type` | void
`difference_type` | | void | (até C++20)
[std::ptrdiff_t](<#/doc/types/ptrdiff_t>) | (desde C++20)
`pointer` | void
`reference` | void
Os tipos membro `iterator_category`, `value_type`, `difference_type`, `pointer` e `reference` devem ser obtidos por herança de [std::iterator](<#/doc/iterator/iterator>)<[std::output_iterator_tag](<#/doc/iterator/iterator_tags>), void, void, void, void>. | (até C++17)

### Nota

`std::raw_storage_iterator` foi descontinuado principalmente devido ao seu comportamento inseguro em relação a exceções. Ao contrário de [std::uninitialized_copy](<#/doc/memory/uninitialized_copy>), ele não lida com exceções de forma segura durante operações como [std::copy](<#/doc/algorithm/copy>), podendo levar a vazamentos de recursos devido à falta de rastreamento do número de objetos construídos com sucesso e sua destruição adequada na presença de exceções.

### Exemplo

Execute este código
```cpp
    #include <algorithm>
    #include <iostream>
    #include <memory>
    #include <string>
    
    int main()
    {
        const std::string s[] = {"This", "is", "a", "test", "."};
        std::string* p = std::allocator<std::string>().allocate(5);
    
        std::copy(std::begin(s), std::end(s),
                  std::raw_storage_iterator<std::string*, std::string>(p));
    
        for (std::string* i = p; i != p + 5; ++i)
        {
            std::cout << *i << '\n';
            i->~basic_string<char>();
        }
        std::allocator<std::string>().deallocate(p, 5);
    }
```

Saída:
```
    This
    is
    a
    test
    .
```

### Veja também

[ allocator_traits](<#/doc/memory/allocator_traits>)(C++11) | fornece informações sobre tipos de alocadores
(modelo de classe)
[ scoped_allocator_adaptor](<#/doc/memory/scoped_allocator_adaptor>)(C++11) | implementa alocador multinível para contêineres multinível
(modelo de classe)
[ uses_allocator](<#/doc/memory/uses_allocator>)(C++11) | verifica se o tipo especificado suporta construção com alocador
(modelo de classe)