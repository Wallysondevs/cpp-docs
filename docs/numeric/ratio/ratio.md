# std::ratio

Definido no cabeçalho `[<ratio>](<#/doc/header/ratio>)`

```c
template<
std::intmax_t Num,
std::intmax_t Denom = 1
> class ratio;
```

O template de classe `std::ratio` fornece suporte para [aritmética racional em tempo de compilação](<#/doc/numeric/ratio>). Cada instanciação deste template representa exatamente qualquer número racional finito, desde que seu numerador `Num` e denominador `Denom` sejam representáveis como constantes em tempo de compilação do tipo [std::intmax_t](<#/doc/types/integer>). Além disso, `Denom` não pode ser zero e tanto `Num` quanto `Denom` não podem ser iguais ao valor mais negativo.

Os membros de dados estáticos `num` e `den`, que representam o numerador e o denominador, são calculados dividindo `Num` e `Denom` pelo seu maior divisor comum. No entanto, dois `std::ratio` com `Num` ou `Denom` diferentes são tipos distintos, mesmo que representem o mesmo número racional (após a redução). Um tipo `std::ratio` pode ser reduzido aos termos mais baixos através do seu membro `type`: std::ratio<3, 6>::type é std::ratio<1, 2>.

Os seguintes typedefs de conveniência que correspondem às razões SI são fornecidos pela standard library:

Definido no cabeçalho `[<ratio>](<#/doc/header/ratio>)`
---
Tipo | Definição
---|---
`quecto` (desde C++26) | std::ratio<1, 1000000000000000000000000000000>` `(10-30)[1](<#/doc/numeric/ratio/ratio>)
`ronto` (desde C++26) | std::ratio<1, 1000000000000000000000000000>` `(10-27)[1](<#/doc/numeric/ratio/ratio>)
`yocto` (desde C++11) | std::ratio<1, 1000000000000000000000000>` `(10-24)[1](<#/doc/numeric/ratio/ratio>)
`zepto` (desde C++11) | std::ratio<1, 1000000000000000000000>` `(10-21)[1](<#/doc/numeric/ratio/ratio>)
`atto` (desde C++11) | std::ratio<1, 1000000000000000000>` `(10-18)
`femto` (desde C++11) | std::ratio<1, 1000000000000000>` `(10-15)
`pico` (desde C++11) | std::ratio<1, 1000000000000>` `(10-12)
`nano` (desde C++11) | std::ratio<1, 1000000000>` `(10-9)
`micro` (desde C++11) | std::ratio<1, 1000000>` `(10-6)
`milli` (desde C++11) | std::ratio<1, 1000>` `(10-3)
`centi` (desde C++11) | std::ratio<1, 100>` `(10-2)
`deci` (desde C++11) | std::ratio<1, 10>` `(10-1)
`deca` (desde C++11) | std::ratio<10, 1>` `(101)
`hecto` (desde C++11) | std::ratio<100, 1>` `(102)
`kilo` (desde C++11) | std::ratio<1000, 1>` `(103)
`mega` (desde C++11) | std::ratio<1000000, 1>` `(106)
`giga` (desde C++11) | std::ratio<1000000000, 1>` `(109)
`tera` (desde C++11) | std::ratio<1000000000000, 1>` `(1012)
`peta` (desde C++11) | std::ratio<1000000000000000, 1>` `(1015)
`exa` (desde C++11) | std::ratio<1000000000000000000, 1>` `(1018)
`zetta` (desde C++11) | std::ratio<1000000000000000000000, 1>` `(1021)[2](<#/doc/numeric/ratio/ratio>)
`yotta` (desde C++11) | std::ratio<1000000000000000000000000, 1>` `(1024)[2](<#/doc/numeric/ratio/ratio>)
`ronna` (desde C++26) | std::ratio<1000000000000000000000000000, 1>` `(1027)[2](<#/doc/numeric/ratio/ratio>)
`quetta` (desde C++26) | std::ratio<1000000000000000000000000000000, 1>` `(1030)[2](<#/doc/numeric/ratio/ratio>)

1. ↑ [1.0](<#/doc/numeric/ratio/ratio>) [1.1](<#/doc/numeric/ratio/ratio>) [1.2](<#/doc/numeric/ratio/ratio>) [1.3](<#/doc/numeric/ratio/ratio>) Esses typedefs são declarados apenas se [std::intmax_t](<#/doc/types/integer>) puder representar o denominador.
2. ↑ [2.0](<#/doc/numeric/ratio/ratio>) [2.1](<#/doc/numeric/ratio/ratio>) [2.2](<#/doc/numeric/ratio/ratio>) [2.3](<#/doc/numeric/ratio/ratio>) Esses typedefs são declarados apenas se [std::intmax_t](<#/doc/types/integer>) puder representar o numerador.

### Tipos aninhados

Tipo | Definição
---|---
`type` | std::ratio<num, den> (o tipo racional após a redução)

### Membros de dados

Nas definições fornecidas abaixo,

*   sign(Denom) é -1 se Denom for negativo, ou 1 caso contrário; e
*   gcd(Num, Denom) é o maior divisor comum de std::abs(Num) e std::abs(Denom).

Membro | Definição
---|---
constexpr [std::intmax_t](<#/doc/types/integer>) num[static] | sign(Denom) * Num / gcd(Num, Denom)
(constante membro estática pública)
constexpr [std::intmax_t](<#/doc/types/integer>) den[static] | std::abs(Denom) / gcd(Num, Denom)
(constante membro estática pública)

### Notas

Macro de [teste de recurso](<#/doc/utility/feature_test>) | Valor | Std | Recurso
---|---|---|---
[`__cpp_lib_ratio`](<#/doc/feature_test>) | [`202306L`](<#/>) | (C++26) | Adicionando os novos prefixos SI de 2022: quecto, quetta, ronto, ronna

### Exemplo

Execute este código
```cpp
    #include <ratio>
    
    static_assert
    (
        std::ratio_equal_v<std::ratio_multiply<std::femto, std::exa>, std::kilo>
    );
    
    int main() {}
```

### Veja também

[Constantes matemáticas](<#/doc/numeric/constants>) (C++20) | fornece várias constantes matemáticas, como [std::numbers::e](<#/doc/numeric/constants>) para e