# std::system_error

Definido no header `[<system_error>](<#/doc/header/system_error>)`

```cpp
class system_error;  // (desde C++11)
```

`std::system_error` é o tipo da exceção lançada por várias funções da biblioteca (tipicamente as funções que interagem com as facilidades do sistema operacional, por exemplo, o construtor de [std::thread](<#/doc/thread/thread>)) quando a exceção tem um [std::error_code](<#/doc/error/error_code>) associado, que pode ser reportado.

Diagrama de herança

### Funções membro

[ (construtor)](<#/doc/error/system_error/system_error>) | constrói o objeto `system_error`
(função membro pública)
[ operator=](<#/>) | substitui o objeto `system_error`
(função membro pública)
[ code](<#/doc/error/system_error/code>) | retorna o código de erro
(função membro pública)
[ what](<#/doc/error/system_error/what>)[virtual] | retorna uma string explicativa
(função membro pública virtual)

## Herdado de [std::exception](<#/doc/error/exception>)

### Funções membro

[ (destrutor)](<#/doc/error/exception/~exception>)[virtual] | destrói o objeto de exceção
(função membro pública virtual de `std::exception`)
[ what](<#/doc/error/exception/what>)[virtual] | retorna uma string explicativa
(função membro pública virtual de `std::exception`)

### Exemplo

Execute este código
```cpp
    #include <iostream>
    #include <system_error>
    #include <thread>
    
    int main()
    {
        try
        {
            std::thread().detach(); // attempt to detach a non-thread
        }
        catch(const std::system_error& e)
        {
            std::cout << "Caught system_error with code "
                         "[" << e.code() << "] meaning "
                         "[" << e.what() << "]\n";
        }
    }
```

Saída possível:
```
    Caught system_error with code [generic:22] meaning [Invalid argument]
```