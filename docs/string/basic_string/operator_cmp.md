# operator==,!=,&lt;,&lt;=,&gt;,&gt;=,&lt;=&gt;(std::basic_string)

Definido no cabeçalho `[<string>](<#/doc/header/string>)`

```c
Compara dois objetos `basic_string`
template< class CharT, class Traits, class Alloc >
bool operator==( const std::basic_string<CharT,Traits,Alloc>& lhs,
const std::basic_string<CharT,Traits,Alloc>& rhs );
(constexpr desde C++20)
template< class CharT, class Traits, class Alloc >
bool operator!=( const std::basic_string<CharT,Traits,Alloc>& lhs,
const std::basic_string<CharT,Traits,Alloc>& rhs );
(noexcept desde C++11)
template< class CharT, class Traits, class Alloc >
bool operator<( const std::basic_string<CharT,Traits,Alloc>& lhs,
const std::basic_string<CharT,Traits,Alloc>& rhs );
(noexcept desde C++11)
template< class CharT, class Traits, class Alloc >
bool operator<=( const std::basic_string<CharT,Traits,Alloc>& lhs,
const std::basic_string<CharT,Traits,Alloc>& rhs );
(noexcept desde C++11)
template< class CharT, class Traits, class Alloc >
bool operator>( const std::basic_string<CharT,Traits,Alloc>& lhs,
const std::basic_string<CharT,Traits,Alloc>& rhs );
(noexcept desde C++11)
template< class CharT, class Traits, class Alloc >
bool operator>=( const std::basic_string<CharT,Traits,Alloc>& lhs,
const std::basic_string<CharT,Traits,Alloc>& rhs );
(noexcept desde C++11)
template< class CharT, class Traits, class Alloc >
constexpr /*comp-cat*/
operator<=>( const std::basic_string<CharT,Traits,Alloc>& lhs,
const std::basic_string<CharT,Traits,Alloc>& rhs ) noexcept;
Compara um objeto `basic_string` e um array de `T` terminado em nulo
template< class CharT, class Traits, class Alloc >
bool operator==( const std::basic_string<CharT,Traits,Alloc>& lhs,
const CharT* rhs );
template< class CharT, class Traits, class Alloc >
bool operator==( const CharT* lhs,
const std::basic_string<CharT,Traits,Alloc>& rhs );
template< class CharT, class Traits, class Alloc >
bool operator!=( const std::basic_string<CharT,Traits,Alloc>& lhs,
const CharT* rhs );
template< class CharT, class Traits, class Alloc >
bool operator!=( const CharT* lhs,
const std::basic_string<CharT,Traits,Alloc>& rhs );
template< class CharT, class Traits, class Alloc >
bool operator<( const std::basic_string<CharT,Traits,Alloc>& lhs,
const CharT* rhs );
template< class CharT, class Traits, class Alloc >
bool operator<( const CharT* lhs,
const std::basic_string<CharT,Traits,Alloc>& rhs );
template< class CharT, class Traits, class Alloc >
bool operator<=( const std::basic_string<CharT,Traits,Alloc>& lhs,
const CharT* rhs );
template< class CharT, class Traits, class Alloc >
bool operator<=( const CharT* lhs,
const std::basic_string<CharT,Traits,Alloc>& rhs );
template< class CharT, class Traits, class Alloc >
bool operator>( const std::basic_string<CharT,Traits,Alloc>& lhs,
const CharT* rhs );
template< class CharT, class Traits, class Alloc >
bool operator>( const CharT* lhs,
const std::basic_string<CharT,Traits,Alloc>& rhs );
template< class CharT, class Traits, class Alloc >
bool operator>=( const std::basic_string<CharT,Traits,Alloc>& lhs,
const CharT* rhs );
template< class CharT, class Traits, class Alloc >
bool operator>=( const CharT* lhs,
const std::basic_string<CharT,Traits,Alloc>& rhs );
template< class CharT, class Traits, class Alloc >
constexpr /*comp-cat*/
operator<=>( const std::basic_string<CharT,Traits,Alloc>& lhs,
const CharT* rhs );
```

Compara o conteúdo de uma string com outra string ou um array de `CharT` terminado em nulo.

Todas as comparações são feitas através da função membro [compare()](<#/doc/string/basic_string/compare>) (que por sua vez é definida em termos de `Traits::compare()`):

*   Duas strings são iguais se tanto o tamanho de `lhs` quanto de `rhs` são iguais e cada caractere em `lhs` tem um caractere equivalente em `rhs` na mesma posição.

*   As comparações de ordenação são feitas lexicograficamente – a comparação é realizada por uma função equivalente a [std::lexicographical_compare](<#/doc/algorithm/lexicographical_compare>) ou [std::lexicographical_compare_three_way](<#/doc/algorithm/lexicographical_compare_three_way>) (desde C++20).

1-7) Compara dois objetos `basic_string`.

8-20) Compara um objeto `basic_string` e um array de `CharT` terminado em nulo.

```cpp
O tipo de retorno dos operadores de comparação de três vias (/*comp-cat*/) é `Traits::comparison_category` se esse qualified-id existir e denotar um tipo, `std::weak_ordering` caso contrário. Se /*comp-cat*/ não for um tipo de categoria de comparação, o programa é malformado. Os operadores `<`, `<=`, `>`, `>=` e `!=` são sintetizados a partir de `operator<=>` e `operator==`, respectivamente.  // (desde C++20)
```

### Parâmetros

- **lhs, rhs** — strings cujo conteúdo comparar

### Valor de retorno

1-6,8-19) `true` se a comparação correspondente for verdadeira, `false` caso contrário.

7,20) `static_cast</*comp-cat*/>(lhs.compare(rhs) <=> 0)`.

### Complexidade

Linear no tamanho das strings.

### Observações

```cpp
Se pelo menos um parâmetro for do tipo std::string, std::wstring, std::u8string, std::u16string, ou std::u32string, o tipo de retorno de `operator<=>` é `std::strong_ordering`.  // (desde C++20)
```

### Exemplo

| Esta seção está incompleta
Razão: sem exemplo

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento conforme publicado | Comportamento correto
[LWG 2064](<https://cplusplus.github.io/LWG/issue2064>) | C++11 | se sobrecargas que recebem duas `basic_string`s eram `noexcept` era inconsistente;
sobrecargas que recebem um `CharT*` eram `noexcept` mas poderiam levantar UB | tornado consistente;
`noexcept` removido
[LWG 3432](<https://cplusplus.github.io/LWG/issue3432>) | C++20 | o tipo de retorno de `operator<=>` não era exigido ser um tipo de categoria de comparação | exigido