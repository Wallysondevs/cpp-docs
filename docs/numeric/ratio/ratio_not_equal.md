# std::ratio_not_equal

Definido no cabeçalho `[<ratio>](<#/doc/header/ratio>)`

```c
template< class R1, class R2 >
struct ratio_not_equal : std::integral_constant<bool, /* veja abaixo */> { };
```

Se as ratios `R1` e `R2` não forem iguais, fornece a constante membro `value` igual a `true`. Caso contrário, `value` é `false`.

### Template de variável auxiliar

```cpp
template< class R1, class R2 >
constexpr bool ratio_not_equal_v = ratio_not_equal<R1, R2>::value;  // (desde C++17)
```

## Herdado de [ std::integral_constant](<#/doc/types/integral_constant>)

### Constantes membro

value[static] | true se R1::num != R2::num || R1::den != R2::den, false caso contrário
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
    struct ratio_not_equal : std::integral_constant <
                                  bool,
                                  !std::ratio_equal<R1, R2>
                             > {};
```

---

### Exemplo

Execute este código
```cpp
    #include <ratio>
    
    static_assert(std::ratio_not_equal_v<std::ratio<6, 9>, std::ratio<9, 6>>, "6/9 != 9/6");
    
    int main() {}
```

### Veja também

[ ratio_equal](<#/doc/numeric/ratio/ratio_equal>)(C++11) | compara dois objetos `ratio` para igualdade em tempo de compilação
(template de classe)