# std::experimental::shared_ptr&lt;T&gt;::operator*, std::experimental::shared_ptr&lt;T&gt;::operator-&gt;

T& operator*() const noexcept; |  (1)  |  (library fundamentals TS)  
---|---|---
T* operator->() const noexcept; |  (2)  |  (library fundamentals TS)  

  
Desreferencia o ponteiro armazenado. O comportamento é indefinido se o ponteiro armazenado for nulo. 

### Parâmetros

(nenhum) 

### Valor de retorno

1) O resultado da desreferenciação do ponteiro armazenado, ou seja, *get().

2) O ponteiro armazenado, ou seja, get().

### Observações

Quando `T` é um tipo array ou `void` (possivelmente cv-qualificado), é não especificado se a função (1) é declarada. 

Quando `T` é um tipo array, é não especificado se a função (2) é declarada. 

Em ambos os casos, se a função for declarada, é não especificado qual é o seu tipo de retorno, exceto que a declaração (embora não necessariamente a definição) da função é garantida como sendo legal. 

### Exemplo

| Esta seção está incompleta  
Razão: nenhum exemplo   
  
### Ver também

[ get](<#/doc/experimental/shared_ptr/get>) | retorna o ponteiro armazenado   
(função membro pública)  