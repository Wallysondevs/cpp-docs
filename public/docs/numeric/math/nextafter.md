# std::nextafter, std::nextafterf, std::nextafterl, std::nexttoward, std::nexttowardf, std::nexttowardl

Definido no cabeçalho `[<cmath>](<#/doc/header/cmath>)`

```c
float nextafter ( float from, float to );
double nextafter ( double from, double to );
long double nextafter ( long double from, long double to );
(até C++23)
constexpr /* floating-point-type */
nextafter ( /* floating-point-type */ from,
/* floating-point-type */ to );
float nextafterf( float from, float to );
(constexpr desde C++23)
long double nextafterl( long double from, long double to );
(constexpr desde C++23)
float nexttoward ( float from, long double to );
double nexttoward ( double from, long double to );
long double nexttoward ( long double from, long double to );
(até C++23)
constexpr /* floating-point-type */
nexttoward ( /* floating-point-type */ from,
long double to );
float nexttowardf( float from, long double to );
(constexpr desde C++23)
long double nexttowardl( long double from, long double to );
(constexpr desde C++23)
Sobrecargas adicionais
```

Retorna o próximo valor representável de `from` na direção de `to`.

1-3) Se `from` for igual a `to`, `to` é retornado. A biblioteca fornece sobrecargas de `std::nextafter` para todos os tipos de ponto flutuante não qualificados por cv como o tipo dos parâmetros `from` e `to`. (desde C++23)

4-6) Se `from` for igual a `to`, `to` é retornado, convertido de `long double` para o tipo de retorno da função sem perda de faixa ou precisão. A biblioteca fornece sobrecargas de `std::nexttoward` para todos os tipos de ponto flutuante não qualificados por cv como o tipo do parâmetro `from`. No entanto, uma invocação de `std::nexttoward` é malformada se o argumento correspondente a `from` tiver [tipo de ponto flutuante estendido](<#/doc/language/types>), porque o próximo valor representável (ou `to`) não é garantido que seja representável como `long double`. | (desde C++23)

A) Sobrecargas adicionais de `std::nextafter` são fornecidas para todas as outras combinações de tipos aritméticos.

B) Sobrecargas adicionais de `std::nexttoward` são fornecidas para todos os tipos inteiros, que são tratados como `double`.

### Parâmetros

- **from, to** — valores de ponto flutuante ou inteiros

### Valor de retorno

Se nenhum erro ocorrer, o próximo valor representável de `from` na direção de `to` é retornado. Se `from` for igual a `to`, então `to` é retornado.

Se ocorrer um erro de faixa devido a estouro, `[±HUGE_VAL](<#/doc/numeric/math/HUGE_VAL>)`, `±HUGE_VALF`, ou `±HUGE_VALL` é retornado (com o mesmo sinal de `from`).

Se ocorrer um erro de faixa devido a subfluxo, o resultado correto é retornado.

### Tratamento de erros

