# std::latch::arrive_and_wait

void arrive_and_wait( [std::ptrdiff_t](<#/doc/types/ptrdiff_t>) n = 1 ); |  |  (desde C++20)  

  
Decrementa atomicamente o contador interno por n e (se necessário) bloqueia a thread chamadora até que o contador atinja zero. Equivalente a `count_down(n); wait();`.

Se n for maior que o valor do contador interno ou for negativo, o comportamento é indefinido.

### Parâmetros

n  |  \-  |  o valor pelo qual o contador interno é decrementado   
  
### Valor de retorno

(nenhum) 

### Exceções

Lança [std::system_error](<#/doc/error/system_error>) com um código de erro permitido para tipos mutex em caso de erro. 