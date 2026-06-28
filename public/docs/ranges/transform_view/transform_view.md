# std::ranges::transform_view&lt;V,F&gt;::transform_view

```cpp
transform_view() requires std::default_initializable<V> &&
std::default_initializable<F> = default;  // (1) (desde C++20)
constexpr explicit transform_view( V base, F fun );  // (2) (desde C++20)
```

  
Constrói um `transform_view`.

1) Construtor padrão. Inicializa por valor (value-initializes) a view subjacente [`_base__`](<#/doc/ranges/transform_view>) e a função de transformação [`_fun__`](<#/doc/ranges/transform_view>).

2) Constrói por movimento (move constructs) a view subjacente `_base__` a partir de `base` e a função de transformação `_fun__` a partir de `fun`.

### Parâmetros

base  |  \-  |  view   
---|---|---
fun  |  \-  |  função de transformação   
  
### Exemplo

Demonstra a aproximação de π usando a expansão em série da arcotangente de 1:  
`atan(1) = π/4 ≈ 1 - 1/3 + 1/5 - 1/7 + 1/9 - 1/11 + ...`

Execute este código
```
    #include <iomanip>
    #include <iostream>
    #include <numbers>
    #include <numeric>
    #include <ranges>
     
    int main()
    {
        std::cout << std::setprecision(15) << std::fixed;
        auto atan1term = std::ranges::views::transform(
             { return ((n % 2) ? -1 : 1) * 1.0 / (2 * n + 1); }
        );
        for (const int iterations : {1, 2, 3, 4, 5, 10, 100, 1000, 1'000'000})
        {
            auto seq = std::ranges::views::iota(0, iterations) | atan1term;
            const double accum = std::accumulate(seq.begin(), seq.end(), 0.0);
            std::cout << "π ≈ " << 4 * accum << " (iterations: " << iterations << ")\n";
        }
        std::cout << "π ≈ " << std::numbers::pi << " (std::numbers::pi)\n";
    }
```

Saída possível: 
```
    π ≈ 4.000000000000000 (iterations: 1)
    π ≈ 2.666666666666667 (iterations: 2)
    π ≈ 3.466666666666667 (iterations: 3)
    π ≈ 2.895238095238096 (iterations: 4)
    π ≈ 3.339682539682540 (iterations: 5)
    π ≈ 3.041839618929403 (iterations: 10)
    π ≈ 3.131592903558554 (iterations: 100)
    π ≈ 3.140592653839794 (iterations: 1000)
    π ≈ 3.141591653589774 (iterations: 1000000)
    π ≈ 3.141592653589793 (std::numbers::pi)
```

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente. 

DR  | Aplicado a  | Comportamento conforme publicado  | Comportamento correto   
[LWG 3714](<https://cplusplus.github.io/LWG/issue3714>)  
([P2711R1](<https://wg21.link/P2711R1>))  | C++20  | o construtor com múltiplos parâmetros não era explícito  | tornou-se explícito   
---|---|---|---
[P2325R3](<https://wg21.link/P2325R3>) | C++20  | se `F` não for [`default_initializable`](<#/doc/concepts/default_initializable>), o construtor padrão constrói um `transform_view` que não contém um `F` | o `transform_view` também não é [`default_initializable`](<#/doc/concepts/default_initializable>)