# std::multiplies&lt;void&gt;

Definido no cabeçalho `[<functional>](<#/doc/header/functional>)`

```c
template<>
class multiplies<void>;
```

[std::multiplies](<#/doc/utility/functional/multiplies>)&lt;void&gt; é uma especialização de [std::multiplies](<#/doc/utility/functional/multiplies>) com tipo de parâmetro e de retorno deduzidos.

### Tipos de membros

Tipo | Definição
---|---
`is_transparent` | [não especificado](<#/doc/utility/functional>)

### Funções membro

** operator()** | retorna o produto de dois argumentos
(função membro pública)

## std::multiplies&lt;void&gt;::operator()

template< class T, class U >
constexpr auto operator()( T&& lhs, U&& rhs ) const
-> decltype([std::forward](<#/doc/utility/forward>)&lt;T&gt;(lhs) * [std::forward](<#/doc/utility/forward>)&lt;U&gt;(rhs));

Retorna o produto de lhs e rhs.

### Parâmetros

- **lhs, rhs** — valores a multiplicar

### Valor de retorno

[std::forward](<#/doc/utility/forward>)&lt;T&gt;(lhs) * [std::forward](<#/doc/utility/forward>)&lt;U&gt;(rhs).

### Exemplo

Execute este código
```cpp
    #include <complex>
    #include <functional>
    #include <iostream>
     
    int main()
    {
        auto complex_multiplies = std::multiplies<void>{}; // “void” can be omitted
        constexpr std::complex z1{1.0, 2.0}, z2{3.0, 4.0};
     
        std::cout << std::showpos
                  << complex_multiplies(z1, z2) << ' ' << z1 * z2 << '\n'
                  << complex_multiplies(z1, 5.) << ' ' << z1 * 5. << '\n'
                  << complex_multiplies(5., z1) << ' ' << 5. * z1 << '\n';
    }
```

Saída:
```
    (-5,+10) (-5,+10)
    (+5,+10) (+5,+10)
    (+5,+10) (+5,+10)
```