# std::experimental::unique_resource&lt;R, D&gt;::reset

void reset() noexcept; | (1) | (library fundamentals TS v3)
template< class RR >
void reset( RR&& r ); | (2) | (library fundamentals TS v3)

1) Descarta o recurso chamando o deleter com o handle do recurso subjacente se o `unique_resource` o possui. O `unique_resource` não possui o recurso após a chamada.

2) Substitui o recurso chamando (1) e então atribui o handle do recurso armazenado com [std::forward](<#/doc/utility/forward>)&lt;RR&gt;(r) se [std::is_nothrow_assignable_v](<#/doc/types/is_assignable>)<RS, RR> for verdadeiro, caso contrário [std::as_const](<#/doc/utility/as_const>)(r), onde `RS` é o tipo do handle do recurso armazenado. O `unique_resource` possui o recurso após a chamada.

Se a atribuição por cópia do handle do recurso armazenado lançar uma exceção, chama `del_(r)`, onde `del` é o objeto deleter.

Esta sobrecarga participa da resolução de sobrecarga apenas se a expressão de atribuição selecionada que atribui o handle do recurso armazenado for bem-formada.

O programa é malformado se `del_(r)` for malformado.

O comportamento é indefinido se `del_(r)` resultar em comportamento indefinido ou lançar uma exceção.

### Parameters

- **r** — handle de recurso para um novo recurso a ser gerenciado

### Return value

(nenhum)

### Exceptions

2) Qualquer exceção lançada ao atribuir o handle do recurso armazenado.

### Notes

O mecanismo garante que não haja vazamento de recursos.

### Example

| Esta seção está incompleta
Razão: nenhum exemplo

### See also

[ reset](<#/doc/memory/unique_ptr/reset>) | substitui o objeto gerenciado
(função membro pública de `std::unique_ptr<T,Deleter>`)