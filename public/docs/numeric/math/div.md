# std::div, std::ldiv, std::lldiv, std::imaxdiv

Definido no header `[<cstdlib>](<#/doc/header/cstdlib>)`

```cpp
std::div_t div( int x, int y );  // (1)
std::ldiv_t div( long x, long y );  // (2)
std::lldiv_t div( long long x, long long y );  // (3) (desde C++11)
(constexpr desde C++23)
std::ldiv_t ldiv( long x, long y );  // (4)
std::lldiv_t lldiv( long long x, long long y );  // (5) (desde C++11)
(constexpr desde C++23)
Definido no header `<cinttypes>`
std::imaxdiv_t div( std::intmax_t x, std::intmax_t y );  // (6) (desde C++11)
(constexpr desde C++23)
std::imaxdiv_t imaxdiv( std::intmax_t x, std::intmax_t y );  // (7) (desde C++11)
(constexpr desde C++23)
```

Calcula tanto o quociente quanto o resto da divisão do numerador x pelo denominador y.

6,7) Uma sobrecarga de `std::div` para [std::intmax_t](<#/doc/types/integer>) é fornecida em [`<cinttypes>`](<#/doc/header/cinttypes>) se e somente se [std::intmax_t](<#/doc/types/integer>) for um [tipo inteiro estendido](<#/doc/language/types>). | (desde C++11)

O quociente é o quociente algébrico com qualquer parte fracionária descartada (truncada em direção a zero). O resto é tal que quot * y + rem == x. | (ate C++11)
---|---
O quociente é o resultado da expressão x / y. O resto é o resultado da expressão x % y. | (desde C++11)

### Parâmetros

- **x, y** — valores inteiros

### Valor de retorno

Se tanto o resto quanto o quociente puderem ser representados como objetos do tipo correspondente (int, long, long long, [std::intmax_t](<#/doc/types/integer>), respectivamente), retorna ambos como um objeto do tipo `std::div_t`, `std::ldiv_t`, `std::lldiv_t`, `std::imaxdiv_t` definidos como segue:

## std::div_t
```
    struct div_t { int quot; int rem; };
```

ou
```
    struct div_t { int rem; int quot; };
```

## std::ldiv_t
```
    struct ldiv_t { long quot; long rem; };
```

ou
```
    struct ldiv_t { long rem; long quot; };
```

## std::lldiv_t
```
    struct lldiv_t { long long quot; long long rem; };
```

ou
```
    struct lldiv_t { long long rem; long long quot; };
```

## std::imaxdiv_t
```
    struct imaxdiv_t { std::intmax_t quot; std::intmax_t rem; };
```

ou
```
    struct imaxdiv_t { std::intmax_t rem; std::intmax_t quot; };
```

Se o resto ou o quociente não puderem ser representados, o comportamento é indefinido.

### Notas

Até que o [problema CWG 614](<https://cplusplus.github.io/CWG/issues/614.html>) fosse resolvido ([N2757](<https://wg21.link/n2757>)), a direção de arredondamento do quociente e o sinal do resto nos [operadores de divisão e resto embutidos](<#/doc/language/operator_arithmetic>) eram definidos pela implementação se qualquer um dos operandos fosse negativo, mas eram bem definidos em `std::div`.

Em muitas plataformas, uma única instrução da CPU obtém tanto o quociente quanto o resto, e esta função pode aproveitar isso, embora os compiladores sejam geralmente capazes de mesclar `/` e `%` próximos quando apropriado.

### Exemplo

Execute este código
```
    #include <cassert>
    #include <cmath>
    #include <cstdlib>
    #include <iostream>
    #include <sstream>
    #include <string>
     
    std::string division_with_remainder_string(int dividend, int divisor)
    {
        auto dv = std::div(dividend, divisor);
        assert(dividend == divisor * dv.quot + dv.rem);
        assert(dv.quot == dividend / divisor);
        assert(dv.rem == dividend % divisor);
     
        auto sign = { return n > 0 ? 1 : n < 0 ? -1 : 0; };
        assert((dv.rem == 0) or (sign(dv.rem) == sign(dividend)));
     
        return (std::ostringstream() << std::showpos << dividend << " = "
                                     << divisor << " * (" << dv.quot << ") "
                                     << std::showpos << dv.rem).str();
    }
     
    std::string itoa(int n, int radix /*[2..16]*/)
    {
        std::string buf;
        std::div_t dv{}; dv.quot = n;
     
        do
        {
            dv = std::div(dv.quot, radix);
            buf += "0123456789abcdef"[std::abs(dv.rem)]; // string literals are arrays
        }
        while (dv.quot);
     
        if (n < 0)
            buf += '-';
     
        return {buf.rbegin(), buf.rend()};
    }
     
    int main()
    {
        std::cout << division_with_remainder_string(369, 10) << '\n'
                  << division_with_remainder_string(369, -10) << '\n'
                  << division_with_remainder_string(-369, 10) << '\n'
                  << division_with_remainder_string(-369, -10) << "\n\n";
     
        std::cout << itoa(12345, 10) << '\n'
                  << itoa(-12345, 10) << '\n'
                  << itoa(42, 2) << '\n'
                  << itoa(65535, 16) << '\n';
    }
```

Saída:
```
    +369 = +10 * (+36) +9
    +369 = -10 * (-36) +9
    -369 = +10 * (-36) -9
    -369 = -10 * (+36) -9
     
    12345
    -12345
    101010
    ffff
```

### Veja também

[ fmodfmodffmodl](<#/doc/numeric/math/fmod>)(C++11)(C++11) | resto da operação de divisão de ponto flutuante
(função)
[ remainderremainderfremainderl](<#/doc/numeric/math/remainder>)(C++11)(C++11)(C++11) | resto com sinal da operação de divisão
(função)
[ remquoremquofremquol](<#/doc/numeric/math/remquo>)(C++11)(C++11)(C++11) | resto com sinal, bem como os três últimos bits da operação de divisão
(função)
[documentação C](<#/>) para div

### Links externos

1. | [Divisão Euclidiana](<https://en.wikipedia.org/wiki/Euclidean_division> "enwiki:Euclidean division") — Da Wikipedia.
---|---
2. | [Módulo (e divisão truncada)](<https://en.wikipedia.org/wiki/Modulo> "enwiki:Modulo") — Da Wikipedia.