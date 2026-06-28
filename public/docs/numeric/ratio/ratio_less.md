# std::ratio_less

Definido no cabeçalho `[<ratio>](<#/doc/header/ratio>)`

```c
template< class R1, class R2 >
struct ratio_less : std::integral_constant<bool, /* veja abaixo */> { };
```

Se a ratio `R1` for menor que a ratio `R2`, fornece a constante membro value igual a true. Caso contrário, value é false.

### Template de variável auxiliar

```cpp
template< class R1, class R2 >
constexpr bool ratio_less_v = ratio_less<R1, R2>::value;  // (desde C++17)
```

## Herdado de [ std::integral_constant](<#/doc/types/integral_constant>)

### Constantes membro

value[static] | true se R1::num * R2::den < R2::num * R1::den, ou expressão equivalente que evita overflow, false caso contrário
(constante membro estática pública)

### Funções membro

operator bool | converte o objeto para bool, retorna value
(função membro pública)
operator()(C++14) | retorna value
(função membro pública)

### Tipos membro

Tipo | Definição
---|---
`value_type` | bool
`type` | [std::integral_constant](<#/doc/types/integral_constant>)<bool, value>

### Exemplo

Execute este código
```
    #include <iostream>
    #include <ratio>
     
    int main()
    {
        using x = std::ratio<69, 90>;
        using y = std::ratio<70, 90>;
     
        if constexpr (std::ratio_less_v<x, y>)
            std::cout << x::num << '/' << x::den << " < "
                      << y::num << '/' << y::den << '\n';
    }
```

Saída:
```
    23/30 < 7/9
```

### Veja também

[ ratio_greater](<#/doc/numeric/ratio/ratio_greater>)(C++11) | compara dois objetos `ratio` para _maior que_ em tempo de compilação
(template de classe)