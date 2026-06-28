# std::lerp

Definido no cabeçalho `[<cmath>](<#/doc/header/cmath>)`

```c
constexpr float lerp( float a, float b, float t ) noexcept;
constexpr double lerp( double a, double b, double t ) noexcept;
constexpr long double lerp( long double a, long double b,
long double t ) noexcept;
(até C++23)
constexpr /* floating-point-type */
lerp( /* floating-point-type */ a,
/* floating-point-type */ b,
/* floating-point-type */ t ) noexcept;
Sobrecargas adicionais
Definido no cabeçalho `<cmath>`
template< class Arithmetic1, class Arithmetic2, class Arithmetic3 >
constexpr /* common-floating-point-type */
lerp( Arithmetic1 a, Arithmetic2 b, Arithmetic3 t ) noexcept;
```

1) Calcula a [interpolação linear](<https://en.wikipedia.org/wiki/Linear_interpolation> "enwiki:Linear interpolation") entre a e b, se o parâmetro t estiver dentro de `[`​0​`, `1`)` (a [extrapolação linear](<https://en.wikipedia.org/wiki/Extrapolation#Linear> "enwiki:Extrapolation") caso contrário), ou seja, o resultado de \\(a+t(b−a)\\)a+t(b−a) levando em conta a imprecisão do cálculo de ponto flutuante. A biblioteca fornece sobrecargas para todos os tipos de ponto flutuante cv-unqualified como o tipo dos parâmetros a, b e t.(desde C++23)

A) Sobrecargas adicionais são fornecidas para todas as outras combinações de tipos aritméticos.

### Parâmetros

- **a, b, t** — valores de ponto flutuante ou inteiros

### Valor de retorno

\\(a + t(b − a)\\)a + t(b − a)

Quando [std::isfinite](<#/doc/numeric/math/isfinite>)(a) && [std::isfinite](<#/doc/numeric/math/isfinite>)(b) for verdadeiro, as seguintes propriedades são garantidas:

*   Se t == 0, o resultado é igual a a.
*   Se t == 1, o resultado é igual a b.
*   Se t >= 0 && t <= 1, o resultado é finito.
*   Se [std::isfinite](<#/doc/numeric/math/isfinite>)(t) && a == b, o resultado é igual a a.
*   Se [std::isfinite](<#/doc/numeric/math/isfinite>)(t) || (b - a != 0 && [std::isinf](<#/doc/numeric/math/isinf>)(t)), o resultado não é [`NaN`](<#/doc/numeric/math/NAN>).

Seja CMP(x, y) igual a 1 se x > y, -1 se x < y, e ​0​ caso contrário. Para quaisquer t1 e t2, o produto de

*   CMP(std::lerp(a, b, t2), std::lerp(a, b, t1)),
*   CMP(t2, t1), e
*   CMP(b, a)

é não-negativo. (Ou seja, `std::lerp` é monotônico.)

### Observações

As sobrecargas adicionais não são obrigadas a ser fornecidas exatamente como em (A). Elas só precisam ser suficientes para garantir que, para o primeiro argumento num1, o segundo argumento num2 e o terceiro argumento num3:

*   Se num1, num2 ou num3 tiver o tipo long double, então std::lerp(num1, num2, num3) tem o mesmo efeito que std::lerp(static_cast&lt;long double&gt;(num1),
    static_cast<long double>(num2),
    static_cast<long double>(num3)).
*   Caso contrário, se num1, num2 e/ou num3 tiver o tipo double ou um tipo inteiro, então std::lerp(num1, num2, num3) tem o mesmo efeito que std::lerp(static_cast&lt;double&gt;(num1),
    static_cast<double>(num2),
    static_cast<double>(num3)).
*   Caso contrário, se num1, num2 ou num3 tiver o tipo float, então std::lerp(num1, num2, num3) tem o mesmo efeito que std::lerp(static_cast&lt;float&gt;(num1),
    static_cast<float>(num2),
    static_cast<float>(num3)).

| (até C++23)
Se num1, num2 e num3 tiverem tipos aritméticos, então std::lerp(num1, num2, num3) tem o mesmo efeito que std::lerp(static_cast</*common-floating-point-type*/>(num1),
static_cast</*common-floating-point-type*/>(num2),
static_cast</*common-floating-point-type*/>(num3)), onde /*common-floating-point-type*/ é o tipo de ponto flutuante com o maior [rank de conversão de ponto flutuante](<#/doc/language/usual_arithmetic_conversions>) e o maior [subrank de conversão de ponto flutuante](<#/doc/language/usual_arithmetic_conversions>) entre os tipos de num1, num2 e num3, argumentos de tipo inteiro são considerados como tendo o mesmo rank de conversão de ponto flutuante que double. Se nenhum tipo de ponto flutuante com o maior rank e subrank existir, então a [resolução de sobrecarga](<#/doc/language/overload_resolution>) não resulta em um candidato utilizável das sobrecargas fornecidas. | (desde C++23)
---|---|---|---
Macro de [teste de recurso](<#/doc/utility/feature_test>) | Valor | Padrão | Recurso
[`__cpp_lib_interpolate`](<#/doc/feature_test>) | [`201902L`](<#/>) | (C++20) | `std::lerp`, [std::midpoint](<#/doc/numeric/midpoint>)

### Exemplo

Execute este código
```cpp
    #include <cassert>
    #include <cmath>
    #include <iostream>
    
    float naive_lerp(float a, float b, float t)
    {
        return a + t * (b - a);
    }
    
    int main()
    {
        std::cout << std::boolalpha;
    
        const float a = 1e8f, b = 1.0f;
        const float midpoint = std::lerp(a, b, 0.5f);
    
        std::cout << "a = " << a << ", " << "b = " << b << '\n'
                  << "midpoint = " << midpoint << '\n';
    
        std::cout << "std::lerp is exact: "
                  << (a == std::lerp(a, b, 0.0f)) << ' '
                  << (b == std::lerp(a, b, 1.0f)) << '\n';
    
        std::cout << "naive_lerp is exact: "
                  << (a == naive_lerp(a, b, 0.0f)) << ' '
                  << (b == naive_lerp(a, b, 1.0f)) << '\n';
    
        std::cout << "std::lerp(a, b, 1.0f) = " << std::lerp(a, b, 1.0f) << '\n'
                  << "naive_lerp(a, b, 1.0f) = " << naive_lerp(a, b, 1.0f) << '\n';
    
        assert(not std::isnan(std::lerp(a, b, INFINITY))); // lerp aqui pode ser -inf
    
        std::cout << "Extrapolation demo, given std::lerp(5, 10, t):\n";
        for (auto t{-2.0}; t <= 2.0; t += 0.5)
            std::cout << std::lerp(5.0, 10.0, t) << ' ';
        std::cout << '\n';
    }
```

Saída possível:
```
    a = 1e+08, b = 1
    midpoint = 5e+07
    std::lerp is exact?: true true
    naive_lerp is exact?: true false
    std::lerp(a, b, 1.0f) = 1
    naive_lerp(a, b, 1.0f) = 0
    Extrapolation demo, given std::lerp(5, 10, t):
    -5 -2.5 0 2.5 5 7.5 10 12.5 15
```

### Veja também

[ midpoint](<#/doc/numeric/midpoint>)(C++20) | ponto médio entre dois números ou ponteiros
(modelo de função)
\*\[Valor]: O ano/mês em que o recurso foi adotado. O hiperlink sob cada valor abre uma página de suporte do compilador com uma entrada para o recurso dado.
\*\[Padrão]: Padrão no qual o recurso é introduzido; DR significa relatório de defeito contra essa revisão.