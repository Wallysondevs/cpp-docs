# std::ratio_equal

Definido no cabeçalho `[<ratio>](<#/doc/header/ratio>)`

```c
template< class R1, class R2 >
struct ratio_equal : std::integral_constant<bool, /* veja abaixo */> { };
```

Se as ratios `R1` e `R2` forem iguais, fornece a constante membro `value` igual a `true`. Caso contrário, `value` é `false`.

### Modelo de variável auxiliar

```cpp
template< class R1, class R2 >
constexpr bool ratio_equal_v = ratio_equal<R1, R2>::value;  // (desde C++17)
```

## Herdado de [ std::integral_constant](<#/doc/types/integral_constant>)

### Constantes membro

value[static] | true se R1::num == R2::num && R1::den == R2::den, false caso contrário
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

### Possível implementação
```cpp
    template< class R1, class R2 >
    struct ratio_equal : public std::integral_constant <
                                     bool,
                                     R1::num == R2::num && R1::den == R2::den
                                > {};
```

---

### Exemplo

Execute este código
```cpp
    #include <iostream>
    #include <ratio>
    
    int main()
    {
        constexpr bool equ = std::ratio_equal_v<std::ratio<2,3>,
                                                std::ratio<6,9>>;
        static_assert(equ);
        std::cout << "2/3 " << (equ ? "==" : "!=") << " 6/9\n";
    }
```

Saída:
```
    2/3 == 6/9
```

### Veja também

[ ratio_not_equal](<#/doc/numeric/ratio/ratio_not_equal>)(C++11) | compara dois objetos `ratio` para desigualdade em tempo de compilação
(modelo de classe)