Os erros são relatados conforme especificado em [math_errhandling](<#/doc/numeric/math/math_errhandling>).

Se a implementação suportar aritmética de ponto flutuante IEEE (IEC 60559),

*   se `from` for finito, mas o resultado esperado for um infinito, levanta `[FE_INEXACT](<#/doc/numeric/fenv/FE_exceptions>)` e `[FE_OVERFLOW](<#/doc/numeric/fenv/FE_exceptions>)`.
*   se `from` não for igual a `to` e o resultado for subnormal ou zero, levanta `[FE_INEXACT](<#/doc/numeric/fenv/FE_exceptions>)` e `[FE_UNDERFLOW](<#/doc/numeric/fenv/FE_exceptions>)`.
*   em qualquer caso, o valor retornado é independente do modo de arredondamento atual.
*   se `from` ou `to` for NaN, NaN é retornado.

### Notas

[POSIX especifica](<https://pubs.opengroup.org/onlinepubs/9699919799/functions/nextafter.html>) que as condições de estouro e subfluxo são erros de faixa (`[errno](<#/doc/error/errno>)` pode ser definido).

IEC 60559 recomenda que `from` seja retornado sempre que `from == to`. Essas funções retornam `to` em vez disso, o que torna o comportamento em torno de zero consistente: `std::nextafter(-0.0, +0.0)` retorna `+0.0` e `std::nextafter(+0.0, -0.0)` retorna `-0.0`.

`std::nextafter` é tipicamente implementado pela manipulação da representação IEEE ([glibc](<https://github.com/bminor/glibc/blob/master/math/s_nextafter.c>), [musl](<https://github.com/ifduyue/musl/blob/master/src/math/nextafter.c>)).

As sobrecargas adicionais de `std::nextafter` não são exigidas para serem fornecidas exatamente como (A). Elas só precisam ser suficientes para garantir que, para seu primeiro argumento `num1` e segundo argumento `num2`:

*   Se `num1` ou `num2` tiver o tipo `long double`, então `std::nextafter(num1, num2)` tem o mesmo efeito que `std::nextafter(static_cast<long double>(num1), static_cast<long double>(num2))`.
*   Caso contrário, se `num1` e/ou `num2` tiver o tipo `double` ou um tipo inteiro, então `std::nextafter(num1, num2)` tem o mesmo efeito que `std::nextafter(static_cast<double>(num1), static_cast<double>(num2))`.
*   Caso contrário, se `num1` ou `num2` tiver o tipo `float`, então `std::nextafter(num1, num2)` tem o mesmo efeito que `std::nextafter(static_cast<float>(num1), static_cast<float>(num2))`.

| (até C++23)
---|---
Se `num1` e `num2` tiverem tipos aritméticos, então `std::nextafter(num1, num2)` tem o mesmo efeito que `std::nextafter(static_cast</*common-floating-point-type*/>(num1), static_cast</*common-floating-point-type*/>(num2))`, onde `/*common-floating-point-type*/` é o tipo de ponto flutuante com a maior [classificação de conversão de ponto flutuante](<#/doc/language/usual_arithmetic_conversions>) e maior [sub-classificação de conversão de ponto flutuante](<#/doc/language/usual_arithmetic_conversions>) entre os tipos de `num1` e `num2`, argumentos de tipo inteiro são considerados como tendo a mesma classificação de conversão de ponto flutuante que `double`. Se nenhum tipo de ponto flutuante com a maior classificação e sub-classificação existir, então a [resolução de sobrecarga](<#/doc/language/overload_resolution>) não resulta em um candidato utilizável das sobrecargas fornecidas. | (desde C++23)

As sobrecargas adicionais de `std::nexttoward` não são exigidas para serem fornecidas exatamente como (B). Elas só precisam ser suficientes para garantir que, para seu argumento `num` de tipo inteiro, `std::nexttoward(num)` tenha o mesmo efeito que `std::nexttoward(static_cast<double>(num))`.

### Exemplo

Execute este código
```cpp
    #include <cfenv>
    #include <cfloat>
    #include <cmath>
    #include <concepts>
    #include <iomanip>
    #include <iostream>
    
    int main()
    {
        float from1 = 0, to1 = std::nextafter(from1, 1.f);
        std::cout << "The next representable float after " << std::setprecision(20) << from1
                  << " is " << to1
                  << std::hexfloat << " (" << to1 << ")\n" << std::defaultfloat;
    
        float from2 = 1, to2 = std::nextafter(from2, 2.f);
        std::cout << "The next representable float after " << from2 << " is " << to2
                  << std::hexfloat << " (" << to2 << ")\n" << std::defaultfloat;
    
        double from3 = std::nextafter(0.1, 0), to3 = 0.1;
        std::cout << "The number 0.1 lies between two valid doubles:\n"
                  << std::setprecision(56) << "    " << from3
                  << std::hexfloat << " (" << from3 << ')' << std::defaultfloat
                  << "\nand " << to3 << std::hexfloat << "  (" << to3 << ")\n"
                  << std::defaultfloat << std::setprecision(20);
    
        std::cout << "\nDifference between nextafter and nexttoward:\n";
        long double dir = std::nextafter(from1, 1.0L); // first subnormal long double
        float x = std::nextafter(from1, dir); // first converts dir to float, giving 0
        std::cout << "With nextafter, next float after " << from1 << " is " << x << '\n';
        x = std::nexttoward(from1, dir);
        std::cout << "With nexttoward, next float after " << from1 << " is " << x << '\n';
    
        std::cout << "\nSpecial values:\n";
        {
            // #pragma STDC FENV_ACCESS ON
            std::feclearexcept(FE_ALL_EXCEPT);
            double from4 = DBL_MAX, to4 = std::nextafter(from4, INFINITY);
            std::cout << "The next representable double after " << std::setprecision(6)
                      << from4 << std::hexfloat << " (" << from4 << ')'
                      << std::defaultfloat << " is " << to4
                      << std::hexfloat << " (" << to4 << ")\n" << std::defaultfloat;
    
            if (std::fetestexcept(FE_OVERFLOW))
                std::cout << "   raised FE_OVERFLOW\n";
            if (std::fetestexcept(FE_INEXACT))
                std::cout << "   raised FE_INEXACT\n";
        } // end FENV_ACCESS block
    
        float from5 = 0.0, to5 = std::nextafter(from5, -0.0);
        std::cout << "std::nextafter(+0.0, -0.0) gives " << std::fixed << to5 << '\n';
    
        auto precision_loss_demo = []<std::floating_point Fp>(const auto rem, const Fp start)
        {
            std::cout << rem;
            for (Fp from = start, to, Δ;
                (Δ = (to = std::nextafter(from, +INFINITY))) < Fp(10.0);
                from *= Fp(10.0))
                std::cout << "nextafter(" << std::scientific << std::setprecision(0) << from 
                          << ", INF) gives " << std::fixed << std::setprecision(6) << to
                          << "; Δ = " << Δ << '\n';
        };
    
        precision_loss_demo("\nPrecision loss demo for float:\n", 10.0f);
        precision_loss_demo("\nPrecision loss demo for double:\n", 10.0e9);
        precision_loss_demo("\nPrecision loss demo for long double:\n", 10.0e17L);
    }
```

Saída:
```
    The next representable float after 0 is 1.4012984643248170709e-45 (0x1p-149)
    The next representable float after 1 is 1.0000001192092895508 (0x1.000002p+0)
    The number 0.1 lies between two valid doubles:
        0.09999999999999999167332731531132594682276248931884765625 (0x1.9999999999999p-4)
    and 0.1000000000000000055511151231257827021181583404541015625  (0x1.999999999999ap-4)
    
    Difference between nextafter and nexttoward:
    With nextafter, next float after 0 is 0
    With nexttoward, next float after 0 is 1.4012984643248170709e-45
    
    Special values:
    The next representable double after 1.79769e+308 (0x1.fffffffffffffp+1023) is inf (inf)
       raised FE_OVERFLOW
       raised FE_INEXACT
    std::nextafter(+0.0, -0.0) gives -0.000000
    
    Precision loss demo for float:
    nextafter(1e+01, INF) gives 10.000001; Δ = 0.000001
    nextafter(1e+02, INF) gives 100.000008; Δ = 0.000008
    nextafter(1e+03, INF) gives 1000.000061; Δ = 0.000061
    nextafter(1e+04, INF) gives 10000.000977; Δ = 0.000977
    nextafter(1e+05, INF) gives 100000.007812; Δ = 0.007812
    nextafter(1e+06, INF) gives 1000000.062500; Δ = 0.062500
    nextafter(1e+07, INF) gives 10000001.000000; Δ = 1.000000
    nextafter(1e+08, INF) gives 100000008.000000; Δ = 8.000000
    
    Precision loss demo for double:
    nextafter(1e+10, INF) gives 10000000000.000002; Δ = 0.000002
    nextafter(1e+11, INF) gives 100000000000.000015; Δ = 0.000015
    nextafter(1e+12, INF) gives 1000000000000.000122; Δ = 0.000122
    nextafter(1e+13, INF) gives 10000000000000.001953; Δ = 0.001953
    nextafter(1e+14, INF) gives 100000000000000.015625; Δ = 0.015625
    nextafter(1e+15, INF) gives 1000000000000000.125000; Δ = 0.125000
    nextafter(1e+16, INF) gives 10000000000000002.000000; Δ = 2.000000
    
    Precision loss demo for long double:
    nextafter(1e+18, INF) gives 1000000000000000000.062500; Δ = 0.062500
    nextafter(1e+19, INF) gives 10000000000000000001.000000; Δ = 1.000000
    nextafter(1e+20, INF) gives 100000000000000000008.000000; Δ = 8.000000
```

### Veja também

[documentação C](<#/>) para nextafter
---
*   [Value]: O ano/mês em que o recurso foi adotado. O hiperlink sob cada valor abre uma página de suporte do compilador com a entrada para o recurso dado.
*   [Std]: Padrão no qual o recurso é introduzido; DR significa relatório de defeito contra essa revisão.