# operator==,!=,<,<=,>,>=,<=> (std::pair)

Definido no cabeçalho `[<utility>](<#/doc/header/utility>)`

```c
template< class T1, class T2, class U1, class U2 >
bool operator==( const std::pair<T1, T2>& lhs, const std::pair<U1, U2>& rhs );
template< class T1, class T2, class U1, class U2 >
constexpr bool operator==( const std::pair<T1, T2>& lhs,
const std::pair<U1, U2>& rhs );
template< class T1, class T2, class U1, class U2 >
bool operator!=( const std::pair<T1, T2>& lhs, const std::pair<U1, U2>& rhs );
template< class T1, class T2, class U1, class U2 >
constexpr bool operator!=( const std::pair<T1, T2>& lhs,
const std::pair<U1, U2>& rhs );
(até C++20)
template< class T1, class T2, class U1, class U2 >
bool operator<( const std::pair<T1, T2>& lhs, const std::pair<U1, U2>& rhs );
template< class T1, class T2, class U1, class U2 >
constexpr bool operator<( const std::pair<T1, T2>& lhs,
const std::pair<U1, U2>& rhs );
(até C++20)
template< class T1, class T2, class U1, class U2 >
bool operator<=( const std::pair<T1, T2>& lhs, const std::pair<U1, U2>& rhs );
template< class T1, class T2, class U1, class U2 >
constexpr bool operator<=( const std::pair<T1, T2>& lhs,
const std::pair<U1, U2>& rhs );
(até C++20)
template< class T1, class T2, class U1, class U2 >
bool operator>( const std::pair<T1, T2>& lhs, const std::pair<U1, U2>& rhs );
template< class T1, class T2, class U1, class U2 >
constexpr bool operator>( const std::pair<T1, T2>& lhs,
const std::pair<U1, U2>& rhs );
(até C++20)
template< class T1, class T2, class U1, class U2 >
bool operator>=( const std::pair<T1, T2>& lhs, const std::pair<U1, U2>& rhs );
template< class T1, class T2, class U1, class U2 >
constexpr bool operator>=( const std::pair<T1, T2>& lhs,
const std::pair<U1, U2>& rhs );
(até C++20)
template< class T1, class T2, class U1, class U2 >
constexpr std::common_comparison_category_t<synth-three-way-result<T1, U1>,
synth-three-way-result<T2, U2>>
operator<=>( const std::pair<T1, T2>& lhs, const std::pair<U1, U2>& rhs );
```

```cpp
1,2) Testa se ambos os elementos de lhs e rhs são iguais, ou seja, compara lhs.first com rhs.first e lhs.second com rhs.second.
O comportamento é indefinido se o tipo e a categoria de valor de lhs.first == rhs.first ou lhs.second == rhs.second não atenderem aos requisitos BooleanTestable.  // (até C++26)
Esta sobrecarga participa da resolução de sobrecarga apenas se ambos decltype(lhs.first == rhs.first) e decltype(lhs.second == rhs.second) modelarem `_boolean-testable_`.  // (desde C++26)
```

3-6) Compara lhs e rhs lexicograficamente por operator<, ou seja, compara os primeiros elementos e, somente se forem equivalentes, compara os segundos elementos. O comportamento é indefinido se o tipo e a categoria de valor de qualquer um de lhs.first < rhs.first, rhs.first < lhs.first, ou lhs.second < rhs.second não atenderem aos requisitos [BooleanTestable](<#/doc/named_req/BooleanTestable>).

7) Compara lhs e rhs lexicograficamente por [`_synth-three-way_`](<#/doc/standard_library/synth-three-way>), ou seja, compara os primeiros elementos e, somente se forem equivalentes, compara os segundos elementos. [`_synth-three-way-result_`](<#/doc/standard_library/synth-three-way>) é o tipo de retorno de `_synth-three-way_`.

```cpp
Os operadores `<`, `<=`, `>`, `>=`, e `!=` são sintetizados a partir de operator<=> e operator== respectivamente.  // (desde C++20)
```

### Parâmetros

- **lhs, rhs** — pares para comparar

### Valor de retorno

1) true se ambos lhs.first == rhs.first e lhs.second == rhs.second, caso contrário false.

2) !(lhs == rhs)

3) Se lhs.first < rhs.first, retorna true. Caso contrário, se rhs.first < lhs.first, retorna false. Caso contrário, se lhs.second < rhs.second, retorna true. Caso contrário, retorna false.

4) !(rhs < lhs)

5) rhs < lhs

6) !(lhs < rhs)

7) [`_synth-three-way_`](<#/doc/standard_library/synth-three-way>)(lhs.first, rhs.first) se não for igual a ​0​, caso contrário [`_synth-three-way_`](<#/doc/standard_library/synth-three-way>)(lhs.second, rhs.second).

### Notas

```cpp
Os operadores relacionais são definidos em termos do operator< de cada elemento.  // (até C++20)
Os operadores relacionais são definidos em termos de `_synth-three-way_`, que usa operator<=> se possível, ou operator< caso contrário. Notavelmente, se um tipo de elemento não fornecer operator<=> por si só, mas for implicitamente conversível para um tipo comparável de três vias, essa conversão será usada em vez de operator<.  // (desde C++20)
Macro de teste de recurso | Valor | Std | Recurso
`__cpp_lib_constrained_equality` | `202403L` | (C++26) | operator== restrito para std::pair
```

### Exemplo

Como operator< é definido para pares, contêineres de pares podem ser ordenados.

Execute este código
```cpp
    #include <algorithm>
    #include <iomanip>
    #include <iostream>
    #include <string>
    #include <utility>
    #include <vector>
    
    int main()
    {
        std::vector<std::pair<int, std::string>> v = {{2, "baz"}, {2, "bar"}, {1, "foo"}};
        std::sort(v.begin(), v.end());
    
        for (auto p : v)
            std::cout << '{' << p.first << ", " << std::quoted(p.second) << "}\n";
    }
```

Output:
```
    {1, "foo"}
    {2, "bar"}
    {2, "baz"}
```

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento conforme publicado | Comportamento correto
---|---|---|---
[LWG 296](<https://cplusplus.github.io/LWG/issue296>) | C++98 | as descrições de operadores diferentes de `==` e `<` estavam faltando | adicionado
[LWG 2114](<https://cplusplus.github.io/LWG/issue2114>)
([P2167R3](<https://wg21.link/P2167R3>)) | C++98 | pré-condições de tipo para operações booleanas estavam faltando | adicionado
---|---|---|---
[LWG 3865](<https://cplusplus.github.io/LWG/issue3865>) | C++98 | operadores de comparação aceitavam apenas pares do mesmo tipo | aceitar pares de tipos diferentes

### Veja também

[ operator==operator!=operator<operator<=operator>operator>=operator<=>](<#/doc/utility/tuple/operator_cmp>)(removido em C++20)(removido em C++20)(removido em C++20)(removido em C++20)(removido em C++20)(C++20) | compara lexicograficamente os valores na tupla
(modelo de função)