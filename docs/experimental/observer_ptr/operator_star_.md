# std::experimental::observer_ptr&lt;W&gt;::operator*, std::experimental::observer_ptr&lt;W&gt;::operator-&gt;

constexpr [std::add_lvalue_reference_t](<#/doc/types/add_reference>)<element_type> operator*() const; |  (1)  |  (TS de fundamentos da biblioteca v2)  
---|---|---
constexpr element_type* operator->() const noexcept; |  (2)  |  (TS de fundamentos da biblioteca v2)  

  
`operator*` e `operator->` fornecem acesso ao objeto observado por *this.

O comportamento de `operator*` é indefinido se get() == nullptr.

### Parâmetros

(nenhum)

### Valor de retorno

1) Retorna o objeto observado por *this, equivalente a *get().

2) Retorna um ponteiro para o objeto observado por *this, ou seja, get().

### Exceções

1) Não lança exceções.

### Exemplo

| Esta seção está incompleta  
Razão: nenhum exemplo   
  
### Veja também

[ get](<#/doc/experimental/observer_ptr/get>) | retorna um ponteiro para o objeto observado   
(função membro pública)  