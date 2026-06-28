# std::generator&lt;Ref,V,Allocator&gt;::promise_type::final_suspend

```cpp
auto final_suspend() noexcept;  // (desde C++23)
```

  
Seja x um objeto [generator](<#/doc/coroutine/generator>). `final_suspend` faz o seguinte: 

  1. Remove o handle da coroutine do topo de *`_[active_](<#/doc/coroutine/generator>)_`. 
  2. Se *x.active_ não estiver vazio, retoma a execução da coroutine referenciada por x.active_->top(). Se estiver vazio, o fluxo de controle retorna para o chamador ou retomador da coroutine atual. 

Um handle referenciando a coroutine cujo objeto promise é *this deve estar no topo de *x.active_ de x. Esta função deve ser chamada pela coroutine ao atingir seu ponto de suspensão final. Caso contrário, o comportamento é indefinido. 

### Valor de retorno

Um [objeto awaitable](<#/doc/coroutine>) de tipo não especificado cujas funções membro são configuradas para suspender a coroutine chamadora. 