# std::experimental::flex_barrier::flex_barrier

explicit flex_barrier( [std::ptrdiff_t](<#/doc/types/ptrdiff_t>) num_threads ); |  (1)  |  (concurrency TS)  
template< class F >  
flex_barrier( [std::ptrdiff_t](<#/doc/types/ptrdiff_t>) num_threads, F completion ); |  (2)  |  (concurrency TS)  
---|---|---
flex_barrier( const flex_barrier & ) = delete; |  (3)  |  (concurrency TS)  

  
1) Tem o mesmo efeito que flex_barrier(num_threads, c), onde `c` é um objeto [Callable](<#/doc/named_req/Callable>) cuja invocação retorna -1 e não possui efeitos colaterais.

2) Constrói uma `flex_barrier` para `num_threads` threads participantes, usando `completion` para a fase de conclusão. O conjunto de threads participantes são as primeiras `num_threads` threads a chegar ao ponto de sincronização.

3) O construtor de cópia é deletado; `flex_barrier` não é copiável.

### Parâmetros

num_threads  |  \-  |  o número de threads participantes para a `flex_barrier`; deve ser não-negativo   
---|---|---
completion  |  \-  |  um objeto de função que controla a fase de conclusão; deve ser [Callable](<#/doc/named_req/Callable>) sem argumentos e com tipo de retorno [std::ptrdiff_t](<#/doc/types/ptrdiff_t>), e quando invocado, deve retornar um valor não menor que -1 e não deve lançar uma exceção   
Requisitos de tipo   
-`F` deve satisfazer os requisitos de [CopyConstructible](<#/doc/named_req/CopyConstructible>).   
  
### Notas 

Se `num_threads` for zero, o conjunto de threads participantes é vazio, e `flex_barrier` só pode ser destruída. 