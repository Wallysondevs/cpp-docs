# std::sqrt(std::complex)

Definido no cabeçalho `[<complex>](<#/doc/header/complex>)`

```c
template< class T >
std::complex<T> sqrt( const std::complex<T>& z );
```

Calcula a raiz quadrada do número complexo z com um corte de ramo ao longo do eixo real negativo.

### Parâmetros

- **z** — número complexo do qual calcular a raiz quadrada

### Valor de retorno

Se nenhum erro ocorrer, retorna a raiz quadrada de z, no intervalo do semiplano direito, incluindo o eixo imaginário ([0; +∞) ao longo do eixo real e (−∞; +∞) ao longo do eixo imaginário).

### Tratamento de erros e valores especiais

Erros são reportados de forma consistente com [math_errhandling](<#/doc/numeric/math/math_errhandling>).

Se a implementação suporta aritmética de ponto flutuante IEEE,

*   A função é contínua no corte de ramo, levando em consideração o sinal da parte imaginária
*   [std::sqrt](<#/doc/numeric/math/sqrt>)([std::conj](<#/doc/numeric/complex/conj>)(z)) == [std::conj](<#/doc/numeric/complex/conj>)([std::sqrt](<#/doc/numeric/math/sqrt>)(z))
*   Se z é `(±0,+0)`, o resultado é `(+0,+0)`
*   Se z é `(x,+∞)`, o resultado é `(+∞,+∞)` mesmo que x seja NaN
*   Se z é `(x,NaN)`, o resultado é `(NaN,NaN)` (a menos que x seja ±∞) e [FE_INVALID](<#/doc/numeric/fenv/FE_exceptions>) pode ser levantado
*   Se z é `(-∞,y)`, o resultado é `(+0,+∞)` para y finito positivo
*   Se z é `(+∞,y)`, o resultado é `(+∞,+0)` para y finito positivo
*   Se z é `(-∞,NaN)`, o resultado é `(NaN,∞)` (sinal da parte imaginária não especificado)
*   Se z é `(+∞,NaN)`, o resultado é `(+∞,NaN)`
*   Se z é `(NaN,y)`, o resultado é `(NaN,NaN)` e [FE_INVALID](<#/doc/numeric/fenv/FE_exceptions>) pode ser levantado
*   Se z é `(NaN,NaN)`, o resultado é `(NaN,NaN)`

### Notas

A semântica desta função pretende ser consistente com a função C [`csqrt`](<#/>).

### Exemplo

Execute este código
```cpp
    #include <complex>
    #include <iostream>
    
    int main()
    {
        std::cout << "Square root of -4 is "
                  << std::sqrt(std::complex<double>(-4.0, 0.0)) << '\n'
                  << "Square root of (-4,-0) is "
                  << std::sqrt(std::complex<double>(-4.0, -0.0))
                  << " (the other side of the cut)\n";
    }
```

Saída:
```
    Square root of -4 is (0,2)
    Square root of (-4,-0) is (0,-2) (the other side of the cut)
```

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento conforme publicado | Comportamento correto
---|---|---|---
[LWG 2597](<https://cplusplus.github.io/LWG/issue2597>) | C++98 | especificação lida incorretamente com partes imaginárias de zero com sinal | requisito errôneo removido

### Veja também

[ pow(std::complex)](<#/doc/numeric/complex/pow>) | potência complexa, um ou ambos os argumentos podem ser um número complexo
(modelo de função)
[ sqrtsqrtfsqrtl](<#/doc/numeric/math/sqrt>)(C++11)(C++11) | calcula a raiz quadrada (\\(\small{\sqrt{x}}\\)√x)
(função)
[ sqrt(std::valarray)](<#/doc/numeric/valarray/sqrt>) | aplica a função [std::sqrt](<#/doc/numeric/math/sqrt>) a cada elemento de valarray
(modelo de função)
[documentação C](<#/>) para csqrt