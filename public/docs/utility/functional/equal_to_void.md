# std::equal_to&lt;void&gt;

Definido no cabeçalho `[<functional>](<#/doc/header/functional>)`

```c
template<>
class equal_to<void>;
```

[std::equal_to](<#/doc/utility/functional/equal_to>)&lt;void&gt; é uma especialização de [std::equal_to](<#/doc/utility/functional/equal_to>) com tipo de parâmetro e de retorno deduzidos.

### Tipos Aninhados

Tipo Aninhado | Definição
---|---
`is_transparent` | [não especificado](<#/doc/utility/functional>)

### Funções Membro

**operator()** | testa se os dois argumentos se comparam como iguais
(função membro pública)

## std::equal_to&lt;void&gt;::operator()

template< class T, class U >
constexpr auto operator()( T&& lhs, U&& rhs ) const
-> decltype([std::forward](<#/doc/utility/forward>)&lt;T&gt;(lhs) == [std::forward](<#/doc/utility/forward>)&lt;U&gt;(rhs));

Retorna o resultado da comparação de igualdade entre lhs e rhs.

### Parâmetros

- **lhs, rhs** — valores para comparar

### Valor de Retorno

[std::forward](<#/doc/utility/forward>)&lt;T&gt;(lhs) == [std::forward](<#/doc/utility/forward>)&lt;U&gt;(rhs).

### Exemplo

Execute este código
```cpp
    #include <functional>
     
    int main()
    {
        constexpr int a = 0, b = 8;
        std::equal_to<> equal{};
        static_assert(equal(a, a));
        static_assert(!equal(a, b));
    }
```