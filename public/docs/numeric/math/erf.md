# std::erf, std::erff, std::erfl

```cpp
Definido no header `<cmath>`
  // (1)
float erf ( float num );
double erf ( double num );
long double erf ( long double num ); | | (ate C++23)
/*floating-point-type*/
erf ( /*floating-point-type*/ num );  // (desde C++23)
(constexpr desde C++26)
float erff( float num );  // (2) (desde C++11)
(constexpr desde C++26)
long double erfl( long double num );  // (3) (desde C++11)
(constexpr desde C++26)
Sobrecarga SIMD (desde C++26)
Definido no header `<simd>`
```

```cpp
template< /*math-floating-point*/ V >
constexpr /*deduced-simd-t*/<V>
erf ( const V& v_num );  // (desde C++26)
Sobrecargas adicionais (desde C++11)
Definido no header `<cmath>`
template< class Integer >
double erf ( Integer num );
```

1-3) Calcula a [função de erro](<https://en.wikipedia.org/wiki/Error_function> "enwiki:Error function") de num. A biblioteca fornece sobrecargas de `std::erf` para todos os tipos floating-point cv-unqualified como o tipo do parâmetro. (desde C++23)

S) A sobrecarga SIMD executa um `std::erf` elemento a elemento em v_num.

(Veja [`_math-floating-point_`](<#/doc/numeric/simd>) e [`_deduced-simd-t_`](<#/doc/numeric/simd>) para suas definições.)
| (desde C++26)
---|---
A) Sobrecargas adicionais são fornecidas para todos os tipos inteiros, que são tratados como double. | (desde C++11)

### Parâmetros

- **num** — valor floating-point ou inteiro

### Valor de retorno

Se nenhum erro ocorrer, o valor da função de erro de num, isto é \\(\frac{2}{\sqrt{\pi} }\int_{0}^{num}{e^{-{t^2} }\mathsf{d}t}\\)2
---
√π
∫num
0 _e_ -t2
d _t_ , é retornado.
Se ocorrer um erro de range devido a underflow, o resultado correto (após arredondamento), isto é \\(\frac{2\cdot num}{\sqrt{\pi} }\\)2*num
---
√π
é retornado.

### Tratamento de erros

Erros são reportados conforme especificado em [math_errhandling](<#/doc/numeric/math/math_errhandling>).

Se a implementação suporta aritmética floating-point IEEE (IEC 60559),

* Se o argumento é ±0, ±0 é retornado.
* Se o argumento é ±∞, ±1 é retornado.
* Se o argumento é NaN, NaN é retornado.

### Observações

Underflow é garantido se |num| < [DBL_MIN](<#/doc/types/climits>) * ([std::sqrt](<#/doc/numeric/math/sqrt>)(π) / 2).

\\(\operatorname{erf}(\frac{x}{\sigma \sqrt{2} })\\)erf(x
---
σ√2
) é a probabilidade de que uma medição cujos erros estão sujeitos a uma distribuição normal com desvio padrão \\(\sigma\\)σ esteja a menos de \\(x\\)x de distância do valor médio.

As sobrecargas adicionais não são exigidas para serem fornecidas exatamente como (A). Elas apenas precisam ser suficientes para garantir que, para seu argumento num de tipo inteiro, std::erf(num) tenha o mesmo efeito que std::erf(static_cast&lt;double&gt;(num)).

### Exemplo

O exemplo a seguir calcula a probabilidade de que uma variável normal esteja no intervalo (x1, x2):

Execute este código
```cpp
    #include <cmath>
    #include <iomanip>
    #include <iostream>
    
    double phi(double x1, double x2)
    {
        return (std::erf(x2 / std::sqrt(2)) - std::erf(x1 / std::sqrt(2))) / 2;
    }
    
    int main()
    {
        std::cout << "Normal variate probabilities:\n"
                  << std::fixed << std::setprecision(2);
        for (int n = -4; n < 4; ++n)
            std::cout << '[' << std::setw(2) << n
                      << ':' << std::setw(2) << n + 1 << "]: "
                      << std::setw(5) << 100 * phi(n, n + 1) << "%\n";
    
        std::cout << "Special values:\n"
                  << "erf(-0) = " << std::erf(-0.0) << '\n'
                  << "erf(Inf) = " << std::erf(INFINITY) << '\n';
    }
```

Saída:
```
    Normal variate probabilities:
    [-4:-3]:  0.13%
    [-3:-2]:  2.14%
    [-2:-1]: 13.59%
    [-1: 0]: 34.13%
    [ 0: 1]: 34.13%
    [ 1: 2]: 13.59%
    [ 2: 3]:  2.14%
    [ 3: 4]:  0.13%
    Special values:
    erf(-0) = -0.00
    erf(Inf) = 1.00
```

### Veja também

[ erfcerfcferfcl](<#/doc/numeric/math/erfc>)(C++11)(C++11)(C++11) | função de erro complementar
(função)
[Documentação C](<#/>) para erf

### Links externos

[Weisstein, Eric W. "Erf."](<https://mathworld.wolfram.com/Erf.html>) De MathWorld — Um Recurso Web Wolfram.
---