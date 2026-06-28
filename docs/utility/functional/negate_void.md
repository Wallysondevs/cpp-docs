# std::negate&lt;void&gt;

Definido no cabeçalho `[<functional>](<#/doc/header/functional>)`

```c
template<>
class negate<void>;
```

[std::negate](<#/doc/utility/functional/negate>)<> é uma especialização de [std::negate](<#/doc/utility/functional/negate>) com tipo de parâmetro e de retorno deduzidos.

### Tipos de membros

Tipo | Definição
---|---
`is_transparent` | [não especificado](<#/doc/utility/functional>)

### Funções membro

** operator()** | retorna seu argumento negado
(função membro pública)

## std::negate&lt;void&gt;::operator()

template< class T >
constexpr auto operator()( T&& arg ) const
-> decltype(-[std::forward](<#/doc/utility/forward>)&lt;T&gt;(arg));

Retorna o resultado da negação de arg.

### Parâmetros

- **arg** — valor a ser negado

### Valor de retorno

-[std::forward](<#/doc/utility/forward>)&lt;T&gt;(arg).

### Exemplo

Execute este código
```cpp
    #include <complex>
    #include <functional>
    #include <iostream>
    
    int main()
    {
        auto complex_negate = std::negate<void>{}; // "void" pode ser omitido
        constexpr std::complex z(4, 2);
        std::cout << z << '\n';
        std::cout << -z << '\n';
        std::cout << complex_negate(z) << '\n';
    }
```

Saída:
```
    (4,2)
    (-4,-2)
    (-4,-2)
```