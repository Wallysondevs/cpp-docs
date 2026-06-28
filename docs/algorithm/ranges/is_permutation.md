# std::ranges::is_permutation

Definido no cabeçalho `[<algorithm>](<#/doc/header/algorithm>)`

```c
Assinatura da chamada
template< std::forward_iterator I1, std::sentinel_for<I1> S1,
std::forward_iterator I2, std::sentinel_for<I2> S2,
class Proj1 = std::identity, class Proj2 = std::identity,
std::indirect_equivalence_relation<std::projected<I1, Proj1>,
std::projected<I2, Proj2>>
Pred = ranges::equal_to >
constexpr bool
is_permutation( I1 first1, S1 last1, I2 first2, S2 last2, Pred pred = {},
Proj1 proj1 = {}, Proj2 proj2 = {} );
template< ranges::forward_range R1, ranges::forward_range R2,
class Proj1 = std::identity, class Proj2 = std::identity,
std::indirect_equivalence_relation<
std::projected<ranges::iterator_t<R1>, Proj1>,
std::projected<ranges::iterator_t<R2>, Proj2>>
Pred = ranges::equal_to >
constexpr bool
is_permutation( R1&& r1, R2&& r2, Pred pred = {},
Proj1 proj1 = {}, Proj2 proj2 = {} );
```

