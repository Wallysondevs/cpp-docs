# std::shuffle_order_engine&lt;Engine,K&gt;::discard

```cpp
void discard( unsigned long long z );  // (desde C++11)
```

  
Avança o estado interno z vezes. Equivalente a chamar [operator()](<#/>) z vezes e descartar o resultado. O estado do engine subjacente pode ser avançado mais de z vezes. 

### Parâmetros

z  |  \-  |  valor inteiro especificando o número de vezes para avançar o estado   
  
### Valor de retorno

(nenhum) 

### Exceções

Não lança exceções. 

### Ver também

[ operator()](<#/>) (C++11) |  avança o estado do engine subjacente e retorna o valor gerado   
(função membro pública)  