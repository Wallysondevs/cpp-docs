# std::counting_semaphore&lt;LeastMaxValue&gt;::try_acquire

```cpp
bool try_acquire() noexcept;  // (desde C++20)
```

  
Tenta decrementar atomicamente o contador interno em 1 se ele for maior que 0; nenhum bloqueio ocorre independentemente.

### Valor de retorno

true se ele decrementou o contador interno, caso contrário false.

### Observações

Implementações podem falhar ao decrementar o contador mesmo que ele fosse maior que 0 - ou seja, elas podem falhar espuriamente e retornar false.

### Veja também

[ release](<#/doc/thread/counting_semaphore/release>) |  incrementa o contador interno e desbloqueia os adquirentes   
(função membro pública)  
[ acquire](<#/doc/thread/counting_semaphore/acquire>) |  decrementa o contador interno ou bloqueia até que possa   
(função membro pública)  
[ try_acquire_for](<#/doc/thread/counting_semaphore/try_acquire_for>) |  tenta decrementar o contador interno, bloqueando por até uma duração de tempo   
(função membro pública)  
[ try_acquire_until](<#/doc/thread/counting_semaphore/try_acquire_until>) |  tenta decrementar o contador interno, bloqueando até um ponto no tempo   
(função membro pública)