# std::ratio_less_equal

Definido no cabeçalho `[<ratio>](<#/doc/header/ratio>)`

```c
template< class R1, class R2 >
struct ratio_less_equal : std::integral_constant<bool, /* veja abaixo */> { };
```

Se o ratio `R1` for menor ou igual ao ratio `R2`, fornece a constante membro value igual a true. Caso contrário, value é false.

### Template de variável auxiliar

```cpp
template< class R1, class R2 >
constexpr bool ratio_less_equal_v = ratio_less_equal<R1, R2>::value;  // (desde C++17)
```

## Herdado de [ std::integral_constant](<#/doc/types/integral_constant>)

### Constantes membro

value[static] | true se R1::num * R2::den <= R2::num * R1::den, ou expressão equivalente que evita overflow, false caso contrário
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
```cpp
    #include <iostream>
    #include <ratio>
    
    int main()
    {
        static_assert(std::ratio_less_equal<std::ratio<1, 2>, std::ratio<3, 4>>::value,
                      "1/2 <= 3/4");
    
        if (std::ratio_less_equal<std::ratio<10,11>, std::ratio<11,12>>::value)
            std::cout << "10/11 <= 11/12" "\n";
    
        static_assert(std::ratio_less_equal_v<std::ratio<10, 11>, std::ratio<11, 12>>);
    
        if constexpr (std::ratio_less_equal_v<std::ratio<10, 11>, std::ratio<11, 12>>)
            std::cout << "11/12 <= 12/13" "\n";
    }
```

Saída:
```
    10/11 <= 11/12
    11/12 <= 12/13
```

### Veja também

[ ratio_equal](<#/doc/numeric/ratio/ratio_equal>)(C++11) | compara dois objetos `ratio` para igualdade em tempo de compilação
(template de classe)
[ ratio_not_equal](<#/doc/numeric/ratio/ratio_not_equal>)(C++11) | compara dois objetos `ratio` para desigualdade em tempo de compilação
(template de classe)