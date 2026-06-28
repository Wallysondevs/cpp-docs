# va_end

Definido no cabeçalho `[<cstdarg>](<#/doc/header/cstdarg>)`

```c
void va_end( std::va_list ap );
```

  
A macro `va_end` realiza a limpeza para um objeto `ap` inicializado por uma chamada a [va_start](<#/doc/utility/variadic/va_start>) ou [va_copy](<#/doc/utility/variadic/va_copy>). `va_end` pode modificar `ap` de modo que ele não seja mais utilizável. 

Se não houver uma chamada correspondente a [va_start](<#/doc/utility/variadic/va_start>) ou [va_copy](<#/doc/utility/variadic/va_copy>), ou se `va_end` não for chamada antes que uma função que chama [va_start](<#/doc/utility/variadic/va_start>) ou [va_copy](<#/doc/utility/variadic/va_copy>) retorne, o comportamento é indefinido. 

### Parâmetros

ap  |  \-  |  uma instância do tipo [va_list](<#/doc/utility/variadic/va_list>) para limpeza   
  
### Valor expandido

(nenhum) 

### Veja também

[ va_start](<#/doc/utility/variadic/va_start>) |  permite acesso a argumentos de função variádicos   
(macro de função)  
[ va_copy](<#/doc/utility/variadic/va_copy>)(desde C++11) |  cria uma cópia dos argumentos de função variádicos   
(macro de função)  
[ va_arg](<#/doc/utility/variadic/va_arg>) |  acessa o próximo argumento de função variádico   
(macro de função)  
[Documentação C](<#/>) para va_end