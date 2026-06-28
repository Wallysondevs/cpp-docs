# std::sinh(std::complex)

Definido no cabeçalho `[<complex>](<#/doc/header/complex>)`

```c
template< class T >
complex<T> sinh( const complex<T>& z );
```

Calcula o seno hiperbólico complexo de um valor complexo z.

### Parâmetros

- **z** — valor complexo

### Valor de retorno

Se nenhum erro ocorrer, o seno hiperbólico complexo de z é retornado.

### Tratamento de erros e valores especiais

Os erros são reportados de forma consistente com [math_errhandling](<#/doc/numeric/math/math_errhandling>).

Se a implementação suporta aritmética de ponto flutuante IEEE,

  * [std::sinh](<#/doc/numeric/math/sinh>)([std::conj](<#/doc/numeric/complex/conj>)(z)) == [std::conj](<#/doc/numeric/complex/conj>)([std::sinh](<#/doc/numeric/math/sinh>)(z))
  * [std::sinh](<#/doc/numeric/math/sinh>)(z) == -[std::sinh](<#/doc/numeric/math/sinh>)(-z)
  * Se z for `(+0,+0)`, o resultado é `(+0,+0)`
  * Se z for `(+0,+∞)`, o resultado é `(±0,NaN)` (o sinal da parte real é não especificado) e [FE_INVALID](<#/doc/numeric/fenv/FE_exceptions>) é levantado
  * Se z for `(+0,NaN)`, o resultado é `(±0,NaN)`
  * Se z for `(x,+∞)` (para qualquer x finito positivo), o resultado é `(NaN,NaN)` e [FE_INVALID](<#/doc/numeric/fenv/FE_exceptions>) é levantado
  * Se z for `(x,NaN)` (para qualquer x finito positivo), o resultado é `(NaN,NaN)` e [FE_INVALID](<#/doc/numeric/fenv/FE_exceptions>) pode ser levantado
  * Se z for `(+∞,+0)`, o resultado é `(+∞,+0)`
  * Se z for `(+∞,y)` (para qualquer y finito positivo), o resultado é `+∞cis(y)`
  * Se z for `(+∞,+∞)`, o resultado é `(±∞,NaN)` (o sinal da parte real é não especificado) e [FE_INVALID](<#/doc/numeric/fenv/FE_exceptions>) é levantado
  * Se z for `(+∞,NaN)`, o resultado é `(±∞,NaN)` (o sinal da parte real é não especificado)
  * Se z for `(NaN,+0)`, o resultado é `(NaN,+0)`
  * Se z for `(NaN,y)` (para qualquer y finito não nulo), o resultado é `(NaN,NaN)` e [FE_INVALID](<#/doc/numeric/fenv/FE_exceptions>) pode ser levantado
  * Se z for `(NaN,NaN)`, o resultado é `(NaN,NaN)`

onde cis(y) é cos(y) + i sin(y).

### Notas

A definição matemática do seno hiperbólico é sinh z = ez
-e-z

---
2
.

O seno hiperbólico é uma função inteira no plano complexo e não possui cortes de ramo. É periódico em relação à componente imaginária, com período 2πi.

### Exemplo

Execute este código
```cpp
    #include <cmath>
    #include <complex>
    #include <iostream>
    
    int main()
    {
        std::cout << std::fixed;
        std::complex<double> z(1.0, 0.0); // behaves like real sinh along the real line
        std::cout << "sinh" << z << " = " << std::sinh(z)
                  << " (sinh(1) = " << std::sinh(1) << ")\n";
    
        std::complex<double> z2(0.0, 1.0); // behaves like sine along the imaginary line
        std::cout << "sinh" << z2 << " = " << std::sinh(z2)
                  << " ( sin(1) = " << std::sin(1) << ")\n";
    }
```

Saída:
```
    sinh(1.000000,0.000000) = (1.175201,0.000000) (sinh(1) = 1.175201)
    sinh(0.000000,1.000000) = (0.000000,0.841471) ( sin(1) = 0.841471)
```

### Veja também

[ cosh(std::complex)](<#/doc/numeric/complex/cosh>) | calcula o cosseno hiperbólico de um número complexo (\\({\small\cosh{z}}\\)cosh(z))
(modelo de função)
[ tanh(std::complex)](<#/doc/numeric/complex/tanh>) | calcula a tangente hiperbólica de um número complexo (\\({\small\tanh{z}}\\)tanh(z))
(modelo de função)
[ asinh(std::complex)](<#/doc/numeric/complex/asinh>)(C++11) | calcula o seno hiperbólico inverso de um número complexo (\\({\small\operatorname{arsinh}{z}}\\)arsinh(z))
(modelo de função)
[ sinhsinhfsinhl](<#/doc/numeric/math/sinh>)(C++11)(C++11) | calcula o seno hiperbólico (\\({\small\sinh{x}}\\)sinh(x))
(função)
[ sinh(std::valarray)](<#/doc/numeric/valarray/sinh>) | aplica a função [std::sinh](<#/doc/numeric/math/sinh>) a cada elemento de valarray
(modelo de função)
[Documentação C](<#/>) para csinh