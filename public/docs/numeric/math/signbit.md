# std::signbit

Definido no cabeçalho `[<cmath>](<#/doc/header/cmath>)`

```c
bool signbit( float num );
bool signbit( double num );
bool signbit( long double num );
(até C++23)
constexpr bool signbit( /*floating-point-type*/ num );
Sobrecarga SIMD (desde C++26)
Definido no cabeçalho `<simd>`
template< /*math-floating-point*/ V >
constexpr typename /*deduced-simd-t*/<V>::mask_type
signbit ( const V& v_num );
Sobrecargas adicionais
Definido no cabeçalho `<cmath>`
template< class Integer >
bool signbit( Integer num );
(constexpr desde C++23)
```

1) Determina se o número de ponto flutuante `num` fornecido é negativo. A biblioteca fornece sobrecargas para todos os tipos de ponto flutuante cv-não qualificados como o tipo do parâmetro `num`. (desde C++23)

S) A sobrecarga SIMD executa um `std::signbit` elemento a elemento em `v_num`.

(Veja [`_math-floating-point_`](<#/doc/numeric/simd>) e [`_deduced-simd-t_`](<#/doc/numeric/simd>) para suas definições.)
| (desde C++26)

A) Sobrecargas adicionais são fornecidas para todos os tipos inteiros, que são tratados como double.

### Parâmetros

- **num** — valor de ponto flutuante ou inteiro
- **v_num** — um objeto data-parallel de especialização `std::basic_simd` onde seu tipo de elemento é um tipo de ponto flutuante

### Valor de retorno

1) `true` se `num` for negativo, `false` caso contrário.

S) Um objeto de máscara data-parallel onde o i-ésimo elemento é igual a `true` se `v_num[i]` for negativo ou `false` caso contrário para todo `i` no intervalo `[`​0​`, `v_num.size()`)`.

### Observações

Esta função detecta o bit de sinal de zeros, infinitos e NaNs. Juntamente com [std::copysign](<#/doc/numeric/math/copysign>), `std::signbit` é uma das duas únicas maneiras portáteis de examinar o sinal de um NaN.

As sobrecargas adicionais não são obrigadas a ser fornecidas exatamente como (A). Elas só precisam ser suficientes para garantir que, para seu argumento `num` de tipo inteiro, `std::signbit(num)` tenha o mesmo efeito que `std::signbit(static_cast<double>(num))`.

### Exemplo

Execute este código
```cpp
#include <cmath>
#include <iostream>
 
int main()
{
    std::cout << std::boolalpha
              << "signbit(+0.0) = " << std::signbit(+0.0) << '\n'
              << "signbit(-0.0) = " << std::signbit(-0.0) << '\n'
              << "signbit(+nan) = " << std::signbit(+NAN) << '\n'
              << "signbit(-nan) = " << std::signbit(-NAN) << '\n'
              << "signbit(+inf) = " << std::signbit(+INFINITY) << '\n'
              << "signbit(-inf) = " << std::signbit(-INFINITY) << '\n';
}
```

Saída:
```
signbit(+0.0) = false
signbit(-0.0) = true
signbit(+nan) = false
signbit(-nan) = true
signbit(+inf) = false
signbit(-inf) = true
```

### Veja também

[ abs(float)fabsfabsffabsl](<#/doc/numeric/math/fabs>)(C++11)(C++11) | valor absoluto de um valor de ponto flutuante (\\(\small{|x|}\\)|x|)
(função)
[ copysigncopysignfcopysignl](<#/doc/numeric/math/copysign>)(C++11)(C++11)(C++11) | copia o sinal de um valor de ponto flutuante
(função)
[Documentação C](<#/>) para signbit