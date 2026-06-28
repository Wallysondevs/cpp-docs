# std::ranges::get(std::ranges::subrange)

Definido no cabeçalho `[<ranges>](<#/doc/header/ranges>)`

```c
template< std::size_t N, class I, class S, ranges::subrange_kind K >
requires ((N == 0 && std::copyable<I>)
constexpr auto get( const ranges::subrange<I, S, K>& r );
template< std::size_t N, class I, class S, ranges::subrange_kind K >
requires (N < 2)
constexpr auto get( ranges::subrange<I, S, K>&& r );
namespace std { using ranges::get; }
```

Fornece suporte a [structured binding](<#/doc/language/structured_binding>).

1) Obtém o iterator ou sentinel de um lvalue de `subrange` (ou um rvalue const) quando N == 0 ou N == 1, respectivamente.

2) O mesmo que (1), exceto que aceita um rvalue de `subrange` não-const.

3) As sobrecargas (1,2) são importadas para o namespace `std`, o que simplifica seu uso e torna cada `subrange` com um iterator copiável um tipo [pair-like](<#/doc/utility/tuple/tuple-like>).

### Parâmetros

- **r** — um `subrange`

### Valor de retorno

1,2) Se N for ​0​, retorna r.begin(). Caso contrário (N for 1), retorna r.end().

### Exemplo

Execute este código
```
    #include <array>
    #include <iostream>
    #include <iterator>
    #include <ranges>
    
    int main()
    {
        std::array a{1, -2, 3, -4};
    
        std::ranges::subrange sub_a{std::next(a.begin()), std::prev(a.end())};
        std::cout << *std::ranges::get<0>(sub_a) << ' '   // == *(begin(a) + 1)
                  << *std::ranges::get<1>(sub_a) << '\n'; // == *(end(a) - 1)
    
        *std::get<0>(sub_a) = 42; // OK
    //  *std::get<2>(sub_a) = 13; // Error: index can only be 0 or 1
    }
```

Saída:
```
    -2 -4
```

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento conforme publicado | Comportamento correto
---|---|---|---
[LWG 3589](<https://cplusplus.github.io/LWG/issue3589>) | C++20 | a sobrecarga ([1](<#/doc/ranges/subrange/get>)) copia `_[begin_](<#/doc/ranges/subrange>)_` se N for ​0​, mas `I` pode não modelar [`copyable`](<#/doc/concepts/copyable>) | restrições adicionadas

### Veja também

[Structured binding](<#/doc/language/structured_binding>) (C++17) | vincula os nomes especificados a sub-objetos ou elementos de tupla do inicializador
---|---
[ get(std::tuple)](<#/doc/utility/tuple/get>)(C++11) | tupla acessa elemento especificado
(modelo de função)
[ get(std::pair)](<#/doc/utility/pair/get>)(C++11) | acessa um elemento de um `pair`
(modelo de função)
[ get(std::array)](<#/doc/container/array/get>)(C++11) | acessa um elemento de um `array`
(modelo de função)
[ get(std::variant)](<#/doc/utility/variant/get>)(C++17) | lê o valor da variant dado o índice ou o tipo (se o tipo for único), lança erro em caso de falha
(modelo de função)
[ get(std::complex)](<#/doc/numeric/complex/get>)(C++26) | obtém uma referência para a parte real ou imaginária de um [std::complex](<#/doc/numeric/complex>)
(modelo de função)