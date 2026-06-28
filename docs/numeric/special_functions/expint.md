# std::expint, std::expintf, std::expintl

Definido no cabeçalho `[<cmath>](<#/doc/header/cmath>)`

```c
float expint ( float num );
double expint ( double num );
long double expint ( long double num );
(ate C++23)
/* floating-point-type */ expint( /* floating-point-type */ num );
float expintf( float num );
long double expintl( long double num );
Sobrecargas adicionais
Definido no cabeçalho `<cmath>`
template< class Integer >
double expint ( Integer num );
```

1-3) Calcula a [integral exponencial](<https://en.wikipedia.org/wiki/Exponential_integral> "enwiki:Exponential integral") de num. A biblioteca fornece sobrecargas de `std::expint` para todos os tipos de ponto flutuante não qualificados por cv como o tipo do parâmetro num. (desde C++23)

A) Sobrecargas adicionais são fornecidas para todos os tipos inteiros, que são tratados como double.

### Parâmetros

- **num** — valor de ponto flutuante ou inteiro

### Valor de retorno

Se nenhum erro ocorrer, o valor da integral exponencial de num, ou seja, -∫∞
-num _e_ -t
---
t
d _t_ , é retornado.

### Tratamento de erros

Erros podem ser reportados conforme especificado em [math_errhandling](<#/doc/numeric/math/math_errhandling>).

*   Se o argumento for NaN, NaN é retornado e nenhum erro de domínio é reportado.
*   Se o argumento for ±0, -∞ é retornado.

### Notas

Implementações que não suportam C++17, mas suportam [ISO 29124:2010](<#/doc/experimental/special_math>), fornecem esta função se `__STDCPP_MATH_SPEC_FUNCS__` for definido pela implementação para um valor de pelo menos 201003L e se o usuário definir `__STDCPP_WANT_MATH_SPEC_FUNCS__` antes de incluir quaisquer cabeçalhos da standard library.

Implementações que não suportam ISO 29124:2010 mas suportam TR 19768:2007 (TR1), fornecem esta função no cabeçalho `tr1/cmath` e no namespace `std::tr1`.

Uma implementação desta função também está [disponível em boost.math](<https://www.boost.org/doc/libs/release/libs/math/doc/html/math_toolkit/expint/expint_i.html>).

As sobrecargas adicionais não são obrigadas a ser fornecidas exatamente como (A). Elas apenas precisam ser suficientes para garantir que, para seu argumento num de tipo inteiro, std::expint(num) tenha o mesmo efeito que std::expint(static_cast&lt;double&gt;(num)).

### Exemplo

Execute este código
```cpp
    #include <algorithm>
    #include <cmath>
    #include <iostream>
    #include <vector>
    
    template<int Height = 5, int BarWidth = 1, int Padding = 1, int Offset = 0, class Seq>
    void draw_vbars(Seq&& s, const bool DrawMinMax = true)
    {
        static_assert(0 < Height and 0 < BarWidth and 0 <= Padding and 0 <= Offset);
    
        auto cout_n = 
        {
            while (n-- > 0)
                std::cout << v;
        };
    
        const auto [min, max] = std::minmax_element(std::cbegin(s), std::cend(s));
    
        std::vector<std::div_t> qr;
        for (typedef decltype(*std::cbegin(s)) V; V e : s)
            qr.push_back(std::div(std::lerp(V(0), 8 * Height,
                                            (e - *min) / (*max - *min)), 8));
    
        for (auto h{Height}; h-- > 0; cout_n('\n'))
        {
            cout_n(' ', Offset);
    
            for (auto dv : qr)
            {
                const auto q{dv.quot}, r{dv.rem};
                unsigned char d[]{0xe2, 0x96, 0x88, 0}; // Full Block: '█'
                q < h ? d[0] = ' ', d[1] = 0 : q == h ? d[2] -= (7 - r) : 0;
                cout_n(d, BarWidth), cout_n(' ', Padding);
            }
    
            if (DrawMinMax && Height > 1)
                Height - 1 == h ? std::cout << "┬ " << *max:
                              h ? std::cout << "│ "
                                : std::cout << "┴ " << *min;
        }
    }
    
    int main()
    {
        std::cout << "Ei(0) = " << std::expint(0) << '\n'
                  << "Ei(1) = " << std::expint(1) << '\n'
                  << "Gompertz constant = " << -std::exp(1) * std::expint(-1) << '\n';
    
        std::vector<float> v;
        for (float x{1.f}; x < 8.8f; x += 0.3565f)
            v.push_back(std::expint(x));
        draw_vbars<9, 1, 1>(v);
    }
```

Saída:
```
    Ei(0) = -inf
    Ei(1) = 1.89512
    Gompertz constant = 0.596347
                                              █ ┬ 666.505
                                              █ │
                                            ▆ █ │
                                            █ █ │
                                          █ █ █ │
                                        ▆ █ █ █ │
                                    ▁ ▆ █ █ █ █ │
                                ▂ ▅ █ █ █ █ █ █ │
    ▁ ▁ ▁ ▁ ▁ ▁ ▁ ▂ ▂ ▃ ▃ ▄ ▆ ▇ █ █ █ █ █ █ █ █ ┴ 1.89512
```

### Links externos

[Weisstein, Eric W. "Exponential Integral."](<https://mathworld.wolfram.com/ExponentialIntegral.html>) De MathWorld — Um Recurso Web da Wolfram.
---
\*\[Value]: O ano/mês em que o recurso foi adotado. O hiperlink sob cada valor abre uma página de suporte do compilador com a entrada para o recurso dado.
\*\[Std]: Padrão no qual o recurso é introduzido; DR significa relatório de defeito contra essa revisão.