# operator==,!=,&lt;,&lt;=,&gt;,&gt;=,&lt;=&gt;(std::tuple)

Definido no cabeçalho `[<tuple>](<#/doc/header/tuple>)`

```c
template< class... TTypes, class... UTypes >
bool operator==( const std::tuple<TTypes...>& lhs,
const std::tuple<UTypes...>& rhs );
(constexpr desde C++14)
template< class... TTypes, class... UTypes >
bool operator!=( const std::tuple<TTypes...>& lhs,
const std::tuple<UTypes...>& rhs );
(constexpr desde C++14)
(até C++20)
template< class... TTypes, class... UTypes >
bool operator<( const std::tuple<TTypes...>& lhs,
const std::tuple<UTypes...>& rhs );
(constexpr desde C++14)
(até C++20)
template< class... TTypes, class... UTypes >
bool operator<=( const std::tuple<TTypes...>& lhs,
const std::tuple<UTypes...>& rhs );
(constexpr desde C++14)
(até C++20)
template< class... TTypes, class... UTypes >
bool operator>( const std::tuple<TTypes...>& lhs,
const std::tuple<UTypes...>& rhs );
(constexpr desde C++14)
(até C++20)
template< class... TTypes, class... UTypes >
bool operator>=( const std::tuple<TTypes...>& lhs,
const std::tuple<UTypes...>& rhs );
(constexpr desde C++14)
(até C++20)
template< class... TTypes, class... UTypes >
constexpr std::common_comparison_category_t<
synth-three-way-result<TTypes, Elems>...>
operator<=>( const std::tuple<TTypes...>& lhs,
const std::tuple<UTypes...>& rhs );
template< class... TTypes, tuple-like UTuple >
constexpr bool operator==( const tuple<TTypes...>& lhs, const UTuple& rhs );
template< class... TTypes, tuple-like UTuple >
constexpr std::common_comparison_category_t<
synth-three-way-result<TTypes, /* Elems */>...>
operator<=>( const tuple<TTypes...>& lhs, const UTuple& rhs );
```

1,2) Compara cada elemento da tuple lhs com o elemento correspondente da tuple rhs usando operator==.

1) Retorna true se todos os pares de elementos correspondentes forem iguais.

2) Retorna !(lhs == rhs).

```cpp
Se sizeof...(TTypes) não for igual a sizeof...(UTypes), ou std::get<i>(lhs) == std::get<i>(rhs) não for uma expressão válida para qualquer i em ``​0​`, `sizeof...(Types)`)`, o programa é malformado. Se o tipo e a categoria de valor de std::get<i>(lhs) == std::get<i>(rhs) não atenderem aos requisitos [BooleanTestable para qualquer i em `[`​0​`, `sizeof...(Types)`)`, o comportamento é indefinido.  // (até C++26)
Esta sobrecarga participa da resolução de sobrecarga somente se sizeof...(TTypes) for igual a sizeof...(UTypes), std::get<i>(lhs) == std::get<i>(rhs) for uma expressão válida e decltype(std::get<i>(lhs) == std::get<i>(rhs)) modelar `_boolean-testable_` para cada i em `[`​0​`, `sizeof...(Types)`)`.  // (desde C++26)
```

3-6) Compara lhs e rhs lexicograficamente usando operator<, ou seja, compara os primeiros elementos, se forem equivalentes, compara os segundos elementos, se esses forem equivalentes, compara os terceiros elementos, e assim por diante.

3) Para tuples vazias, retorna false. Para tuples não vazias, o efeito é equivalente a
if (std::get<0>(lhs) < std::get<0>(rhs)) return true;

if (std::get<0>(rhs) < std::get<0>(lhs)) return false;
if (std::get<1>(lhs) < std::get<1>(rhs)) return true;
if (std::get<1>(rhs) < std::get<1>(lhs)) return false;
...

return std::get&lt;N - 1&gt;(lhs) < std::get&lt;N - 1&gt;(rhs);

4) Retorna !(rhs < lhs).

5) Retorna rhs < lhs.

6) Retorna !(lhs < rhs).

Se sizeof...(TTypes) não for igual a sizeof...(UTypes), ou qualquer uma das expressões de comparação mostradas nas declarações de equivalência não for uma expressão válida, o programa é malformado.

