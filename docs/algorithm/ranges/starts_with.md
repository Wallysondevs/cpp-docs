# std::ranges::starts_with

Definido no cabeçalho `[<algorithm>](<#/doc/header/algorithm>)`

```c
Assinatura da chamada
template< std::input_iterator I1, std::sentinel_for<I1> S1,
std::input_iterator I2, std::sentinel_for<I2> S2,
class Pred = ranges::equal_to,
class Proj1 = std::identity, class Proj2 = std::identity >
requires std::indirectly_comparable<I1, I2, Pred, Proj1, Proj2>
constexpr bool
starts_with( I1 first1, S1 last1, I2 first2, S2 last2, Pred pred = {},
Proj1 proj1 = {}, Proj2 proj2 = {} );
template< ranges::input_range R1, ranges::input_range R2,
class Pred = ranges::equal_to,
class Proj1 = std::identity, class Proj2 = std::identity >
requires std::indirectly_comparable<ranges::iterator_t<R1>,
ranges::iterator_t<R2>,
Pred, Proj1, Proj2>
constexpr bool
starts_with( R1&& r1, R2&& r2, Pred pred = {},
Proj1 proj1 = {}, Proj2 proj2 = {} );
```

  
Verifica se o segundo range corresponde ao prefixo do primeiro range.

1) Sejam `N1` e `N2` os tamanhos dos ranges `[`first1`, `last1`)` e `[`first2`, `last2`)`, respectivamente. Se N1 < N2, retorna false. Caso contrário, retorna true somente se cada elemento no range `[`first2`, `last2`)` for igual ao elemento correspondente em `[`first1`, `first1 + N2`)`. A comparação é feita aplicando o predicado binário pred aos elementos em dois ranges projetados por proj1 e proj2, respectivamente.

