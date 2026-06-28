# std::atanh(std::complex)

Definido no cabeçalho `[<complex>](<#/doc/header/complex>)`

```c
template< class T >
complex<T> atanh( const complex<T>& z );
```

Calcula a tangente hiperbólica de arco complexa de z com cortes de ramo fora do intervalo [−1; +1] ao longo do eixo real.

### Parâmetros

- **z** — valor complexo

### Valor de retorno

Se nenhum erro ocorrer, a tangente hiperbólica de arco complexa de z é retornada, no intervalo de uma semi-faixa matematicamente ilimitada ao longo do eixo real e no intervalo [−iπ/2; +iπ/2] ao longo do eixo imaginário.

### Tratamento de erros e valores especiais

Os erros são reportados de forma consistente com [math_errhandling](<#/doc/numeric/math/math_errhandling>).

Se a implementação suporta aritmética de ponto flutuante IEEE,

*   [std::atanh](<#/doc/numeric/math/atanh>)([std::conj](<#/doc/numeric/complex/conj>)(z)) == [std::conj](<#/doc/numeric/complex/conj>)([std::atanh](<#/doc/numeric/math/atanh>)(z))
*   [std::atanh](<#/doc/numeric/math/atanh>)(-z) == -[std::atanh](<#/doc/numeric/math/atanh>)(z)
*   Se z for `(+0,+0)`, o resultado é `(+0,+0)`
*   Se z for `(+0,NaN)`, o resultado é `(+0,NaN)`
*   Se z for `(+1,+0)`, o resultado é `(+∞,+0)` e [FE_DIVBYZERO](<#/doc/numeric/fenv/FE_exceptions>) é levantado
*   Se z for `(x,+∞)` (para qualquer x positivo finito), o resultado é `(+0,π/2)`
*   Se z for `(x,NaN)` (para qualquer x finito não nulo), o resultado é `(NaN,NaN)` e [FE_INVALID](<#/doc/numeric/fenv/FE_exceptions>) pode ser levantado
*   Se z for `(+∞,y)` (para qualquer y positivo finito), o resultado é `(+0,π/2)`
*   Se z for `(+∞,+∞)`, o resultado é `(+0,π/2)`
*   Se z for `(+∞,NaN)`, o resultado é `(+0,NaN)`
*   Se z for `(NaN,y)` (para qualquer y finito), o resultado é `(NaN,NaN)` e [FE_INVALID](<#/doc/numeric/fenv/FE_exceptions>) pode ser levantado
*   Se z for `(NaN,+∞)`, o resultado é `(±0,π/2)` (o sinal da parte real é não especificado)
*   Se z for `(NaN,NaN)`, o resultado é `(NaN,NaN)`

### Notas

Embora o padrão C++ nomeie esta função como "tangente hiperbólica de arco complexa", as funções inversas das funções hiperbólicas são as funções de área. Seu argumento é a área de um setor hiperbólico, não um arco. O nome correto é "tangente hiperbólica inversa complexa" e, menos comum, "tangente hiperbólica de área complexa".

A tangente hiperbólica inversa é uma função multivalorada e requer um corte de ramo no plano complexo. O corte de ramo é convencionalmente colocado nos segmentos de linha (-∞,-1] e [+1,+∞) do eixo real.

A definição matemática do valor principal da tangente hiperbólica inversa é atanh z = ln(1+z) - ln(1-z)
---
2
.
Para qualquer z, atanh(z) = atan(iz)
---
i
.

### Exemplo

Execute este código
```cpp
    #include <complex>
    #include <iostream>
    
    int main()
    {
        std::cout << std::fixed;
        std::complex<double> z1(2.0, 0.0);
        std::cout << "atanh" << z1 << " = " << std::atanh(z1) << '\n';
    
        std::complex<double> z2(2.0, -0.0);
        std::cout << "atanh" << z2 << " (the other side of the cut) = "
                  << std::atanh(z2) << '\n';
    
        // for any z, atanh(z) = atanh(iz) / i
        std::complex<double> z3(1.0, 2.0);
        std::complex<double> i(0.0, 1.0);
        std::cout << "atanh" << z3 << " = " << std::atanh(z3) << '\n'
                  << "atan" << z3 * i << " / i = " << std::atan(z3 * i) / i << '\n';
    }
```

Saída:
```
    atanh(2.000000,0.000000) = (0.549306,1.570796)
    atanh(2.000000,-0.000000) (the other side of the cut) = (0.549306,-1.570796)
    atanh(1.000000,2.000000) = (0.173287,1.178097)
    atan(-2.000000,1.000000) / i = (0.173287,1.178097)
```

### Veja também

[ asinh(std::complex)](<#/doc/numeric/complex/asinh>)(C++11) | calcula o seno hiperbólico de área de um número complexo (\\({\small\operatorname{arsinh}{z}}\\)arsinh(z))
(modelo de função)
[ acosh(std::complex)](<#/doc/numeric/complex/acosh>)(C++11) | calcula o cosseno hiperbólico de área de um número complexo (\\({\small\operatorname{arcosh}{z}}\\)arcosh(z))
(modelo de função)
[ tanh(std::complex)](<#/doc/numeric/complex/tanh>) | calcula a tangente hiperbólica de um número complexo (\\({\small\tanh{z}}\\)tanh(z))
(modelo de função)
[ atanhatanhfatanhl](<#/doc/numeric/math/atanh>)(C++11)(C++11)(C++11) | calcula a tangente hiperbólica inversa (\\({\small\operatorname{artanh}{x}}\\)artanh(x))
(função)
[documentação C](<#/>) para catanh