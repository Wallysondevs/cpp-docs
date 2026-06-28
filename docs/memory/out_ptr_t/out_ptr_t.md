# std::out_ptr_t&lt;Smart,Pointer,Args...&gt;::out_ptr_t

```cpp
explicit out_ptr_t( Smart &sp, Args... args );  // (1) (desde C++23)
out_ptr_t( const out_ptr_t& ) = delete;  // (2) (desde C++23)
```

  
1) Cria um `out_ptr_t`. Adapta `sp` como se o ligasse ao membro `Smart&`, captura cada argumento `t` em `args...` como se inicializasse o membro correspondente do tipo `T` em `Args...` com [std::forward](<#/doc/utility/forward>)&lt;T&gt;(t), então inicializa por valor o `Pointer` armazenado.  
Em seguida, chama `sp.reset()` se a expressão for bem-formada; caso contrário, chama `sp = Smart()` se [std::is_default_constructible_v](<#/doc/types/is_default_constructible>)&lt;Smart&gt; for `true`. O programa é malformado se ambas as operações de redefinição forem malformadas.

2) O construtor de cópia é explicitamente deletado. `out_ptr_t` não é copiável nem movível.

### Parâmetros

sp  |  \-  |  o objeto (tipicamente um smart pointer) a ser adaptado   
---|---|---
args...  |  \-  |  os argumentos usados para redefinir e capturar   
  
### Valor de retorno

(nenhum) 

### Exceções

Pode lançar exceções definidas pela implementação. 

### Observações

Após a construção, o objeto `Pointer` ou `void*` apontado pelo valor de retorno de qualquer função de conversão é igual a `nullptr`. 

Cada argumento em `args...` é movido para o `out_ptr_t` criado se for de um tipo de objeto, ou transferido para o `out_ptr_t` criado como está se for de um tipo de referência. 

O construtor de `out_ptr_t` pode lançar exceções. Por exemplo, quando `sp` é um [std::shared_ptr](<#/doc/memory/shared_ptr>), a alocação para o novo bloco de controle pode ser realizada dentro do construtor em vez do destrutor. 

### Exemplo

| Esta seção está incompleta  
Razão: nenhum exemplo   