1) Retorna true se existir uma [permutação](<https://en.wikipedia.org/wiki/permutation> "enwiki:permutation") dos elementos no range `[`first1`, `last1`)` que torne o range _igual_ a `[`first2`, `last2`)` (após a aplicação das projeções correspondentes Proj1, Proj2, e usando o predicado binário Pred como um comparador). Caso contrário, retorna false.

2) O mesmo que (1), mas usa r1 como o primeiro range de origem e r2 como o segundo range de origem, como se usasse [ranges::begin](<#/doc/ranges/begin>)(r1) como first1, [ranges::end](<#/doc/ranges/end>)(r1) como last1, [ranges::begin](<#/doc/ranges/begin>)(r2) como first2, e [ranges::end](<#/doc/ranges/end>)(r2) como last2.

As entidades tipo função descritas nesta página são [_objetos de função de algoritmo_](<#/doc/algorithm/ranges>) (informalmente conhecidos como _niebloids_), ou seja:

  * Listas explícitas de argumentos de template não podem ser especificadas ao chamar qualquer um deles.
  * Nenhum deles é visível para [pesquisa dependente de argumento](<#/doc/language/adl>).
  * Quando qualquer um deles é encontrado por [pesquisa não qualificada normal](<#/doc/language/unqualified_lookup>) como o nome à esquerda do operador de chamada de função, a [pesquisa dependente de argumento](<#/doc/language/adl>) é inibida.

### Parâmetros

- **first1, last1** — o primeiro range dos elementos
- **first2, last2** — o segundo range dos elementos
- **r1** — o primeiro range dos elementos
- **r2** — o segundo range dos elementos
- **pred** — predicado a ser aplicado aos elementos projetados
- **proj1** — projeção a ser aplicada aos elementos no primeiro range
- **proj2** — projeção a ser aplicada aos elementos no segundo range

### Valor de retorno

true se o range `[`first1`, `last1`)` for uma permutação do range `[`first2`, `last2`)`.

### Complexidade

No máximo \\(\scriptsize \mathcal{O}(N^2)\\)O(N2) aplicações do predicado e de cada projeção, ou exatamente \\(\scriptsize N\\)N se as sequências já forem iguais, onde \\(\scriptsize N\\)N é [ranges::distance](<#/doc/iterator/ranges/distance>)(first1, last1). No entanto, se [ranges::distance](<#/doc/iterator/ranges/distance>)(first1, last1) != [ranges::distance](<#/doc/iterator/ranges/distance>)(first2, last2), nenhuma aplicação do predicado e das projeções é feita.

### Notas

A relação de _permutação_ é uma [relação de equivalência](<https://en.wikipedia.org/wiki/equivalence_relation> "enwiki:equivalence relation").

O `ranges::is_permutation` pode ser usado em testes, por exemplo, para verificar a correção de algoritmos de rearranjo como ordenação, embaralhamento, particionamento. Se `p` é uma sequência original e `q` é uma sequência "mutada", então ranges::is_permutation(p, q) == true significa que `q` consiste nos "mesmos" elementos (talvez permutados) que `p`.

### Possível implementação
```cpp
    struct is_permutation_fn
    {
        template<std::forward_iterator I1, std::sentinel_for<I1> S1,
                 std::forward_iterator I2, std::sentinel_for<I2> S2,
                 class Proj1 = std::identity, class Proj2 = std::identity,
                 std::indirect_equivalence_relation<std::projected<I1, Proj1>,
                                                    std::projected<I2, Proj2>>
                                                        Pred = ranges::equal_to>
        constexpr bool operator()(I1 first1, S1 last1, I2 first2, S2 last2,
                                  Pred pred = {}, Proj1 proj1 = {}, Proj2 proj2 = {}) const
        {
            // pula o prefixo comum
            auto ret = std::ranges::mismatch(first1, last1, first2, last2,
                                             std::ref(pred), std::ref(proj1), std::ref(proj2));
            first1 = ret.in1, first2 = ret.in2;
    
            // itera sobre o restante, contando quantas vezes cada elemento
            // de [first1, last1) aparece em [first2, last2)
            for (auto i {first1}; i != last1; ++i)
            {
                const auto i_proj {std::invoke(proj1, *i)};
                auto i_cmp = [&]<typename T>(T&& t)
                { 
                    return std::invoke(pred, i_proj, std::forward<T>(t));
                };
    
                if (i != ranges::find_if(first1, i, i_cmp, proj1))
                    continue; // este *i já foi verificado
    
                if (const auto m {ranges::count_if(first2, last2, i_cmp, proj2)};
                    m == 0 or m != ranges::count_if(i, last1, i_cmp, proj1))
                    return false;
            }
            return true;
        }
    
        template<ranges::forward_range R1, ranges::forward_range R2,
                 class Proj1 = std::identity, class Proj2 = std::identity,
                 std::indirect_equivalence_relation<
                     std::projected<ranges::iterator_t<R1>, Proj1>,
                     std::projected<ranges::iterator_t<R2>, Proj2>>
                         Pred = ranges::equal_to>
        constexpr bool operator()(R1&& r1, R2&& r2, Pred pred = {},
                                  Proj1 proj1 = {}, Proj2 proj2 = {}) const
        {
            return (*this)(ranges::begin(r1), ranges::end(r1),
                           ranges::begin(r2), ranges::end(r2),
                           std::move(pred), std::move(proj1), std::move(proj2));
        }
    };
    
    inline constexpr is_permutation_fn is_permutation {};
```

---

### Exemplo

Execute este código
```cpp
    #include <algorithm>
    #include <array>
    #include <cmath>
    #include <iostream>
    #include <ranges>
    
    auto& operator<<(auto& os, std::ranges::forward_range auto const& v)
    {
        os << "{ ";
        for (const auto& e : v)
            os << e << ' ';
        return os << "}";
    }
    
    int main()
    {
        static constexpr auto r1 = {1, 2, 3, 4, 5};
        static constexpr auto r2 = {3, 5, 4, 1, 2};
        static constexpr auto r3 = {3, 5, 4, 1, 1};
    
        static_assert(
            std::ranges::is_permutation(r1, r1) &&
            std::ranges::is_permutation(r1, r2) &&
            std::ranges::is_permutation(r2, r1) &&
            std::ranges::is_permutation(r1.begin(), r1.end(), r2.begin(), r2.end()));
    
        std::cout
            << std::boolalpha
            << "is_permutation(" << r1 << ", " << r2 << "): "
            << std::ranges::is_permutation(r1, r2) << '\n'
            << "is_permutation(" << r1 << ", " << r3 << "): "
            << std::ranges::is_permutation(r1, r3) << '\n'
    
            << "is_permutation with custom predicate and projections: "
            << std::ranges::is_permutation(
                std::array {-14, -11, -13, -15, -12},  // 1st range
                std::array {'F', 'E', 'C', 'B', 'D'},  // 2nd range
                 { return abs(x) == abs(y); }, // predicate
                 { return x + 10; },          // projection for 1st range
                 { return int(y - 'A'); })   // projection for 2nd range
            << '\n';
    }
```

Saída:
```
    is_permutation({ 1 2 3 4 5 }, { 3 5 4 1 2 }): true
    is_permutation({ 1 2 3 4 5 }, { 3 5 4 1 1 }): false
    is_permutation with custom predicate and projections: true
```

### Veja também

[ ranges::next_permutation](<#/doc/algorithm/ranges/next_permutation>)(C++20) | gera a próxima permutação lexicográfica maior de um range de elementos
(objeto de função de algoritmo)
[ ranges::prev_permutation](<#/doc/algorithm/ranges/prev_permutation>)(C++20) | gera a próxima permutação lexicográfica menor de um range de elementos
(objeto de função de algoritmo)
[ is_permutation](<#/doc/algorithm/is_permutation>)(C++11) | determina se uma sequência é uma permutação de outra sequência
(modelo de função)
[ next_permutation](<#/doc/algorithm/next_permutation>) | gera a próxima permutação lexicográfica maior de um range de elementos
(modelo de função)
[ prev_permutation](<#/doc/algorithm/prev_permutation>) | gera a próxima permutação lexicográfica menor de um range de elementos
(modelo de função)
[ equivalence_relation](<#/doc/concepts/equivalence_relation>)(C++20) | especifica que uma `[`relation`](<#/doc/concepts/relation>)` impõe uma relação de equivalência
(concept)