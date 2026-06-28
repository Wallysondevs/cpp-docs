# std::ranges::stable_sort

Definido no cabeçalho `[<algorithm>](<#/doc/header/algorithm>)`

```c
Assinatura da chamada
template< std::random_access_iterator I, std::sentinel_for<I> S,
class Comp = ranges::less, class Proj = std::identity >
requires std::sortable<I, Comp, Proj>
I stable_sort( I first, S last, Comp comp = {}, Proj proj = {} );
(constexpr desde C++26)
template< ranges::random_access_range R, class Comp = ranges::less,
class Proj = std::identity >
requires std::sortable<ranges::iterator_t<R>, Comp, Proj>
ranges::borrowed_iterator_t<R>
stable_sort( R&& r, Comp comp = {}, Proj proj = {} );
(constexpr desde C++26)
```

Ordena os elementos no range `[`first`, `last`)` em ordem não decrescente. A ordem de elementos equivalentes é _estável_, ou seja, garantida de ser preservada.

Uma sequência é ordenada em relação a um comparador `comp` se para qualquer iterator `it` apontando para a sequência e qualquer inteiro não negativo `n` tal que `it + n` é um iterator válido apontando para um elemento da sequência, [std::invoke](<#/doc/utility/functional/invoke>)(comp, [std::invoke](<#/doc/utility/functional/invoke>)(proj, *(it + n)), [std::invoke](<#/doc/utility/functional/invoke>)(proj, *it) avalia para falso.

1) Os elementos são comparados usando a função de comparação binária `comp` fornecida.

