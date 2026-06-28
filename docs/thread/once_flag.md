# std::once_flag

Definido no cabeçalho `[<mutex>](<#/doc/header/mutex>)`

```c
class once_flag;
```

  
A classe `std::once_flag` é uma estrutura auxiliar para [std::call_once](<#/doc/thread/call_once>). 

Um objeto do tipo `std::once_flag` que é passado para múltiplas chamadas a [std::call_once](<#/doc/thread/call_once>) permite que essas chamadas se coordenem entre si de modo que apenas uma das chamadas seja realmente executada até a conclusão. 

`std::once_flag` não é copiável nem movível. 

### Funções membro

##  std::once_flag::once_flag 

constexpr once_flag() noexcept;

  
Constrói um objeto `once_flag`. O estado interno é definido para indicar que nenhuma função foi chamada ainda. 

### Parâmetros

(nenhum) 

  

### Veja também

[ call_once](<#/doc/thread/call_once>)(C++11) | invoca uma função apenas uma vez, mesmo que chamada de múltiplas threads   
(modelo de função)  
[Documentação C](<#/>) para once_flag