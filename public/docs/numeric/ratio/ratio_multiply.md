# std::ratio_multiply

Definido no cabeçalho `[<ratio>](<#/doc/header/ratio>)`

```c
template< class R1, class R2 >
using ratio_multiply = /* see below */;
```

O alias template `std::ratio_multiply` denota o resultado da multiplicação de duas frações racionais exatas representadas pelas especializações [std::ratio](<#/doc/numeric/ratio/ratio>) `R1` e `R2`.

O resultado é uma especialização [std::ratio](<#/doc/numeric/ratio/ratio>) [std::ratio](<#/doc/numeric/ratio/ratio>)<U, V>, tal que, dado Num == R1::num * R2::num e Denom == R1::den * R2::den (calculado sem overflow aritmético), `U` é [std::ratio](<#/doc/numeric/ratio/ratio>)<Num, Denom>::num e `V` é [std::ratio](<#/doc/numeric/ratio/ratio>)<Num, Denom>::den.

### Notas

Se `U` ou `V` não for representável em [std::intmax_t](<#/doc/types/integer>), o programa é malformado. Se `Num` ou `Denom` não for representável em [std::intmax_t](<#/doc/types/integer>), o programa é malformado, a menos que a implementação produza valores corretos para `U` e `V`.

A definição acima exige que o resultado de std::ratio_multiply<R1, R2> já esteja reduzido aos termos mais baixos; por exemplo, std::ratio_multiply<[std::ratio](<#/doc/numeric/ratio/ratio>)<1, 6>, [std::ratio](<#/doc/numeric/ratio/ratio>)<4, 5>> é do mesmo tipo que [std::ratio](<#/doc/numeric/ratio/ratio>)<2, 15>.

### Exemplo

Execute este código
```cpp
    #include <iostream>
    #include <ratio>
    
    int main()
    {
        using two_third = std::ratio<2, 3>;
        using one_sixth = std::ratio<1, 6>;
        using product = std::ratio_multiply<two_third, one_sixth>;
        static_assert(std::ratio_equal_v<product, std::ratio<13, 117>>);
        std::cout << "2/3 * 1/6 = " << product::num << '/' << product::den << '\n';
    }
```

Saída:
```
    2/3 * 1/6 = 1/9
```

### Veja também

[ ratio_divide](<#/doc/numeric/ratio/ratio_divide>)(C++11) | divide dois objetos `ratio` em tempo de compilação
(alias template)