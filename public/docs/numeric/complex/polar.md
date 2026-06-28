# std::polar(std::complex)

Definido no cabeçalho `[<complex>](<#/doc/header/complex>)`

```c
template< class T >
std::complex<T> polar( const T& r, const T& theta = T() );
```

Retorna um número complexo com magnitude r e ângulo de fase theta.

O comportamento é indefinido se r for negativo ou NaN, ou se theta for infinito.

### Parameters

- **r** — magnitude
- **theta** — ângulo de fase

### Return value

Um número complexo determinado por r e theta.

### Notes

std::polar(r, theta) é equivalente a qualquer uma das seguintes expressões:

*   r * [std::exp](<#/doc/numeric/math/exp>)(theta * 1i)
*   r * (cos(theta) + sin(theta) * 1i)
*   [std::complex](<#/doc/numeric/complex>)(r * cos(theta), r * sin(theta)).

Usar polar em vez de exp pode ser cerca de **4.5x** mais rápido em loops vetorizados.

### Example

Execute este código
```
    #include <cmath>
    #include <complex>
    #include <iomanip>
    #include <iostream>
    #include <numbers>
    using namespace std::complex_literals;

    int main()
    {
        constexpr auto π_2{std::numbers::pi / 2.0};
        constexpr auto mag{1.0};

        std::cout
            << std::fixed << std::showpos << std::setprecision(1)
            << "   θ: │ polar:      │ exp:        │ complex:    │ trig:\n";
        for (int n{}; n != 4; ++n)
        {
            const auto θ{n * π_2};
            std::cout << std::setw(4) << 90 * n << "° │ "
                      << std::polar(mag, θ) << " │ "
                      << mag * std::exp(θ * 1.0i) << " │ "
                      << std::complex(mag * cos(θ), mag * sin(θ)) << " │ "
                      << mag * (cos(θ) + 1.0i * sin(θ)) << '\n';
        }
    }
```

Saída:
```
       θ: │ polar:      │ exp:        │ complex:    │ trig:
      +0° │ (+1.0,+0.0) │ (+1.0,+0.0) │ (+1.0,+0.0) │ (+1.0,+0.0)
     +90° │ (+0.0,+1.0) │ (+0.0,+1.0) │ (+0.0,+1.0) │ (+0.0,+1.0)
    +180° │ (-1.0,+0.0) │ (-1.0,+0.0) │ (-1.0,+0.0) │ (-1.0,+0.0)
    +270° │ (-0.0,-1.0) │ (-0.0,-1.0) │ (-0.0,-1.0) │ (-0.0,-1.0)
```

### Defect reports

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento conforme publicado | Comportamento correto
---|---|---|---
[LWG 2459](<https://cplusplus.github.io/LWG/issue2459>) | C++98 | comportamento incerto para algumas entradas | tornado indefinido
[LWG 2870](<https://cplusplus.github.io/LWG/issue2870>) | C++98 | valor padrão do parâmetro theta não dependente | tornado dependente

### See also

[ abs(std::complex)](<#/doc/numeric/complex/abs>) | retorna a magnitude de um número complexo
(function template)
[ arg](<#/doc/numeric/complex/arg>) | retorna o ângulo de fase
(function template)
[ exp(std::complex)](<#/doc/numeric/complex/exp>) | exponencial complexa de base _e_
(function template)