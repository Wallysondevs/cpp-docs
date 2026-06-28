# std::abs(float), std::fabs, std::fabsf, std::fabsl

Definido no cabeçalho `[<cmath>](<#/doc/header/cmath>)`

```c
Definido no cabeçalho `<cstdlib>`
float abs( float num );
double abs( double num );
long double abs( long double num );
constexpr /* floating-point-type */
abs( /* floating-point-type */ num );
Definido no cabeçalho `<cmath>`
float fabs ( float num );
double fabs ( double num );
long double fabs ( long double num );
constexpr /* floating-point-type */
fabs ( /* floating-point-type */ num );
float fabsf( float num );
(constexpr desde C++23)
long double fabsl( long double num );
(constexpr desde C++23)
Sobrecargas adicionais (desde C++11)
Definido no cabeçalho `<cmath>`
template< class Integer >
double fabs ( Integer num );
(constexpr desde C++23)
```

1-4) Calcula o valor absoluto do valor de ponto flutuante num. A biblioteca fornece sobrecargas de `std::abs` e `std::fabs` para todos os tipos de ponto flutuante cv-unqualified como o tipo do parâmetro num. (desde C++23)

A) Sobrecargas adicionais são fornecidas para todos os tipos inteiros, que são tratados como double. | (desde C++11)

Para argumentos integrais, [as sobrecargas integrais de `std::abs`](<#/doc/numeric/math/abs>) são provavelmente melhores correspondências. Se `std::abs` for chamado com um argumento integral unsigned que não pode ser convertido para int por [promoção integral](<#/doc/language/implicit_cast>), o programa é malformado.

### Parâmetros

- **num** — valor de ponto flutuante ou inteiro

### Valor de retorno

Se bem-sucedido, retorna o valor absoluto de arg (`|arg|`). O valor retornado é exato e não depende de nenhum modo de arredondamento.

### Tratamento de erros

Esta função não está sujeita a nenhuma das condições de erro especificadas em [math_errhandling](<#/doc/numeric/math/math_errhandling>).

Se a implementação suporta aritmética de ponto flutuante IEEE (IEC 60559),

*   Se o argumento for ±0, +0 é retornado.
*   Se o argumento for ±∞, +∞ é retornado.
*   Se o argumento for NaN, NaN é retornado.

### Observações

As sobrecargas adicionais não são exigidas para serem fornecidas exatamente como (A). Elas apenas precisam ser suficientes para garantir que, para seu argumento num de tipo inteiro, std::fabs(num) tenha o mesmo efeito que std::fabs(static_cast&lt;double&gt;(num)).

### Exemplo

Execute este código
```cpp
    #include <cmath>
    #include <iostream>
     
    int main()
    {
        std::cout << "abs(+3.0) = " << std::abs(+3.0) << '\n'
                  << "abs(-3.0) = " << std::abs(-3.0) << '\n';
     
        // special values
        std::cout << "abs(-0.0) = " << std::abs(-0.0) << '\n'
                  << "abs(-Inf) = " << std::abs(-INFINITY) << '\n'
                  << "abs(-NaN) = " << std::abs(-NAN) << '\n';
    }
```

Saída possível:
```
    abs(+3.0) = 3
    abs(-3.0) = 3
    abs(-0.0) = 0
    abs(-Inf) = inf
    abs(-NaN) = nan
```

### Relatórios de defeitos

Os seguintes relatórios de defeitos que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento conforme publicado | Comportamento correto
[LWG 2192](<https://cplusplus.github.io/LWG/issue2192>) | C++98 | sobrecargas de `std::abs` foram
declaradas inconsistentemente em dois cabeçalhos | declarou essas sobrecargas
em ambos os cabeçalhos
[LWG 2735](<https://cplusplus.github.io/LWG/issue2735>) | C++11 | sobrecargas de `std::abs` para tipos inteiros
retornando double eram erroneamente exigidas | removeu a exigência

### Veja também

[ abs(int)labsllabs](<#/doc/numeric/math/abs>)(C++11) | calcula o valor absoluto de um valor integral (\\(\small{|x|}\\)|x|)
(função)
[ copysigncopysignfcopysignl](<#/doc/numeric/math/copysign>)(C++11)(C++11)(C++11) | copia o sinal de um valor de ponto flutuante
(função)
[ signbit](<#/doc/numeric/math/signbit>)(C++11) | verifica se o número dado é negativo
(função)
[ abs(std::complex)](<#/doc/numeric/complex/abs>) | retorna a magnitude de um número complexo
(modelo de função)
[ abs(std::valarray)](<#/doc/numeric/valarray/abs>) | aplica a função abs a cada elemento de valarray
(modelo de função)
[Documentação C](<#/>) para fabs