2) O mesmo que (1), mas usa r1 e r2 como os ranges de origem, como se usasse [ranges::begin](<#/doc/ranges/begin>)(r1) como first1, ranges:begin(r2) como first2, [ranges::end](<#/doc/ranges/end>)(r1) como last1, e [ranges::end](<#/doc/ranges/end>)(r2) como last2.

As entidades tipo função descritas nesta página são [_objetos de função de algoritmo_](<#/doc/algorithm/ranges>) (informalmente conhecidos como _niebloids_), ou seja:

  * Listas explícitas de argumentos de template não podem ser especificadas ao chamar qualquer um deles.
  * Nenhum deles é visível para [argument-dependent lookup](<#/doc/language/adl>).
  * Quando qualquer um deles é encontrado por [normal unqualified lookup](<#/doc/language/unqualified_lookup>) como o nome à esquerda do operador de chamada de função, [argument-dependent lookup](<#/doc/language/adl>) é inibido.

### Parâmetros

first1, last1  |  \-  |  o range de elementos a examinar   
---|---|---
r1  |  \-  |  o range de elementos a examinar   
first2, last2  |  \-  |  o range de elementos a ser usado como prefixo   
r2  |  \-  |  o range de elementos a ser usado como prefixo   
pred  |  \-  |  o predicado binário que compara os elementos projetados   
proj1  |  \-  |  a projeção a ser aplicada aos elementos do range a examinar   
proj2  |  \-  |  a projeção a ser aplicada aos elementos do range a ser usado como prefixo   
  
### Valor de retorno

true se o segundo range corresponder ao prefixo do primeiro range, false caso contrário.

### Complexidade

Linear: no máximo min(N1, N2) aplicações do predicado e de ambas as projeções.

### Implementação possível
```cpp
    struct starts_with_fn
    {
        template<std::input_iterator I1, std::sentinel_for<I1> S1,
                 std::input_iterator I2, std::sentinel_for<I2> S2,
                 class Pred = ranges::equal_to,
                 class Proj1 = std::identity, class Proj2 = std::identity>
        requires std::indirectly_comparable<I1, I2, Pred, Proj1, Proj2>
        constexpr bool operator()(I1 first1, S1 last1, I2 first2, S2 last2,
                                  Pred pred = {}, Proj1 proj1 = {}, Proj2 proj2 = {}) const
        {
            return ranges::mismatch(std::move(first1), last1, std::move(first2), last2,
                                    std::move(pred), std::move(proj1), std::move(proj2)
                                   ).in2 == last2;
        }
    
        template<ranges::input_range R1, ranges::input_range R2,
                 class Pred = ranges::equal_to,
                 class Proj1 = std::identity, class Proj2 = std::identity>
        requires std::indirectly_comparable<ranges::iterator_t<R1>,
                                            ranges::iterator_t<R2>,
                                            Pred, Proj1, Proj2>
        constexpr bool operator()(R1&& r1, R2&& r2,
                                  Pred pred = {}, Proj1 proj1 = {}, Proj2 proj2 = {}) const
        {
            return (*this)(ranges::begin(r1), ranges::end(r1),
                           ranges::begin(r2), ranges::end(r2),
                           std::move(pred), std::move(proj1), std::move(proj2));
        }
    };
    
    inline constexpr starts_with_fn starts_with {};
```
  
---  
  
### Notas

Macro de teste de recurso | Valor | Padrão | Recurso   
---|---|---|---
[`__cpp_lib_ranges_starts_ends_with`](<#/doc/feature_test>) | [`202106L`](<#/>) | (C++23) | `std::ranges::starts_with`, std::ranges::ends_with  
  
### Exemplo

Execute este código
```cpp
    #include <algorithm>
    #include <iostream>
    #include <ranges>
    #include <string_view>
    
    int main()
    {
        using namespace std::literals;
    
        constexpr auto ascii_upper = 
        {
            return u8'a' <= c && c <= u8'z' ? static_cast<char8_t>(c + u8'A' - u8'a') : c;
        };
    
        constexpr auto cmp_ignore_case = =
        {
            return ascii_upper(x) == ascii_upper(y);
        };
    
        static_assert(std::ranges::starts_with("const_cast", "const"sv));
        static_assert(std::ranges::starts_with("constexpr", "const"sv));
        static_assert(!std::ranges::starts_with("volatile", "const"sv));
    
        std::cout << std::boolalpha
                  << std::ranges::starts_with(u8"Constantinopolis", u8"constant"sv,
                                              {}, ascii_upper, ascii_upper) << ' '
                  << std::ranges::starts_with(u8"Istanbul", u8"constant"sv,
                                              {}, ascii_upper, ascii_upper) << ' '
                  << std::ranges::starts_with(u8"Metropolis", u8"metro"sv,
                                              cmp_ignore_case) << ' '
                  << std::ranges::starts_with(u8"Acropolis", u8"metro"sv,
                                              cmp_ignore_case) << '\n';
    
        constexpr static auto v = { 1, 3, 5, 7, 9 };
        constexpr auto odd =  { return x % 2; };
        static_assert(std::ranges::starts_with(v, std::views::iota(1)
                                                | std::views::filter(odd)
                                                | std::views::take(3)));
    }
```

Saída:
```
    true false true false
```

### Veja também

[ ranges::ends_with](<#/doc/algorithm/ranges/ends_with>)(C++23) | verifica se um range termina com outro range  
(objeto de função de algoritmo)  
[ ranges::mismatch](<#/doc/algorithm/ranges/mismatch>)(C++20) | encontra a primeira posição onde dois ranges diferem  
(objeto de função de algoritmo)  
[ starts_with](<#/doc/string/basic_string/starts_with>)(C++20) | verifica se a string começa com o prefixo dado   
(função membro pública de `std::basic_string<CharT,Traits,Allocator>`)  
[ starts_with](<#/doc/string/basic_string_view/starts_with>)(C++20) | verifica se o string view começa com o prefixo dado   
(função membro pública de `std::basic_string_view<CharT,Traits>`)