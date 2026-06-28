# std::arg(std::complex)

Definido no cabeçalho `[<complex>](<#/doc/header/complex>)`

```c
template< class T >
T arg( const std::complex<T>& z );
Sobrecargas adicionais (<span style="font-family: Georgia, serif; font-style: italic; font-size: 0.8em;">desde C++11</span>)
Definido no cabeçalho `<complex>`
float arg( float f );
double arg( double f );
long double arg( long double f );
template< class FloatingPoint >
FloatingPoint
arg( FloatingPoint f );
template< class Integer >
double arg( Integer i );
```

1) Calcula o ângulo de fase (em radianos) do número complexo z.

A,B) Sobrecargas adicionais são fornecidas para todos os tipos inteiros e de ponto flutuante, que são tratados como números complexos com componente imaginária zero. | (<span style="font-family: Georgia, serif; font-style: italic; font-size: 0.8em;">desde C++11</span>)

### Parâmetros

- **z** — valor complexo
- **f** — valor de ponto flutuante
- **i** — valor inteiro

### Valor de retorno

1) [std::atan2](<#/doc/numeric/math/atan2>)([std::imag](<#/doc/numeric/complex/imag2>)(z), [std::real](<#/doc/numeric/complex/real2>)(z)). Se nenhum erro ocorrer, este é o ângulo de fase de z no intervalo [−π; π].

A) Zero se f for positivo ou +0, π se f for negativo ou -0, NaN caso contrário.

B) Zero se i for não-negativo, π se for negativo.

### Observações

As sobrecargas adicionais não são obrigadas a ser fornecidas exatamente como (A,B). Elas só precisam ser suficientes para garantir que, para seu argumento num:

*   Se num tiver um tipo de ponto flutuante padrão (<span style="font-family: Georgia, serif; font-style: italic; font-size: 0.8em;">ate C++23</span>) `T`, então `std::arg(num)` tem o mesmo efeito que `std::arg([std::complex](<#/doc/numeric/complex>)<T>(num))`.
*   Caso contrário, se num tiver um tipo inteiro, então `std::arg(num)` tem o mesmo efeito que `std::arg([std::complex](<#/doc/numeric/complex>)<double>(num))`.

### Exemplo

Execute este código
```cpp
    #include <complex>
    #include <iostream>
    
    int main() 
    {
        std::complex<double> z1(1, 0);
        std::complex<double> z2(0, 0);
        std::complex<double> z3(0, 1);
        std::complex<double> z4(-1, 0);
        std::complex<double> z5(-1, -0.0);
        double f = 1.;
        int i = -1;
    
        std::cout << "phase angle of " << z1 << " is " << std::arg(z1) << '\n'
                  << "phase angle of " << z2 << " is " << std::arg(z2) << '\n'
                  << "phase angle of " << z3 << " is " << std::arg(z3) << '\n'
                  << "phase angle of " << z4 << " is " << std::arg(z4) << '\n'
                  << "phase angle of " << z5 << " is " << std::arg(z5) << " "
                     "(the other side of the cut)\n"
                  << "phase angle of " << f << " is " << std::arg(f) << '\n'
                  << "phase angle of " << i << " is " << std::arg(i) << '\n';
    
    }
```

Saída:
```
    phase angle of (1,0) is 0
    phase angle of (0,0) is 0
    phase angle of (0,1) is 1.5708
    phase angle of (-1,0) is 3.14159
    phase angle of (-1,-0) is -3.14159 (o outro lado do corte)
    phase angle of 1 is 0
    phase angle of -1 is 3.14159
```

### Veja também

[ abs(std::complex)](<#/doc/numeric/complex/abs>) | retorna a magnitude de um número complexo
(modelo de função)
[ polar](<#/doc/numeric/complex/polar>) | constrói um número complexo a partir da magnitude e do ângulo de fase
(modelo de função)
[ atan2atan2fatan2l](<#/doc/numeric/math/atan2>)(<span style="font-family: Georgia, serif; font-style: italic; font-size: 0.8em;">C++11</span>)(<span style="font-family: Georgia, serif; font-style: italic; font-size: 0.8em;">C++11</span>) | arco tangente, usando sinais para determinar quadrantes
(função)
[ atan2(std::valarray)](<#/doc/numeric/valarray/atan2>) | aplica a função [std::atan2](<#/doc/numeric/math/atan2>) a um valarray e um valor
(modelo de função)
[Documentação C](<#/>) para carg
*<span style="font-family: Georgia, serif; font-style: italic; font-size: 0.8em;">[Value]</span>*: O ano/mês em que o recurso foi adotado. O hiperlink sob cada valor abre uma página de suporte do compilador com a entrada para o recurso fornecido.
*<span style="font-family: Georgia, serif; font-style: italic; font-size: 0.8em;">[Std]</span>*: Padrão no qual o recurso é introduzido; DR significa relatório de defeito contra essa revisão