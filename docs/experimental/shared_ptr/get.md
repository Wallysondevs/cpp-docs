# std::experimental::shared_ptr&lt;T&gt;::get

element_type* get() const noexcept; |  |  (library fundamentals TS)  

  
Retorna o ponteiro armazenado. 

### Parâmetros

(nenhum) 

### Valor de retorno

O ponteiro armazenado. 

### Observações

Um `shared_ptr` pode compartilhar a propriedade de um objeto enquanto armazena um ponteiro para outro objeto. `get()` retorna o ponteiro armazenado, não o ponteiro gerenciado. 

### Exemplo

| Esta seção está incompleta  
Razão: nenhum exemplo   
  
### Veja também

[ operator*operator->](<#/doc/experimental/shared_ptr/operator_star_>) |  desreferencia o ponteiro armazenado   
(função membro pública)  