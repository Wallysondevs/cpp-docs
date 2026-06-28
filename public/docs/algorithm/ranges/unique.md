# std::ranges::unique

Definido no cabeçalho `[<algorithm>](<#/doc/header/algorithm>)`

```c
Call signature
template< std::permutable I, std::sentinel_for<I> S, class Proj = std::identity,
std::indirect_equivalence_relation<std::projected<I, Proj>>
C = ranges::equal_to >
constexpr ranges::subrange<I>
unique( I first, S last, C comp = {}, Proj proj = {} );
template< ranges::forward_range R, class Proj = std::identity,
std::indirect_equivalence_relation<std::projected<ranges::iterator_t<R>, Proj>>
C = ranges::equal_to >
requires std::permutable<ranges::iterator_t<R>>
constexpr ranges::borrowed_subrange_t<R>
unique( R&& r, C comp = {}, Proj proj = {} );
```

1) Elimina todos, exceto o primeiro elemento, de cada grupo consecutivo de elementos equivalentes do range `[`first`, `last`)` e retorna um subrange `[`ret`, `last`)`, onde `ret` é um iterator past-the-end para o novo final do range.

Dois elementos consecutivos `*(i - 1)` e `*i` são considerados equivalentes se [std::invoke](<#/doc/utility/functional/invoke>)(comp, [std::invoke](<#/doc/utility/functional/invoke>)(proj, *(i - 1)), [std::invoke](<#/doc/utility/functional/invoke>)(proj, *i)) == true, onde `i` é um iterator no range `[`first + 1`, `last`)`.

2) O mesmo que (1), mas usa `r` como o range, como se usasse [ranges::begin](<#/doc/ranges/begin>)(r) como `first`, e [ranges::end](<#/doc/ranges/end>)(r) como `last`.

As entidades tipo função descritas nesta página são [_objetos de função de algoritmo_](<#/doc/algorithm/ranges>) (informalmente conhecidos como _niebloids_), ou seja:

*   Listas explícitas de argumentos template não podem ser especificadas ao chamar qualquer um deles.
*   Nenhum deles é visível para [argument-dependent lookup](<#/doc/language/adl>).
*   Quando qualquer um deles é encontrado por [normal unqualified lookup](<#/doc/language/unqualified_lookup>) como o nome à esquerda do operador de chamada de função, [argument-dependent lookup](<#/doc/language/adl>) é inibido.

### Parâmetros

- **first, last** — o range de elementos a processar
- **r** — o range de elementos a processar
- **comp** — o predicado binário para comparar os elementos projetados
- **proj** — a projeção a aplicar aos elementos

### Valor de retorno

Retorna {ret, last}, onde `ret` é um iterator past-the-end para o novo final do range.

### Complexidade

Para ranges não vazios, exatamente [ranges::distance](<#/doc/iterator/ranges/distance>)(first, last) - 1 aplicações do predicado `comp` correspondente e não mais que o dobro de aplicações de qualquer projeção `proj`.

### Notas

A remoção é feita deslocando (por meio de move assignment) os elementos no range de tal forma que os elementos que não devem ser removidos apareçam no início do range. A ordem relativa dos elementos que permanecem é preservada e o tamanho _físico_ do container permanece inalterado. Iterators em `[`ret`, `last`)` (se houver) ainda são dereferenciáveis, mas os próprios elementos têm valores não especificados (conforme a pós-condição de [MoveAssignable](<#/doc/named_req/MoveAssignable>)).

Uma chamada para `ranges::unique` é às vezes seguida por uma chamada para a função membro `erase` de um container, que apaga os valores não especificados e reduz o tamanho _físico_ do container para corresponder ao seu novo tamanho _lógico_. Essas duas invocações juntas modelam o [_idioma Erase–remove_](<https://en.wikipedia.org/wiki/Erase-remove_idiom> "enwiki:Erase-remove idiom").

### Possível implementação
```cpp
    struct unique_fn
    {
        template<std::permutable I, std::sentinel_for<I> S, class Proj = std::identity,
                 std::indirect_equivalence_relation<std::projected<I, Proj>>
                     C = ranges::equal_to>
        constexpr ranges::subrange<I>
            operator()(I first, S last, C comp = {}, Proj proj = {}) const
        {
            first = ranges::adjacent_find(first, last, comp, proj);
            if (first == last)
                return {first, first};
            auto i {first};
            ++first;
            while (++first != last)
                if (!std::invoke(comp, std::invoke(proj, *i), std::invoke(proj, *first)))
                    *++i = ranges::iter_move(first);
            return {++i, first};
        }
    
        template<ranges::forward_range R, class Proj = std::identity,
                 std::indirect_equivalence_relation<std::projected<ranges::iterator_t<R>, Proj>>
                     C = ranges::equal_to>
        requires std::permutable<ranges::iterator_t<R>>
        constexpr ranges::borrowed_subrange_t<R>
            operator()(R&& r, C comp = {}, Proj proj = {}) const
        {
            return (*this)(ranges::begin(r), ranges::end(r),
                           std::move(comp), std::move(proj));
        }
    };
    
    inline constexpr unique_fn unique {};
```

---

### Exemplo

Execute este código
```cpp
    #include <algorithm>
    #include <cmath>
    #include <complex>
    #include <iostream>
    #include <vector>
    
    struct id {
        int i;
        explicit id(int i) : i {i} {}
    };
    
    void print(id i, const auto& v)
    {
        std::cout << i.i << ") ";
        std::ranges::for_each(v,  { std::cout << e << ' '; });
        std::cout << '\n';
    }
    
    int main()
    {
        // a vector containing several duplicated elements
        std::vector<int> v {1, 2, 1, 1, 3, 3, 3, 4, 5, 4};
    
        print(id {1}, v);
    
        // remove consecutive (adjacent) duplicates
        const auto ret = std::ranges::unique(v);
        // v now holds {1 2 1 3 4 5 4 x x x}, where 'x' is indeterminate
        v.erase(ret.begin(), ret.end());
        print(id {2}, v);
    
        // sort followed by unique, to remove all duplicates
        std::ranges::sort(v); // {1 1 2 3 4 4 5}
        print(id {3}, v);
    
        const auto [first, last] = std::ranges::unique(v.begin(), v.end());
        // v now holds {1 2 3 4 5 x x}, where 'x' is indeterminate
        v.erase(first, last);
        print(id {4}, v);
    
        // unique with custom comparison and projection
        std::vector<std::complex<int>> vc { {1, 1}, {-1, 2}, {-2, 3}, {2, 4}, {-3, 5} };
        print(id {5}, vc);
    
        const auto ret2 = std::ranges::unique(vc,
            // consider two complex nums equal if their real parts are equal by module:
             { return std::abs(x) == std::abs(y); }, // comp
            <int> z) { return z.real(); }             // proj
        );
        vc.erase(ret2.begin(), ret2.end());
        print(id {6}, vc);
    }
```

Saída:
```
    1) 1 2 1 1 3 3 3 4 5 4
    2) 1 2 1 3 4 5 4
    3) 1 1 2 3 4 4 5
    4) 1 2 3 4 5
    5) (1,1) (-1,2) (-2,3) (2,4) (-3,5)
    6) (1,1) (-2,3) (-3,5)
```

### Veja também

[ ranges::unique_copy](<#/doc/algorithm/ranges/unique_copy>)(C++20) | cria uma cópia de um range de elementos que não contém duplicatas consecutivas
---|---
(objeto de função de algoritmo) |
[ ranges::adjacent_find](<#/doc/algorithm/ranges/adjacent_find>)(C++20) | encontra os dois primeiros itens adjacentes que são iguais (ou satisfazem um dado predicado)
(objeto de função de algoritmo) |
[ ranges::remove](<#/doc/algorithm/ranges/remove>)(C++20)[ranges::remove_if](<#/doc/algorithm/ranges/remove>)(C++20) | remove elementos que satisfazem critérios específicos
(objeto de função de algoritmo) |
[ unique](<#/doc/algorithm/unique>) | remove elementos duplicados consecutivos em um range
(modelo de função) |
[ unique](<#/doc/container/list/unique>) | remove elementos duplicados consecutivos
(função membro pública de `std::list<T,Allocator>`) |
[ unique](<#/doc/container/forward_list/unique>) | remove elementos duplicados consecutivos
(função membro pública de `std::forward_list<T,Allocator>`) |
\*\[Valor]: O ano/mês em que o recurso foi adotado. O hiperlink sob cada valor abre uma página de suporte do compilador com a entrada para o recurso dado.
\*\[Padrão]: Padrão no qual o recurso é introduzido; DR significa relatório de defeito contra essa revisão