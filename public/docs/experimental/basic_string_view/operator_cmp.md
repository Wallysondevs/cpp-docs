# operator==,!=,&lt;,&lt;=,&gt;,&gt;=(std::experimental::basic_string_view)

Definido no cabeçalho `[<experimental/string_view>](<#/doc/header/experimental/string_view>)`

```c
Compara dois objetos `basic_string_view`
template< class CharT, class Traits >
constexpr bool operator==( basic_string_view <CharT,Traits> lhs,
basic_string_view <CharT,Traits> rhs ) noexcept;
template< class CharT, class Traits >
constexpr bool operator!=( basic_string_view <CharT,Traits> lhs,
basic_string_view <CharT,Traits> rhs ) noexcept;
template< class CharT, class Traits >
constexpr bool operator<( basic_string_view <CharT,Traits> lhs,
basic_string_view <CharT,Traits> rhs ) noexcept;
template< class CharT, class Traits >
constexpr bool operator<=( basic_string_view <CharT,Traits> lhs,
basic_string_view <CharT,Traits> rhs ) noexcept;
template< class CharT, class Traits >
constexpr bool operator>( basic_string_view <CharT,Traits> lhs,
basic_string_view <CharT,Traits> rhs ) noexcept;
template< class CharT, class Traits >
constexpr bool operator>=( basic_string_view <CharT,Traits> lhs,
basic_string_view <CharT,Traits> rhs ) noexcept;
```

Compara duas views.

Todas as comparações são feitas através da função membro [compare()](<#/doc/experimental/basic_string_view/compare>) (que por sua vez é definida em termos de `Traits::compare()`):

*   Duas views são iguais se tanto o tamanho de `lhs` quanto o de `rhs` forem iguais e cada caractere em `lhs` tiver um caractere equivalente em `rhs` na mesma posição.

*   As comparações de ordenação são feitas lexicograficamente -- a comparação é realizada por uma função equivalente a [std::lexicographical_compare](<#/doc/algorithm/lexicographical_compare>).

A implementação deve fornecer sobrecargas `constexpr` e `noexcept` adicionais suficientes dessas funções para que um objeto `basic_string_view<CharT,Traits>` `sv` possa ser comparado a outro objeto `t` com uma conversão implícita para `basic_string_view<CharT,Traits>`, com semânticas idênticas à comparação de `sv` e `basic_string_view<CharT,Traits>(t)`.

### Parâmetros

- **lhs, rhs** — views para comparar

### Valor de retorno

`true` se a comparação correspondente for verdadeira, `false` caso contrário.

### Complexidade

Linear no tamanho das views.