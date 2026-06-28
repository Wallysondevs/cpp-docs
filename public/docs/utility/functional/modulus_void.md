# std::modulus&lt;void&gt;

Definido no cabeçalho `[<functional>](<#/doc/header/functional>)`

```c
template<>
class modulus<void>;
```

[std::modulus](<#/doc/utility/functional/modulus>)&lt;void&gt; é uma especialização de [std::modulus](<#/doc/utility/functional/modulus>) com tipo de parâmetro e de retorno deduzidos.

### Tipos aninhados

Tipo aninhado | Definição
---|---
`is_transparent` | [não especificado](<#/doc/utility/functional>)

### Funções membro

** operator()** | retorna o módulo de dois argumentos
(função membro pública)

## std::modulus&lt;void&gt;::operator()

template< class T, class U >
constexpr auto operator()( T&& lhs, U&& rhs ) const
-> decltype([std::forward](<#/doc/utility/forward>)&lt;T&gt;(lhs) % [std::forward](<#/doc/utility/forward>)&lt;U&gt;(rhs));

Retorna o resto da divisão de lhs por rhs.

### Parâmetros

- **lhs, rhs** — valores a dividir

### Valor de retorno

[std::forward](<#/doc/utility/forward>)&lt;T&gt;(lhs) % [std::forward](<#/doc/utility/forward>)&lt;U&gt;(rhs).

### Exemplo

Execute este código
```cpp
    #include <functional>
    #include <iostream>
    
    struct M
    {
        M(int x) { std::cout << "M(" << x << ");\n"; }
        M() {}
    };
    
    auto operator%(M, M) { std::cout << "operator%(M, M);\n"; return M{}; }
    auto operator%(M, int) { std::cout << "operator%(M, int);\n"; return M{}; }
    auto operator%(int, M) { std::cout << "operator%(int, M);\n"; return M{}; }
    
    int main()
    {
        M m;
    
        // 42 is converted into a temporary object M{42}
        std::modulus<M>{}(m, 42);    // calls operator%(M, M)
    
        // no temporary object
        std::modulus<void>{}(m, 42); // calls operator%(M, int)
        std::modulus<void>{}(42, m); // calls operator%(int, M)
    }
```

Saída:
```
    M(42);
    operator%(M, M);
    operator%(M, int);
    operator%(int, M);
```