# std::asinh(std::complex)

Definido no cabeçalho `[<complex>](<#/doc/header/complex>)`

```c
template< class T >
complex<T> asinh( const complex<T>& z );
```

Calcula o seno hiperbólico de arco complexo de um valor complexo z com cortes de ramo fora do intervalo [−i; +i] ao longo do eixo imaginário.

### Parâmetros

- **z** — valor complexo

### Valor de retorno

Se nenhum erro ocorrer, o seno hiperbólico de arco complexo de z é retornado, no intervalo de uma faixa matematicamente ilimitada ao longo do eixo real e no intervalo [−iπ/2; +iπ/2] ao longo do eixo imaginário.

### Tratamento de erros e valores especiais

Erros são reportados de forma consistente com [math_errhandling](<#/doc/numeric/math/math_errhandling>).

Se a implementação suporta aritmética de ponto flutuante IEEE,

*   [std::asinh](<#/doc/numeric/math/asinh>)([std::conj](<#/doc/numeric/complex/conj>)(z)) == [std::conj](<#/doc/numeric/complex/conj>)([std::asinh](<#/doc/numeric/math/asinh>)(z))
*   [std::asinh](<#/doc/numeric/math/asinh>)(-z) == -[std::asinh](<#/doc/numeric/math/asinh>)(z)
*   Se z é `(+0,+0)`, o resultado é `(+0,+0)`
*   Se z é `(x,+∞)` (para qualquer x finito positivo), o resultado é `(+∞,π/2)`
*   Se z é `(x,NaN)` (para qualquer x finito), o resultado é `(NaN,NaN)` e [FE_INVALID](<#/doc/numeric/fenv/FE_exceptions>) pode ser levantado
*   Se z é `(+∞,y)` (para qualquer y finito positivo), o resultado é `(+∞,+0)`
*   Se z é `(+∞,+∞)`, o resultado é `(+∞,π/4)`
*   Se z é `(+∞,NaN)`, o resultado é `(+∞,NaN)`
*   Se z é `(NaN,+0)`, o resultado é `(NaN,+0)`
*   Se z é `(NaN,y)` (para qualquer y finito não-zero), o resultado é `(NaN,NaN)` e [FE_INVALID](<#/doc/numeric/fenv/FE_exceptions>) pode ser levantado
*   Se z é `(NaN,+∞)`, o resultado é `(±∞,NaN)` (o sinal da parte real é não especificado)
*   Se z é `(NaN,NaN)`, o resultado é `(NaN,NaN)`

### Notas

Embora o padrão C++ nomeie esta função como "seno hiperbólico de arco complexo", as funções inversas das funções hiperbólicas são as funções de área. Seu argumento é a área de um setor hiperbólico, não um arco. O nome correto é "seno hiperbólico inverso complexo" e, menos comum, "seno hiperbólico de área complexo".

O seno hiperbólico inverso é uma função multivalorada e requer um corte de ramo no plano complexo. O corte de ramo é convencionalmente colocado nos segmentos de linha (-_i_ ∞,-_i_) e (_i_ ,_i_ ∞) do eixo imaginário.

A definição matemática do valor principal do seno hiperbólico inverso é asinh z = ln(z + √1+z2
).

Para qualquer z, asinh(z) = asin(iz)
---
i
.

### Exemplo

Execute este código
```
    #include <complex>
    #include <iostream>
     
    int main()
    {
        std::cout << std::fixed;
        std::complex<double> z1(0.0, -2.0);
        std::cout << "asinh" << z1 << " = " << std::asinh(z1) << '\n';
     
        std::complex<double> z2(-0.0, -2);
        std::cout << "asinh" << z2 << " (o outro lado do corte) = "
                  << std::asinh(z2) << '\n';
     
        // for any z, asinh(z) = asin(iz) / i
        std::complex<double> z3(1.0, 2.0);
        std::complex<double> i(0.0, 1.0);
        std::cout << "asinh" << z3 << " = " << std::asinh(z3) << '\n'
                  << "asin" << z3 * i << " / i = " << std::asin(z3 * i) / i << '\n';
    }
```

Saída:
```
    asinh(0.000000,-2.000000) = (1.316958,-1.570796)
    asinh(-0.000000,-2.000000) (the other side of the cut) = (-1.316958,-1.570796)
    asinh(1.000000,2.000000) = (1.469352,1.063440)
    asin(-2.000000,1.000000) / i = (1.469352,1.063440)
```

### Veja também

[ acosh(std::complex)](<#/doc/numeric/complex/acosh>)(C++11) | calcula o cosseno hiperbólico de área de um número complexo (\\({\small\operatorname{arcosh}{z}}\\)arcosh(z))
(modelo de função)
[ atanh(std::complex)](<#/doc/numeric/complex/atanh>)(C++11) | calcula a tangente hiperbólica de área de um número complexo (\\({\small\operatorname{artanh}{z}}\\)artanh(z))
(modelo de função)
[ sinh(std::complex)](<#/doc/numeric/complex/sinh>) | calcula o seno hiperbólico de um número complexo (\\({\small\sinh{z}}\\)sinh(z))
(modelo de função)
[ asinhasinhfasinhl](<#/doc/numeric/math/asinh>)(C++11)(C++11)(C++11) | calcula o seno hiperbólico inverso (\\({\small\operatorname{arsinh}{x}}\\)arsinh(x))
(função)
[Documentação C](<#/>) para casinh