# std::ranges::sort

Definido no cabeçalho `[<algorithm>](<#/doc/header/algorithm>)`

```c
Assinatura da chamada
template< std::random_access_iterator I, std::sentinel_for<I> S,
class Comp = ranges::less, class Proj = std::identity >
requires std::sortable<I, Comp, Proj>
constexpr I
sort( I first, S last, Comp comp = {}, Proj proj = {} );
template< ranges::random_access_range R, class Comp = ranges::less,
class Proj = std::identity >
requires std::sortable<ranges::iterator_t<R>, Comp, Proj>
constexpr ranges::borrowed_iterator_t<R>
sort( R&& r, Comp comp = {}, Proj proj = {} );
```

Ordena os elementos no range `[`first`, `last`)` em ordem não decrescente. A ordem de elementos equivalentes não é garantida de ser preservada.

Uma sequência é ordenada em relação a um comparador `comp` se para qualquer iterator `it` apontando para a sequência e qualquer inteiro não negativo `n` tal que `it + n` seja um iterator válido apontando para um elemento da sequência, [std::invoke](<#/doc/utility/functional/invoke>)(comp, [std::invoke](<#/doc/utility/functional/invoke>)(proj, *(it + n)), [std::invoke](<#/doc/utility/functional/invoke>)(proj, *it)) avalia para `false`.

1) Os elementos são comparados usando a função de comparação binária `comp` fornecida.

