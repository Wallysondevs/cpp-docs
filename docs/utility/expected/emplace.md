# std::expected&lt;T,E&gt;::emplace

```cpp
Modelo primário
template< class... Args >
constexpr T& emplace( Args&&... args ) noexcept;  // (1) (desde C++23)
template< class U, class... Args >
constexpr T& emplace( std::initializer_list<U> il, Args&&... args ) noexcept;  // (2) (desde C++23)
especialização parcial void
constexpr void emplace() noexcept;  // (3) (desde C++23)
```

Constrói um valor esperado no local. Após a chamada, [`has_value()`](<#/doc/utility/expected/operator_bool>) retorna true.

1) Destrói o valor contido, então [inicializa diretamente](<#/doc/language/direct_initialization>) o valor esperado contido em *this com [std::forward](<#/doc/utility/forward>)&lt;Args&gt;(args)....

Esta sobrecarga participa da resolução de sobrecarga somente se [std::is_nothrow_constructible_v](<#/doc/types/is_constructible>)<T, Args...> for true.

2) Destrói o valor contido, então inicializa diretamente o valor esperado contido em *this com il e [std::forward](<#/doc/utility/forward>)&lt;Args&gt;(args)....

Esta sobrecarga participa da resolução de sobrecarga somente se [std::is_nothrow_constructible_v](<#/doc/types/is_constructible>)<T, [std::initializer_list](<#/doc/utility/initializer_list>)&lt;U&gt;&, Args...> for true.

3) Se *this contiver um valor inesperado, destrói esse valor.

### Parâmetros

args | \- | os argumentos a serem passados para o construtor
---|---|---
il | \- | a initializer list a ser passada para o construtor

### Valor de retorno

1) *[std::construct_at](<#/doc/memory/construct_at>)([std::addressof](<#/doc/memory/addressof>)([`_val_`](<#/doc/utility/expected>)), [std::forward](<#/doc/utility/forward>)&lt;Args&gt;(args)...)

2) *[std::construct_at](<#/doc/memory/construct_at>)([std::addressof](<#/doc/memory/addressof>)([`_val_`](<#/doc/utility/expected>)), il, [std::forward](<#/doc/utility/forward>)&lt;Args&gt;(args)...)

### Observações

Se a construção de `T` for potencialmente lançadora de exceções, [`operator=`](<#/>) pode ser usado em vez disso.

### Exemplo

| Esta seção está incompleta
Razão: nenhum exemplo

### Veja também

[ operator=](<#/>) | atribui conteúdo
(função membro pública)