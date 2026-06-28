# std::pmr::synchronized_pool_resource::synchronized_pool_resource

```cpp
synchronized_pool_resource();  // (1) (desde C++17)
explicit synchronized_pool_resource( std::pmr::memory_resource* upstream );  // (2) (desde C++17)
explicit synchronized_pool_resource( const std::pmr::pool_options& opts );  // (3) (desde C++17)
synchronized_pool_resource( const std::pmr::pool_options& opts,
std::pmr::memory_resource* upstream );  // (4) (desde C++17)
synchronized_pool_resource( const synchronized_pool_resource& ) = delete;  // (5) (desde C++17)
```

Constrói um `synchronized_pool_resource`.

1-4) Constrói um `synchronized_pool_resource` usando o recurso de memória upstream especificado e ajustado de acordo com as opções especificadas. O objeto resultante mantém uma cópia de upstream, mas não possui o recurso para o qual upstream aponta.
As sobrecargas que não recebem `opts` como parâmetro usam uma instância construída por padrão de [`pool_options`](<#/doc/memory/pool_options>) como as opções. As sobrecargas que não recebem `upstream` como parâmetro usam o valor de retorno de [std::pmr::get_default_resource](<#/doc/memory/get_default_resource>) como o recurso de memória upstream.

5) O construtor de cópia é deletado.

### Parâmetros

- **opts** — uma struct [std::pmr::pool_options](<#/doc/memory/pool_options>) contendo as opções do construtor
- **upstream** — o recurso de memória upstream a ser usado

### Exceções

1-4) Lança uma exceção apenas se uma chamada à função `allocate()` do recurso upstream lançar uma exceção. É não especificado se ou sob quais condições tal chamada ocorre.