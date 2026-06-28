# std::less&lt;void&gt;

Definido no cabeçalho `[<functional>](<#/doc/header/functional>)`

```c
template<>
class less<void>;
```

[std::less](<#/doc/utility/functional/less>)&lt;void&gt; é uma especialização de [std::less](<#/doc/utility/functional/less>) com tipo de parâmetro e de retorno deduzidos.

### Tipos aninhados

Tipo aninhado | Definição
---|---
`is_transparent` | [não especificado](<#/doc/utility/functional>)

### Funções membro

** operator()** | testa se lhs é menor que rhs
(função membro pública)

## std::less&lt;void&gt;::operator()

template< class T, class U >
constexpr auto operator()( T&& lhs, U&& rhs ) const
-> decltype([std::forward](<#/doc/utility/forward>)&lt;T&gt;(lhs) < [std::forward](<#/doc/utility/forward>)&lt;U&gt;(rhs));

Retorna o resultado de [std::forward](<#/doc/utility/forward>)&lt;T&gt;(lhs) < [std::forward](<#/doc/utility/forward>)&lt;U&gt;(rhs).

### Parâmetros

- **lhs, rhs** — valores a comparar

### Valor de retorno

[std::forward](<#/doc/utility/forward>)&lt;T&gt;(lhs) < [std::forward](<#/doc/utility/forward>)&lt;U&gt;(rhs).

Se um operador built-in de comparação de ponteiros for chamado, o resultado é consistente com a [ordem total estrita definida pela implementação sobre ponteiros](<#/doc/language/operator_comparison>).

### Exceções

Pode lançar exceções definidas pela implementação.

### Exemplo

Execute este código
```cpp
    #include <algorithm>
    #include <functional>
    
    constexpr bool strictly_negative(int lhs)
    {
        return std::less<>()(lhs, 0);
    }
    
    int main()
    {
        constexpr signed low = 010;
        constexpr unsigned high = 10;
        std::less<> less{};
        static_assert(less(low, high));
    
        constexpr static auto arr = {0, -1, -2, -3, -4, -5};
        static_assert(!std::all_of(arr.begin(), arr.end(), strictly_negative));
        static_assert(std::all_of(arr.begin() + 1, arr.end(), strictly_negative));
    }
```

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento conforme publicado | Comportamento correto
---|---|---|---
[LWG 2562](<https://cplusplus.github.io/LWG/issue2562>) | C++98 | a ordem total de ponteiros pode ser inconsistente | garantida como consistente