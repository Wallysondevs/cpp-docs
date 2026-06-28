# std::text_encoding::environment_is

```cpp
template< id I >
static bool environment_is();  // (desde C++26)
```

  
Verifica se a [codificação do ambiente](<#/doc/text/text_encoding/environment>) é igual à codificação cujo valor MIBenum é o valor I especificado. Uma chamada a esta função é equivalente a return environment() == I;.

Esta função é deletada a menos que [CHAR_BIT](<#/doc/types/climits>) seja 8.

### Parâmetros de template

I  |  \-  |  um `text_encoding::id` cujo valor comparar   
  
### Valor de retorno

true se environment() for igual a I; false caso contrário.

### Exemplo

| Esta seção está incompleta  
Razão: nenhum exemplo   