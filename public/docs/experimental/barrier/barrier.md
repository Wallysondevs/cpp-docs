# std::experimental::barrier::barrier

explicit barrier( [std::ptrdiff_t](<#/doc/types/ptrdiff_t>) num_threads ); |  (1)  |  (concurrency TS)  
---|---|---
barrier( const barrier & ) = delete; |  (2)  |  (concurrency TS)  

  
1) Constrói um `barrier` para `num_threads` threads participantes. O conjunto de threads participantes são as primeiras `num_threads` threads a chegar ao ponto de sincronização.

2) O construtor de cópia é deletado; `barrier` não é copiável.

### Parâmetros

num_threads  |  \-  |  o número de threads participantes para o barrier; deve ser não-negativo   
  
### Observações 

Se `num_threads` for zero, o conjunto de threads participantes é vazio, e o barrier só pode ser destruído.