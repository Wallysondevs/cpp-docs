# std::promise&lt;R&gt;::promise

```cpp
promise();  // (1) (desde C++11)
template< class Alloc >
promise( std::allocator_arg_t, const Alloc& alloc );  // (2) (desde C++11)
promise( promise&& other ) noexcept;  // (3) (desde C++11)
promise( const promise& other ) = delete;  // (4) (desde C++11)
```

  
Constrói um objeto `promise`. 

1) Construtor padrão. Constrói a promise com um estado compartilhado vazio.

2) Constrói a promise com um estado compartilhado vazio. O estado compartilhado é alocado usando alloc. `Alloc` deve atender aos requisitos de [Allocator](<#/doc/named_req/Allocator>).

3) Construtor de movimento. Constrói a promise com o estado compartilhado de other usando move semantics. Após a construção, other não possui estado compartilhado.

4) `promise` não é copiável.

### Parâmetros

alloc  |  \-  |  allocator a ser usado para alocar o estado compartilhado   
---|---|---
other  |  \-  |  outra `promise` para adquirir o estado   
  
### Exceções

1,2) Pode lançar exceções definidas pela implementação.

### Exemplo

| Esta seção está incompleta  
Razão: nenhum exemplo   