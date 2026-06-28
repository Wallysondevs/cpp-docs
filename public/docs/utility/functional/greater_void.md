# std::greater&lt;void&gt;

Definido no cabeçalho `[<functional>](<#/doc/header/functional>)`

```c
template<>
class greater<void>;
```

`[std::greater](<#/doc/utility/functional/greater>)<void>` é uma especialização de `[std::greater](<#/doc/utility/functional/greater>)` com tipo de parâmetro e de retorno deduzidos.

### Tipos aninhados

Tipo aninhado | Definição
---|---
`is_transparent` | [não especificado](<#/doc/utility/functional>)

### Funções membro

** operator()** | testa se lhs é maior que rhs
(função membro pública)

## std::greater&lt;void&gt;::operator()

template< class T, class U >
constexpr auto operator()( T&& lhs, U&& rhs ) const
-> decltype([std::forward](<#/doc/utility/forward>)&lt;T&gt;(lhs) > [std::forward](<#/doc/utility/forward>)&lt;U&gt;(rhs));

Retorna o resultado de `[std::forward](<#/doc/utility/forward>)<T>(lhs) > [std::forward](<#/doc/utility/forward>)<U>(rhs)`.

### Parâmetros

- **lhs, rhs** — valores para comparar

### Valor de retorno

`[std::forward](<#/doc/utility/forward>)<T>(lhs) > [std::forward](<#/doc/utility/forward>)<U>(rhs)`.

Se um operador embutido que compara ponteiros for chamado, o resultado é consistente com a [ordem total estrita sobre ponteiros definida pela implementação](<#/doc/language/operator_comparison>).

### Exceções

Pode lançar exceções definidas pela implementação.

### Exemplo

Execute este código
```
    #include <algorithm>
    #include <cstdint>
    #include <functional>
     
    constexpr bool strictly_positive(int lhs)
    {
        return std::greater<>()(lhs, 0);
    }
     
    int main()
    {
        constexpr std::int64_t low = 0B11;
        constexpr std::uint16_t high = 0X11;
        std::greater<> greater{};
        static_assert(greater(high, low));
     
        constexpr static auto arr = {0, 1, 2, 3, 4, 5};
        static_assert(!std::all_of(arr.begin(), arr.end(), strictly_positive));
        static_assert(std::all_of(arr.begin() + 1, arr.end(), strictly_positive));
    }
```

### Relatórios de defeitos

Os seguintes relatórios de defeitos que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento conforme publicado | Comportamento correto
---|---|---|---
[LWG 2562](<https://cplusplus.github.io/LWG/issue2562>) | C++98 | a ordem total do ponteiro pode ser inconsistente | garantido como consistente