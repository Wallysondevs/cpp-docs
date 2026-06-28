# std::tanh(std::complex)

Definido no cabeçalho `[<complex>](<#/doc/header/complex>)`

```c
template< class T >
complex<T> tanh( const complex<T>& z );
```

Calcula a tangente hiperbólica complexa de um valor complexo z.

### Parâmetros

- **z** — valor complexo

### Valor de retorno

Se nenhum erro ocorrer, a tangente hiperbólica complexa de z é retornada.

### Tratamento de erros e valores especiais

Erros são reportados de forma consistente com [math_errhandling](<#/doc/numeric/math/math_errhandling>).

Se a implementação suporta aritmética de ponto flutuante IEEE,

  * [std::tanh](<#/doc/numeric/math/tanh>)([std::conj](<#/doc/numeric/complex/conj>)(z)) == [std::conj](<#/doc/numeric/complex/conj>)([std::tanh](<#/doc/numeric/math/tanh>)(z)).
  * [std::tanh](<#/doc/numeric/math/tanh>)(-z) == -[std::tanh](<#/doc/numeric/math/tanh>)(z).
  * Se z for `(+0,+0)`, o resultado é `(+0,+0)`.
  * Se z for `(x,+∞)` (para qualquer[1](<#/doc/numeric/complex/tanh>) x finito), o resultado é `(NaN,NaN)` e [FE_INVALID](<#/doc/numeric/fenv/FE_exceptions>) é levantado.
  * Se z for `(x,NaN)` (para qualquer[2](<#/doc/numeric/complex/tanh>) x finito), o resultado é `(NaN,NaN)` e [FE_INVALID](<#/doc/numeric/fenv/FE_exceptions>) pode ser levantado.
  * Se z for `(+∞,y)` (para qualquer y positivo finito), o resultado é `(1,+0)`.
  * Se z for `(+∞,+∞)`, o resultado é `(1,±0)` (o sinal da parte imaginária é não especificado).
  * Se z for `(+∞,NaN)`, o resultado é `(1,±0)` (o sinal da parte imaginária é não especificado).
  * Se z for `(NaN,+0)`, o resultado é `(NaN,+0)`.
  * Se z for `(NaN,y)` (para qualquer y não-zero), o resultado é `(NaN,NaN)` e [FE_INVALID](<#/doc/numeric/fenv/FE_exceptions>) pode ser levantado.
  * Se z for `(NaN,NaN)`, o resultado é `(NaN,NaN)`.

  1. [↑](<#/doc/numeric/complex/tanh>) conforme [C11 DR471](<https://open-std.org/JTC1/SC22/WG14/www/docs/n1892.htm#dr_471>), isso só se aplica para x não-zero. Se `z` for `(0,∞)`, o resultado deve ser `(0,NaN)`.
  2. [↑](<#/doc/numeric/complex/tanh>) conforme [C11 DR471](<https://open-std.org/JTC1/SC22/WG14/www/docs/n1892.htm#dr_471>), isso só se aplica para x não-zero. Se `z` for `(0,NaN)`, o resultado deve ser `(0,NaN)`.

### Notas

A definição matemática da tangente hiperbólica é tanh z = ez
-e-z

---
ez
+e-z

.

A tangente hiperbólica é uma função analítica no plano complexo e não possui cortes de ramo. É periódica em relação à componente imaginária, com período πi, e possui polos de primeira ordem ao longo da linha imaginária, nas coordenadas (0, π(1/2 + n)). No entanto, nenhuma representação comum de ponto flutuante é capaz de representar π/2 exatamente, portanto não há valor do argumento para o qual ocorra um erro de polo.

### Exemplo

Execute este código
```cpp
    #include <cmath>
    #include <complex>
    #include <iostream>
    
    int main()
    {
        std::cout << std::fixed;
        std::complex<double> z(1.0, 0.0); // behaves like real tanh along the real line
        std::cout << "tanh" << z << " = " << std::tanh(z)
                  << " (tanh(1) = " << std::tanh(1) << ")\n";
    
        std::complex<double> z2(0.0, 1.0); // behaves like tangent along the imaginary line
        std::cout << "tanh" << z2 << " = " << std::tanh(z2)
                  << " ( tan(1) = " << std::tan(1) << ")\n";
    }
```

Saída:
```
    tanh(1.000000,0.000000) = (0.761594,0.000000) (tanh(1) = 0.761594)
    tanh(0.000000,1.000000) = (0.000000,1.557408) ( tan(1) = 1.557408)
```

### Veja também

[ sinh(std::complex)](<#/doc/numeric/complex/sinh>) | calcula o seno hiperbólico de um número complexo (\\({\small\sinh{z}}\\)sinh(z))
(modelo de função)
[ cosh(std::complex)](<#/doc/numeric/complex/cosh>) | calcula o cosseno hiperbólico de um número complexo (\\({\small\cosh{z}}\\)cosh(z))
(modelo de função)
[ atanh(std::complex)](<#/doc/numeric/complex/atanh>)(C++11) | calcula a tangente hiperbólica de área de um número complexo (\\({\small\operatorname{artanh}{z}}\\)artanh(z))
(modelo de função)
[ tanhtanhftanhl](<#/doc/numeric/math/tanh>)(C++11)(C++11) | calcula a tangente hiperbólica (\\({\small\tanh{x}}\\)tanh(x))
(função)
[ tanh(std::valarray)](<#/doc/numeric/valarray/tanh>) | aplica a função [std::tanh](<#/doc/numeric/math/tanh>) a cada elemento de valarray
(modelo de função)
[C documentation](<#/>) para ctanh