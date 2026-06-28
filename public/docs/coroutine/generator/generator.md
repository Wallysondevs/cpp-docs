# std::generator&lt;Ref,V,Allocator&gt;::generator

```cpp
generator( const generator& ) = delete;  // (1) (desde C++23)
generator( generator&& other ) noexcept;  // (2) (desde C++23)
```

  
Constrói um `generator`. 

1) O construtor de cópia é deletado.

2) O construtor de movimento que inicializa o [`_coroutine__`](<#/doc/coroutine/generator>) subjacente com [std::exchange](<#/doc/utility/exchange>)(other.coroutine_, {}), e a pilha subjacente de handles de coroutine ([`_active__`](<#/doc/coroutine/generator>)) com [std::exchange](<#/doc/utility/exchange>)(other.active_, nullptr). Note que os iterators, previamente obtidos de other, não são invalidados, mas se tornam iterators para *this.

### Parâmetros

other  |  \-  |  um objeto generator a ser movido   
  
### Exemplo

| Esta seção está incompleta  
Razão: nenhum exemplo   