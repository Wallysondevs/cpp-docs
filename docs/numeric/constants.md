# Constantes matemáticas

### Constantes (desde C++20)  
  
Definido no cabeçalho `[<numbers>](<#/doc/header/numbers>)`  
---  
Definido no namespace `std::numbers`  

```cpp
e_v
(variable template)
log2e_v
(variable template)
log10e_v
(variable template)
pi_v
(variable template)
inv_pi_v
---
π
```

  
(variable template)  
inv_sqrtpi_v |  \\(\frac1{\sqrt\pi}\\)| 1  
---  
√π  
  
(variable template)  
ln2_v |  \\(\ln{2}\\)ln 2  
(variable template)  
ln10_v |  \\(\ln{10}\\)ln 10  
(variable template)  
sqrt2_v |  \\(\sqrt2\\)√2  
(variable template)  
sqrt3_v |  \\(\sqrt3\\)√3  
(variable template)  
inv_sqrt3_v |  \\(\frac1{\sqrt3}\\)| 1  
---  
√3  
  
(variable template)  
egamma_v |  [a constante de Euler–Mascheroni γ](<https://en.wikipedia.org/wiki/Euler%27s_constant> "enwiki:Euler's constant")  
(variable template)  
phi_v |  [a razão áurea Φ](<https://en.wikipedia.org/wiki/Golden_ratio> "enwiki:Golden ratio") (\\(\frac{1+\sqrt5}2\\)| 1 + √5  
---  
2  
)  
(variable template)  
inline constexpr double e |  e_v&lt;double&gt;   
(constant)  
inline constexpr double log2e |  log2e_v&lt;double&gt;   
(constant)  
inline constexpr double log10e |  log10e_v&lt;double&gt;   
(constant)  
inline constexpr double pi |  pi_v&lt;double&gt;   
(constant)  
inline constexpr double inv_pi |  inv_pi_v&lt;double&gt;   
(constant)  
inline constexpr double inv_sqrtpi |  inv_sqrtpi_v&lt;double&gt;   
(constant)  
inline constexpr double ln2 |  ln2_v&lt;double&gt;   
(constant)  
inline constexpr double ln10 |  ln10_v&lt;double&gt;   
(constant)  
inline constexpr double sqrt2 |  sqrt2_v&lt;double&gt;   
(constant)  
inline constexpr double sqrt3 |  sqrt3_v&lt;double&gt;   
(constant)  
inline constexpr double inv_sqrt3 |  inv_sqrt3_v&lt;double&gt;   
(constant)  
inline constexpr double egamma |  egamma_v&lt;double&gt;   
(constant)  
inline constexpr double phi |  phi_v&lt;double&gt;   
(constant)  
  
### Notas

Um programa que instancia um template primário de um template de variável de constante matemática é malformado. 

A biblioteca padrão especializa templates de variáveis de constantes matemáticas para todos os tipos de ponto flutuante (ou seja, float, double, long double e [tipos de ponto flutuante de largura fixa](<#/doc/types/floating-point>)(desde C++23)). 

Um programa pode especializar parcial ou explicitamente um template de variável de constante matemática, desde que a especialização dependa de um [tipo definido pelo programa](<#/doc/language/type-id>). 

[Macro de teste de recurso](<#/doc/utility/feature_test>) | Valor | Padrão | Recurso   
---|---|---|---
[`__cpp_lib_math_constants`](<#/doc/feature_test>) | [`201907L`](<#/>) | (C++20) | [Constantes matemáticas](<#/doc/numeric/constants>)  
  
### Exemplo

Execute este código
```
    #include <cmath>
    #include <iomanip>
    #include <iostream>
    #include <limits>
    #include <numbers>
    #include <string_view>
     
    auto egamma_aprox(const unsigned iterations)
    {
        long double s{};
        for (unsigned m{2}; m != iterations; ++m)
            if (const long double t{std::riemann_zetal(m) / m}; m % 2)
                s -= t;
            else
                s += t;
        return s;
    };
     
    int main()
    {
        using namespace std::numbers;
        using namespace std::string_view_literals;
     
        const auto x = std::sqrt(inv_pi) / inv_sqrtpi +
            std::ceil(std::exp2(log2e)) + sqrt3 * inv_sqrt3 + std::exp(0);
        const auto v = (phi * phi - phi) + 1 / std::log2(sqrt2) +
            log10e * ln10 + std::pow(e, ln2) - std::cos(pi);    
        std::cout << "The answer is " << x * v << '\n';
     
        constexpr auto γ{"0.577215664901532860606512090082402"sv};
        std::cout
            << "γ as 10⁶ sums of ±ζ(m)/m   = "
            << egamma_aprox(1'000'000) << '\n'
            << "γ as egamma_v<float>       = "
            << std::setprecision(std::numeric_limits<float>::digits10 + 1)
            << egamma_v<float> << '\n'
            << "γ as egamma_v<double>      = "
            << std::setprecision(std::numeric_limits<double>::digits10 + 1)
            << egamma_v<double> << '\n'
            << "γ as egamma_v<long double> = "
            << std::setprecision(std::numeric_limits<long double>::digits10 + 1)
            << egamma_v<long double> << '\n'
            << "γ with " << γ.length() - 1 << " digits precision = " << γ << '\n';
    }
```

Saída possível: 
```
    The answer is 42
    γ as 10⁶ sums of ±ζ(m)/m   = 0.577215
    γ as egamma_v<float>       = 0.5772157
    γ as egamma_v<double>      = 0.5772156649015329
    γ as egamma_v<long double> = 0.5772156649015328606
    γ with 34 digits precision = 0.577215664901532860606512090082402
```

### Ver também

[ ratio](<#/doc/numeric/ratio/ratio>)(C++11) |  representa uma fração racional exata   
(template de classe)  