# std::ranges::find, std::ranges::find_if, std::ranges::find_if_not

Definido no header `[<algorithm>](<#/doc/header/algorithm>)`

```cpp
Assinatura da chamada
  // (1)
template< std::input_iterator I, std::sentinel_for<I> S,
class T, class Proj = std::identity >
requires std::indirect_binary_predicate
<ranges::equal_to, std::projected<I, Proj>, const T*>
constexpr I find( I first, S last, const T& value, Proj proj = {} );  // (desde C++20)
(ate C++26)
template< std::input_iterator I, std::sentinel_for<I> S,
class Proj = std::identity,
class T = std::projected_value_t<I, Proj> >
requires std::indirect_binary_predicate
<ranges::equal_to, std::projected<I, Proj>, const T*>
constexpr I find( I first, S last, const T& value, Proj proj = {} );  // (desde C++26)
  // (2)
template< ranges::input_range R, class T, class Proj = std::identity >
requires std::indirect_binary_predicate
<ranges::equal_to,
std::projected<ranges::iterator_t<R>, Proj>, const T*>
constexpr ranges::borrowed_iterator_t<R>
find( R&& r, const T& value, Proj proj = {} );  // (desde C++20)
(ate C++26)
template< ranges::input_range R, class Proj = std::identity,
class T = std::projected_value_t<ranges::iterator_t<R>, Proj> >
requires std::indirect_binary_predicate
<ranges::equal_to,
std::projected<ranges::iterator_t<R>, Proj>, const T*>
constexpr ranges::borrowed_iterator_t<R>
find( R&& r, const T& value, Proj proj = {} );  // (desde C++26)
template< std::input_iterator I, std::sentinel_for<I> S,
class Proj = std::identity,
std::indirect_unary_predicate<std::projected<I, Proj>> Pred >
constexpr I find_if( I first, S last, Pred pred, Proj proj = {} );  // (3) (desde C++20)
template< ranges::input_range R, class Proj = std::identity,
std::indirect_unary_predicate
<std::projected<ranges::iterator_t<R>, Proj>> Pred >
constexpr ranges::borrowed_iterator_t<R>
find_if( R&& r, Pred pred, Proj proj = {} );  // (4) (desde C++20)
template< std::input_iterator I, std::sentinel_for<I> S,
class Proj = std::identity,
std::indirect_unary_predicate<std::projected<I, Proj>> Pred >
constexpr I find_if_not( I first, S last, Pred pred, Proj proj = {} );  // (5) (desde C++20)
template< ranges::input_range R, class Proj = std::identity,
std::indirect_unary_predicate
<std::projected<ranges::iterator_t<R>, Proj>> Pred >
constexpr ranges::borrowed_iterator_t<R>
find_if_not( R&& r, Pred pred, Proj proj = {} );  // (6) (desde C++20)
```

Retorna o primeiro elemento no range `[`first`, `last`)` que satisfaz critérios específicos:

1) `find` busca por um elemento igual a value.

3) `find_if` busca por um elemento para o qual o predicate pred retorna true.

5) `find_if_not` busca por um elemento para o qual o predicate pred retorna false.

2,4,6) O mesmo que (1,3,5), mas usa r como o range de origem, como se usasse `[ranges::begin](<#/doc/ranges/begin>)(r)` como first e `[ranges::end](<#/doc/ranges/end>)(r)` como last.

As entidades tipo função descritas nesta página são `[_objetos de função de algoritmo_](<#/doc/algorithm/ranges>)` (informalmente conhecidos como _niebloids_), ou seja:

*   Listas explícitas de argumentos de template não podem ser especificadas ao chamar qualquer um deles.
*   Nenhum deles é visível para `[argument-dependent lookup](<#/doc/language/adl>)`.
*   Quando qualquer um deles é encontrado por `[normal unqualified lookup](<#/doc/language/unqualified_lookup>)` como o nome à esquerda do operador de chamada de função, `[argument-dependent lookup](<#/doc/language/adl>)` é inibido.

### Parâmetros

