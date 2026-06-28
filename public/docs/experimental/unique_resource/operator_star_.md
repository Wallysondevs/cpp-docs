# std::experimental::unique_resource&lt;R, D&gt;::operator*, std::experimental::unique_resource&lt;R, D&gt;::operator-&gt;

[std::add_lvalue_reference_t](<#/doc/types/add_reference>)<[std::remove_pointer_t](<#/doc/types/remove_pointer>)&lt;R&gt;>  
operator*() const noexcept; |  (1)  |  (library fundamentals TS v3)  
---|---|---
R operator->() const noexcept; |  (2)  |  (library fundamentals TS v3)  

  
1) Acessa o objeto ou função apontado pelo handle de recurso subjacente que é um ponteiro. Esta função participa da resolução de sobrecarga apenas se [std::is_pointer_v](<#/doc/types/is_pointer>)&lt;R&gt; for verdadeiro e [std::is_void_v](<#/doc/types/is_void>)<[std::remove_pointer_t](<#/doc/types/remove_pointer>)&lt;R&gt;> for falso. Se o handle de recurso não estiver apontando para um objeto ou uma função, o comportamento é indefinido.

2) Obtém uma cópia do handle de recurso subjacente que é um ponteiro. Esta função participa da resolução de sobrecarga apenas se [std::is_pointer_v](<#/doc/types/is_pointer>)&lt;R&gt; for verdadeiro. O valor de retorno é tipicamente usado para acessar o objeto apontado.

### Parâmetros

(nenhum) 

### Valor de retorno

1) O objeto ou função apontado pelo handle de recurso subjacente.

2) Cópia do handle de recurso subjacente.

### Exemplo

| Esta seção está incompleta  
Razão: sem exemplo   
  
### Ver também

[ get](<#/doc/experimental/unique_resource/get>) |  acessa o handle de recurso subjacente   
(função membro pública)  
[ operator*operator->](<#/doc/memory/unique_ptr/operator_star_>) |  desreferencia o ponteiro para o objeto gerenciado   
(função membro pública de `std::unique_ptr<T,Deleter>`)