2) O mesmo que (1), mas usa `r` como o range, como se usasse [ranges::begin](<#/doc/ranges/begin>)(r) como `first` e [ranges::end](<#/doc/ranges/end>)(r) como `last`.

As entidades tipo função descritas nesta página são [_objetos de função de algoritmo_](<#/doc/algorithm/ranges>) (informalmente conhecidos como _niebloids_), ou seja:

  * Listas explícitas de argumentos de template não podem ser especificadas ao chamar qualquer um deles.
  * Nenhum deles é visível para [pesquisa dependente de argumento](<#/doc/language/adl>).
  * Quando qualquer um deles é encontrado por [pesquisa não qualificada normal](<#/doc/language/unqualified_lookup>) como o nome à esquerda do operador de chamada de função, a [pesquisa dependente de argumento](<#/doc/language/adl>) é inibida.

### Parâmetros

- **first, last** — iterator-sentinel definindo o range a ser ordenado
- **r** — o range a ser ordenado
- **comp** — comparação a ser aplicada aos elementos projetados
- **proj** — projeção a ser aplicada aos elementos

### Valor de retorno

Um iterator igual a `last`.

### Complexidade

\\(\scriptsize N\cdot\log{(N)}\\)N·log(N) comparações, se memória extra estiver disponível; onde \\(\scriptsize N\\)N é [ranges::distance](<#/doc/iterator/ranges/distance>)(first, last). \\(\scriptsize N\cdot\log^2{(N)}\\)N·log²(N) comparações caso contrário. O dobro de projeções que o número de comparações em ambos os casos.

### Notas

Macro de teste de recurso | Valor | Std | Recurso
---|---|---|---
[`__cpp_lib_constexpr_algorithms`](<#/doc/feature_test>) | [`202306L`](<#/>) | (C++26) | ordenação estável constexpr

### Implementação possível

Esta implementação mostra apenas o algoritmo mais lento usado quando nenhuma memória adicional está disponível. Veja também a implementação em [MSVC STL](<https://github.com/microsoft/STL/blob/e745bad3b1d05b5b19ec652d68abb37865ffa454/stl/inc/algorithm#L7842-L8094>) e [libstdc++](<https://github.com/gcc-mirror/gcc/blob/54258e22b0846aaa6bd3265f592feb161eecda75/libstdc%2B%2B-v3/include/bits/ranges_algo.h#L1836-L1862>).
```cpp
    struct stable_sort_fn
    {
        template<std::random_access_iterator I, std::sentinel_for<I> S,
                 class Comp = ranges::less, class Proj = std::identity>
        requires std::sortable<I, Comp, Proj>
        constexpr // since C++26
        I operator()(I first, S last, Comp comp = {}, Proj proj = {}) const
        {
            auto count = ranges::distance(first, last);
            auto mid = first + count / 2;
            auto last_it = first + count;
    
            if (count <= 1)
                return last_it;
    
            (*this)(first, mid, std::ref(comp), std::ref(proj));
            (*this)(mid, last_it, std::ref(comp), std::ref(proj));
    
            ranges::inplace_merge(first, mid, last_it);
    
            return last_it;
        }
    
        template<ranges::random_access_range R, class Comp = ranges::less,
                 class Proj = std::identity>
        requires std::sortable<ranges::iterator_t<R>, Comp, Proj>
        constexpr // since C++26
        ranges::borrowed_iterator_t<R> operator()(R&& r, Comp comp = {}, Proj proj = {}) const
        {
            return (*this)(ranges::begin(r), ranges::end(r), std::move(comp), std::move(proj));
        }
    };
    
    inline constexpr stable_sort_fn stable_sort {};
```

---

### Exemplo

Execute este código
```cpp
    #include <algorithm>
    #include <array>
    #include <functional>
    #include <iomanip>
    #include <iostream>
    
    void print(auto const& seq)
    {
        for (auto const& elem : seq)
            std::cout << elem << ' ';
        std::cout << '\n';
    }
    
    struct Particle
    {
        std::string name; double mass; // MeV
        friend std::ostream& operator<<(std::ostream& os, Particle const& p)
        {
            return os << '\n' << std::left << std::setw(8) << p.name << " : " << p.mass;
        }
    };
    
    int main()
    {
        std::array s {5, 7, 4, 2, 8, 6, 1, 9, 0, 3};
    
        // sort using the default operator<
        std::ranges::stable_sort(s);
        print(s);
    
        // sort using a standard library compare function object
        std::ranges::stable_sort(s, std::ranges::greater());
        print(s);
    
        // sort using a custom function object
        struct
        {
            bool operator()(int a, int b) const
            {
                return a < b;
            }
        } customLess;
        std::ranges::stable_sort(s.begin(), s.end(), customLess);
        print(s);
    
        // sort using a lambda expression
        std::ranges::stable_sort(s,  { return a > b; });
        print(s);
    
        // sort with projection
        Particle particles[]
        {
            {"Electron", 0.511}, {"Muon", 105.66}, {"Tau", 1776.86},
            {"Positron", 0.511}, {"Proton", 938.27}, {"Neutron", 939.57}
        };
        print(particles);
        std::ranges::stable_sort(particles, {}, &Particle::name); // sort by name
        print(particles);
        std::ranges::stable_sort(particles, {}, &Particle::mass); // sort by mass
        print(particles);
    }
```

Saída:
```
    0 1 2 3 4 5 6 7 8 9
    9 8 7 6 5 4 3 2 1 0
    0 1 2 3 4 5 6 7 8 9
    9 8 7 6 5 4 3 2 1 0
    
    Electron : 0.511
    Muon     : 105.66
    Tau      : 1776.86
    Positron : 0.511
    Proton   : 938.27
    Neutron  : 939.57
    
    Electron : 0.511
    Muon     : 105.66
    Neutron  : 939.57
    Positron : 0.511
    Proton   : 938.27
    Tau      : 1776.86
    
    Electron : 0.511
    Positron : 0.511
    Muon     : 105.66
    Proton   : 938.27
    Neutron  : 939.57
    Tau      : 1776.86
```

### Ver também

[ ranges::sort](<#/doc/algorithm/ranges/sort>)(C++20) | ordena um range em ordem ascendente
(objeto de função de algoritmo)
[ ranges::partial_sort](<#/doc/algorithm/ranges/partial_sort>)(C++20) | ordena os primeiros N elementos de um range
(objeto de função de algoritmo)
[ ranges::stable_partition](<#/doc/algorithm/ranges/stable_partition>)(C++20) | divide elementos em dois grupos preservando sua ordem relativa
(objeto de função de algoritmo)
[ stable_sort](<#/doc/algorithm/stable_sort>) | ordena um range de elementos preservando a ordem entre elementos iguais
(template de função)