# std::ranges::prev_permutation, std::ranges::prev_permutation_result

Definido no cabeçalho `[<algorithm>](<#/doc/header/algorithm>)`

```c
Assinatura da chamada
template< std::bidirectional_iterator I, std::sentinel_for<I> S,
class Comp = ranges::less, class Proj = std::identity >
requires std::sortable<I, Comp, Proj>
constexpr prev_permutation_result<I>
prev_permutation( I first, S last, Comp comp = {}, Proj proj = {} );
template< ranges::bidirectional_range R, class Comp = ranges::less,
class Proj = std::identity >
requires std::sortable<ranges::iterator_t<R>, Comp, Proj>
constexpr prev_permutation_result<ranges::borrowed_iterator_t<R>>
prev_permutation( R&& r, Comp comp = {}, Proj proj = {} );
Tipo auxiliar
template< class I >
using prev_permutation_result = ranges::in_found_result<I>;
```

1) Transforma o range `[`first`, `last`)` na [permutação](<https://en.wikipedia.org/wiki/permutation> "enwiki:permutation") anterior, onde o conjunto de todas as permutações é ordenado [lexicograficamente](<https://en.wikipedia.org/wiki/Lexicographic_order> "enwiki:Lexicographic order") em relação ao objeto de função de comparação binária comp e ao objeto de função de projeção proj.

Retorna:

*   `{last, true}` se a permutação "anterior" existir. Caso contrário,
*   `{last, false}`, e transforma o range na última permutação (lexicograficamente), como se por

```cpp
    ranges::sort(first, last, comp, proj);
    ranges::reverse(first, last);
```

2) O mesmo que (1), mas usa `r` como o range de origem, como se usasse [ranges::begin](<#/doc/ranges/begin>)(r) como `first`, e [ranges::end](<#/doc/ranges/end>)(r) como `last`.

As entidades tipo função descritas nesta página são [_objetos de função de algoritmo_](<#/doc/algorithm/ranges>) (informalmente conhecidos como _niebloids_), ou seja:

*   Listas explícitas de argumentos de template não podem ser especificadas ao chamar qualquer um deles.
*   Nenhum deles é visível para [pesquisa dependente de argumento](<#/doc/language/adl>).
*   Quando qualquer um deles é encontrado por [pesquisa não qualificada normal](<#/doc/language/unqualified_lookup>) como o nome à esquerda do operador de chamada de função, a [pesquisa dependente de argumento](<#/doc/language/adl>) é inibida.

### Parâmetros

- **first, last** — o range de elementos a "permutar"
- **r** — o range de elementos a "permutar"
- **comp** — objeto de função de comparação que retorna `true` se o primeiro argumento for menor que o segundo
- **proj** — projeção a ser aplicada aos elementos

### Valor de retorno

1) `ranges::prev_permutation_result<I>{last, true}` se a nova permutação for lexicograficamente menor que a antiga. `ranges::prev_permutation_result<I>{last, false}` se a primeira permutação foi alcançada e o range foi redefinido para a última permutação.

2) O mesmo que (1), exceto que o tipo de retorno é `ranges::prev_permutation_result<[ranges::borrowed_iterator_t](<#/doc/ranges/borrowed_iterator_t>)<R>>`.

### Exceções

Quaisquer exceções lançadas a partir de operações de iterador ou da troca de elementos.

### Complexidade

No máximo \\(\scriptsize N/2\\)N / 2 trocas, onde \\(\scriptsize N\\)N é [ranges::distance](<#/doc/iterator/ranges/distance>)(first, last) no caso (1) ou [ranges::distance](<#/doc/iterator/ranges/distance>)(r) no caso (2). Em média sobre toda a sequência de permutações, implementações típicas usam cerca de 3 comparações e 1.5 trocas por chamada.

### Notas

Implementações (por exemplo, [MSVC STL](<https://github.com/microsoft/STL/blob/main/stl/src/vector_algorithms.cpp>)) podem habilitar a vetorização quando o tipo de iterador modela [`contiguous_iterator`](<#/doc/iterator/contiguous_iterator>) e a troca de seu tipo de valor não chama nenhuma função membro especial não trivial nem `swap` encontrado por [ADL](<#/doc/language/adl>).

### Possível implementação
```cpp
    struct prev_permutation_fn
    {
        template<std::bidirectional_iterator I, std::sentinel_for<I> S,
                 class Comp = ranges::less, class Proj = std::identity>
        requires std::sortable<I, Comp, Proj>
        constexpr ranges::prev_permutation_result<I>
            operator()(I first, S last, Comp comp = {}, Proj proj = {}) const
        {
            // check that the sequence has at least two elements
            if (first == last)
                return {std::move(first), false};
            auto i{first};
            ++i;
            if (i == last)
                return {std::move(i), false};
            auto i_last{ranges::next(first, last)};
            i = i_last;
            --i;
            // main "permutating" loop
            for (;;)
            {
                auto i1{i};
                --i;
                if (std::invoke(comp, std::invoke(proj, *i1), std::invoke(proj, *i)))
                {
                    auto j{i_last};
                    while (!std::invoke(comp, std::invoke(proj, *--j), std::invoke(proj, *i)))
                        ;
                    ranges::iter_swap(i, j);
                    ranges::reverse(i1, last);
                    return {std::move(i_last), true};
                }
                // permutation "space" is exhausted
                if (i == first)
                {
                    ranges::reverse(first, last);
                    return {std::move(i_last), false};
                }
            }
        }
    
        template<ranges::bidirectional_range R, class Comp = ranges::less,
                 class Proj = std::identity>
        requires std::sortable<ranges::iterator_t<R>, Comp, Proj>
        constexpr ranges::prev_permutation_result<ranges::borrowed_iterator_t<R>>
            operator()(R&& r, Comp comp = {}, Proj proj = {}) const
        {
            return (*this)(ranges::begin(r), ranges::end(r),
                           std::move(comp), std::move(proj));
        }
    };
    
    inline constexpr prev_permutation_fn prev_permutation {};
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
        char c{};
        int i{};
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
        std::string s{"cba"};
        do print(s);
        while (std::ranges::prev_permutation(s.begin(), s.end()).found);
    
        std::cout << "\nGenerate all permutations (range case):\n";
        std::array a{'c', 'b', 'a'};
        do print(a);
        while (std::ranges::prev_permutation(a).found);
    
        std::cout << "\nGenerate all permutations using comparator:\n";
        using namespace std::literals;
        std::array z{"▁"s, "▄"s, "█"s};
        do print(z);
        while (std::ranges::prev_permutation(z, std::greater()).found);
    
        std::cout << "\nGenerate all permutations using projection:\n";
        std::array<S, 3> r{S{'C',1}, S{'B',2}, S{'A',3}};
        do print(r, '\n');
        while (std::ranges::prev_permutation(r, {}, &S::c).found);
    }
```

Saída:
```
    Generate all permutations (iterators case):
    { c b a } { c a b } { b c a } { b a c } { a c b } { a b c }
    Generate all permutations (range case):
    { c b a } { c a b } { b c a } { b a c } { a c b } { a b c }
    Generate all permutations using comparator:
    { ▁ ▄ █ } { ▁ █ ▄ } { ▄ ▁ █ } { ▄ █ ▁ } { █ ▁ ▄ } { █ ▄ ▁ }
    Generate all permutations using projection:
    { {'C', 1} {'B', 2} {'A', 3} }
    { {'C', 1} {'A', 3} {'B', 2} }
    { {'B', 2} {'C', 1} {'A', 3} }
    { {'B', 2} {'A', 3} {'C', 1} }
    { {'A', 3} {'C', 1} {'B', 2} }
    { {'A', 3} {'B', 2} {'C', 1} }
```

### Veja também

[ ranges::next_permutation](<#/doc/algorithm/ranges/next_permutation>)(desde C++20) | gera a próxima permutação lexicográfica maior de um range de elementos
(objeto de função de algoritmo)
[ ranges::is_permutation](<#/doc/algorithm/ranges/is_permutation>)(desde C++20) | determina se uma sequência é uma permutação de outra sequência
(objeto de função de algoritmo)
[ next_permutation](<#/doc/algorithm/next_permutation>) | gera a próxima permutação lexicográfica maior de um range de elementos
(modelo de função)
[ prev_permutation](<#/doc/algorithm/prev_permutation>) | gera a próxima permutação lexicográfica menor de um range de elementos
(modelo de função)
[ is_permutation](<#/doc/algorithm/is_permutation>)(desde C++11) | determina se uma sequência é uma permutação de outra sequência
(modelo de função)