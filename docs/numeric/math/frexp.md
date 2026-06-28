# std::frexp, std::frexpf, std::frexpl

Definido no cabeçalho `[<cmath>](<#/doc/header/cmath>)`

```c
float frexp ( float num, int* exp );
double frexp ( double num, int* exp );
long double frexp ( long double num, int* exp );
constexpr /* floating-point-type */
frexp ( /* floating-point-type */ num, int* exp );
float frexpf( float num, int* exp );
(constexpr desde C++23)
long double frexpl( long double num, int* exp );
(constexpr desde C++23)
Sobrecargas adicionais (desde C++11)
Definido no cabeçalho `<cmath>`
template< class Integer >
double frexp ( Integer num, int* exp );
```

1-3) Decompõe o valor de ponto flutuante `num` fornecido em uma fração normalizada e um expoente inteiro de dois. A biblioteca fornece sobrecargas de `std::frexp` para todos os tipos de ponto flutuante cv-não qualificados como o tipo do parâmetro `num`.(desde C++23)

A) Sobrecargas adicionais são fornecidas para todos os tipos inteiros, que são tratados como `double`. | (desde C++11)

### Parâmetros

- **num** — valor de ponto flutuante ou inteiro
- **exp** — ponteiro para valor inteiro para armazenar o expoente

### Valor de retorno

Se `num` for zero, retorna zero e armazena zero em `*exp`.

Caso contrário (se `num` não for zero), se nenhum erro ocorrer, retorna o valor `x` no intervalo `(-1, -0.5], [0.5, 1)` e armazena um valor inteiro em `*exp` tal que `x×2(*exp) == num`.

Se o valor a ser armazenado em `*exp` estiver fora do intervalo de `int`, o comportamento é não especificado.

### Tratamento de erros

Esta função não está sujeita a nenhum erro especificado em [math_errhandling](<#/doc/numeric/math/math_errhandling>).

Se a implementação suportar aritmética de ponto flutuante IEEE (IEC 60559),

  * Se `num` for ±0, ele é retornado, sem modificação, e `0` é armazenado em `*exp`.
  * Se `num` for ±∞, ele é retornado, e um valor não especificado é armazenado em `*exp`.
  * Se `num` for NaN, NaN é retornado, e um valor não especificado é armazenado em `*exp`.
  * Nenhuma exceção de ponto flutuante é lançada.
  * Se [FLT_RADIX](<#/doc/types/climits>) for 2 (ou uma potência de 2), o valor retornado é exato, [o modo de arredondamento atual](<#/doc/numeric/fenv/FE_round>) é ignorado.

### Notas

Em um sistema binário (onde [FLT_RADIX](<#/doc/types/climits>) é 2), `std::frexp` pode ser implementado como
```cpp
    {
        *exp = (value == 0) ? 0 : (int)(1 + std::logb(value));
        return std::scalbn(value, -(*exp));
    }
```

A função `std::frexp`, juntamente com sua dual, [std::ldexp](<#/doc/numeric/math/ldexp>), pode ser usada para manipular a representação de um número de ponto flutuante sem manipulações diretas de bits.

As sobrecargas adicionais não são obrigadas a ser fornecidas exatamente como (A). Elas só precisam ser suficientes para garantir que, para seu argumento `num` de tipo inteiro, `std::frexp(num, exp)` tenha o mesmo efeito que `std::frexp(static_cast<double>(num), exp)`.

### Exemplo

Compara diferentes funções de decomposição de ponto flutuante:

Execute este código
```cpp
    #include <cmath>
    #include <iostream>
    #include <limits>
     
    int main()
    {
        double f = 123.45;
        std::cout << "Given the number " << f << " or " << std::hexfloat
                  << f << std::defaultfloat << " in hex,\n";
     
        double f3;
        double f2 = std::modf(f, &f3);
        std::cout << "modf() makes " << f3 << " + " << f2 << '\n';
     
        int i;
        f2 = std::frexp(f, &i);
        std::cout << "frexp() makes " << f2 << " * 2^" << i << '\n';
     
        i = std::ilogb(f);
        std::cout << "logb()/ilogb() make " << f / std::scalbn(1.0, i)
                  << " * " << std::numeric_limits<double>::radix
                  << "^" << std::ilogb(f) << '\n';
    }
```

Saída possível:
```
    Given the number 123.45 or 0x1.edccccccccccdp+6 in hex,
    modf() makes 123 + 0.45
    frexp() makes 0.964453 * 2^7
    logb()/ilogb() make 1.92891 * 2^6
```

### Veja também

[ ldexpldexpfldexpl](<#/doc/numeric/math/ldexp>)(C++11)(C++11) | multiplica um número por 2 elevado a uma potência inteira
(função)
[ logblogbflogbl](<#/doc/numeric/math/logb>)(C++11)(C++11)(C++11) | extrai o expoente do número
(função)
[ ilogbilogbfilogbl](<#/doc/numeric/math/ilogb>)(C++11)(C++11)(C++11) | extrai o expoente do número
(função)
[ modfmodffmodfl](<#/doc/numeric/math/modf>)(C++11)(C++11) | decompõe um número em partes inteira e fracionária
(função)
[Documentação C](<#/>) para frexp