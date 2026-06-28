# std::execution::stopped_as_optional

Definido no cabeçalho `[<execution>](<#/doc/header/execution>)`

```c
execution::sender auto stopped_as_optional( /*single-sender*/ auto snd );
```

  
### Parâmetros

snd  |  \-  |  sender de entrada do qual o canal de valor e o canal de parada são mapeados.   
  
### Valor de retorno

Retorna um sender que mapeia o canal de valor de um `T` para um [std::optional](<#/doc/utility/optional>)<[std::decay_t](<#/doc/types/decay>)&lt;T&gt;>, e mapeia o canal de parada para um valor de um [std::optional](<#/doc/utility/optional>)<[std::decay_t](<#/doc/types/decay>)&lt;T&gt;> vazio. 

### Exemplo

| Esta seção está incompleta  
Razão: nenhum exemplo   