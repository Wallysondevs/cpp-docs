# std::iterator

Definido no cabeçalho `[<iterator>](<#/doc/header/iterator>)`

```c
template<
class Category,
class T,
class Distance = std::ptrdiff_t,
class Pointer = T*,
class Reference = T&
> struct iterator;
```

`std::iterator` é a classe base fornecida para simplificar as definições dos tipos necessários para iteradores.

### Parâmetros de template

- **Category** — a categoria do iterator. Deve ser uma das [tags de categoria de iterator](<#/doc/iterator/iterator_tags>).
- **T** — o tipo dos valores que podem ser obtidos ao desreferenciar o iterator. Este tipo deve ser `void` para iteradores de saída.
- **Distance** — um tipo que pode ser usado para identificar a distância entre iteradores
- **Pointer** — define um ponteiro para o tipo iterado (`T`)
- **Reference** — define uma referência para o tipo iterado (`T`)

### Tipos de membro

Tipo de membro | Definição
---|---
`iterator_category` | `Category`
`value_type` | `T`
`difference_type` | `Distance`
`pointer` | `Pointer`
`reference` | `Reference`

### Exemplo

O exemplo a seguir mostra como implementar um [input iterator](<#/doc/named_req/InputIterator>) herdando de std::iterator

Run this code
```
    #include <algorithm>
    #include <iostream>
     
    template<long FROM, long TO>
    class Range
    {
    public:
        // member typedefs provided through inheriting from std::iterator
        class iterator : public std::iterator<
                                    std::input_iterator_tag, // iterator_category
                                    long,                    // value_type
                                    long,                    // difference_type
                                    const long*,             // pointer
                                    long                     // reference
                                > {
            long num = FROM;
        public:
            explicit iterator(long _num = 0) : num(_num) {}
            iterator& operator++() { num = TO >= FROM ? num + 1: num - 1; return *this; }
            iterator operator++(int) { iterator retval = *this; ++(*this); return retval; }
            bool operator==(iterator other) const { return num == other.num; }
            bool operator!=(iterator other) const { return !(*this == other); }
            reference operator*() const { return num; }
        };
        iterator begin() { return iterator(FROM); }
        iterator end() { return iterator(TO >= FROM? TO + 1 : TO - 1); }
    };
     
    int main()
    {
        // std::find requires an input iterator
        auto range = Range<15, 25>();
        auto itr = std::find(range.begin(), range.end(), 18);
        std::cout << *itr << '\n'; // 18
     
        // Range::iterator also satisfies range-based for requirements
        for (long l : Range<3, 5>())
            std::cout << l << ' '; // 3 4 5
        std::cout << '\n';
    }
```

Output:
```
    18
    3 4 5
```

### Veja também

[ iterator_traits](<#/doc/iterator/iterator_traits>) | fornece uma interface uniforme para as propriedades de um iterator
(modelo de classe)
[ input_iterator_tagoutput_iterator_tagforward_iterator_tagbidirectional_iterator_tagrandom_access_iterator_tagcontiguous_iterator_tag](<#/doc/iterator/iterator_tags>)(C++20) | tipos de classe vazios usados para indicar categorias de iterator
(classe)