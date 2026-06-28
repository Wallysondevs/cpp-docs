# std::experimental::pmr::unsynchronized_pool_resource::unsynchronized_pool_resource

unsynchronized_pool_resource(); |  (1)  |  (library fundamentals TS)  
---|---|---
explicit unsynchronized_pool_resource( memory_resource* upstream ); |  (2)  |  (library fundamentals TS)  
explicit unsynchronized_pool_resource( const pool_options& opts ); |  (3)  |  (library fundamentals TS)  
unsynchronized_pool_resource( const pool_options& opts,  
memory_resource* upstream ); |  (4)  |  (library fundamentals TS)  
---|---|---
unsynchronized_pool_resource( const unsynchronized_pool_resource& ) = delete; |  (5)  |  (library fundamentals TS)  

  
Constrói um `unsynchronized_pool_resource`. 

1-4) Constrói um `unsynchronized_pool_resource` usando o recurso de memória upstream especificado e ajustado de acordo com as opções especificadas. O objeto resultante mantém uma cópia de `upstream`, mas não possui o recurso para o qual `upstream` aponta.  
As sobrecargas que não recebem `opts` como parâmetro usam uma instância construída por padrão de [`pool_options`](<#/doc/experimental/pool_options>) como as opções. As sobrecargas que não recebem `upstream` como parâmetro usam o valor de retorno de [std::experimental::pmr::get_default_resource](<#/doc/experimental/get_default_resource>)() como o recurso de memória upstream.

5) O construtor de cópia é deletado.

### Parâmetros

opts  |  \-  |  uma struct pool_options contendo as opções do construtor   
---|---|---
upstream  |  \-  |  o recurso de memória upstream a ser usado   
  
### Exceções

1-4) Lança uma exceção apenas se uma chamada à função `allocate()` do recurso upstream lançar uma exceção. Não é especificado se ou sob quais condições tal chamada ocorre.