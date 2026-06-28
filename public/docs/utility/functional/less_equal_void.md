# std::less_equal&lt;void&gt;

Definido no cabeçalho `[<functional>](<#/doc/header/functional>)`

```c
template<>
class less_equal<void>;
```

`[std::less_equal](<#/doc/utility/functional/less_equal>)<void>` é uma especialização de `[std::less_equal](<#/doc/utility/functional/less_equal>)` com tipo de parâmetro e de retorno deduzidos.

### Tipos aninhados

Tipo aninhado | Definição
---|---
`is_transparent` | `[não especificado](<#/doc/utility/functional>)`

### Funções membro

** operator()** | testa se lhs é menor ou igual a rhs
(função membro pública)

## std::less_equal&lt;void&gt;::operator()

template< class T, class U >
constexpr auto operator()( T&& lhs, U&& rhs ) const
-> decltype([std::forward](<#/doc/utility/forward>)&lt;T&gt;(lhs) <= [std::forward](<#/doc/utility/forward>)&lt;U&gt;(rhs));

Retorna o resultado de `[std::forward](<#/doc/utility/forward>)<T>(lhs) <= [std::forward](<#/doc/utility/forward>)<U>(rhs)`.

### Parâmetros

- **lhs, rhs** — valores a comparar

### Valor de retorno

`[std::forward](<#/doc/utility/forward>)<T>(lhs) <= [std::forward](<#/doc/utility/forward>)<U>(rhs)`.

Se um operador embutido de comparação de ponteiros for chamado, o resultado é consistente com a [ordem total estrita definida pela implementação sobre ponteiros](<#/doc/language/operator_comparison>).

### Exceções

Pode lançar exceções definidas pela implementação.

### Exemplo

Executar este código
```cpp
    #include <algorithm>
    #include <functional>
    #include <initializer_list>
    
    constexpr bool strictly_not_positive(int lhs)
    {
        return std::less_equal<>()(lhs, 0);
    }
    
    int main()
    {
        constexpr int low = 0, high = 8;
        std::less_equal<> less_equal{};
        static_assert(less_equal(low, high));
        static_assert(less_equal(low, low));
    
        static constexpr auto arr = {1, 0, -1, -2, -3, -4};
        static_assert(!std::all_of(arr.begin(), arr.end(), strictly_not_positive));
        static_assert(std::all_of(arr.begin() + 1, arr.end(), strictly_not_positive));
    }
```

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento conforme publicado | Comportamento correto
---|---|---|---
`[LWG 2562](<https://cplusplus.github.io/LWG/issue2562>)` | C++98 | a ordem total de ponteiros pode ser inconsistente | garantido ser consistente