# std::experimental::observer_ptr&lt;W&gt;::release

constexpr element_type* release() noexcept; |  |  (library fundamentals TS v2)  

  
Para de observar o objeto observado, se houver. get() retorna nullptr após a chamada. 

### Parâmetros

(nenhum) 

### Valor de retorno

Um ponteiro para o objeto previamente observado, ou nullptr se não havia objeto observado, ou seja, o valor que seria retornado por get() antes da chamada. 

### Exemplo

| Esta seção está incompleta  
Razão: nenhum exemplo   
  
### Veja também

[ get](<#/doc/experimental/observer_ptr/get>) |  retorna um ponteiro para o objeto observado   
(função membro pública)  
[ reset](<#/doc/experimental/observer_ptr/reset>) |  substitui o objeto observado   
(função membro pública)