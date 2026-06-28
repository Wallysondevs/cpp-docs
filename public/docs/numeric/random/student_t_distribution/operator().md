# std::student_t_distribution&lt;RealType&gt;::operator()

```cpp
template< class Generator >
result_type operator()( Generator& g );  // (1) (desde C++11)
template< class Generator >
result_type operator()( Generator& g, const param_type& params );  // (2) (desde C++11)
```

  
Gera números aleatórios que são distribuídos de acordo com a função de probabilidade associada. A entropia é adquirida chamando g.operator(). 

A primeira versão usa o conjunto de parâmetros associado, a segunda versão usa params. O conjunto de parâmetros associado não é modificado. 

### Parâmetros

g  |  \-  |  um objeto gerador de bits aleatórios uniformes   
---|---|---
params  |  \-  |  conjunto de parâmetros de distribuição a ser usado em vez do associado   
Requisitos de tipo   
-`Generator` deve satisfazer os requisitos de [UniformRandomBitGenerator](<#/doc/named_req/UniformRandomBitGenerator>).   
  
### Valor de retorno

O número aleatório gerado. 

### Complexidade

Número constante amortizado de invocações de g.operator(). 