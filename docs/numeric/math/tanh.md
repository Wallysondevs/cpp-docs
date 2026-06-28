# std::tanh, std::tanhf, std::tanhl

Definido no cabeçalho `[<cmath>](<#/doc/header/cmath>)`

```c
float tanh ( float num );
double tanh ( double num );
long double tanh ( long double num );
/*floating-point-type*/
tanh ( /*floating-point-type*/ num );
(constexpr desde C++26)
float tanhf( float num );
(constexpr desde C++26)
long double tanhl( long double num );
(constexpr desde C++26)
Sobrecarga SIMD (desde C++26)
Definido no cabeçalho `<simd>`
template< /*math-floating-point*/ V >
constexpr /*deduced-simd-t*/<V>
tanh ( const V& v_num );
Sobrecargas adicionais (desde C++11)
Definido no cabeçalho `<cmath>`
template< class Integer >
double tanh ( Integer num );
```

1-3) Calcula a tangente hiperbólica de num. A biblioteca fornece sobrecargas de `std::tanh` para todos os tipos de ponto flutuante cv-não qualificados como o tipo do parâmetro. (desde C++23)

S) A sobrecarga SIMD executa um `std::tanh` elemento a elemento em v_num.

(Veja [`_math-floating-point_`](<#/doc/numeric/simd>) e [`_deduced-simd-t_`](<#/doc/numeric/simd>) para suas definições.)
| (desde C++26)
---|---
A) Sobrecargas adicionais são fornecidas para todos os tipos inteiros, que são tratados como double. | (desde C++11)

### Parâmetros

- **num** — valor de ponto flutuante ou inteiro

### Valor de retorno

Se nenhum erro ocorrer, a tangente hiperbólica de num (tanh(num), ou enum
-e-num

---
enum
+e-num

) é retornada.

Se ocorrer um erro de range devido a underflow, o resultado correto (após arredondamento) é retornado.

### Tratamento de erros

Erros são reportados conforme especificado em [math_errhandling](<#/doc/numeric/math/math_errhandling>).

Se a implementação suporta aritmética de ponto flutuante IEEE (IEC 60559),

*   se o argumento for ±0, ±0 é retornado.
*   se o argumento for ±∞, ±1 é retornado.
*   se o argumento for NaN, NaN é retornado.

### Notas

[POSIX especifica](<https://pubs.opengroup.org/onlinepubs/9699919799/functions/tanh.html>) que, em caso de underflow, num é retornado sem modificação, e se isso não for suportado, um valor definido pela implementação não maior que DBL_MIN, FLT_MIN e LDBL_MIN é retornado.

As sobrecargas adicionais não são obrigadas a ser fornecidas exatamente como (A). Elas apenas precisam ser suficientes para garantir que, para seu argumento num de tipo inteiro, std::tanh(num) tenha o mesmo efeito que std::tanh(static_cast&lt;double&gt;(num)).

### Exemplo

Execute este código
```cpp
    #include <cmath>
    #include <iostream>
    #include <random>
    
    double get_random_between(double min, double max)
    {
        std::random_device rd;
        std::mt19937 gen(rd());
        return std::uniform_real_distribution<>(min, max)(gen);
    }
    
    int main()
    {
        const double x = get_random_between(-1.0, 1.0);
    
        std::cout << std::showpos
                  << "tanh(+1) = " << std::tanh(+1) << '\n'
                  << "tanh(-1) = " << std::tanh(-1) << '\n'
                  << "tanh(x)*sinh(2*x)-cosh(2*x) = "
                  << std::tanh(x) * std::sinh(2 * x) - std::cosh(2 * x) << '\n'
                  // special values:
                  << "tanh(+0) = " << std::tanh(+0.0) << '\n'
                  << "tanh(-0) = " << std::tanh(-0.0) << '\n';
    }
```

Saída:
```
    tanh(+1) = +0.761594
    tanh(-1) = -0.761594
    tanh(x)*sinh(2*x)-cosh(2*x) = -1
    tanh(+0) = +0
    tanh(-0) = -0
```

### Veja também

[ sinhsinhfsinhl](<#/doc/numeric/math/sinh>)(C++11)(C++11) | calcula o seno hiperbólico (\\({\small\sinh{x}}\\)sinh(x))
(função)
[ coshcoshfcoshl](<#/doc/numeric/math/cosh>)(C++11)(C++11) | calcula o cosseno hiperbólico (\\({\small\cosh{x}}\\)cosh(x))
(função)
[ atanhatanhfatanhl](<#/doc/numeric/math/atanh>)(C++11)(C++11)(C++11) | calcula a tangente hiperbólica inversa (\\({\small\operatorname{artanh}{x}}\\)artanh(x))
(função)
[ tanh(std::complex)](<#/doc/numeric/complex/tanh>) | calcula a tangente hiperbólica de um número complexo (\\({\small\tanh{z}}\\)tanh(z))
(modelo de função)
[ tanh(std::valarray)](<#/doc/numeric/valarray/tanh>) | aplica a função **std::tanh** a cada elemento de valarray
(modelo de função)
[Documentação C](<#/>) para tanh
*   [Valor]: O ano/mês em que o recurso foi adotado. O hiperlink sob cada valor abre uma página de suporte do compilador com a entrada para o recurso dado.
*   [Padrão]: Padrão no qual o recurso é introduzido; DR significa relatório de defeito contra essa revisão.