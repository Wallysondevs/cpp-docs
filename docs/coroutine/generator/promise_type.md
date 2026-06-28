# std::generator&lt;Ref,V,Allocator&gt;::promise_type

```cpp
class generator<Ref, V, Allocator>::promise_type;  // (desde C++23)
```

  
O tipo promise de [`std::generator`](<#/doc/coroutine/generator>). 

### Membros de dados

Membro  |  Descrição   
---|---
[std::add_pointer_t](<#/doc/types/add_pointer>)<std::generator::yielded> `_value__` |  Um ponteiro para o valor cedido (yielded). O valor padrão é nullptr.  
(objeto membro apenas para exposição*)  
[std::exception_ptr](<#/doc/error/exception_ptr>) `_except__` |  Um ponteiro para um objeto de exceção.  
(objeto membro apenas para exposição*)  
  
### Funções membro

(construtor)(declarado implicitamente) |  constrói o objeto `promise_type`   
(função membro pública)  
(destrutor)(declarado implicitamente) |  destrói o objeto `promise_type`   
(função membro pública)  
[ get_return_object](<#/doc/coroutine/generator/promise_type/get_return_object>) |  emite o objeto [generator](<#/doc/coroutine/generator>)   
(função membro pública)  
[ initial_suspend](<#/doc/coroutine/generator/promise_type/initial_suspend>) |  emite um awaiter para o ponto de suspensão inicial   
(função membro pública)  
[ final_suspend](<#/doc/coroutine/generator/promise_type/final_suspend>) |  emite um awaiter para o ponto de suspensão final   
(função membro pública)  
[ yield_value](<#/doc/coroutine/generator/promise_type/yield_value>) |  processa o objeto obtido de co_yield   
(função membro pública)  
await_transform[deleted] |  mapeia o objeto obtido de co_await para um awaiter   
(função membro pública)  
[ return_void](<#/doc/coroutine/generator/promise_type/return_void>) |  lida com co_return; ou a saída do corpo da coroutine   
(função membro pública)  
[ unhandled_exception](<#/doc/coroutine/generator/promise_type/unhandled_exception>) |  processa exceções que vazaram do corpo da coroutine   
(função membro pública)  
[ operator new](<#/doc/coroutine/generator/promise_type/operator_new>)[static] (C++23) |  aloca memória usando `Allocator`   
(função membro estática pública)  
[ operator delete](<#/doc/coroutine/generator/promise_type/operator_delete>)[static] (C++23) |  desaloca memória previamente obtida de `operator new`   
(função membro estática pública)  
  
### Exemplo

| Esta seção está incompleta  
Razão: nenhum exemplo   
  
### Veja também

[ noop_coroutine_promise](<#/doc/coroutine/noop_coroutine_promise>)(C++20) |  usado para coroutines sem efeitos observáveis   
(classe)  