Se o tipo e a categoria de valor de qualquer uma das expressões de comparação mostradas nas declarações de equivalência não atenderem aos requisitos [BooleanTestable](<#/doc/named_req/BooleanTestable>), o comportamento é indefinido.

7) Compara lhs e rhs lexicograficamente por [`_synth-three-way_`](<#/doc/standard_library/synth-three-way>), ou seja, compara os primeiros elementos, se forem equivalentes, compara os segundos elementos, se esses forem equivalentes, compara os terceiros elementos, e assim por diante.

* Para tuples vazias, retorna [`std::strong_ordering::equal`](<#/doc/utility/compare/strong_ordering>).
* Para tuples não vazias, o efeito é equivalente a

if (auto c =` `[` _synth-three-way_`](<#/doc/standard_library/synth-three-way>)(std::get<0>(lhs), std::get<0>(rhs)); c != 0) return c;
if (auto c =` `[` _synth-three-way_`](<#/doc/standard_library/synth-three-way>)(std::get<1>(lhs), std::get<1>(rhs)); c != 0) return c;
`...`
return` `[` _synth-three-way_`](<#/doc/standard_library/synth-three-way>)(std::get&lt;N - 1&gt;(lhs), std::get&lt;N - 1&gt;(rhs));

8) O mesmo que (1), exceto que rhs é um objeto [`_tuple-like_`](<#/doc/utility/tuple/tuple-like>), e o número de elementos de rhs é determinado por [std::tuple_size_v](<#/doc/utility/tuple_size>)&lt;UTuple&gt; em vez disso. Esta sobrecarga só pode ser encontrada via [argument-dependent lookup](<#/doc/language/adl>).

9) O mesmo que (7), exceto que rhs é um objeto [`_tuple-like_`](<#/doc/utility/tuple/tuple-like>). /* Elems */ denota o pack de tipos [std::tuple_element_t](<#/doc/utility/tuple_element>)<i, UTuple> para cada i em `[`​0​`, `[std::tuple_size_v](<#/doc/utility/tuple_size>)&lt;UTuple&gt;`)` em ordem crescente. Esta sobrecarga só pode ser encontrada via [argument-dependent lookup](<#/doc/language/adl>).

Todos os operadores de comparação são de curto-circuito; eles não acessam elementos da tuple além do que é necessário para determinar o resultado da comparação.

```cpp
Os operadores `<`, `<=`, `>`, `>=`, e `!=` são sintetizados a partir de operator<=> e operator== respectivamente.  // (desde C++20)
```

### Parâmetros

- **lhs, rhs** — tuples a comparar

### Valor de retorno

1,8) true se std::get<i>(lhs) == std::get<i>(rhs) para todo i em `[`​0​`, `sizeof...(Types)`)`, caso contrário false. Para duas tuples vazias, retorna true.

2) !(lhs == rhs)

3) true se o primeiro elemento não equivalente em lhs for menor que o em rhs, false se o primeiro elemento não equivalente em rhs for menor que o em lhs ou se não houver elemento não equivalente. Para duas tuples vazias, retorna false.

4) !(rhs < lhs)

5) rhs < lhs

6) !(lhs < rhs)

7,9) A relação entre o primeiro par de elementos não equivalentes, se houver, [`std::strong_ordering::equal`](<#/doc/utility/compare/strong_ordering>) caso contrário. Para duas tuples vazias, retorna [`std::strong_ordering::equal`](<#/doc/utility/compare/strong_ordering>).

### Notas

```cpp
Os operadores relacionais são definidos em termos do operator< de cada elemento.  // (até C++20)
Os operadores relacionais são definidos em termos de `_synth-three-way_`, que usa operator<=> se possível, ou operator< caso contrário. Notavelmente, se um tipo de elemento não fornecer seu próprio operator<=>, mas for implicitamente conversível para um tipo comparável de três vias, essa conversão será usada em vez de operator<.  // (desde C++20)
Macro de teste de recurso | Valor | Std | Recurso
`__cpp_lib_constrained_equality` | `202403L` | (C++26) | Operador== restrito para std::tuple
```

### Exemplo

Como operator< é definido para tuples, contêineres de tuples podem ser ordenados.

Execute este código
```cpp
    #include <algorithm>
    #include <iostream>
    #include <tuple>
    #include <vector>
    
    int main()
    {
        std::vector<std::tuple<int, std::string, float>> v
        {
            {2, "baz", -0.1},
            {2, "bar", 3.14},
            {1, "foo", 10.1},
            {2, "baz", -1.1},
        };
        std::sort(v.begin(), v.end());
    
        for (const auto& p: v)
            std::cout << "{ " << get<0>(p)
                      << ", " << get<1>(p)
                      << ", " << get<2>(p)
                      << " }\n";
    }
```

Saída:
```
    { 1, foo, 10.1 }
    { 2, bar, 3.14 }
    { 2, baz, -1.1 }
    { 2, baz, -0.1 }
```

### Relatórios de defeitos

Os seguintes relatórios de defeitos que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento conforme publicado | Comportamento correto
[LWG 2114](<https://cplusplus.github.io/LWG/issue2114>)
([P2167R3](<https://wg21.link/P2167R3>)) | C++11 | pré-condições de tipo para operações booleanas estavam faltando | adicionado

### Veja também

[ operator==operator!=operator<operator<=operator>operator>=operator<=>](<#/doc/utility/pair/operator_cmp>)(removed in C++20)(removed in C++20)(removed in C++20)(removed in C++20)(removed in C++20)(C++20) | compara lexicograficamente os valores no `pair`
(modelo de função)