# std::numeric_limits&lt;T&gt;::epsilon

```cpp
static T epsilon() throw();  // (até C++11)
static constexpr T epsilon() noexcept;  // (desde C++11)
```

Retorna o epsilon de máquina, ou seja, a diferença entre 1.0 e o próximo valor representável pelo tipo de ponto flutuante `T`. É significativo apenas se [std::numeric_limits](<#/doc/types/numeric_limits>)&lt;T&gt;::is_integer == false.

### Valor de retorno

`T` | [std::numeric_limits](<#/doc/types/numeric_limits>)&lt;T&gt;::epsilon()
---|---
/* não especializado */ | T()
bool | false
char | ​0​
signed char | ​0​
unsigned char | ​0​
wchar_t | ​0​
char8_t (desde C++20) | ​0​
char16_t (desde C++11) | ​0​
char32_t (desde C++11) | ​0​
short | ​0​
unsigned short | ​0​
int | ​0​
unsigned int | ​0​
long | ​0​
unsigned long | ​0​
long long (desde C++11) | ​0​
unsigned long long(desde C++11) | ​0​
float | [FLT_EPSILON](<#/doc/types/climits>)
double | [DBL_EPSILON](<#/doc/types/climits>)
long double | [LDBL_EPSILON](<#/doc/types/climits>)

### Exemplo

Demonstra o uso do epsilon de máquina para comparar valores de ponto flutuante quanto à igualdade:

Execute este código
```cpp
    #include <algorithm>
    #include <cmath>
    #include <cstddef>
    #include <iomanip>
    #include <iostream>
    #include <limits>
    #include <type_traits>
    
    template <class T>
    std::enable_if_t<not std::numeric_limits<T>::is_integer, bool>
    equal_within_ulps(T x, T y, std::size_t n)
    {
        // Como `epsilon()` é o tamanho do gap (ULP, unidade no último lugar)
        // de números de ponto flutuante no intervalo [1, 2), podemos escalá-lo para
        // o tamanho do gap no intervalo [2^e, 2^{e+1}), onde `e` é o expoente
        // de `x` e `y`.
    
        // Se `x` e `y` tiverem tamanhos de gap diferentes (o que significa que eles têm
        // expoentes diferentes), pegamos o menor. Pegar o maior
        // também é razoável, eu acho.
        const T m = std::min(std::fabs(x), std::fabs(y));
    
        // Números subnormais têm expoente fixo, que é `min_exponent - 1`.
        const int exp = m < std::numeric_limits<T>::min()
                      ? std::numeric_limits<T>::min_exponent - 1
                      : std::ilogb(m);
    
        // Consideramos `x` e `y` iguais se a diferença entre eles for
        // dentro de `n` ULPs.
        return std::fabs(x - y) <= n * std::ldexp(std::numeric_limits<T>::epsilon(), exp);
    }
    
    int main()
    {
        double x = 0.3;
        double y = 0.1 + 0.2;
        std::cout << std::hexfloat;
        std::cout << "x = " << x << '\n';
        std::cout << "y = " << y << '\n';
        std::cout << (x == y ? "x == y" : "x != y") << '\n';
        for (std::size_t n = 0; n <= 10; ++n)
            if (equal_within_ulps(x, y, n))
            {
                std::cout << "x equals y within " << n << " ulps" << '\n';
                break;
            }
    }
```

Saída:
```
    x = 0x1.3333333333333p-2
    y = 0x1.3333333333334p-2
    x != y
    x equals y within 1 ulps
```

### Veja também

[ nextafternextafterfnextafterlnexttowardnexttowardfnexttowardl](<#/doc/numeric/math/nextafter>)(C++11)(C++11)(C++11)(C++11)(C++11)(C++11) | próximo valor de ponto flutuante representável em direção ao valor dado
(função)