# std::abs(std::complex)

Definido no cabeçalho `[<complex>](<#/doc/header/complex>)`

```c
template< class T >
T abs( const complex<T>& z );
```

Retorna a magnitude do número complexo z.

### Parâmetros

- **z** — valor complexo

### Valor de retorno

Se nenhum erro ocorrer, retorna o valor absoluto (também conhecido como norma, módulo ou magnitude) de z.

Erros e casos especiais são tratados como se a função fosse implementada como [std::hypot](<#/doc/numeric/math/hypot>)([std::real](<#/doc/numeric/complex/real2>)(z), [std::imag](<#/doc/numeric/complex/imag2>)(z)).

### Exemplo

Execute este código
```cpp
    #include <complex>
    #include <iostream>
    
    int main()
    {
        std::complex<double> z(1, 1);
        std::cout << z << " cartesian is rho = " << std::abs(z)
                  << " theta = " << std::arg(z) << " polar\n";
    }
```

Saída:
```
    (1,1) cartesian is rho = 1.41421 theta = 0.785398 polar
```

### Veja também

[ arg](<#/doc/numeric/complex/arg>) | retorna o ângulo de fase
(modelo de função)
[ polar](<#/doc/numeric/complex/polar>) | constrói um número complexo a partir da magnitude e do ângulo de fase
(modelo de função)
[ abs(int)labsllabs](<#/doc/numeric/math/abs>)(C++11) | calcula o valor absoluto de um valor integral (\\(\small{|x|}\\)|x|)
(função)
[ abs(float)fabsfabsffabsl](<#/doc/numeric/math/fabs>)(C++11)(C++11) | valor absoluto de um valor de ponto flutuante (\\(\small{|x|}\\)|x|)
(função)
[ hypothypotfhypotl](<#/doc/numeric/math/hypot>)(C++11)(C++11)(C++11) | calcula a hipotenusa \\(\scriptsize{\sqrt{x^2+y^2}}\\)√x2
+y2
e \\(\scriptsize{\sqrt{x^2+y^2+z^2}}\\)√x2
+y2
+z2
(desde C++17)
(função)
[ abs(std::valarray)](<#/doc/numeric/valarray/abs>) | aplica a função abs a cada elemento de valarray
(modelo de função)
[Documentação C](<#/>) para cabs