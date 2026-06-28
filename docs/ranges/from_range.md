# std::from_range, std::from_range_t

Definido no cabeçalho `[<ranges>](<#/doc/header/ranges>)`

```c
struct from_range_t { explicit from_range_t() = default; };
inline constexpr std::from_range_t from_range {};
```

`std::from_range` é uma tag de desambiguação que pode ser passada aos construtores dos containers adequados para indicar que o membro contido é construído a partir de um range.

O tipo correspondente `std::from_range_t` pode ser usado na lista de parâmetros do construtor para corresponder à tag pretendida.

### Biblioteca padrão

Os seguintes tipos da biblioteca padrão usam o tipo `std::from_range_t` em seus construtores:

##### Biblioteca de containers

---
[ (construtor)](<#/doc/container/vector/vector>)(desde C++23) | constrói o `vector` a partir de um range
(public member function of `std::vector<T,Allocator>`)
[ (construtor)](<#/doc/container/inplace_vector/inplace_vector>)(desde C++26) | constrói o `inplace_vector` a partir de um range
(public member function of `std::inplace_vector<T,N>`)
[ (construtor)](<#/doc/container/deque/deque>)(desde C++23) | constrói o `deque` a partir de um range
(public member function of `std::deque<T,Allocator>`)
[ (construtor)](<#/doc/container/forward_list/forward_list>)(desde C++23) | constrói o `forward_list` a partir de um range
(public member function of `std::forward_list<T,Allocator>`)
[ (construtor)](<#/doc/container/list/list>)(desde C++23) | constrói o `list` a partir de um range
(public member function of `std::list<T,Allocator>`)
[ (construtor)](<#/doc/container/set/set>)(desde C++23) | constrói o `set` a partir de um range
(public member function of `std::set<Key,Compare,Allocator>`)
[ (construtor)](<#/doc/container/map/map>)(desde C++23) | constrói o `map` a partir de um range
(public member function of `std::map<Key,T,Compare,Allocator>`)
[ (construtor)](<#/doc/container/multiset/multiset>)(desde C++23) | constrói o `multiset` a partir de um range
(public member function of `std::multiset<Key,Compare,Allocator>`)
[ (construtor)](<#/doc/container/multimap/multimap>)(desde C++23) | constrói o `multimap` a partir de um range
(public member function of `std::multimap<Key,T,Compare,Allocator>`)
[ (construtor)](<#/doc/container/unordered_set/unordered_set>)(desde C++23) | constrói o `unordered_set` a partir de um range
(public member function of `std::unordered_set<Key,Hash,KeyEqual,Allocator>`)
[ (construtor)](<#/doc/container/unordered_map/unordered_map>)(desde C++23) | constrói o `unordered_map` a partir de um range
(public member function of `std::unordered_map<Key,T,Hash,KeyEqual,Allocator>`)
[ (construtor)](<#/doc/container/unordered_multiset/unordered_multiset>)(desde C++23) | constrói o `unordered_multiset` a partir de um range
(public member function of `std::unordered_multiset<Key,Hash,KeyEqual,Allocator>`)
[ (construtor)](<#/doc/container/unordered_multimap/unordered_multimap>)(desde C++23) | constrói o `unordered_multimap` a partir de um range
(public member function of `std::unordered_multimap<Key,T,Hash,KeyEqual,Allocator>`)
[ (construtor)](<#/doc/container/priority_queue/priority_queue>)(desde C++23) | constrói o `priority_queue` a partir de um range
(public member function of `std::priority_queue<T,Container,Compare>`)
[ (construtor)](<#/doc/container/queue/queue>)(desde C++23) | constrói o `queue` a partir de um range
(public member function of `std::queue<T,Container>`)
[ (construtor)](<#/doc/container/stack/stack>)(desde C++23) | constrói o `stack` a partir de um range
(public member function of `std::stack<T,Container>`)
[ (construtor)](<#/doc/container/flat_set/flat_set>)(desde C++23) | constrói o `flat_set` a partir de um range
(public member function of `std::flat_set<Key,Compare,KeyContainer>`)
[ (construtor)](<#/doc/container/flat_map/flat_map>)(desde C++23) | constrói o `flat_map` a partir de um range
(public member function of `std::flat_map<Key,T,Compare,KeyContainer,MappedContainer>`)
[ (construtor)](<#/doc/container/flat_multiset/flat_multiset>)(desde C++23) | constrói o `flat_multiset` a partir de um range
(public member function of `std::flat_multiset<Key,Compare,KeyContainer>`)
[ (construtor)](<#/doc/container/flat_multimap/flat_multimap>)(desde C++23) | constrói o `flat_multimap` a partir de um range
(public member function of `std::flat_multimap<Key,T,Compare,KeyContainer,MappedContainer>`)

##### Biblioteca de strings

[ (construtor)](<#/doc/string/basic_string/basic_string>)(desde C++23) | constrói o `basic_string` a partir de um range
(public member function of `std::basic_string<CharT,Traits,Allocator>`)

### Notas

Macro de [teste de recurso](<#/doc/utility/feature_test>) | Valor | Padrão | Recurso
---|---|---|---
[`__cpp_lib_containers_ranges`](<#/doc/feature_test>) | [`202202L`](<#/>) | (C++23) | Construtores com tag para construir a partir de um [range compatível com container](<#/doc/ranges/to>)

### Exemplo

Execute este código
```cpp
    #include <cassert>
    #include <string>
    
    int main()
    {
    #ifdef __cpp_lib_containers_ranges
        auto const range = {0x43, 43, 43};
        std::string str{std::from_range, range}; // usa o construtor com tag
        assert(str == "C++");
    #endif
    }
```

### Veja também

[ in_placein_place_typein_place_indexin_place_tin_place_type_tin_place_index_t](<#/doc/utility/in_place>)(desde C++17) | tag de construção in-place
(tag)
[ sorted_equivalentsorted_equivalent_t](<#/doc/container/sorted_equivalent>)(desde C++23) | indica que os elementos de um range estão ordenados (unicidade não é exigida)
(tag)
[ sorted_uniquesorted_unique_t](<#/>)(desde C++23) | indica que os elementos de um range estão ordenados e são únicos
(tag)
[ ranges::to](<#/doc/ranges/to>)(desde C++23) | constrói um novo objeto não-view a partir de um range de entrada
(modelo de função)