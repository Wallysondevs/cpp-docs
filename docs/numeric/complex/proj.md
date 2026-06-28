# std::proj(std::complex)

Definido no cabeçalho `[<complex>](<#/doc/header/complex>)`

```c
template< class T >
std::complex<T> proj( const std::complex<T>& z );
Sobrecargas adicionais (desde C++11)
Definido no cabeçalho `<complex>`
std::complex<float> proj( float f );
std::complex<double> proj( double f );
std::complex<long double> proj( long double f );
template< class FloatingPoint >
std::complex<FloatingPoint> proj( FloatingPoint f );
template< class Integer >
std::complex<double> proj( Integer i );
```

1) Retorna a projeção do número complexo z na [esfera de Riemann](<https://en.wikipedia.org/wiki/Riemann_sphere> "enwiki:Riemann sphere").

Para a maioria dos z, std::proj(z) == z, mas todas as infinitudes complexas, mesmo os números onde um componente é infinito e o outro é NaN, tornam-se infinito real positivo, ([INFINITY](<#/doc/numeric/math/INFINITY>), 0.0) ou ([INFINITY](<#/doc/numeric/math/INFINITY>), -0.0). O sinal do componente imaginário (zero) é o sinal de [std::imag](<#/doc/numeric/complex/imag2>)(z).

A,B) Sobrecargas adicionais são fornecidas para todos os tipos inteiros e de ponto flutuante, que são tratados como números complexos com componente imaginário zero positivo.

### Parâmetros

- **z** — valor complexo
- **f** — valor de ponto flutuante
- **i** — valor inteiro

### Valor de retorno

1) A projeção de z na esfera de Riemann.

A) A projeção de [std::complex](<#/doc/numeric/complex>)(f) na esfera de Riemann.

B) A projeção de [std::complex](<#/doc/numeric/complex>)&lt;double&gt;(i) na esfera de Riemann.

### Observações

A função proj ajuda a modelar a esfera de Riemann mapeando todas as infinitudes para uma (com ou sem o sinal do zero imaginário), e deve ser usada logo antes de qualquer operação, especialmente comparações, que possam produzir resultados espúrios para qualquer uma das outras infinitudes.

As sobrecargas adicionais não são obrigadas a ser fornecidas exatamente como (A,B). Elas só precisam ser suficientes para garantir que, para seu argumento num:

*   Se num tiver um tipo de ponto flutuante padrão (até C++23) `T`, então std::proj(num) tem o mesmo efeito que std::proj([std::complex](<#/doc/numeric/complex>)&lt;T&gt;(num)).
*   Caso contrário, se num tiver um tipo inteiro, então std::proj(num) tem o mesmo efeito que std::proj([std::complex](<#/doc/numeric/complex>)&lt;double&gt;(num)).

### Exemplo

Execute este código
```cpp
    #include <complex>
    #include <iostream>
    
    int main()
    {
        std::complex<double> c1(1, 2);
        std::cout << "proj" << c1 << " = " << std::proj(c1) << '\n';
    
        std::complex<double> c2(INFINITY, -1);
        std::cout << "proj" << c2 << " = " << std::proj(c2) << '\n';
    
        std::complex<double> c3(0, -INFINITY);
        std::cout << "proj" << c3 << " = " << std::proj(c3) << '\n';
    }
```

Saída:
```
    proj(1,2) = (1,2)
    proj(inf,-1) = (inf,-0)
    proj(0,-inf) = (inf,-0)
```

### Veja também

[ abs(std::complex)](<#/doc/numeric/complex/abs>) | retorna a magnitude de um número complexo
(modelo de função)
[ norm](<#/doc/numeric/complex/norm>) | retorna a magnitude ao quadrado
(modelo de função)
[ polar](<#/doc/numeric/complex/polar>) | constrói um número complexo a partir da magnitude e do ângulo de fase
(modelo de função)
[Documentação C](<#/>) para cproj