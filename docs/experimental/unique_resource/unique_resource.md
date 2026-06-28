# std::experimental::unique_resource&lt;R, D&gt;::unique_resource

unique_resource(); | (1) | (fundamentos da biblioteca TS v3)
template< class RR, class DD >
unique_resource( RR&& r, DD&& d ) noexcept(/*see below*/) | (2) | (fundamentos da biblioteca TS v3)
---|---|---
unique_resource( unique_resource&& other ); | (3) | (fundamentos da biblioteca TS v3)

Os itens a seguir são usados para fins explicativos:

*   `RS` é o tipo do handle de recurso armazenado.
*   A expressão res_ se refere ao handle de recurso subjacente.
*   `del_` se refere ao objeto deleter.

1) Construtor padrão. Inicializa por valor o handle de recurso armazenado e o deleter. O `unique_resource` construído não possui o recurso.

Esta sobrecarga participa da resolução de sobrecarga apenas se ambos [std::is_default_constructible_v](<#/doc/types/is_default_constructible>)&lt;R&gt; e [std::is_default_constructible_v](<#/doc/types/is_default_constructible>)&lt;D&gt; forem verdadeiros.

2) O handle de recurso armazenado é inicializado com [std::forward](<#/doc/utility/forward>)&lt;RR&gt;(r) se [std::is_nothrow_constructible_v](<#/doc/types/is_constructible>)<RS, RR> for verdadeiro, caso contrário r. Se a inicialização do handle de recurso armazenado lançar uma exceção, chama d(r).
Em seguida, o deleter é inicializado com [std::forward](<#/doc/utility/forward>)&lt;DD&gt;(d) se [std::is_nothrow_constructible_v](<#/doc/types/is_constructible>)<D, DD> for verdadeiro, caso contrário d. Se a inicialização do deleter lançar uma exceção, chama d(res_).
O `unique_resource` construído possui o recurso.

Esta sobrecarga participa da resolução de sobrecarga apenas se todos [std::is_constructible_v](<#/doc/types/is_constructible>)<RS, RR>, [std::is_constructible_v](<#/doc/types/is_constructible>)<D, DD>, [std::is_nothrow_constructible_v](<#/doc/types/is_constructible>)<RS, RR> || [std::is_constructible_v](<#/doc/types/is_constructible>)<RS, RR&> e [std::is_nothrow_constructible_v](<#/doc/types/is_constructible>)<D, DD> || [std::is_constructible_v](<#/doc/types/is_constructible>)<D, DD&> forem verdadeiros.

O programa é malformado se qualquer uma das expressões d(r), d(res_) e del_(res_) for malformada.

O comportamento é indefinido se qualquer uma das expressões d(r), d(res_) e del_(res_) resultar em comportamento indefinido ou lançar uma exceção.

3) Construtor de movimento. O handle de recurso armazenado é inicializado a partir do de other, usando `std::move` se [std::is_nothrow_move_constructible_v](<#/doc/types/is_move_constructible>)&lt;RS&gt; for verdadeiro. Se a inicialização do handle de recurso armazenado lançar uma exceção, other não é modificado.
Em seguida, o deleter é inicializado com o de other, usando `std::move` se [std::is_nothrow_move_constructible_v](<#/doc/types/is_move_constructible>)&lt;D&gt; for verdadeiro. Se a inicialização do deleter lançar uma exceção e [std::is_nothrow_move_constructible_v](<#/doc/types/is_move_constructible>)&lt;RS&gt; for verdadeiro e other possuir o recurso, chama o deleter de other com res_ para descartar o recurso, então chama other.release().
Após a construção, o `unique_resource` construído possui seu recurso se e somente se other possuía o recurso antes da construção, e other é configurado para não possuir o recurso.

### Parâmetros

- **r** — um handle de recurso
- **d** — um deleter para usar para descartar o recurso
- **other** — outro `unique_resource` do qual adquirir a posse

### Exceções

Qualquer exceção lançada durante a inicialização do handle de recurso armazenado ou do deleter.

2)

Especificação [`noexcept`](<#/doc/language/noexcept_spec>):

noexcept((

[std::is_nothrow_constructible_v](<#/doc/types/is_constructible>)<RS, RR> || [std::is_nothrow_constructible_v](<#/doc/types/is_constructible>)<RS, RR&>
) &&
(
[std::is_nothrow_constructible_v](<#/doc/types/is_constructible>)<D, DD> || [std::is_nothrow_constructible_v](<#/doc/types/is_constructible>)<D, DD&>

))

3)

Especificação [`noexcept`](<#/doc/language/noexcept_spec>):

noexcept(

[std::is_nothrow_move_constructible_v](<#/doc/types/is_move_constructible>)&lt;R1&gt; && [std::is_nothrow_move_constructible_v](<#/doc/types/is_move_constructible>)&lt;D&gt;

)

### Notas

O mecanismo desses construtores garante que não haja vazamento de recursos.

### Exemplo

| Esta seção está incompleta
Razão: sem exemplo

### Veja também

[ (construtor)](<#/doc/memory/unique_ptr/unique_ptr>) | constrói um novo `unique_ptr`
(função membro pública de `std::unique_ptr<T,Deleter>`)