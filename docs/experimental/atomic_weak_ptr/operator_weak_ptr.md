# std::experimental::atomic_weak_ptr&lt;T&gt;::operator weak_ptr&lt;T&gt;

operator weak_ptr&lt;T&gt;() const noexcept;

  
Carrega atomicamente e retorna o valor atual do `atomic_weak_ptr`. Equivalente a `load()`. 

### Parâmetros

(nenhum) 

### Valor de retorno

O valor atual do `atomic_weak_ptr`. 

### Observações

Todos os incrementos associados de [`use_count`](<#/doc/memory/weak_ptr/use_count>) são garantidos de serem realizados como parte da operação atômica. 

### Veja também

[ load](<#/doc/experimental/atomic_weak_ptr/load>) |  obtém atomicamente o valor do objeto atômico   
(função membro pública)  