# std::ratio_subtract

Definido no cabeçalho `[<ratio>](<#/doc/header/ratio>)`

```c
template< class R1, class R2 >
using ratio_subtract = /* see below */;
```

O alias template `std::ratio_subtract` denota o resultado da subtração de duas frações racionais exatas representadas pelas especializações `[std::ratio](<#/doc/numeric/ratio/ratio>)` `R1` e `R2`.

O resultado é uma especialização `[std::ratio](<#/doc/numeric/ratio/ratio>)` `[std::ratio](<#/doc/numeric/ratio/ratio>)`<U, V>, tal que, dado Num == R1::num * R2::den - R2::num * R1::den e Denom == R1::den * R2::den (calculado sem overflow aritmético), `U` é `[std::ratio](<#/doc/numeric/ratio/ratio>)`<Num, Denom>::num e `V` é `[std::ratio](<#/doc/numeric/ratio/ratio>)`<Num, Denom>::den.

### Notas

Se `U` ou `V` não for representável em `[std::intmax_t](<#/doc/types/integer>)`, o programa é malformado. Se `Num` ou `Denom` não for representável em `[std::intmax_t](<#/doc/types/integer>)`, o programa é malformado, a menos que a implementação produza valores corretos para `U` e `V`.

A definição acima exige que o resultado de `std::ratio_subtract<R1, R2>` já esteja reduzido aos termos mais baixos; por exemplo, `std::ratio_subtract<[std::ratio](<#/doc/numeric/ratio/ratio>)<1, 2>, [std::ratio](<#/doc/numeric/ratio/ratio>)<1, 6>>` é do mesmo tipo que `[std::ratio](<#/doc/numeric/ratio/ratio>)<1, 3>`.

### Exemplo

Execute este código
```cpp
    #include <iostream>
    #include <ratio>
    
    int main()
    {
        using two_third = std::ratio<2, 3>;
        using one_sixth = std::ratio<1, 6>;
        using diff = std::ratio_subtract<two_third, one_sixth>;
        static_assert(std::ratio_equal_v<diff, std::ratio<1, 2>>);
    
        std::cout << "2/3 - 1/6 = " << diff::num << '/' << diff::den << '\n';
    }
```

Saída:
```
    2/3 - 1/6 = 1/2
```

### Veja também

`[ratio_add](<#/doc/numeric/ratio/ratio_add>)`(C++11) | adiciona dois objetos `ratio` em tempo de compilação
---|---
(alias template) |