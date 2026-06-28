# std::experimental::unique_resource&lt;R, D&gt;::release

void release() noexcept; |  |  (library fundamentals TS v3)  

  
Libera a posse do recurso gerenciado, se houver. O destrutor não executará o deleter após a chamada, a menos que `reset` seja chamado posteriormente para gerenciar um novo recurso.

Ao contrário de [std::unique_ptr::release](<#/doc/memory/unique_ptr/release>), esta função não é obrigada a modificar o *handle* do recurso armazenado.

### Parameters

(none) 

### Return value

(none) 

### Example

| Esta seção está incompleta  
Razão: nenhum exemplo   
  
### See also

[ release](<#/doc/memory/unique_ptr/release>) |  retorna um ponteiro para o objeto gerenciado e libera a posse   
(função membro pública de `std::unique_ptr<T,Deleter>`)  