# std::execution::upon_error

Definido no cabeçalho `[<execution>](<#/doc/header/execution>)`

```c
execution::sender auto
upon_error( execution::sender auto input,
std::invocable</*errors-sent-by*/(input)...> function );
```

  
### Parâmetros

input  |  \-  |  sender que, uma vez que um erro ocorre, envia os erros para a function   
---|---|---
function  |  \-  |  invocable a ser chamada com os erros caso um erro ocorra pelo input sender   
  
### Valor de retorno

Retorna um sender descrevendo o grafo de tarefas descrito pelo input sender, com um nó adicionado de invocação da function fornecida com os erros enviados pelo input sender como argumentos (em caso de erro). 

### Exemplo

| Esta seção está incompleta  
Razão: sem exemplo   