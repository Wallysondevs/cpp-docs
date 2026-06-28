# std::experimental::propagate_const&lt;T&gt;::operator element_type*, std::experimental::propagate_const&lt;T&gt;::operator const element_type*

constexpr operator element_type*(); | (1) | (TS de fundamentos da biblioteca v2)
---|---|---
constexpr operator const element_type*() const; | (2) | (TS de fundamentos da biblioteca v2)

Fornece conversões implícitas para `element_type*` e `const element_type*`.

1) Esta função não participa da resolução de sobrecarga a menos que `T` seja um tipo de ponteiro para objeto ou seja implicitamente conversível para `element_type*`.

2) Esta função não participa da resolução de sobrecarga a menos que `T` seja um tipo de ponteiro para objeto ou seja implicitamente conversível para `const element_type*`.

### Parâmetros

(nenhum)

### Valor de retorno

Um ponteiro para o objeto apontado pelo objeto tipo ponteiro encapsulado, ou seja, `this->get()`.

### Exemplo

| Esta seção está incompleta
Razão: nenhum exemplo

### Veja também

[ get](<#/doc/experimental/propagate_const/get>) | retorna um ponteiro para o objeto apontado pelo ponteiro encapsulado
(função membro pública)