# std::ranges::clamp

Definido no cabeçalho `[<algorithm>](<#/doc/header/algorithm>)`

```c
Assinatura da chamada
template< class T, class Proj = std::identity,
std::indirect_strict_weak_order<std::projected<const T*, Proj>> Comp =
ranges::less >
constexpr const T&
clamp( const T& v, const T& lo, const T& hi, Comp comp = {}, Proj proj = {} );
```

Se o valor de `v` estiver dentro de `[`lo`, `hi`]`, retorna `v`; caso contrário, retorna o limite mais próximo.

O comportamento é indefinido se `lo` for maior que `hi`.

As entidades tipo função descritas nesta página são [_objetos de função de algoritmo_](<#/doc/algorithm/ranges>) (informalmente conhecidos como _niebloids_), ou seja:

  * Listas explícitas de argumentos de template não podem ser especificadas ao chamar qualquer uma delas.
  * Nenhuma delas é visível para [argument-dependent lookup](<#/doc/language/adl>).
  * Quando qualquer uma delas é encontrada por [normal unqualified lookup](<#/doc/language/unqualified_lookup>) como o nome à esquerda do operador de chamada de função, [argument-dependent lookup](<#/doc/language/adl>) é inibido.

### Parâmetros

v | \- | o valor a ser limitado
---|---|---
lo, hi | \- | os limites para os quais `v` deve ser limitado
comp | \- | a comparação a ser aplicada aos elementos projetados
proj | \- | a projeção a ser aplicada a `v`, `lo` e `hi`

### Valor de retorno

Referência a `lo` se o valor projetado de `v` for menor que o valor projetado de `lo`, referência a `hi` se o valor projetado de `hi` for menor que o valor projetado de `v`, caso contrário, referência a `v`.

### Complexidade

No máximo duas comparações e três aplicações da projeção.

### Possível implementação
```cpp
    struct clamp_fn
    {
        template<class T, class Proj = std::identity,
                 std::indirect_strict_weak_order<std::projected<const T*, Proj>>
                     Comp = std::ranges::less>
        constexpr const T& operator()(const T& v, const T& lo, const T& hi,
                                      Comp comp = {}, Proj proj = {}) const
        {
            auto&& pv = std::invoke(proj, v);
    
            if (std::invoke(comp, std::forward<decltype(pv)>(pv), std::invoke(proj, lo)))
                return lo;
    
            if (std::invoke(comp, std::invoke(proj, hi), std::forward<decltype(pv)>(pv)))
                return hi;
    
            return v;
        }
    };
    
    inline constexpr clamp_fn clamp;
```

---

### Notas

Capturar o resultado de `std::ranges::clamp` por referência produz uma referência pendente (dangling reference) se um dos parâmetros for um temporário e esse parâmetro for retornado:
```cpp
    int n = -1;
    const int& r = std::ranges::clamp(n, 0, 255); // r é pendente
```

Se `v` compara como equivalente a qualquer um dos limites, retorna uma referência a `v`, não ao limite.

Esta função não deve ser usada com uma projeção que retorna por valor e um comparador que recebe argumentos por valor, a menos que uma movimentação do tipo de resultado da projeção para o tipo de parâmetro do comparador seja equivalente a uma cópia. Se a comparação via `std::invoke` alterasse o resultado da projeção, o comportamento é indefinido devido [aos requisitos semânticos de `std::regular_invocable`](<#/doc/concepts/invocable>) (subsumido por [std::indirect_strict_weak_order](<#/doc/iterator/indirect_strict_weak_order>)).

O padrão exige que a categoria de valor do resultado da projeção seja preservada, e `proj` só pode ser chamado em `v` uma vez, o que significa que um resultado de projeção que é um prvalue deve ser armazenado em cache e movido duas vezes para as duas chamadas ao comparador.

  * [libstdc++](<https://github.com/gcc-mirror/gcc/blob/f3169941996c76ecbfae9c37709d2b57652be555/libstdc%2B%2B-v3/include/bits/ranges_algo.h#L3196-L3218>) não está em conformidade com isso e sempre passa o resultado da projeção como um lvalue.
  * [libc++](<https://github.com/llvm/llvm-project/issues/64717>) costumava executar a projeção duas vezes, o que foi corrigido no Clang 18.
  * [MSVC STL](<https://github.com/microsoft/STL/issues/1893>) costumava executar a projeção duas vezes, o que foi corrigido no VS 2022 17.2.

### Exemplo

Execute este código
```cpp
    #include <algorithm>
    #include <cstdint>
    #include <iomanip>
    #include <iostream>
    #include <string>
    
    using namespace std::literals;
    namespace ranges = std::ranges;
    
    int main()
    {
        std::cout << "[raw] [" << INT8_MIN << ',' << INT8_MAX << "] "
                     "[0" << ',' << UINT8_MAX << "]\n";
        for (int const v : {-129, -128, -1, 0, 42, 127, 128, 255, 256})
            std::cout << std::setw(4) << v
                      << std::setw(11) << ranges::clamp(v, INT8_MIN, INT8_MAX)
                      << std::setw(8) << ranges::clamp(v, 0, UINT8_MAX) << '\n';
        std::cout << std::string(23, '-') << '\n';
    
        // Projection function
        const auto stoi =  { return std::stoi(s); };
    
        // Same as above, but with strings
        for (std::string const v : {"-129", "-128", "-1", "0", "42",
                                    "127", "128", "255", "256"})
            std::cout << std::setw(4) << v
                      << std::setw(11) << ranges::clamp(v, "-128"s, "127"s, {}, stoi)
                      << std::setw(8) << ranges::clamp(v, "0"s, "255"s, {}, stoi)
                      << '\n';
    }
```

Saída:
```
    [raw] [-128,127] [0,255]
    -129       -128       0
    -128       -128       0
      -1         -1       0
       0          0       0
      42         42      42
     127        127     127
     128        127     128
     255        127     255
     256        127     255
    -----------------------
    -129       -128       0
    -128       -128       0
      -1         -1       0
       0          0       0
      42         42      42
     127        127     127
     128        127     128
     255        127     255
     256        127     255
```

### Veja também

[ ranges::min](<#/doc/algorithm/ranges/min>)(C++20) | retorna o menor dos valores dados
(objeto de função de algoritmo)
[ ranges::max](<#/doc/algorithm/ranges/max>)(C++20) | retorna o maior dos valores dados
(objeto de função de algoritmo)
[ in_range](<#/doc/utility/in_range>)(C++20) | verifica se um valor inteiro está no range de um dado tipo inteiro
(modelo de função)
[ clamp](<#/doc/algorithm/clamp>)(C++17) | limita um valor entre um par de valores de limite
(modelo de função)