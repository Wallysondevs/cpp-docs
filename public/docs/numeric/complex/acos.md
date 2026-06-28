# std::acos(std::complex)

Definido no cabeçalho `[<complex>](<#/doc/header/complex>)`

```c
template< class T >
complex<T> acos( const complex<T>& z );
```

Calcula o arco cosseno complexo de um valor complexo z. Cortes de ramo existem fora do intervalo [−1, +1] ao longo do eixo real.

### Parâmetros

- **z** — valor complexo

### Valor de retorno

Se nenhum erro ocorrer, o arco cosseno complexo de z é retornado, no intervalo de uma faixa ilimitada ao longo do eixo imaginário e no intervalo [0, +π] ao longo do eixo real.

### Tratamento de erros e valores especiais

Erros são relatados de forma consistente com [math_errhandling](<#/doc/numeric/math/math_errhandling>).

Se a implementação suportar aritmética de ponto flutuante IEEE,

  * [std::acos](<#/doc/numeric/math/acos>)([std::conj](<#/doc/numeric/complex/conj>)(z)) == [std::conj](<#/doc/numeric/complex/conj>)([std::acos](<#/doc/numeric/math/acos>)(z))
  * Se z for `(±0,+0)`, o resultado é `(π/2,-0)`
  * Se z for `(±0,NaN)`, o resultado é `(π/2,NaN)`
  * Se z for `(x,+∞)` (para qualquer x finito), o resultado é `(π/2,-∞)`
  * Se z for `(x,NaN)` (para qualquer x finito não nulo), o resultado é `(NaN,NaN)` e [FE_INVALID](<#/doc/numeric/fenv/FE_exceptions>) pode ser levantado.
  * Se z for `(-∞,y)` (para qualquer y finito positivo), o resultado é `(π,-∞)`
  * Se z for `(+∞,y)` (para qualquer y finito positivo), o resultado é `(+0,-∞)`
  * Se z for `(-∞,+∞)`, o resultado é `(3π/4,-∞)`
  * Se z for `(+∞,+∞)`, o resultado é `(π/4,-∞)`
  * Se z for `(±∞,NaN)`, o resultado é `(NaN,±∞)` (o sinal da parte imaginária é não especificado)
  * Se z for `(NaN,y)` (para qualquer y finito), o resultado é `(NaN,NaN)` e [FE_INVALID](<#/doc/numeric/fenv/FE_exceptions>) pode ser levantado
  * Se z for `(NaN,+∞)`, o resultado é `(NaN,-∞)`
  * Se z for `(NaN,NaN)`, o resultado é `(NaN,NaN)`

### Observações

O cosseno inverso (ou arco cosseno) é uma função multivalorada e requer um corte de ramo no plano complexo. O corte de ramo é convencionalmente posicionado nos segmentos de linha (-∞,-1) e (1,∞) do eixo real.

A definição matemática do valor principal do arco cosseno é acos z = 1
---
2
π + _i_ ln(_i_ z + √1-z2
).

Para qualquer z, acos(z) = π - acos(-z).

### Exemplo

Execute este código
```cpp
    #include <cmath>
    #include <complex>
    #include <iostream>
    
    int main()
    {
        std::cout << std::fixed;
        std::complex<double> z1(-2.0, 0.0);
        std::cout << "acos" << z1 << " = " << std::acos(z1) << '\n';
    
        std::complex<double> z2(-2.0, -0.0);
        std::cout << "acos" << z2 << " (the other side of the cut) = "
                  << std::acos(z2) << '\n';
    
        // for any z, acos(z) = pi - acos(-z)
        const double pi = std::acos(-1);
        std::complex<double> z3 = pi - std::acos(z2);
        std::cout << "cos(pi - acos" << z2 << ") = " << std::cos(z3) << '\n';
    }
```

Saída:
```
    acos(-2.000000,0.000000) = (3.141593,-1.316958)
    acos(-2.000000,-0.000000) (the other side of the cut) = (3.141593,1.316958)
    cos(pi - acos(-2.000000,-0.000000)) = (2.000000,0.000000)
```

### Veja também

[ asin(std::complex)](<#/doc/numeric/complex/asin>)(desde C++11) | calcula o arco seno de um número complexo (\\({\small\arcsin{z}}\\)arcsin(z))
(modelo de função)
[ atan(std::complex)](<#/doc/numeric/complex/atan>)(desde C++11) | calcula o arco tangente de um número complexo (\\({\small\arctan{z}}\\)arctan(z))
(modelo de função)
[ cos(std::complex)](<#/doc/numeric/complex/cos>) | calcula o cosseno de um número complexo (\\({\small\cos{z}}\\)cos(z))
(modelo de função)
[ acosacosfacosl](<#/doc/numeric/math/acos>)(desde C++11)(desde C++11) | calcula o arco cosseno (\\({\small\arccos{x}}\\)arccos(x))
(função)
[ acos(std::valarray)](<#/doc/numeric/valarray/acos>) | aplica a função [std::acos](<#/doc/numeric/math/acos>) a cada elemento de valarray
(modelo de função)
[Documentação C](<#/>) para cacos