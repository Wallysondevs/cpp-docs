# std::clamp

Definido no cabeçalho `[<algorithm>](<#/doc/header/algorithm>)`

```c
template< class T >
constexpr const T& clamp( const T& v, const T& lo, const T& hi );
template< class T, class Compare >
constexpr const T& clamp( const T& v, const T& lo, const T& hi,
Compare comp );
```

Se o valor de v estiver dentro de `[`lo`, `hi`]`, retorna v; caso contrário, retorna o limite mais próximo.

1) Usa o operador<(até C++20)[std::less](<#/doc/utility/functional/less>){}(desde C++20) para comparar os valores.

Se `T` não for [LessThanComparable](<#/doc/named_req/LessThanComparable>), o comportamento é indefinido.[1](<#/doc/algorithm/clamp>)

2) Usa a função de comparação comp para comparar os valores.

Se lo for maior que hi, o comportamento é indefinido.

1. [↑](<#/doc/algorithm/clamp>) Se `NaN` for evitado, `T` pode ser um tipo de ponto flutuante.

### Parâmetros

- **v** — o valor a ser limitado
- **lo, hi** — os limites para os quais v será limitado
- **comp** — objeto de função de comparação (ou seja, um objeto que satisfaz os requisitos de [Compare](<#/doc/named_req/Compare>)) que retorna true se o primeiro argumento for _menor_ que o segundo.
A assinatura da função de comparação deve ser equivalente à seguinte: bool cmp(const Type1& a, const Type2& b); Embora a assinatura não precise ter const&, a função não deve modificar os objetos passados a ela e deve ser capaz de aceitar todos os valores do tipo (possivelmente const) `Type1` e `Type2` independentemente da [categoria de valor](<#/doc/language/value_category>) (assim, Type1& não é permitido, nem Type1 a menos que para `Type1` uma move seja equivalente a uma copy(desde C++11)).
Os tipos Type1 e Type2 devem ser tais que um objeto do tipo T possa ser implicitamente convertido para ambos.

### Valor de retorno

Referência para lo se v for menor que lo, referência para hi se hi for menor que v, caso contrário, referência para v.

### Complexidade

1) No máximo duas comparações usando o operador<(até C++20)[std::less](<#/doc/utility/functional/less>){}(desde C++20).

2) No máximo duas aplicações da função de comparação comp.

### Implementação possível

[clamp (1)](<#/doc/algorithm/clamp>)
---
```cpp
    template<class T>
    constexpr const T& clamp(const T& v, const T& lo, const T& hi)
    {
        return clamp(v, lo, hi, less{});
    }
```

[clamp (2)](<#/doc/algorithm/clamp>)
```cpp
    template<class T, class Compare>
    constexpr const T& clamp(const T& v, const T& lo, const T& hi, Compare comp)
    {
        return comp(v, lo) ? lo : comp(hi, v) ? hi : v;
    }
```

### Notas

Capturar o resultado de `std::clamp` por referência produz uma referência pendente (dangling reference) se um dos parâmetros for um temporário e esse parâmetro for retornado:
```cpp
    int n = -1;
    const int& r = std::clamp(n, 0, 255); // r is dangling
```

Se v for equivalente a qualquer um dos limites, retorna uma referência para v, não para o limite.

Macro de [teste de recurso](<#/doc/utility/feature_test>) | Valor | Std | Recurso
---|---|---|---
[`__cpp_lib_clamp`](<#/doc/feature_test>) | [`201603L`](<#/>) | (C++17) | [`std::clamp`](<#/doc/algorithm/clamp>)

### Exemplo

Execute este código
```cpp
    #include <algorithm>
    #include <cstdint>
    #include <iomanip>
    #include <iostream>
    
    int main()
    {
        std::cout << "[raw] "
                     "[" << INT8_MIN << ',' << INT8_MAX << "] "
                     "[0," << UINT8_MAX << "]\n";
    
        for (const int v : {-129, -128, -1, 0, 42, 127, 128, 255, 256})
            std::cout << std::setw(4) << v
                      << std::setw(11) << std::clamp(v, INT8_MIN, INT8_MAX)
                      << std::setw(8) << std::clamp(v, 0, UINT8_MAX) << '\n';
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
```

### Veja também

[ min](<#/doc/algorithm/min>) | retorna o menor dos valores dados
(modelo de função)
[ max](<#/doc/algorithm/max>) | retorna o maior dos valores dados
(modelo de função)
[ in_range](<#/doc/utility/in_range>)(C++20) | verifica se um valor inteiro está no range de um dado tipo inteiro
(modelo de função)
[ ranges::clamp](<#/doc/algorithm/ranges/clamp>)(C++20) | limita um valor entre um par de valores de limite
(objeto de função de algoritmo)