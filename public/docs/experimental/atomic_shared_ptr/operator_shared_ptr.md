# std::experimental::atomic_shared_ptr&lt;T&gt;::operator shared_ptr&lt;T&gt;

operator shared_ptr&lt;T&gt;() const noexcept;

  
Carrega atomicamente e retorna o valor atual do `atomic_shared_ptr`. Equivalente a `load()`. 

### Parameters

(none) 

### Return value

O valor atual do `atomic_shared_ptr`. 

### Remarks

Todos os incrementos associados de [`use_count`](<#/doc/memory/shared_ptr/use_count>) são garantidos de serem realizados como parte da operação atômica. 

### See also

[ load](<#/doc/experimental/atomic_shared_ptr/load>) | obtém atomicamente o valor do objeto atômico   
(public member function)  