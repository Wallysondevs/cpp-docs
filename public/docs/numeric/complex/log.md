# std::log(std::complex)

Definido no cabeçalho `[<complex>](<#/doc/header/complex>)`

```c
template< class T >
std::complex<T> log( const std::complex<T>& z );
```

Calcula o logaritmo natural (base _e_) complexo de um valor complexo z com um corte de ramo ao longo do eixo real negativo.

### Parâmetros

- **z** — valor complexo

### Valor de retorno

Se nenhum erro ocorrer, o logaritmo natural complexo de z é retornado, no intervalo de uma faixa no intervalo [−iπ, +iπ] ao longo do eixo imaginário e matematicamente ilimitado ao longo do eixo real.

### Tratamento de erros e valores especiais

Os erros são reportados de forma consistente com [math_errhandling](<#/doc/numeric/math/math_errhandling>).

Se a implementação suportar aritmética de ponto flutuante IEEE,

  * A função é contínua no corte de ramo, levando em consideração o sinal da parte imaginária
  * [std::log](<#/doc/numeric/math/log>)([std::conj](<#/doc/numeric/complex/conj>)(z)) == [std::conj](<#/doc/numeric/complex/conj>)([std::log](<#/doc/numeric/math/log>)(z))
  * Se z for `(-0,+0)`, o resultado é `(-∞,π)` e [FE_DIVBYZERO](<#/doc/numeric/fenv/FE_exceptions>) é levantado
  * Se z for `(+0,+0)`, o resultado é `(-∞,+0)` e [FE_DIVBYZERO](<#/doc/numeric/fenv/FE_exceptions>) é levantado
  * Se z for `(x,+∞)` (para qualquer x finito), o resultado é `(+∞,π/2)`
  * Se z for `(x,NaN)` (para qualquer x finito), o resultado é `(NaN,NaN)` e [FE_INVALID](<#/doc/numeric/fenv/FE_exceptions>) pode ser levantado
  * Se z for `(-∞,y)` (para qualquer y positivo finito), o resultado é `(+∞,π)`
  * Se z for `(+∞,y)` (para qualquer y positivo finito), o resultado é `(+∞,+0)`
  * Se z for `(-∞,+∞)`, o resultado é `(+∞,3π/4)`
  * Se z for `(+∞,+∞)`, o resultado é `(+∞,π/4)`
  * Se z for `(±∞,NaN)`, o resultado é `(+∞,NaN)`
  * Se z for `(NaN,y)` (para qualquer y finito), o resultado é `(NaN,NaN)` e [FE_INVALID](<#/doc/numeric/fenv/FE_exceptions>) pode ser levantado
  * Se z for `(NaN,+∞)`, o resultado é `(+∞,NaN)`
  * Se z for `(NaN,NaN)`, o resultado é `(NaN,NaN)`

### Notas

O logaritmo natural de um número complexo z com componentes de coordenadas polares (r,θ) é igual a ln r + i(θ+2nπ), com o valor principal ln r + iθ.

A semântica desta função pretende ser consistente com a função C [`clog`](<#/>).

### Exemplo

Execute este código
```cpp
    #include <cmath>
    #include <complex>
    #include <iostream>
    
    int main()
    {
        std::complex<double> z {0.0, 1.0}; // r = 1, θ = pi / 2
        std::cout << "2 * log" << z << " = " << 2.0 * std::log(z) << '\n';
    
        std::complex<double> z2 {sqrt(2.0) / 2, sqrt(2.0) / 2}; // r = 1, θ = pi / 4
        std::cout << "4 * log" << z2 << " = " << 4.0 * std::log(z2) << '\n';
    
        std::complex<double> z3 {-1.0, 0.0}; // r = 1, θ = pi
        std::cout << "log" << z3 << " = " << std::log(z3) << '\n';
        std::complex<double> z4 {-1.0, -0.0}; // the other side of the cut
        std::cout << "log" << z4 << " (the other side of the cut) = " << std::log(z4) << '\n';
    }
```

Saída possível:
```
    2 * log(0,1) = (0,3.14159)
    4 * log(0.707107,0.707107) = (0,3.14159)
    log(-1,0) = (0,3.14159)
    log(-1,-0) (the other side of the cut) = (0,-3.14159)
```

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento publicado | Comportamento correto
---|---|---|---
[LWG 2597](<https://cplusplus.github.io/LWG/issue2597>) | C++98 | especificação lida incorretamente com partes imaginárias de zero com sinal | requisito errôneo removido

### Ver também

[ log10(std::complex)](<#/doc/numeric/complex/log10>) | logaritmo comum complexo com os cortes de ramo ao longo do eixo real negativo
(modelo de função)
[ exp(std::complex)](<#/doc/numeric/complex/exp>) | exponencial complexa de base _e_
(modelo de função)
[ loglogflogl](<#/doc/numeric/math/log>)(desde C++11)(desde C++11) | calcula o logaritmo natural (base e) (\\({\small\ln{x}}\\)ln(x))
(função)
[ log(std::valarray)](<#/doc/numeric/valarray/log>) | aplica a função [std::log](<#/doc/numeric/math/log>) a cada elemento de valarray
(modelo de função)
[Documentação C](<#/>) para clog