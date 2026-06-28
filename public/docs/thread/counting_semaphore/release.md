# std::counting_semaphore&lt;LeastMaxValue&gt;::release

void release( [std::ptrdiff_t](<#/doc/types/ptrdiff_t>) update = 1 ); |  |  (desde C++20)  

  
Incrementa atomicamente o contador interno pelo valor de `update`. Qualquer thread(s) esperando que o contador seja maior que 0, como devido a estar bloqueado em `acquire`, será subsequentemente desbloqueado.

Esta operação *strongly happens before* invocações de `try_acquire` que observam o resultado dos efeitos.

### Pré-condições

Ambos `update >= 0` e `update <= max() - counter` são verdadeiros, onde `counter` é o valor do contador interno.

### Parâmetros

update  |  \-  |  a quantidade pela qual incrementar o contador interno   
  
### Exceções

Pode lançar [std::system_error](<#/doc/error/system_error>).

### Veja também

[ acquire](<#/doc/thread/counting_semaphore/acquire>) |  decrementa o contador interno ou bloqueia até que possa   
(função membro pública)  
[ try_acquire](<#/doc/thread/counting_semaphore/try_acquire>) |  tenta decrementar o contador interno sem bloquear   
(função membro pública)  
[ try_acquire_for](<#/doc/thread/counting_semaphore/try_acquire_for>) |  tenta decrementar o contador interno, bloqueando por até um tempo de duração   
(função membro pública)  
[ try_acquire_until](<#/doc/thread/counting_semaphore/try_acquire_until>) |  tenta decrementar o contador interno, bloqueando até um ponto no tempo   
(função membro pública)