2) O mesmo que (1), mas usa `r` como o range de origem, como se usasse [ranges::begin](<#/doc/ranges/begin>)(r) como `first` e [ranges::end](<#/doc/ranges/end>)(r) como `last`.

As entidades tipo-função descritas nesta página são [_objetos de função de algoritmo_](<#/doc/algorithm/ranges>) (informalmente conhecidos como _niebloids_), ou seja:

*   Listas explícitas de argumentos de template não podem ser especificadas ao chamar qualquer uma delas.
*   Nenhuma delas é visível para [argument-dependent lookup](<#/doc/language/adl>).
*   Quando qualquer uma delas é encontrada por [normal unqualified lookup](<#/doc/language/unqualified_lookup>) como o nome à esquerda do operador de chamada de função, [argument-dependent lookup](<#/doc/language/adl>) é inibido.

### Parâmetros

- **first, last** — iterator-sentinel que define o range a ser ordenado
- **r** — o range a ser ordenado
- **comp** — comparação a ser aplicada aos elementos projetados
- **proj** — projeção a ser aplicada aos elementos

### Valor de retorno

Um iterator igual a `last`.

### Complexidade

\\(\scriptsize \mathcal{O}(N\cdot\log{(N)})\\) comparações e projeções, onde N = [ranges::distance](<#/doc/iterator/ranges/distance>)(first, last).

### Possível implementação

Note que implementações típicas usam [Introsort](<https://en.wikipedia.org/wiki/Introsort> "enwiki:Introsort"). Veja também a implementação no [MSVC STL](<https://github.com/microsoft/STL/blob/e745bad3b1d05b5b19ec652d68abb37865ffa454/stl/inc/algorithm#L7575-L7641>) e [libstdc++](<https://github.com/gcc-mirror/gcc/blob/54258e22b0846aaa6bd3265f592feb161eecda75/libstdc%2B%2B-v3/include/bits/ranges_algo.h#L1808-L1834>).
```cpp
    struct sort_fn
    {
        template<std::random_access_iterator I, std::sentinel_for<I> S,
                 class Comp = ranges::less, class Proj = std::identity>
        requires std::sortable<I, Comp, Proj>
        constexpr I
            operator()(I first, S last, Comp comp = {}, Proj proj = {}) const
        {
            if (first == last)
                return first;
    
            I last_iter = ranges::next(first, last);
            ranges::make_heap(first, last_iter, std::ref(comp), std::ref(proj));
            ranges::sort_heap(first, last_iter, std::ref(comp), std::ref(proj));
    
            return last_iter;
        }
    
        template<ranges::random_access_range R, class Comp = ranges::less,
                 class Proj = std::identity>
        requires std::sortable<ranges::iterator_t<R>, Comp, Proj>
        constexpr ranges::borrowed_iterator_t<R>
            operator()(R&& r, Comp comp = {}, Proj proj = {}) const
        {
            return (*this)(ranges::begin(r), ranges::end(r), std::move(comp), std::move(proj));
        }
    };
    
    inline constexpr sort_fn sort {};
```

---

### Notas

[std::sort](<#/doc/algorithm/sort>) usa [std::iter_swap](<#/doc/algorithm/iter_swap>) para trocar elementos, enquanto `ranges::sort` usa [ranges::iter_swap](<#/doc/iterator/ranges/iter_swap>) (que realiza ADL para `iter_swap`, ao contrário de [std::iter_swap](<#/doc/algorithm/iter_swap>))

### Exemplo

Execute este código
```cpp
    #include <algorithm>
    #include <array>
    #include <functional>
    #include <iomanip>
    #include <iostream>
    
    void print(auto comment, auto const& seq, char term = ' ')
    {
        for (std::cout << comment << '\n'; auto const& elem : seq)
            std::cout << elem << term;
        std::cout << '\n';
    }
    
    struct Particle
    {
        std::string name; double mass; // MeV
        template<class Os> friend
        Os& operator<<(Os& os, Particle const& p)
        {
            return os << std::left << std::setw(8) << p.name << " : " << p.mass << ' ';
        }
    };
    
    int main()
    {
        std::array s {5, 7, 4, 2, 8, 6, 1, 9, 0, 3};
    
        namespace ranges = std::ranges;
    
        ranges::sort(s);
        print("Sort using the default operator<", s);
    
        ranges::sort(s, ranges::greater());
        print("Sort using a standard library compare function object", s);
    
        struct
        {
            bool operator()(int a, int b) const { return a < b; }
        } customLess;
        ranges::sort(s.begin(), s.end(), customLess);
        print("Sort using a custom function object", s);
    
        ranges::sort(s,  { return a > b; });
        print("Sort using a lambda expression", s);
    
        Particle particles[]
        {
            {"Electron", 0.511}, {"Muon", 105.66}, {"Tau", 1776.86},
            {"Positron", 0.511}, {"Proton", 938.27}, {"Neutron", 939.57}
        };
        ranges::sort(particles, {}, &Particle::name);
        print("\nSort by name using a projection", particles, '\n');
        ranges::sort(particles, {}, &Particle::mass);
        print("Sort by mass using a projection", particles, '\n');
    }
```

Saída:
```
    Sort using the default operator<
    0 1 2 3 4 5 6 7 8 9
    Sort using a standard library compare function object
    9 8 7 6 5 4 3 2 1 0
    Sort using a custom function object
    0 1 2 3 4 5 6 7 8 9
    Sort using a lambda expression
    9 8 7 6 5 4 3 2 1 0
    
    Sort by name using a projection
    Electron : 0.511
    Muon     : 105.66
    Neutron  : 939.57
    Positron : 0.511
    Proton   : 938.27
    Tau      : 1776.86
    
    Sort by mass using a projection
    Electron : 0.511
    Positron : 0.511
    Muon     : 105.66
    Proton   : 938.27
    Neutron  : 939.57
    Tau      : 1776.86
```

### Ver também

[ ranges::partial_sort](<#/doc/algorithm/ranges/partial_sort>)(C++20) | ordena os primeiros N elementos de um range
(objeto de função de algoritmo)
[ ranges::stable_sort](<#/doc/algorithm/ranges/stable_sort>)(C++20) | ordena um range de elementos preservando a ordem entre elementos iguais
(objeto de função de algoritmo)
[ ranges::partition](<#/doc/algorithm/ranges/partition>)(C++20) | divide um range de elementos em dois grupos
(objeto de função de algoritmo)
[ sort](<#/doc/algorithm/sort>) | ordena um range em ordem crescente
(modelo de função)
*   [Value]: O ano/mês em que o recurso foi adotado. O hiperlink sob cada valor abre uma página de suporte do compilador com a entrada para o recurso dado.
*   [Std]: Padrão no qual o recurso é introduzido; DR significa relatório de defeito contra essa revisão.