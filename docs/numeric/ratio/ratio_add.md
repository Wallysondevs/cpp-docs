# std::ratio_add

Definido no cabeçalho `[<ratio>](<#/doc/header/ratio>)`

```c
template< class R1, class R2 >
using ratio_add = /* veja abaixo */;
```

O alias template `std::ratio_add` denota o resultado da adição de duas frações racionais exatas representadas pelas especializações `[std::ratio](<#/doc/numeric/ratio/ratio>)` `R1` e `R2`.

O resultado é uma especialização `[std::ratio](<#/doc/numeric/ratio/ratio>)` `[std::ratio](<#/doc/numeric/ratio/ratio>)<U, V>`, tal que, dado Num == R1::num * R2::den + R2::num * R1::den e Denom == R1::den * R2::den (calculado sem overflow aritmético), `U` é `[std::ratio](<#/doc/numeric/ratio/ratio>)<Num, Denom>::num` e `V` é `[std::ratio](<#/doc/numeric/ratio/ratio>)<Num, Denom>::den`.

### Notas

Se `U` ou `V` não for representável em `[std::intmax_t](<#/doc/types/integer>)`, o programa é malformado. Se `Num` ou `Denom` não for representável em `[std::intmax_t](<#/doc/types/integer>)`, o programa é malformado, a menos que a implementação produza valores corretos para `U` e `V`.

A definição acima exige que o resultado de std::ratio_add<R1, R2> já esteja reduzido aos termos mais baixos; por exemplo, std::ratio_add<[std::ratio](<#/doc/numeric/ratio/ratio>)<1, 3>, [std::ratio](<#/doc/numeric/ratio/ratio>)<1, 6>> é do mesmo tipo que [std::ratio](<#/doc/numeric/ratio/ratio>)<1, 2>.

### Exemplo

Execute este código
```cpp
    #include <iostream>
    #include <ratio>
    
    int main()
    {
        using two_third = std::ratio<2, 3>;
        using one_sixth = std::ratio<1, 6>;
        using sum = std::ratio_add<two_third, one_sixth>;
    
        std::cout << "2/3 + 1/6 = " << sum::num << '/' << sum::den << '\n';
    }
```

Saída:
```
    2/3 + 1/6 = 5/6
```

### Veja também

| `[ ratio_subtract](<#/doc/numeric/ratio/ratio_subtract>)`(C++11) | subtrai dois objetos `ratio` em tempo de compilação |
|---|---|
| (alias template)
| *[Valor]: O ano/mês em que o recurso foi adotado. O hiperlink sob cada valor abre uma página de suporte do compilador com a entrada para o recurso fornecido. |
| *[Padrão]: Padrão no qual o recurso é introduzido; DR significa relatório de defeito contra essa revisão |