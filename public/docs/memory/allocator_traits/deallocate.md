# std::allocator_traits&lt;Alloc&gt;::deallocate

Definido no cabeçalho `[<memory>](<#/doc/header/memory>)`

```c
static void deallocate( Alloc& a, pointer p, size_type n );
(constexpr desde C++20)
```

  
Usa o alocador `a` para desalocar o armazenamento referenciado por `p`, chamando `a.deallocate(p, n)`.

### Parâmetros

a  |  \-  |  alocador a ser usado   
---|---|---
p  |  \-  |  ponteiro para o armazenamento previamente alocado   
n  |  \-  |  o número de objetos para os quais o armazenamento foi alocado   
  
### Valor de retorno

(nenhum) 

### Exemplo

| Esta seção está incompleta  
Razão: nenhum exemplo   
  
### Veja também

[ allocate](<#/doc/memory/allocator_traits/allocate>)[static] |  aloca armazenamento não inicializado usando o alocador   
(função membro estática pública)  
[ deallocate](<#/doc/memory/allocator/deallocate>) |  desaloca armazenamento   
(função membro pública de `std::allocator<T>`)