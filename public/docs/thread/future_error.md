# std::future_error

Definido no cabeçalho `[<future>](<#/doc/header/future>)`

```c
class future_error;
```

A classe **std::future_error** define um objeto de exceção que é lançado em caso de falha pelas funções da biblioteca de threads que lidam com execução assíncrona e estados compartilhados ([std::future](<#/doc/thread/future>), [std::promise](<#/doc/thread/promise>), etc). Semelhante a [std::system_error](<#/doc/error/system_error>), esta exceção carrega um código de erro compatível com [std::error_code](<#/doc/error/error_code>).

Diagrama de herança

### Funções membro

[ (construtor)](<#/doc/thread/future_error/future_error>) | cria um objeto `std::future_error`
(função membro pública)
[ operator=](<#/>) | substitui o objeto `std::future_error`
(função membro pública)
[ code](<#/doc/thread/future_error/code>) | retorna o código de erro
(função membro pública)
[ what](<#/doc/thread/future_error/what>) | retorna a string explicativa específica para o código de erro
(função membro pública)

## Herdado de [std::logic_error](<#/doc/error/logic_error>)

## Herdado de [std::exception](<#/doc/error/exception>)

### Funções membro

[ (destrutor)](<#/doc/error/exception/~exception>)[virtual] | destrói o objeto de exceção
(função membro pública virtual de `std::exception`)
[ what](<#/doc/error/exception/what>)[virtual] | retorna uma string explicativa
(função membro pública virtual de `std::exception`)

### Exemplo

Execute este código
```cpp
    #include <future>
    #include <iostream>
     
    int main()
    {
        std::future<int> empty;
        try
        {
            int n = empty.get(); // The behavior is undefined, but
                                 // some implementations throw std::future_error
        }
        catch (const std::future_error& e)
        {
            std::cout << "Caught a future_error with code \"" << e.code()
                      << "\"\nMessage: \"" << e.what() << "\"\n";
        }
    }
```

Saída possível:
```
    Caught a future_error with code "future:3"
    Message: "No associated state"
```

### Veja também

[ future_errc](<#/doc/thread/future_errc>)(C++11) | identifica os códigos de erro de future
(enum)