# std::function_ref::operator=

```cpp
constexpr function_ref& operator=( const function_ref& ) noexcept = default;
```
| (1) | (desde C++26) |
|---|---|
```cpp
template< class T >
constexpr function_ref& operator=( T ) = delete;
```
| (2) | (desde C++26) |
|---|---|

1) O operador de atribuição de cópia é explicitamente padronizado (`defaulted`). `std::function_ref` satisfaz [`copyable`](<#/doc/concepts/copyable>) e [TriviallyCopyable](<#/doc/named_req/TriviallyCopyable>). Este operador de atribuição padronizado realiza uma cópia superficial (`shallow copy`) do `_[thunk-ptr](<#/doc/utility/functional/function_ref>)_` e do `_[bound-entity](<#/doc/utility/functional/function_ref>)_` armazenados.

2) O operador de atribuição definido pelo usuário é explicitamente deletado (`deleted`) se T não for do mesmo tipo que `std::function_ref`, [std::is_pointer_v](<#/doc/types/is_pointer>)&lt;T&gt; for `false`, e T não for uma especialização de std::nontype_t. Esta sobrecarga participa da resolução de sobrecarga (`overload resolution`) apenas se as restrições forem satisfeitas nas condições acima.

### Valor de retorno

*this

### Ver também

[ (construtor)](<#/doc/utility/functional/function_ref/function_ref>) | constrói um novo objeto `function_ref`
(função membro pública)
[ operator=](<#/>) | substitui ou destrói o alvo
(função membro pública de `std::copyable_function`)
[ operator=](<#/>) | atribui um novo alvo
(função membro pública de `std::function<R(Args...)>`)
[ operator=](<#/>) | substitui ou destrói o alvo
(função membro pública de `std::move_only_function`)
---