# std::basic_stacktrace&lt;Allocator&gt;::operator[]

```cpp
const_reference operator const;  // (desde C++23)
```

  
Retorna uma referência para a entrada na localização `pos` especificada. Nenhuma verificação de limites é realizada. 

Se `pos` não estiver dentro do intervalo do stacktrace, ou seja, `pos >= size()`, o comportamento é indefinido. 

### Parâmetros

pos  |  \-  |  posição da entrada do stacktrace a ser retornada   
  
### Valor de retorno

Referência para a entrada solicitada. 

### Exceções

Não lança exceções. 

### Complexidade

Constante. 

### Exemplo

| Esta seção está incompleta  
Razão: nenhum exemplo   
  
### Veja também

[ at](<#/doc/utility/basic_stacktrace/at>) |  acessa a entrada especificada do stacktrace com verificação de limites   
(função membro pública)  