# std::ratio_greater_equal

Definido no cabeçalho `[<ratio>](<#/doc/header/ratio>)`

```c
template< class R1, class R2 >
struct ratio_greater_equal : std::integral_constant<bool, /* see below */> { };
```

Se o ratio `R1` for maior ou igual ao ratio `R2`, fornece a constante membro `value` igual a `true`. Caso contrário, `value` é `false`.

### Modelo de variável auxiliar

```cpp
template< class R1, class R2 >
constexpr bool ratio_greater_equal_v = ratio_greater_equal<R1, R2>::value;  // (desde C++17)
```

## Herdado de [ std::integral_constant](<#/doc/types/integral_constant>)

### Constantes membro

value[static] | true se R1::num * R2::den >= R2::num * R1::den, ou expressão equivalente que evita estouro, false caso contrário
(constante membro estática pública)

### Funções membro

operator bool | converte o objeto para bool, retorna `value`
(função membro pública)
operator()(C++14) | retorna `value`
(função membro pública)

### Tipos membro

Type | Definition
---|---
`value_type` | bool
`type` | [std::integral_constant](<#/doc/types/integral_constant>)<bool, value>

### Exemplo

Execute este código
```
    #include <ratio>
     
    int main()
    {
        static_assert(std::ratio_greater_equal<
            std::ratio<2, 3>,
            std::ratio<2, 3>>::value, "2/3 >= 2/3");
     
        // since C++17
        static_assert(std::ratio_greater_equal_v<
            std::ratio<999'998, 999'999>,
            std::ratio<999'997, 999'998>>);
    }
```

### Veja também

[ ratio_equal](<#/doc/numeric/ratio/ratio_equal>)(C++11) | compara dois objetos `ratio` por igualdade em tempo de compilação
(modelo de classe)
[ ratio_less](<#/doc/numeric/ratio/ratio_less>)(C++11) | compara dois objetos `ratio` por _menor que_ em tempo de compilação
(modelo de classe)