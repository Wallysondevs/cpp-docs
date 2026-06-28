# std::experimental::any::operator=

any& operator=( const any& rhs ); | (1) | (library fundamentals TS)
---|---|---
any& operator=( any&& rhs ) noexcept; | (2) | (library fundamentals TS)
template< typename ValueType >
any& operator=( ValueType&& rhs ); | (3) | (library fundamentals TS)

Atribui conteúdo ao valor contido.

1) Atribui copiando o estado de rhs, como se por any(rhs).swap(*this).

2) Atribui movendo o estado de rhs, como se por any(std::move(rhs)).swap(*this). rhs é deixado em um estado válido, mas não especificado, após a atribuição.

3) Atribui o tipo e o valor de rhs, como se por any([std::forward](<#/doc/utility/forward>)&lt;ValueType&gt;(rhs)).swap(*this). Se [std::is_copy_constructible](<#/doc/types/is_copy_constructible>)<[std::decay_t](<#/doc/types/decay>)&lt;ValueType&gt;>::value for false, o programa é malformado. Esta sobrecarga participa da resolução de sobrecarga apenas se [std::decay_t](<#/doc/types/decay>)&lt;ValueType&gt; não for do mesmo tipo que any.

### Parâmetros de template

- **ValueType** — tipo de valor contido
Requisitos de tipo
-`std::decay_t<ValueType>` deve atender aos requisitos de [CopyConstructible](<#/doc/named_req/CopyConstructible>).

### Parâmetros

- **rhs** — objeto cujo valor contido deve ser atribuído

### Valor de retorno

*this

### Exceções

1,3) Lança bad_alloc ou qualquer exceção lançada pelo construtor do tipo contido. Se uma exceção for lançada, não há efeitos (garantia de exceção forte).

### Veja também

[ (construtor)](<#/doc/experimental/any/any>) | constrói um objeto `any`
(função membro pública)