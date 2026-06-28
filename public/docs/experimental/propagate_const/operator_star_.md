# std::experimental::propagate_const&lt;T&gt;::operator*, std::experimental::propagate_const&lt;T&gt;::operator-&gt;

constexpr element_type& operator*(); | (1) | (library fundamentals TS v2)
---|---|---
constexpr const element_type& operator*() const; | (2) | (library fundamentals TS v2)
constexpr element_type* operator->(); | (3) | (library fundamentals TS v2)
constexpr const element_type* operator->() const; | (4) | (library fundamentals TS v2)

Fornece acesso ao objeto apontado pelo objeto tipo ponteiro que *this envolve.

O comportamento dessas funções é indefinido se get() == nullptr.

### Parâmetros

(nenhum)

### Valor de retorno

1,2) O objeto apontado pelo objeto tipo ponteiro encapsulado, ou seja, *get().

3,4) Um ponteiro para o objeto apontado pelo objeto tipo ponteiro encapsulado, ou seja, get().

### Exemplo

| Esta seção está incompleta
Razão: nenhum exemplo

### Veja também

[ get](<#/doc/experimental/propagate_const/get>) | retorna um ponteiro para o objeto apontado pelo ponteiro encapsulado
(função membro pública)