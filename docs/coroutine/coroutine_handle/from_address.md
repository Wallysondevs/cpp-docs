# std::coroutine_handle&lt;Promise&gt;::from_address

```cpp
static constexpr coroutine_handle from_address( void *addr );  // (desde C++20)
```

  
Cria um `coroutine_handle` a partir de um valor de ponteiro nulo ou de um endereço subjacente de outro `coroutine_handle`. O endereço subjacente do valor de retorno é `addr`.

O comportamento é indefinido se `addr` não for um valor de ponteiro nulo nem um endereço subjacente de um `coroutine_handle`. O comportamento também é indefinido se `addr` for um endereço subjacente de um [std::coroutine_handle](<#/doc/coroutine/coroutine_handle>)&lt;P1&gt;, onde tanto `Promise` quanto `P1` não são `void`, e `P1` é diferente de `Promise`.

Esta função não é declarada para a especialização [std::coroutine_handle](<#/doc/coroutine/coroutine_handle>)<[std::noop_coroutine_promise](<#/doc/coroutine/noop_coroutine_promise>)>.

### Parâmetros

addr  |  \-  |  endereço subjacente a ser importado   
  
### Valor de retorno

Um [std::coroutine_handle](<#/doc/coroutine/coroutine_handle>)&lt;Promise&gt; cujo endereço subjacente é `addr`.

### Observações

Se `addr` não for um valor de ponteiro nulo, ele deve ter sido obtido de uma chamada anterior a `address()` em um `coroutine_handle` que se refere a alguma coroutine.

### Exemplo

| Esta seção está incompleta  
Razão: sem exemplo   
  
### Veja também

[ (construtor)](<#/doc/coroutine/coroutine_handle/coroutine_handle>) |  constrói um objeto `coroutine_handle`   
(função membro pública)  
[ from_promise](<#/doc/coroutine/coroutine_handle/from_promise>)[static] |  cria um `coroutine_handle` a partir do objeto promise de uma coroutine   
(função membro estática pública)  
[ noop_coroutine](<#/doc/coroutine/noop_coroutine>)(C++20) |  cria um coroutine handle que não tem efeitos observáveis quando retomado ou destruído   
(função)