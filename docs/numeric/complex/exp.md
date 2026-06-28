# std::exp(std::complex)

Definido no cabeçalho `[<complex>](<#/doc/header/complex>)`

```c
template< class T >
std::complex<T> exp( const std::complex<T>& z );
```

  
Calcula o exponencial de base _e_ de z, ou seja, _e_ (número de Euler, `2.7182818`) elevado à potência z.

### Parâmetros

z  |  \-  |  valor complexo   
  
### Valor de retorno

Se nenhum erro ocorrer, _e_ elevado à potência de z, \\(\small e^z\\)ez  
, é retornado.

### Tratamento de erros e valores especiais

Os erros são reportados de forma consistente com [math_errhandling](<#/doc/numeric/math/math_errhandling>).

Se a implementação suporta aritmética de ponto flutuante IEEE,

  * [std::exp](<#/doc/numeric/math/exp>)([std::conj](<#/doc/numeric/complex/conj>)(z)) == [std::conj](<#/doc/numeric/complex/conj>)([std::exp](<#/doc/numeric/math/exp>)(z))
  * Se z for `(±0,+0)`, o resultado é `(1,+0)`
  * Se z for `(x,+∞)` (para qualquer x finito), o resultado é `(NaN,NaN)` e [FE_INVALID](<#/doc/numeric/fenv/FE_exceptions>) é levantado.
  * Se z for `(x,NaN)` (para qualquer x finito), o resultado é `(NaN,NaN)` e [FE_INVALID](<#/doc/numeric/fenv/FE_exceptions>) pode ser levantado.
  * Se z for `(+∞,+0)`, o resultado é `(+∞,+0)`
  * Se z for `(-∞,y)` (para qualquer y finito), o resultado é `+0cis(y)`
  * Se z for `(+∞,y)` (para qualquer y finito e não nulo), o resultado é `+∞cis(y)`
  * Se z for `(-∞,+∞)`, o resultado é `(±0,±0)` (sinais não especificados)
  * Se z for `(+∞,+∞)`, o resultado é `(±∞,NaN)` e [FE_INVALID](<#/doc/numeric/fenv/FE_exceptions>) é levantado (o sinal da parte real não é especificado)
  * Se z for `(-∞,NaN)`, o resultado é `(±0,±0)` (sinais não especificados)
  * Se z for `(+∞,NaN)`, o resultado é `(±∞,NaN)` (o sinal da parte real não é especificado)
  * Se z for `(NaN,+0)`, o resultado é `(NaN,+0)`
  * Se z for `(NaN,y)` (para qualquer y não nulo), o resultado é `(NaN,NaN)` e [FE_INVALID](<#/doc/numeric/fenv/FE_exceptions>) pode ser levantado
  * Se z for `(NaN,NaN)`, o resultado é `(NaN,NaN)`

onde \\(\small{\rm cis}(y)\\)cis(y) é \\(\small \cos(y)+{\rm i}\sin(y)\\)cos(y) + i sin(y).

### Notas

A função exponencial complexa \\(\small e^z\\)ez  
para \\(\small z = x + {\rm i}y\\)z = x+iy é igual a \\(\small e^x {\rm cis}(y)\\)ex  
cis(y), ou, \\(\small e^x (\cos(y)+{\rm i}\sin(y))\\)ex  
(cos(y) + i sin(y)).

A função exponencial é uma _função inteira_ no plano complexo e não possui cortes de ramo.

Os seguintes têm resultados equivalentes quando a parte real é 0:

  * [std::exp](<#/doc/numeric/math/exp>)([std::complex](<#/doc/numeric/complex>)&lt;float&gt;(0, theta))
  * [std::complex](<#/doc/numeric/complex>)&lt;float&gt;(cosf(theta), sinf(theta))
  * [std::polar](<#/doc/numeric/complex/polar>)(1.f, theta)

Neste caso, `exp` pode ser cerca de 4.5x mais lento. Uma das outras formas deve ser usada em vez de chamar `exp` com um argumento cuja parte real é 0 literal. No entanto, não há benefício em tentar evitar `exp` com uma verificação em tempo de execução de z.real() == 0.

### Exemplo

Execute este código
```cpp
    #include <cmath>
    #include <complex>
    #include <iostream>
     
    int main()
    {
       const double pi = std::acos(-1.0);
       const std::complex<double> i(0.0, 1.0);
     
       std::cout << std::fixed << " exp(i * pi) = " << std::exp(i * pi) << '\n';
    }
```

Saída:
```
    exp(i * pi) = (-1.000000,0.000000)
```

### Veja também

[ log(std::complex)](<#/doc/numeric/complex/log>) | logaritmo natural complexo com os cortes de ramo ao longo do eixo real negativo   
(modelo de função)  
[ expexpfexpl](<#/doc/numeric/math/exp>)(C++11)(C++11) | retorna e elevado à potência dada (\\({\small e^x}\\)ex)   
(função)  
[ exp(std::valarray)](<#/doc/numeric/valarray/exp>) | aplica a função [std::exp](<#/doc/numeric/math/exp>) a cada elemento de valarray   
(modelo de função)  
[ polar](<#/doc/numeric/complex/polar>) | constrói um número complexo a partir de magnitude e ângulo de fase   
(modelo de função)  
[documentação C](<#/>) para cexp