- **first, last** — o range de elementos a examinar
- **r** — o range dos elementos a examinar
- **value** — valor para comparar os elementos
- **pred** — predicate a aplicar aos elementos projetados
- **proj** — projection a aplicar aos elementos

### Valor de retorno

Iterator para o primeiro elemento que satisfaz a condição ou iterator igual a last se nenhum elemento for encontrado.

### Complexidade

No máximo last - first aplicações do predicate e da projection.

### Implementação possível

[find](<#/doc/algorithm/ranges/find>)
---
```cpp
    struct find_fn
    {
        template<std::input_iterator I, std::sentinel_for<I> S,
                 class Proj = std::identity,
                 class T = std::projected_value_t<I, Proj>>
        requires std::indirect_binary_predicate
                     <ranges::equal_to, std::projected<I, Proj>, const T*>
        constexpr I operator()(I first, S last, const T& value, Proj proj = {}) const
        {
            for (; first != last; ++first)
                if (std::invoke(proj, *first) == value)
                    return first;
            return first;
        }
    
        template<ranges::input_range R, class T, class Proj = std::identity>
        requires std::indirect_binary_predicate<ranges::equal_to,
                     std::projected<ranges::iterator_t<R>, Proj>, const T*>
        constexpr ranges::borrowed_iterator_t<R>
            operator()(R&& r, const T& value, Proj proj = {}) const
        {
            return (*this)(ranges::begin(r), ranges::end(r), value, std::ref(proj));
        }
    };
    
    inline constexpr find_fn find;
```

[find_if](<#/doc/algorithm/ranges/find>)
```cpp
    struct find_if_fn
    {
        template<std::input_iterator I, std::sentinel_for<I> S, class Proj = std::identity,
                 std::indirect_unary_predicate<std::projected<I, Proj>> Pred>
        constexpr I operator()(I first, S last, Pred pred, Proj proj = {}) const
        {
            for (; first != last; ++first)
                if (std::invoke(pred, std::invoke(proj, *first)))
                    return first;
            return first;
        }
    
        template<ranges::input_range R, class Proj = std::identity,
                 std::indirect_unary_predicate
                     <std::projected<ranges::iterator_t<R>, Proj>> Pred>
        constexpr ranges::borrowed_iterator_t<R>
            operator()(R&& r, Pred pred, Proj proj = {}) const
        {
            return (*this)(ranges::begin(r), ranges::end(r), std::ref(pred), std::ref(proj));
        }
    };
    
    inline constexpr find_if_fn find_if;
```

[find_if_not](<#/doc/algorithm/ranges/find>)
```cpp
    struct find_if_not_fn
    {
        template<std::input_iterator I, std::sentinel_for<I> S, class Proj = std::identity,
                 std::indirect_unary_predicate<std::projected<I, Proj>> Pred>
        constexpr I operator()(I first, S last, Pred pred, Proj proj = {}) const
        {
            for (; first != last; ++first)
                if (!std::invoke(pred, std::invoke(proj, *first)))
                    return first;
            return first;
        }
    
        template<ranges::input_range R, class Proj = std::identity,
                 std::indirect_unary_predicate
                     <std::projected<ranges::iterator_t<R>, Proj>> Pred>
        constexpr ranges::borrowed_iterator_t<R>
            operator()(R&& r, Pred pred, Proj proj = {}) const
        {
            return (*this)(ranges::begin(r), ranges::end(r), std::ref(pred), std::ref(proj));
        }
    };
    
    inline constexpr find_if_not_fn find_if_not;
```

### Notas

Macro de teste de recurso | Valor | Std | Recurso
---|---|---|---
[`__cpp_lib_algorithm_default_value_type`](<#/doc/feature_test>) | [`202403`](<#/>) | (C++26) | `[Inicialização por lista](<#/doc/language/list_initialization>)` para algoritmos ([1,2](<#/doc/algorithm/ranges/find>))

### Exemplo

Run this code
```cpp
    #include <algorithm>
    #include <cassert>
    #include <complex>
    #include <format>
    #include <iostream>
    #include <iterator>
    #include <string>
    #include <vector>
    
    void projector_example()
    {
        struct folk_info
        {
            unsigned uid;
            std::string name, position;
        };
    
        std::vector<folk_info> folks
        {
            {0, "Ana", "dev"},
            {1, "Bob", "devops"},
            {2, "Eve", "ops"}
        };
    
        const auto who{"Eve"};
        if (auto it = std::ranges::find(folks, who, &folk_info::name); it != folks.end())
            std::cout << std::format("Profile:\n"
                                     "    UID: {}\n"
                                     "    Name: {}\n"
                                     "    Position: {}\n\n",
                                     it->uid, it->name, it->position);
    }
    
    int main()
    {
        namespace ranges = std::ranges;
    
        projector_example();
    
        const int n1 = 3;
        const int n2 = 5;
        const auto v = {4, 1, 3, 2};
    
        if (ranges::find(v, n1) != v.end())
            std::cout << "v contains: " << n1 << '\n';
        else
            std::cout << "v does not contain: " << n1 << '\n';
    
        if (ranges::find(v.begin(), v.end(), n2) != v.end())
            std::cout << "v contains: " << n2 << '\n';
        else
            std::cout << "v does not contain: " << n2 << '\n';
    
        auto is_even =  { return x % 2 == 0; };
    
        if (auto result = ranges::find_if(v.begin(), v.end(), is_even); result != v.end())
            std::cout << "First even element in v: " << *result << '\n';
        else
            std::cout << "No even elements in v\n";
    
        if (auto result = ranges::find_if_not(v, is_even); result != v.end())
            std::cout << "First odd element in v: " << *result << '\n';
        else
            std::cout << "No odd elements in v\n";
    
        auto divides_13 =  { return x % 13 == 0; };
    
        if (auto result = ranges::find_if(v, divides_13); result != v.end())
            std::cout << "First element divisible by 13 in v: " << *result << '\n';
        else
            std::cout << "No elements in v are divisible by 13\n";
    
        if (auto result = ranges::find_if_not(v.begin(), v.end(), divides_13);
            result != v.end())
            std::cout << "First element indivisible by 13 in v: " << *result << '\n';
        else
            std::cout << "All elements in v are divisible by 13\n";
    
        std::vector<std::complex<double>> nums{{4, 2}};
        #ifdef __cpp_lib_algorithm_default_value_type
            // T gets deduced in (2) making list-initialization possible
            const auto it = ranges::find(nums, {4, 2});
        #else
            const auto it = ranges::find(nums, std::complex<double>{4, 2});
        #endif
        assert(it == nums.begin());
    }
```

Output:
```
    Profile:
        UID: 2
        Name: Eve
        Position: ops
    
    v contains: 3
    v does not contain: 5
    First even element in v: 4
    First odd element in v: 1
    No elements in v are divisible by 13
    First element indivisible by 13 in v: 4
```

### Veja também

[ ranges::adjacent_find](<#/doc/algorithm/ranges/adjacent_find>)(C++20) | encontra os dois primeiros itens adjacentes que são iguais (ou satisfazem um dado predicate)
(objeto de função de algoritmo)
[ ranges::find_end](<#/doc/algorithm/ranges/find_end>)(C++20) | encontra a última sequência de elementos em um determinado range
(objeto de função de algoritmo)
[ ranges::find_first_of](<#/doc/algorithm/ranges/find_first_of>)(C++20) | busca por qualquer um de um conjunto de elementos
(objeto de função de algoritmo)
[ ranges::mismatch](<#/doc/algorithm/ranges/mismatch>)(C++20) | encontra a primeira posição onde dois ranges diferem
(objeto de função de algoritmo)
[ ranges::search](<#/doc/algorithm/ranges/search>)(C++20) | busca pela primeira ocorrência de um range de elementos
(objeto de função de algoritmo)
[ findfind_iffind_if_not](<#/doc/algorithm/find>)(C++11) | encontra o primeiro elemento que satisfaz critérios específicos
(modelo de função)