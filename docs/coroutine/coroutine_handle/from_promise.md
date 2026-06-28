# std::coroutine_handle&lt;Promise&gt;::from_promise

```cpp
static coroutine_handle from_promise( Promise& p );  // (desde C++20)
```

  
Cria um `coroutine_handle` a partir do objeto promise de uma coroutine. O `coroutine_handle` criado refere-se à coroutine, e [`promise()`](<#/doc/coroutine/coroutine_handle/promise>) retorna uma referência para p.

O comportamento é indefinido se p não for uma referência a um objeto promise. Esta função é fornecida apenas para o template primário, ou seja, as especializações [std::coroutine_handle](<#/doc/coroutine/coroutine_handle>)<> e [std::coroutine_handle](<#/doc/coroutine/coroutine_handle>)<[std::noop_coroutine_promise](<#/doc/coroutine/noop_coroutine_promise>)> não possuem esta função.

### Parâmetros

p  |  \-  |  objeto promise de uma coroutine a ser referenciada   
  
### Valor de retorno

Um `coroutine_handle` referenciando a coroutine fornecida.

### Exemplo

| Esta seção está incompleta  
Razão: nenhum exemplo   
  
### Veja também

[ (constructor)](<#/doc/coroutine/coroutine_handle/coroutine_handle>) |  constrói um objeto `coroutine_handle`   
(função membro pública)  
[ from_address](<#/doc/coroutine/coroutine_handle/from_address>)[static] |  importa uma coroutine a partir de um ponteiro   
(função membro estática pública)  
[ noop_coroutine](<#/doc/coroutine/noop_coroutine>)(C++20) |  cria um coroutine handle que não tem efeitos observáveis quando retomado ou destruído   
(função)