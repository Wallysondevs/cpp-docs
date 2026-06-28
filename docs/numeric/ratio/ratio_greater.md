# std::ratio_greater

Definido no cabeçalho `[<ratio>](<#/doc/header/ratio>)`

```c
template< class R1, class R2 >
struct ratio_greater : std::integral_constant<bool, /* veja abaixo */> { };
```

Se a razão `R1` for maior que a razão `R2`, fornece a constante membro `value` igual a `true`. Caso contrário, `value` é `false`.

### Modelo de variável auxiliar

```cpp
template< class R1, class R2 >
constexpr bool ratio_greater_v = ratio_greater<R1, R2>::value;  // (desde C++17)
```

## Herdado de [ std::integral_constant](<#/doc/types/integral_constant>)

### Constantes membro

value[static] | true se R1::num * R2::den > R2::num * R1::den, ou expressão equivalente que evita overflow, false caso contrário
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
        static_assert(std::ratio_greater<std::ratio<3, 4>, std::ratio<1, 2>>::value,
                      "3/4 > 1/2");
    
        if (std::ratio_greater<std::ratio<11, 12>, std::ratio<10, 11>>::value)
            std::cout << "11/12 > 10/11" "\n";
    
        // Since C++17
        static_assert(std::ratio_greater_v<std::ratio<12, 13>, std::ratio<11, 12>>);
    
        if constexpr (std::ratio_greater_v<std::ratio<12, 13>, std::ratio<11, 12>>)
            std::cout << "12/13 > 11/12" "\n";
    }
```

Saída:
```
    11/12 > 10/11
    12/13 > 11/12
```

### Veja também

[ ratio_greater_equal](<#/doc/numeric/ratio/ratio_greater_equal>)(C++11) | compara dois objetos `ratio` para _maior ou igual a_ em tempo de compilação
(modelo de classe)