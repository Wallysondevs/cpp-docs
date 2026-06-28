# std::ranges::next_permutation, std::ranges::next_permutation_result

Definido no cabeçalho `[<algorithm>](<#/doc/header/algorithm>)`

```c
Assinatura da chamada
template< std::bidirectional_iterator I, std::sentinel_for<I> S,
class Comp = ranges::less, class Proj = std::identity >
requires std::sortable<I, Comp, Proj>
constexpr next_permutation_result<I>
next_permutation( I first, S last, Comp comp = {}, Proj proj = {} );
template< ranges::bidirectional_range R, class Comp = ranges::less,
class Proj = std::identity >
requires std::sortable<ranges::iterator_t<R>, Comp, Proj>
constexpr next_permutation_result<ranges::borrowed_iterator_t<R>>
next_permutation( R&& r, Comp comp = {}, Proj proj = {} );
Tipo auxiliar
template< class I >
using next_permutation_result = ranges::in_found_result<I>;
```

1) Transforma o range `[`first`, `last`)` na próxima [permutação](<https://en.wikipedia.org/wiki/permutation> "enwiki:permutation"), onde o conjunto de todas as permutações é ordenado _lexicograficamente_ em relação ao objeto de função de comparação binária comp e ao objeto de função de projeção proj. Retorna {last, true} se tal _"próxima permutação"_ existir; caso contrário, transforma o range na primeira permutação lexicográfica como se por [ranges::sort](<#/doc/algorithm/ranges/sort>)(first, last, comp, proj), e retorna {last, false}.

2) O mesmo que (1), mas usa r como o range de origem, como se usando [ranges::begin](<#/doc/ranges/begin>)(r) como first, e [ranges::end](<#/doc/ranges/end>)(r) como last.

As entidades tipo função descritas nesta página são [_objetos de função de algoritmo_](<#/doc/algorithm/ranges>) (informalmente conhecidos como _niebloids_), ou seja:

*   Listas explícitas de argumentos de template não podem ser especificadas ao chamar qualquer um deles.
*   Nenhum deles é visível para [argument-dependent lookup](<#/doc/language/adl>).
*   Quando qualquer um deles é encontrado por [normal unqualified lookup](<#/doc/language/unqualified_lookup>) como o nome à esquerda do operador de chamada de função, [argument-dependent lookup](<#/doc/language/adl>) é inibido.

### Parâmetros

- **first, last** — o range de elementos a _permutar_
- **r** — o range de elementos a _permutar_
- **comp** — objeto de função de comparação que retorna true se o primeiro argumento é _menor_ que o segundo
- **proj** — projeção a ser aplicada aos elementos

### Valor de retorno

1) ranges::next_permutation_result&lt;I&gt;{last, true} se a nova permutação for lexicograficamente _maior_ que a antiga. ranges::next_permutation_result&lt;I&gt;{last, false} se a última permutação foi alcançada e o range foi redefinido para a primeira permutação.

2) O mesmo que (1), exceto que o tipo de retorno é ranges::next_permutation_result<[ranges::borrowed_iterator_t](<#/doc/ranges/borrowed_iterator_t>)&lt;R&gt;>.

### Exceções

Quaisquer exceções lançadas a partir de operações de iterator ou da troca de elementos.

### Complexidade

No máximo \\(\scriptsize N/2\\)N / 2 trocas, onde \\(\scriptsize N\\)N é [ranges::distance](<#/doc/iterator/ranges/distance>)(first, last) no caso (1) ou [ranges::distance](<#/doc/iterator/ranges/distance>)(r) no caso (2). Em média, sobre toda a sequência de permutações, implementações típicas usam cerca de 3 comparações e 1.5 trocas por chamada.

### Notas

Implementações (por exemplo, [MSVC STL](<https://github.com/microsoft/STL/blob/main/stl/src/vector_algorithms.cpp>)) podem habilitar a vetorização quando o tipo de iterator modela [`contiguous_iterator`](<#/doc/iterator/contiguous_iterator>) e a troca de seu tipo de valor não chama nenhuma função membro especial não trivial nem `swap` encontrado por [ADL](<#/doc/language/adl>).

### Possível implementação
```cpp
    struct next_permutation_fn
    {
        template<std::bidirectional_iterator I, std::sentinel_for<I> S,
                 class Comp = ranges::less, class Proj = std::identity>
        requires std::sortable<I, Comp, Proj>
        constexpr ranges::next_permutation_result<I>
            operator()(I first, S last, Comp comp = {}, Proj proj = {}) const
        {
            // check that the sequence has at least two elements
            if (first == last)
                return {std::move(first), false};
            I i_last{ranges::next(first, last)};
            I i{i_last};
            if (first == --i)
                return {std::move(i_last), false};
            // main "permutating" loop
            for (;;)
            {
                I i1{i};
                if (std::invoke(comp, std::invoke(proj, *--i), std::invoke(proj, *i1)))
                {
                    I j{i_last};
                    while (!std::invoke(comp, std::invoke(proj, *i), std::invoke(proj, *--j)))
                    {}
                    std::iter_swap(i, j);
                    std::reverse(i1, i_last);
                    return {std::move(i_last), true};
                }
                // permutation "space" is exhausted
                if (i == first)
                {
                    std::reverse(first, i_last);
                    return {std::move(i_last), false};
                }
            }
        }
     
        template<ranges::bidirectional_range R, class Comp = ranges::less,
                 class Proj = std::identity>
        requires std::sortable<ranges::iterator_t<R>, Comp, Proj>
        constexpr ranges::next_permutation_result<ranges::borrowed_iterator_t<R>>
            operator()(R&& r, Comp comp = {}, Proj proj = {}) const
        {
            return (*this)(ranges::begin(r), ranges::end(r),
                           std::move(comp), std::move(proj));
        }
    };
     
    inline constexpr next_permutation_fn next_permutation {};
```

---

### Exemplo

Execute este código
```cpp
    #include <algorithm>
    #include <array>
    #include <compare>
    #include <functional>
    #include <iostream>
    #include <string>
     
    struct S
    {
        char c;
        int i;
        auto operator<=>(const S&) const = default;
        friend std::ostream& operator<<(std::ostream& os, const S& s)
        {
            return os << "{'" << s.c << "', " << s.i << "}";
        }
    };
     
    auto print = 
    {
        std::cout << "{ ";
        for (const auto& e : v)
            std::cout << e << ' ';
        std::cout << '}' << term;
    };
     
    int main()
    {
        std::cout << "Generate all permutations (iterators case):\n";
        std::string s{"abc"};
        do
        {
            print(s);
        }
        while (std::ranges::next_permutation(s.begin(), s.end()).found);
     
        std::cout << "\n" "Generate all permutations (range case):\n";
        std::array a{'a', 'b', 'c'};
        do
        {
            print(a);
        }
        while (std::ranges::next_permutation(a).found);
     
        std::cout << "\n" "Generate all permutations using comparator:\n";
        using namespace std::literals;
        std::array z{"█"s, "▄"s, "▁"s};
        do
        {
            print(z);
        }
        while (std::ranges::next_permutation(z, std::greater()).found);
     
        std::cout << "\n" "Generate all permutations using projection:\n";
        std::array<S, 3> r{S{'A',3}, S{'B',2}, S{'C',1}};
        do
        {
            print(r, '\n');
        }
        while (std::ranges::next_permutation(r, {}, &S::c).found);
    }
```

Saída:
```
    Generate all permutations (iterators case):
    { a b c } { a c b } { b a c } { b c a } { c a b } { c b a }
    Generate all permutations (range case):
    { a b c } { a c b } { b a c } { b c a } { c a b } { c b a }
    Generate all permutations using comparator:
    { █ ▄ ▁ } { █ ▁ ▄ } { ▄ █ ▁ } { ▄ ▁ █ } { ▁ █ ▄ } { ▁ ▄ █ }
    Generate all permutations using projection:
    { {'A', 3} {'B', 2} {'C', 1} }
    { {'A', 3} {'C', 1} {'B', 2} }
    { {'B', 2} {'A', 3} {'C', 1} }
    { {'B', 2} {'C', 1} {'A', 3} }
    { {'C', 1} {'A', 3} {'B', 2} }
    { {'C', 1} {'B', 2} {'A', 3} }
```

### Veja também

[ ranges::prev_permutation](<#/doc/algorithm/ranges/prev_permutation>)(C++20) | gera a próxima permutação lexicográfica menor de um range de elementos
(objeto de função de algoritmo)
[ ranges::is_permutation](<#/doc/algorithm/ranges/is_permutation>)(C++20) | determina se uma sequência é uma permutação de outra sequência
(objeto de função de algoritmo)
[ next_permutation](<#/doc/algorithm/next_permutation>) | gera a próxima permutação lexicográfica maior de um range de elementos
(modelo de função)
[ prev_permutation](<#/doc/algorithm/prev_permutation>) | gera a próxima permutação lexicográfica menor de um range de elementos
(modelo de função)
[ is_permutation](<#/doc/algorithm/is_permutation>)(C++11) | determina se uma sequência é uma permutação de outra sequência
(modelo de função)